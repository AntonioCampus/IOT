
from flask import request,session
from datetime import datetime, timedelta, timezone

from flask_jwt_extended import create_access_token,\
                                unset_jwt_cookies,\
                                jwt_required,\
                                set_access_cookies

from app import *
from app.utils.message import message

from flask import jsonify

@app.route('/api/user/login',methods=['GET',"POST"])
def login():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    
    if request.method == 'POST':
        print("request",request.json)
        user = request.json.get("user", None)
        password = request.json.get("password", None)

        cursor = db.OpenConnection().cursor()

        query = "SELECT * FROM users WHERE user=? AND pass=?"
        user=cursor.execute(query, (user, password)).fetchone()

        if user== None:
            return message("Wrong credentials",None).jsonMSG(),401

        access_token = create_access_token(identity=user)
        session["access_token"] = access_token

        resp = jsonify({"access_token":access_token})
        return resp,200


@app.route('/api/user/register',methods=['GET',"POST"])
def register():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    
    if request.method == 'POST':
        user = request.json.get("user", None)
        password = request.json.get("password", None)

        conn = db.OpenConnection()
        cursor = conn.cursor()

        query = "INSERT INTO users (user, pass) VALUES (?, ?)"
        cursor.execute(query, (user, password)).fetchone()
        conn.commit()

        resp = message("Registration ok",None).jsonMSG()

        return resp
    

@app.route("/api/user/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response