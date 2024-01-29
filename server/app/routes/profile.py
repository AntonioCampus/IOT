from flask import request,session
from datetime import datetime, timedelta, timezone

from flask_jwt_extended import jwt_required

from app import app
from app.utils.message import message



@app.route('/profile')
@jwt_required()
def my_profile():
    return message("Nitti is a 'callone'",
                   session["access_token"]).jsonMSG()