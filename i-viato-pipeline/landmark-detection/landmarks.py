# -----------------------------------------------------------------------------
# Name:     landmarks
# Purpose:  Given a .png image file, facial landmarks are detected and returned
#
# Author: Mohammad Sharif
#
# -----------------------------------------------------------------------------
import cv2
import dlib
import imutils
import argparse
import numpy as np

# def rect_to_tuple(rect):
#     """
#     Meant to convert the dlib bounding rectangle prediction
#     into a formatted tuple to be fed into OpenCV.
#     return: tuple representing x,y,width, and height of rectangle
#     """
#     x = rect.left()
#     y = rect.top()
#     width = rect.width()
#     height = rect.height()
#     return (x, y, width, height)

def shape_to_coord_list(shape):
    """
    Takes the dlib face detection shape (the 68 coordinates) and
    converts it into a list of coordinates
    return: list of coordinates
    """
    # Create an empty list of 68 2-tuples
    coords = np.zeros((68,2), dtype="int")
    # Iterate over coords of shape and convert them into 2-tuples
    # Put the converted 2-tuples into the coords list
    for i in range(0, 68):
        coords[i] = (shape.part(i).x, shape.part(i).y)
    return coords

# The following 4 lines set up our argument capabilities via commandline
ap = argparse.ArgumentParser()
ap.add_argument("-p", "--predictor", required=True, help="Path to landmark predictor")
ap.add_argument("-i", "--image", required=True, help="Path to image file")
args = vars(ap.parse_args())

# We initialize the dlib face detector and create the landmark predictor
detector = dlib.get_frontal_face_detector()
# This is a function that we can call later on a shape
predictor = dlib.shape_predictor(args["predictor"])

# For better detection we need to get the image resizes and converted to grayscale
image = cv2.imread(args["image"])
image = imutils.resize(image, width=800)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# We run the detection on the grayscale version of the image
# Notice the variable "rects" is plural this is because there may
# be mutliple faces detected within the image
rects = detector(gray, 1)

# Loop over all detected faces in the image
for i, rect in enumerate(rects):
    # get the detections and convert them into a numpy array
    shape = predictor(gray, rect)
    shape = shape_to_coord_list(shape)

    # draw facial landmarks on the PhotoImage
    for x, y in shape:
        print("(" + str(x) + ", " + str(y) +")")
        cv2.circle(image, (x, y), 1, (255, 255, 255), -1)

# show the output image with detections and landmarks
cv2.imshow("Output", image)
cv2.waitKey(0)
