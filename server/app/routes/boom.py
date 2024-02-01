from app import *
from flask import jsonify
from flask import request,session


from MQTT.mqtt import *


@app.route('/api/user/boom',methods=['GET', 'POST'])
def boom():
    if request.method == 'GET':
        return jsonify({"Warning":"Send post request"})
    
    if request.method == 'POST':
        topic = request.json.get("topic", None)
        
        MQTT.publish(app.config["BROKER_ADDR"],
                app.config["BROKER_PORT"],
                topic,
                "1")

        return jsonify({"status":"ok"})