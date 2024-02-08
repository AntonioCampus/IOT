
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

from app.utils.hash import *

API_NAME ="/api/users"




@app.route(API_NAME+"/login",methods=['GET',"POST"])
def login():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    
    if request.method == 'POST':
        user = request.json.get("user", None)
        password = request.json.get("password", None)

        if(user == None or 
           password == None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})


        password_hash = hash.hash_256(password)
        print(password_hash)
        cursor = db.OpenConnection().cursor()

        query = "SELECT * FROM users WHERE user=? AND pass=?"
        user=cursor.execute(query, (user, password_hash)).fetchone()
        
        if user==None:
            return jsonify({"error": "Wrong credentials",
                            "status":False})
        
        user = list(user)

        additional_claims = {"isAdmin": user[3],
                             "userId":user[0]}

        access_token = create_access_token(identity=user, 
                                           additional_claims=additional_claims)
        
        session["access_token"] = access_token
        return jsonify({"access_token":access_token})


@app.route(API_NAME+"/register",methods=['GET',"POST"])
@jwt_required()
def register():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    
    if request.method == 'POST':
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages",
                           "status":False})
        
        user = request.json.get("user", None)
        password = request.json.get("password", None)
        isAdmin = request.json.get("isAdmin",None)

        if(user == None or 
           password == None or
           isAdmin == None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})

        password_hash = hash.hash_256(password)

        try:
            conn = db.OpenConnection()
            cursor = conn.cursor()
            query = "INSERT INTO users (user, pass,isAdmin) VALUES (?, ?, ?)"
            cursor.execute(query, (user, password_hash, bool(isAdmin)))
            conn.commit()
            return jsonify({"status":True})
        except:
            return jsonify({"error":"adding new user",
                            "status":False})


    
@app.route(API_NAME+"/", methods=["GET","POST"])
@jwt_required()
def GetUsers():
    try:
        cursor = db.OpenConnection().cursor()
        query = "SELECT * FROM users"
        data=cursor.execute(query).fetchall()
        return jsonify(data),200
    except:
        jsonify({"error":"Getting Users",
                 "status":False})

    

@app.route(API_NAME+"/remove", methods=["GET","POST"])
@jwt_required()
def removeUser():

    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})

    if request.method == 'POST':
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages",
                           "status":False})
        
        UserId = request.json.get("UserId", None)

        if(UserId == None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})

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
#@jwt_required()
def ListOvverride():
    try:
        cursor = db.OpenConnection().cursor()
        query = "SELECT * FROM ovverides"
        data=cursor.execute(query).fetchall()
        return jsonify(data),200
    except:
        return jsonify({"error": "Getting Ovverides",
                        "status":False})

   



@app.route(API_NAME+"/override",methods=['GET', 'POST'])
@jwt_required()
def boom():
    if request.method == 'GET':
        return jsonify({"Warning":"Send post request"})
    
    if request.method == 'POST':
        zone = request.json.get("zone", None)
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        userid = get_jwt()["userId"]
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages",
                           "status":False})
        

        if(zone == None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})
        
        try:
            MQTT.publish(app.config["BROKER_ADDR"],
                    app.config["BROKER_PORT"],
                    "zone"+str(zone),
                    "1")
        except:
            return jsonify({"error":"Mqtt Error",
                            "status":False})
        

        try:
            conn = db.OpenConnection()
            cursor = conn.cursor()

            query = "INSERT INTO ovverides (userId, zone,time) VALUES (?, ?, ?)"
            cursor.execute(query, (userid,zone,current_time))
            conn.commit()
            return jsonify({"status":True})
        except:
            return jsonify({"error":"Logging Ovveride",
                            "status":False})


@app.route(API_NAME+"/dashboard")
@jwt_required()
def dashboard():
    try:
        cursor = db.OpenConnection().cursor()
        query = "SELECT * FROM alerts"
        data=cursor.execute(query).fetchall()
        return jsonify(data)
    except:
        return jsonify({"error":"Getting allert",
                            "status":False})

    