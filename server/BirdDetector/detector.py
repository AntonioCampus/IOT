
"""
Bird Detector for IoT project
tested with python 3.11.1

1.PIP installation:
-------------------
pip install -U --pre tensorflow=="2.*"
pip install tf_slim
pip install pycocotools


2.Download the model:
---------------------
"http://download.tensorflow.org/models/object_detection/tf2/20200711/centernet_resnet50_v1_fpn_512x512_coco17_tpu-8.tar.gz"

save and extract in datasets/ directory

3. Install the requirments:
---------------------------
cd models/research/
protoc object_detection/protos/*.proto --python_out=.
cp object_detection/packages/tf2/setup.py .
python -m pip install .


"""

import numpy as np
import tensorflow as tf
import pathlib

from matplotlib import pyplot as plt
from PIL import Image


from object_detection.utils import ops as utils_ops
from object_detection.utils import label_map_util

PATH_TO_TEST_IMAGES_DIR = pathlib.Path('test_images')
TEST_IMAGE_PATHS = sorted(list(PATH_TO_TEST_IMAGES_DIR.glob("*.jpg")))
PATH_TO_LABELS = 'models/research/object_detection/data/mscoco_label_map.pbtxt'

MODEL_PATH = "datasets/centernet_resnet50_v1_fpn_512x512_coco17_tpu-8/saved_model"

class BDetector:
  def __init__(self,modelPath,labelPath):
    # patch tf1 into `utils.ops`
    utils_ops.tf = tf.compat.v1
    # Patch the location of gfile
    tf.gfile = tf.io.gfile
    
    self.category_index = label_map_util.create_category_index_from_labelmap(labelPath, use_display_name=True)
    
    self.detection_model = self.load_model(modelPath)

    print("[*] Detector ready")
  
  def load_model(self,path):
    model_dir = pathlib.Path(path)
    return tf.saved_model.load(model_dir)
  
  def run_inference_for_single_image(self,model, image):
    image = np.asarray(image)
    input_tensor = tf.convert_to_tensor(image)
    input_tensor = input_tensor[tf.newaxis,...]
    model_fn = model.signatures['serving_default']
    output_dict = model_fn(input_tensor)
    num_detections = int(output_dict.pop('num_detections'))
    output_dict = {key:value[0, :num_detections].numpy() for key,value in output_dict.items()}
    output_dict['num_detections'] = num_detections
    output_dict['detection_classes'] = output_dict['detection_classes'].astype(np.int64)
    if 'detection_masks' in output_dict:
      detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
        output_dict['detection_masks'], 
        output_dict['detection_boxes'],
        image.shape[0], image.shape[1])
      detection_masks_reframed = tf.cast(detection_masks_reframed > 0.5,
                                       tf.uint8)
      output_dict['detection_masks_reframed'] = detection_masks_reframed.numpy()
    
    return output_dict
  
  
  def show_inference(self,model,image_path, category_index):
    image_np = np.array(Image.open(image_path))
    output_dict = self.run_inference_for_single_image(model, image_np)
    
    classes = np.array(output_dict['detection_classes'])
    scores  = np.array(output_dict['detection_scores'])
    
    hight_score = classes[np.where(scores > 0.50)]
    result_dict = {key: category_index[key] for key in hight_score}
    return (result_dict)
  
  def DetectBird(self,image_path):
    result = self.show_inference(self.detection_model,image_path,self.category_index)
    for value in result.values():
      if(value["name"] == "bird"):
        return True

    return False

