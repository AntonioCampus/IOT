from flask import Flask

from config import Configuration
from flask_jwt_extended import  JWTManager

config = Configuration()

app = Flask(__name__)

app.config.from_object(config)


app.config["JWT_MAGAER"]=JWTManager(app)
app.secret_key = app.config["SESSION_KEY"]

from app import routes

app.run(host='0.0.0.0', debug=True)
