from flask import Flask,request
import numpy as np
from PIL import Image



app = Flask(__name__)

@app.route('/classify',methods=['GET', 'POST'])
def classifyImage():
    if request.method == 'GET':
        print("GET request")
        return "Send post request to classify image"
    if request.method == 'POST':
        image=request.files["file"]
        img = np.array(Image.open(image))
        print(img)


        return "ciao"
        

if __name__ == '__main__':
    app.run(debug=True)
