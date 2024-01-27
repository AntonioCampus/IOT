import os


project_root = os.path.dirname(os.path.abspath(__file__))


class Configuration:
    #shared paths
    MODEL_PATH = "BirdDetector/datasets/centernet_resnet50_v1_fpn_512x512_coco17_tpu-8/saved_model"
    PATH_TO_LABELS = 'BirdDetector/models/research/object_detection/data/mscoco_label_map.pbtxt'
    DATABASEPATH = 'app/database/database.db'
    SQLSCHEMA = 'app/database/schema.sql'
    PROJECT_ROOT = project_root
    SESSION_KEY = "antonio"
    JWT_SECRET_KEY = "jwtPassword"
    #Shared objects
    JWT_MAGAER_OBJ = None
    DETECTOR_OBJ = None
    DB_OBJ = None