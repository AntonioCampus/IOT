from flask import request,session
from datetime import datetime, timedelta, timezone

from flask_jwt_extended import create_access_token,\
                                unset_jwt_cookies,\
                                jwt_required,\
                                set_access_cookies

from app import *
from app.utils.message import message

from flask import jsonify


API_NAME="/api/zones"

@app.route(API_NAME,methods=['GET'])
def getZone():
    cursor = db.OpenConnection().cursor()
    query = "SELECT * FROM zones"
    data=cursor.execute(query).fetchall()
    return jsonify(data),200


@app.route(API_NAME+"/add",methods=['GET',"POST"])
def addZone():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    
    if request.method == 'POST':
        infoZone = request.json.get("info", None)
        try:
            conn = db.OpenConnection()
            cursor = conn.cursor()

            query = "INSERT INTO zones (info) VALUES (?)"
            cursor.execute(query, (infoZone,))
            conn.commit()
            status = True
        except:
            status = False

        return jsonify({"status":status})