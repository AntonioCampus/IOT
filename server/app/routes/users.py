
from flask import request,session
from datetime import datetime, timedelta, timezone

from flask_jwt_extended import create_access_token,\
                                unset_jwt_cookies,\
                                jwt_required,\
                                get_jwt,\
                                set_access_cookies

from app import *
from app.utils.message import message
from MQTT.mqtt import *

from flask import jsonify


API_NAME ="/api/users"





@app.route(API_NAME+"/login",methods=['GET',"POST"])
def login():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    
    if request.method == 'POST':
        print("request",request.json)
        user = request.json.get("user", None)
        password = request.json.get("password", None)

        cursor = db.OpenConnection().cursor()

        query = "SELECT * FROM users WHERE user=? AND pass=?"
        user=list(cursor.execute(query, (user, password)).fetchone())
        

        if user== None:
            return jsonify({"error": "Wrong credentials"}),401
        

        additional_claims = {"isAdmin": user[3],
                             "userId":user[0]}

        access_token = create_access_token(identity=user, 
                                           additional_claims=additional_claims)
        
        session["access_token"] = access_token

        resp = jsonify({"access_token":access_token})
        return resp,200


@app.route(API_NAME+"/register",methods=['GET',"POST"])
@jwt_required()
def register():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    
    if request.method == 'POST':
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages"}),401
        
        user = request.json.get("user", None)
        password = request.json.get("password", None)
        isAdmin = request.json.get("isAdmin",None)

        if(user == None or 
           password == None):
            return jsonify({"error":"Invalid paramters"})

        try:
            conn = db.OpenConnection()
            cursor = conn.cursor()

            query = "INSERT INTO users (user, pass,isAdmin) VALUES (?, ?, ?)"
            cursor.execute(query, (user, password, isAdmin))
            conn.commit()
        except:
            pass

        resp = message("Registration ok",None).jsonMSG()

        return resp
    
@app.route(API_NAME+"/", methods=["GET","POST"])
@jwt_required()
def GetUsers():
    try:
        cursor = db.OpenConnection().cursor()
        query = "SELECT * FROM users"
        data=cursor.execute(query).fetchall()
        return jsonify(data),200
    except:
        jsonify({"error":"Getting Users"}),500

    

@app.route(API_NAME+"/remove", methods=["GET","POST"])
@jwt_required()
def removeUser():

    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})

    if request.method == 'POST':
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages"}),401
        
        UserId = request.json.get("UserId", None)

        if(UserId == None):
            return jsonify({"error":"Invalid paramters"})

        conn = db.OpenConnection()
        cursor = conn.cursor()
        
        query = "DELETE FROM users WHERE id = ?"

        status = True
        try:
            cursor.execute(query, (UserId,))
            conn.commit()
        except:
            status = False

        return jsonify({"status":status})


@app.route(API_NAME+"/listoverrides",methods=['GET'])
@jwt_required()
def ListOvverride():
    cursor = db.OpenConnection().cursor()
    query = "SELECT * FROM ovverides"
    data=cursor.execute(query).fetchall()

    return jsonify(data),200



@app.route(API_NAME+"/override",methods=['GET', 'POST'])
@jwt_required()
def boom():
    if request.method == 'GET':
        return jsonify({"Warning":"Send post request"})
    
    if request.method == 'POST':
        zone = request.json.get("zone", None)

        userid = get_jwt()["userId"]
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages"}),401
        

        if(zone == None):
            return jsonify({"error":"Invalid paramters"})
        
        try:
            MQTT.publish(app.config["BROKER_ADDR"],
                    app.config["BROKER_PORT"],
                    zone,
                    "1")
        except:
            return jsonify({"MQTT":"Error"})
        


        conn = db.OpenConnection()
        cursor = conn.cursor()

        query = "INSERT INTO ovverides (userId, zone) VALUES (?, ?)"
        cursor.execute(query, (userid,zone))
        conn.commit()

        return jsonify({"status":"ok"})


@app.route(API_NAME+"/dashboard")
@jwt_required()
def dashboard():
    
    cursor = db.OpenConnection().cursor()
    query = "SELECT * FROM alerts"
    data=cursor.execute(query).fetchall()

    return jsonify(data),200