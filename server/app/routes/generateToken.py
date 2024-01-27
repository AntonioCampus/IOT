
from flask import request,session
from datetime import datetime, timedelta, timezone

from flask_jwt_extended import create_access_token,\
                                unset_jwt_cookies,\
                                jwt_required,\
                                set_access_cookies

from app import app
from app.utils.message import message

@app.route('/GenToken',methods=['GET',"POST"])
def GetToke():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    
    if request.method == 'POST':
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        if email != "test" or password != "test":
            return message("Wrong email or password",None).jsonMSG()

        access_token = create_access_token(identity=email)
        session["access_token"] = access_token

        resp = message("access_token",access_token).jsonMSG()

        set_access_cookies(resp, access_token)

        return resp

