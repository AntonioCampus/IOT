from flask import request,session
from datetime import datetime, timedelta, timezone

from flask_jwt_extended import jwt_required

from app import *
from app.utils.message import message

from flask import jsonify


@app.route('/api/user/dashboard')
@jwt_required()
def dashboard():
    
    cursor = db.OpenConnection().cursor()
    query = "SELECT * FROM alerts"
    data=cursor.execute(query).fetchall()

    return jsonify(data),200
   