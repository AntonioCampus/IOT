from flask import Flask,request
import numpy as np
from PIL import Image
import sys
import os
import pathlib


current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, '..'))
sys.path.append(parent_dir)

from BirdDetector.detector import BDetector


MODEL_PATH = "../BirdDetector/datasets/centernet_resnet50_v1_fpn_512x512_coco17_tpu-8/saved_model"
PATH_TO_LABELS = '../BirdDetector/models/research/object_detection/data/mscoco_label_map.pbtxt'

app = Flask(__name__)

obj = BDetector(MODEL_PATH,PATH_TO_LABELS)

@app.route('/classify',methods=['GET', 'POST'])
def classifyImage():
    if request.method == 'GET':
        print("GET request")
        return "Send post request to classify image"
    if request.method == 'POST':
        if("file" in request.files):
            image=request.files["file"]
            return "Bird status detect:{} ".format(obj.DetectBird(image))
        return "Wrong paramter"
        

if __name__ == '__main__':
    app.run(debug=True)
