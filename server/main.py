from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from pose_detector import PoseDetector

import cv2
from matplotlib import pyplot as plt
import numpy as np
import tensorflow as tf
import json

app = Flask(__name__)

CORS(app)
PD = PoseDetector()

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/snapshot', methods=["GET"])
def snapshot():
    if request.method == "GET":
        cam_id = request.args.get("camId")
        cap = cv2.VideoCapture(int(cam_id))
        index = 0
        keypoints_with_scores = []
        while cap.isOpened():
            if index > 0: break
            ret, frame = cap.read()
            
            # Resize image
            img = frame.copy()
            img = tf.image.resize_with_pad(tf.expand_dims(img, axis=0), 384,640)
            input_img = tf.cast(img, dtype=tf.int32)
            
            # Detection section
            results = PD.getResults(input_img)
            keypoints_with_scores = results['output_0'].numpy()[:,:,:51].reshape((6,17,3))
            
            # Render keypoints 
            PD.loop_through_people(frame, keypoints_with_scores, PD.EDGES, 0.1)
            
            # cv2.imshow('Movenet Multipose', imRs)
            index += 1
            if cv2.waitKey(10) & 0xFF==ord('q'):
                break
        cap.release()
        cv2.destroyAllWindows()
        print(keypoints_with_scores)
        return json.dumps(keypoints_with_scores)


if __name__ == "__main__":
    app.run(debug=True)