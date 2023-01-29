import tensorflow as tf
import tensorflow_hub as hub
import cv2
from matplotlib import pyplot as plt
import numpy as np

class PoseDetector:
    EDGES = {
        (0, 1): 'm',
        (0, 2): 'c',
        (1, 3): 'm',
        (2, 4): 'c',
        (0, 5): 'm',
        (0, 6): 'c',
        (5, 7): 'm',
        (7, 9): 'm',
        (6, 8): 'c',
        (8, 10): 'c',
        (5, 6): 'y',
        (5, 11): 'm',
        (6, 12): 'c',
        (11, 12): 'y',
        (11, 13): 'm',
        (13, 15): 'm',
        (12, 14): 'c',
        (14, 16): 'c'
    }
    def __init__(self):
        # Optional if you are using a GPU
        gpus = tf.config.experimental.list_physical_devices('GPU')
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)

        model = hub.load('https://tfhub.dev/google/movenet/multipose/lightning/1')
        self.movenet = model.signatures['serving_default']

    def draw_connections(self, frame, keypoints, edges, confidence_threshold):
        y, x, c = frame.shape
        shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
        
        for edge, color in edges.items():
            p1, p2 = edge
            y1, x1, c1 = shaped[p1]
            y2, x2, c2 = shaped[p2]
            
            if (c1 > confidence_threshold) & (c2 > confidence_threshold):      
                cv2.line(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0,0,255), 4)

    # Function to loop through each person detected and render
    def loop_through_people(self, frame, keypoints_with_scores, edges, confidence_threshold):
        self.mean_per_person = []
        for person in keypoints_with_scores:
            self.draw_connections(frame, person, edges, confidence_threshold)
            self.mean_per_person.append(self.draw_keypoints(frame, person, confidence_threshold))

    def draw_keypoints(self, frame, keypoints, confidence_threshold):
        y, x, c = frame.shape
        shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))
        
        sum_x = 0
        sum_y = 0
        sum = 0
        for kp in shaped:
            ky, kx, kp_conf = kp
            if kp_conf > confidence_threshold:
                if (sum > 5): break
                sum_x += kx
                sum_y += ky
                sum += 1
                cv2.circle(frame, (int(kx), int(ky)), 6, (0,255,0), -1)
        
        # print(sum_x, sum_y, sum)
        x_, y_ = 0, 0
        if sum > 0:
            x_,y_ = sum_x/sum, sum_y/sum
            cv2.circle(frame, (int(kx), int(ky)), 6, (255,0,0), -1)
        return {'x': x_, 'y': y_}

    def getResults(self, input_img):
        return self.movenet(input_img)

    def getSnapshot(self):
        pass

# if __name__ == "__main__":
#     PD = PoseDetector()
#     cap = cv2.VideoCapture(0)
#     while cap.isOpened():
#         ret, frame = cap.read()

#         imRs = cv2.resize(frame, (1920, 1080))
        
#         # Resize image
#         img = imRs.copy()
#         img = tf.image.resize_with_pad(tf.expand_dims(img, axis=0), 384,640)
#         input_img = tf.cast(img, dtype=tf.int32)
        
#         # Detection section
#         results = PD.getResults(input_img)
#         keypoints_with_scores = results['output_0'].numpy()[:,:,:51].reshape((6,17,3))
        
#         # Render keypoints 
#         PD.loop_through_people(imRs, keypoints_with_scores, PD.EDGES, 0.1)
        
#         cv2.imshow('Movenet Multipose', imRs)
        
#         if cv2.waitKey(10) & 0xFF==ord('q'):
#             break
#     cap.release()
#     cv2.destroyAllWindows()

if __name__ == "__main__":
    PD = PoseDetector()
    cap = cv2.VideoCapture('crowd3.mp4')
    index = 0
    keypoints_with_scores = []
    while cap.isOpened():
        # if index > 0: break
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
        print(PD.mean_per_person)

        # x_val = [x[0] for x in PD.mean_per_person]
        # y_val = [y[0] for y in PD.mean_per_person]
        # plt.plot(x_val,y_val)
        # plt.plot(x_val,y_val,'or')
        # plt.scatter(*zip(*PD.mean_per_person))
        # plt.show()
        
        cv2.imshow('Movenet Multipose', frame)
        index += 1
        if cv2.waitKey(10) & 0xFF==ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()

    # print(keypoints_with_scores)