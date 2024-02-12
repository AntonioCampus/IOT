
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


""""
Route to handle user login
"""

@app.route(API_NAME+"/login",methods=['GET',"POST"])
def login():
    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})
    
    if request.method == 'POST':

        # get and check the post parameters
        user = request.json.get("user", None)
        password = request.json.get("password", None)
        if(user == None or 
           password == None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})

        # login procedure, check if the user exists
        password_hash = hash.hash_256(password)
        print(password_hash)
        cursor = db.OpenConnection().cursor()

        query = "SELECT * FROM users WHERE user=? AND pass=?"
        user=cursor.execute(query, (user, password_hash)).fetchone()
        
        #if the user doen't exists
        if user==None:
            return jsonify({"error": "Wrong credentials",
                            "status":False})
        # if the user exists, create the JWT and send on the reponse
        user = list(user)

        additional_claims = {"isAdmin": user[3],
                             "userId":user[0]}

        access_token = create_access_token(identity=user, 
                                           additional_claims=additional_claims)
        
        session["access_token"] = access_token
        return jsonify({"access_token":access_token})

""""
Route to handle user registration
"""

@app.route(API_NAME+"/register",methods=['GET',"POST"])
@jwt_required()
def register():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    
    if request.method == 'POST':
        # access control 
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages",
                           "status":False})
        # get and check the post parameters
        user = request.json.get("user", None)
        password = request.json.get("password", None)
        isAdmin = request.json.get("isAdmin",None)

        if(user == None or 
           password == None or
           isAdmin == None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})

        # create new user
        password_hash = hash.hash_256(password)

        try:
            conn = db.OpenConnection()
            cursor = conn.cursor()
            query = "INSERT INTO users (user, pass,isAdmin) VALUES (?, ?, ?)"
            cursor.execute(query, (user, password_hash, isAdmin))
            conn.commit()
            return jsonify({"status":True})
        except:
            return jsonify({"error":"adding new user",
                            "status":False})


""""
Route to list users
"""
    
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


""""
Route to remove user
"""
@app.route(API_NAME+"/remove", methods=["GET","POST"])
@jwt_required()
def removeUser():

    if request.method == 'GET':
        return jsonify({"msg": "Send post request"})

    if request.method == 'POST':
        # access control 
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages",
                           "status":False})
        # get and check the post parameters
        UserId = request.json.get("UserId", None)
        if(UserId == None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})

        # delete user
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


""""
Route to allow users to list ovverides
"""

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

   

""""
Route to allow privilaged user to manually fire an alert ("ovverides")
"""
@app.route(API_NAME+"/override",methods=['GET', 'POST'])
@jwt_required()
def boom():
    if request.method == 'GET':
        return jsonify({"Warning":"Send post request"})
    
    if request.method == 'POST':
        zone = request.json.get("zone", None)
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        # access control 
        userid = get_jwt()["userId"]
        isAdmin = get_jwt()["isAdmin"]
        if(isAdmin != True):
           return jsonify({"error":"Invalid privilages",
                           "status":False})
        
        # get and check the post parameters
        if(zone == None):
            return jsonify({"error":"Invalid paramters",
                            "status":False})
        # ovveriding operation on a specific zone
        try:
            MQTT.publish(app.config["BROKER_ADDR"],
                    app.config["BROKER_PORT"],
                    "zone"+str(zone),
                    "1")
        except:
            return jsonify({"error":"Mqtt Error",
                            "status":False})
        
        # log the operation on the database
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

""""
Route to retrive the alerts
"""
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

    