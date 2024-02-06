

from flask import request,session
from app import *
from datetime import datetime

from flask import jsonify
from MQTT.mqtt import *

from flask_jwt_extended import create_access_token,\
                                get_jwt,\
                                unset_jwt_cookies,\
                                jwt_required,\
                                set_access_cookies


API_NAME="/api/devices"


@app.route(API_NAME+"/login",methods=['GET', 'POST'])
def loginDevice():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    
    if request.method == 'POST':
        user = request.json.get("idname", None)
        password = request.json.get("passcode", None)

        if(user == None or 
           password == None):
            return jsonify({"error":"Invalid paramters"})

        cursor = db.OpenConnection().cursor()

        query = "SELECT * FROM devices WHERE idname=? AND passcode=?"

        device=cursor.execute(query, (user, password)).fetchone()


        if device==None:
            return jsonify({"error": "Wrong credentials"}),401
        
        
        additional_claims = {"zone": list(device)[3],
                             "DeviceId":list(device)[0]}

        access_token = create_access_token(identity=user,
                                           additional_claims=additional_claims)
        
        session["access_token"] = access_token

        resp = jsonify({"access_token":access_token})
        return resp,200


@app.route(API_NAME+"/remove",methods=['GET', 'POST'])
def RemoveDevice():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    if request.method == 'POST':
        deviceId = request.json.get("deviceId", None)
        deviceType = request.json.get("type", None)

        if(deviceId == None or 
           deviceType == None):
            return jsonify({"error":"Invalid paramters"})

        conn = db.OpenConnection()
        cursor = conn.cursor()
        
        query2 = "DELETE FROM devices WHERE id = ?"

        status = True

        if(deviceType == "actuator"):
            query1 = "DELETE FROM actuators WHERE id=?"
            print("Ok")
        elif(deviceType == "detector"):
            query1 = "DELETE FROM detector WHERE id=?"
        else:
            return jsonify({"error":"Invalid device type",
                            "status":False})
        

        cursor.execute(query1, (deviceId,))
        cursor.execute(query2, (deviceId,))
        conn.commit()

        return jsonify({"status":status})

@app.route(API_NAME+"/",methods=['GET'])
def GetDevices():
    cursor = db.OpenConnection().cursor()
    query = "SELECT * FROM devices"
    data=cursor.execute(query).fetchall()
    return jsonify(data),200






@app.route(API_NAME+"/add",methods=['GET', 'POST'])
def addDevice():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    
    if request.method == 'POST':
        print("request",request.json)
        idname = request.json.get("idname", None)
        passcode = request.json.get("passcode", None)
        zone = request.json.get("zone", None)
        deviceType = request.json.get("type", None)


        if(idname == None or 
           passcode == None or
           zone==None or 
           deviceType==None):
            return jsonify({"error":"Invalid paramters"})

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

        try:
            cursor.execute(query, (idname, passcode,zone))
            newInsertedId = cursor.lastrowid
            status = True
        except:
            status = False
        try:
            cursor.execute(query2, (newInsertedId,))
            status = True
        except:
            conn.rollback()
            status = False

        conn.commit()
        return jsonify({"status":status})



       

@app.route('/api/devices/classify',methods=['GET', 'POST'])
@jwt_required()
def classifyImage():
    if request.method == 'GET':
        return jsonify({"Warning":"Send post request"})
    if request.method == 'POST':
        if("file" in request.files):
            time = datetime.now()
            image=request.files["file"]
            status = detector.DetectBird(image)
            # Extract the zone from the jwt of the device
            # and use it as topic for MQTT 
            zoneId = get_jwt()["zone"]
            DeviceId = get_jwt()["DeviceId"]
            if(status):
                pass
                MQTT.publish(app.config["BROKER_ADDR"],
                    app.config["BROKER_PORT"],
                    "zone"+str(zoneId),
                    "1")
                    
            # log the status of the classification
            conn = db.OpenConnection()
            cursor = conn.cursor()

            query = "INSERT INTO alerts (zoneId, deviceId,  status, time) VALUES (?,?, ?, ?)"

            cursor.execute(query, (zoneId, DeviceId ,status, time))
            conn.commit()        

            return jsonify({"status":"ok",
                            "Birddetected":status})
        
        return jsonify({"Warning":"Wrong parameter"})