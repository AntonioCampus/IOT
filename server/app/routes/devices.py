

from flask import request
from app import *

from flask import jsonify
from MQTT.mqtt import *


API_NAME="/api/devices"

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
def classifyImage():
    if request.method == 'GET':
        return jsonify({"Warning":"Send post request"})
    if request.method == 'POST':
        if("file" in request.files):
            image=request.files["file"]
            status = True #detector.DetectBird(image)
            if(status):
                MQTT.publish(app.config["BROKER_ADDR"],
                app.config["BROKER_PORT"],
                "test",
                "1")

            return jsonify({"status":"ok",
                            "Birddetected":status})
        
        return jsonify({"Warning":"Wrong parameter"})