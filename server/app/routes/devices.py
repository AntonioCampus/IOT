

from flask import request,session
from app import *
from datetime import datetime

from flask import jsonify
from MQTT.mqtt import *
from app.utils.hash import *

from flask_jwt_extended import create_access_token,\
                                get_jwt,\
                                unset_jwt_cookies,\
                                jwt_required,\
                                set_access_cookies


API_NAME="/api/devices"

""""
Route to handle device login
"""

@app.route(API_NAME+"/login",methods=['GET', 'POST'])
def loginDevice():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    
    if request.method == 'POST':
        # get and check the post parameters
        user = request.json.get("idname", None)
        password = request.json.get("passcode", None)

        if(user == None or 
           password == None):
            return jsonify({"error":"Invalid paramters"})
        
        # login procedure, check if the device exists
        password_hash = hash.hash_256(password)
        cursor = db.OpenConnection().cursor()
        query = "SELECT * FROM devices WHERE idname=? AND passcode=?"
        device=cursor.execute(query, (user, password_hash)).fetchone()
        
        #if the device doen't exists
        if device==None:
            return jsonify({"error": "Wrong credentials"}),401
        
        # if the device exists, create the JWT and send on the reponse
        additional_claims = {"zone": list(device)[3],
                             "DeviceId":list(device)[0]}

        access_token = create_access_token(identity=user,
                                           additional_claims=additional_claims)
        
        session["access_token"] = access_token

        resp = jsonify({"access_token":access_token})
        return resp,200


""""
Route to handle device ellimination
"""

@app.route(API_NAME+"/remove",methods=['GET', 'POST'])
@jwt_required()
def RemoveDevice():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    if request.method == 'POST':
        # access control 
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages",
                           "status":False})
        
        # get and check the post parameters
        deviceId = request.json.get("deviceId", None)
        deviceType = request.json.get("type", None)

        if(deviceId == None or 
           deviceType == None):
            return jsonify({"error":"Invalid paramters"})

        # delete the device
        conn = db.OpenConnection()
        cursor = conn.cursor()
        
        query2 = "DELETE FROM devices WHERE id = ?"
        if(deviceType == "actuator"):
            query1 = "DELETE FROM actuators WHERE id=?"
        elif(deviceType == "detector"):
            query1 = "DELETE FROM detectors WHERE id=?"
        else:
            return jsonify({"error":"Invalid device type",
                            "status":False})
        
        try:
            cursor.execute(query1, (deviceId,))
            cursor.execute(query2, (deviceId,))
            conn.commit()
        except:
            return jsonify({"error":"Deleting device",
                            "status":False})

        return jsonify({"status":True})

""""
Route to list devices all
"""
@app.route(API_NAME+"/",methods=['GET'])
def GetDevices():
    cursor = db.OpenConnection().cursor()
    query = "SELECT * FROM devices"
    data=cursor.execute(query).fetchall()
    return jsonify(data),200

""""
Route to list only all the detectors
"""
@app.route(API_NAME+"/listdetectors",methods=['GET'])
def GetDetector():
    try:
        cursor = db.OpenConnection().cursor()
        query = "SELECT * FROM devices WHERE id IN (SELECT id FROM detectors)"
        data=cursor.execute(query).fetchall()
        return jsonify(data)
    except:
        return jsonify({"error": "Getting detectors",
                        "status":False})

""""
Route to list only all the actuators
"""

@app.route(API_NAME+"/listactuators",methods=['GET'])
def GetActuators():
    try:
        cursor = db.OpenConnection().cursor()
        query = "SELECT * FROM devices WHERE id IN (SELECT id FROM actuators)"
        data=cursor.execute(query).fetchall()
        return jsonify(data)
    except:
         return jsonify({"error": "Getting Actuators",
                        "status":False})


""""
Route to add new device
"""

@app.route(API_NAME+"/add",methods=['GET', 'POST'])
@jwt_required()
def addDevice():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    
    if request.method == 'POST':
        # access control 
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages",
                           "status":False})

        # get and check the post parameters
        idname = request.json.get("idname", None)
        passcode = request.json.get("passcode", None)
        zone = request.json.get("zone", None)
        deviceType = request.json.get("type", None)


        if(idname == None or 
           passcode == None or
           zone==None or 
           deviceType==None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})

        # create new device
        password_hash = hash.hash_256(passcode)
        conn = db.OpenConnection()
        cursor = conn.cursor()
        
        query = "INSERT INTO devices (idname, passcode,zone) VALUES (?, ?,?)"


        if(deviceType == "actuator"):
            query2 = "INSERT INTO actuators (id) VALUES (?)"
        elif(deviceType == "detector"):
            query2 = "INSERT INTO detectors (id) VALUES (?)"
        else:
            return jsonify({"error":"Invalid device type",
                            "status":False})

        status = True
        try:
            cursor.execute(query, (idname, password_hash,zone))
            newInsertedId = cursor.lastrowid
            
        except:
            status = False
        try:
            cursor.execute(query2, (newInsertedId,))
        except:
            conn.rollback()
            status = False

        conn.commit()
        return jsonify({"status":status})


""""
Route to hanlde image classification
"""
       
@app.route('/api/devices/classify',methods=['GET', 'POST'])
@jwt_required()
def classifyImage():
    if request.method == 'GET':
        return jsonify({"Warning":"Send post request",
                        "status":False})
    if request.method == 'POST':
        # get and check the post parameters
        if("file" in request.files):
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            image=request.files["file"]
            #classify the image
            status =  detector.DetectBird(image)
            # Extract the zone from the jwt of the device
            # and use it as topic for MQTT 
            zoneId = get_jwt()["zone"]
            DeviceId = get_jwt()["DeviceId"]

            # check if there are actuator on the "zoneId" zone and fire a MQTT message
            query = "SELECT * FROM devices WHERE id IN (SELECT id FROM actuators) AND zone = ?"
            conn = db.OpenConnection()
            cursor = conn.cursor()

            data=cursor.execute(query, (zoneId,)).fetchall()

            if(status and len(data)>0):
                pass
                MQTT.publish(app.config["BROKER_ADDR"],
                    app.config["BROKER_PORT"],
                    "zone"+str(zoneId),
                    "1")
                    
            # log the status of the classification
            conn = db.OpenConnection()
            cursor = conn.cursor()

            query = "INSERT INTO alerts (zoneId, deviceId,  status, time) VALUES (?,?, ?, ?)"

            cursor.execute(query, (zoneId, DeviceId ,status, current_time))
            conn.commit()        

            return jsonify({"status":True,
                            "Birddetected":status})
        
        return jsonify({"Warning":"Wrong parameter",
                        "status":False})