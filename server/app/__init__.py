from flask import Flask

from config import Configuration
from flask_jwt_extended import  JWTManager
from app.database.db import Database
#from BirdDetector.detector import BDetector

config = Configuration()

app = Flask(__name__)
app.config.from_object(config)

app.secret_key = app.config["SESSION_KEY"]


jwt_manager = JWTManager(app)
db =  Database(app.config["DATABASEPATH"],
               app.config["SQLSCHEMA"])


""""
detector = BDetector(app.config["MODEL_PATH"],
                                app.config["PATH_TO_LABELS"])
"""


from app import routes
app.run(host='0.0.0.0', debug=True)
