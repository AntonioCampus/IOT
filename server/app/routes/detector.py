

from flask import Flask,request,jsonify
from app import app
from config import Configuration

conf = Configuration()


import numpy as np
from PIL import Image
import sys
import os
import pathlib

from app.utils.message import message


@app.route('/classify',methods=['GET', 'POST'])
def classifyImage():
    if request.method == 'GET':
        return message("Send Post Request",None).jsonMSG()
    if request.method == 'POST':
        if("file" in request.files):
            image=request.files["file"]
            ob = message("Bird status detetction",
                         conf.detector.DetectBird(image))
            return ob.jsonMSG()
        
        return message("Wrong parameter",None).jsonMSG()