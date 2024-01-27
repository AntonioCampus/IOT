

from flask import request
from app import app


from app.utils.message import message



@app.route('/classify',methods=['GET', 'POST'])
def classifyImage():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    if request.method == 'POST':
        if("file" in request.files):
            image=request.files["file"]
            ob = message("Bird status detetction",
                         app.config["DETECTOR_OBJ"].DetectBird(image))
            return ob.jsonMSG()
        
        return message("Wrong parameter",None).jsonMSG()