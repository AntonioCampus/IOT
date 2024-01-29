import os



class Configuration:
    MODEL_PATH = "BirdDetector/datasets/centernet_resnet50_v1_fpn_512x512_coco17_tpu-8/saved_model"
    PATH_TO_LABELS = 'BirdDetector/models/research/object_detection/data/mscoco_label_map.pbtxt'
    DATABASEPATH = 'app/database/database.db'
    SQLSCHEMA = 'app/database/'
    PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
    SESSION_KEY = "antonio"
    JWT_SECRET_KEY = "jwtPassword"