import os



project_root = os.path.dirname(os.path.abspath(__file__))

from BirdDetector.detector import BDetector

MODEL_PATH = "BirdDetector/datasets/centernet_resnet50_v1_fpn_512x512_coco17_tpu-8/saved_model"
PATH_TO_LABELS = 'BirdDetector/models/research/object_detection/data/mscoco_label_map.pbtxt'



class Configuration:
    """Contains the configuration information for the app."""

    detector = BDetector(MODEL_PATH,PATH_TO_LABELS)
    # classification
    image_folder_path = os.path.join(project_root, 'app/static/imagenet_subset')
    # web server
    SECRET_KEY = os.environ.get('SECRET_KEY') or '9cj328s61hsd8'
    # queue

