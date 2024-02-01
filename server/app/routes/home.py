from flask import render_template

from app import app
from config import Configuration

from flask import jsonify

conf = Configuration()


@app.route('/home', methods=['GET'])
@app.route('/index', methods=['GET'])
@app.route('/', methods=['GET'])
def home():
    return jsonify({"Info":"Welcome!!"})
