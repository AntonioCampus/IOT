from flask import Flask
from flask_cors import CORS
from datetime import timedelta
from config import Configuration
from flask_jwt_extended import  JWTManager
from app.database.db import Database
from BirdDetector.detector import BDetector

config = Configuration()

app = Flask(__name__)
CORS(app)
app.config.from_object(config)

app.secret_key = app.config["SESSION_KEY"]
app.config['JWT_EXPIRATION_DELTA'] = timedelta(days=1)


jwt_manager = JWTManager(app)

db =  Database(app.config["DATABASEPATH"],
               app.config["SQLSCHEMA"])


detector = BDetector(app.config["MODEL_PATH"],
                                app.config["PATH_TO_LABELS"])


from app import routes
app.run(host='0.0.0.0', debug=True)
