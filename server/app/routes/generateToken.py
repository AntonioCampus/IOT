
from flask import request,session
from datetime import datetime, timedelta, timezone

from flask_jwt_extended import create_access_token,\
                                unset_jwt_cookies,\
                                jwt_required,\
                                set_access_cookies

from app import app
from app.utils.message import message

@app.route('/GenToken',methods=['GET',"POST"])
def GetToken():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    
    if request.method == 'POST':
        user = request.json.get("user", None)
        password = request.json.get("password", None)

        cursor = app.config["DB_OBJ"].GetConnection().cursor()

        query = "SELECT * FROM users WHERE user=? AND pass=?"
        user=cursor.execute(query, (user, password)).fetchone()

        if user== None:
            return message("Wrong credential",None).jsonMSG()


        access_token = create_access_token(identity=user)
        session["access_token"] = access_token

        #embeds access token in the response
        resp = message("access_token",access_token).jsonMSG()

        #embeded access token also in the cookie
        #set_access_cookies(resp, access_token)

        return resp

