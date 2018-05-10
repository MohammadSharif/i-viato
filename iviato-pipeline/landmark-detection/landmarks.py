# -----------------------------------------------------------------------------
# Name:     landmarks
# Purpose:  Given a .png image file, facial landmarks are detected and returned
#           The .png image must follow this naming pattern: 
#           videoId_frameNumber.png
#
# Author:   Mohammad Sharif - Hirad Pourtahmasbi
#
# -----------------------------------------------------------------------------
import cv2
import dlib
import imutils
import math
import numpy as np
import os

from pupils import find_eye_center

# The path is in relative to the API code, hence we're going back up a directory
predictorPath = os.path.abspath("../iviato-pipeline/landmark-detection/shape_predictor_68_face_landmarks.dat")
#Didnt work on my machine so i took out the origional iviato-pipeline because we are already in that dir
#predictorPath = os.path.abspath("../landmark-detection/shape_predictor_68_face_landmarks.dat")

detector = dlib.get_frontal_face_detector()
# This is a function that we can call later on a shape
predictor = dlib.shape_predictor(predictorPath)
headband = cv2.imread("../iviato-pipeline/landmark-detection/leafHeadband.png", -1)
#headband = cv2.imread("../landmark-detection/leafHeadband.png")


def rect_to_tuple(rect):
    """
    Meant to convert the dlib bounding rectangle prediction
    into a formatted tuple to be fed into OpenCV.
    return: tuple representing x,y,width, and height of rectangle
    """
    x = rect.left()
    y = rect.top()
    width = rect.width()
    height = rect.height()
    return (x, y, width, height)


def get_pupils(coords, image):
    """
    Takes in the list of coordinates generated by dlib and the image.
    return: list of tuples representing coordinates for pupils
    """
    #print(coords[0])
    x1 = coords[36][0]
    y1 = max(coords[37][1], coords[38][1])
    w1 = coords[39][0] - x1
    h1 = min(coords[40][1], coords[41][1]) - y1
    left = image[y1:y1+h1, x1:x1+w1]
    center1 = find_eye_center(left)
    cx1, cy1 = center1
    center1 = (x1+cx1, y1 + cy1)
    x2 = coords[42][0]
    y2 = max(coords[43][1], coords[44][1])
    w2 = coords[45][0] - x2
    h2 = min(coords[47][1], coords[48][1]) - y2
    right = image[y2:y2+h2, x2:x2+w2]
    center2 = find_eye_center(right)
    cx2, cy2 = center2
    center2 = (x2 + cx2, y2 + cy2)
    return [center1, center2]


def shape_to_coord_list(shape, gray):
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


# Check if a point is inside a rectangle
def rect_contains(rect, point) :
    """
    Takes a bounding rectangle to make sure that the specified point is within
    the rectangle. This is used to ensure our delaunay triangles are drawn
    properly.
    return: boolean specifying if point is within the rectangle
    """
    if point[0] < rect[0] :
        return False
    elif point[1] < rect[1] :
        return False
    elif point[0] > rect[2] :
        return False
    elif point[1] > rect[3] :
        return False
    return True


# Draw delaunay triangles
def draw_delaunay(img, subdiv, delaunay_color) :
    triangleList = subdiv.getTriangleList()
    size = img.shape
    rect = (0, 0, size[1], size[0])
    for t in triangleList:
        pt1 = (t[0], t[1])
        pt2 = (t[2], t[3])
        pt3 = (t[4], t[5])
        if rect_contains(rect, pt1) and rect_contains(rect, pt2) and rect_contains(rect, pt3):
            cv2.line(img, pt1, pt2, delaunay_color, 1, cv2.LINE_AA, 0)
            cv2.line(img, pt2, pt3, delaunay_color, 1, cv2.LINE_AA, 0)
            cv2.line(img, pt3, pt1, delaunay_color, 1, cv2.LINE_AA, 0)


def getYPRLine(size,shape, image, isShinobi):
    # 2D image points. If you change the image, you need to change vector
    image_points = np.array([
                                shape[30],     # Nose tip
                                shape[8],      # Chin
                                shape[36],     # Left eye left corner
                                shape[45],     # Right eye right corne
                                shape[48],     # Left Mouth corner
                                shape[54]      # Right mouth corner
                            ], dtype="double")
     
    # 3D model points.
    model_points = np.array([
                                (0.0, 0.0, 0.0),             # Nose tip
                                (0.0, -330.0, -65.0),        # Chin
                                (-225.0, 170.0, -135.0),     # Left eye left corner
                                (225.0, 170.0, -135.0),      # Right eye right corne
                                (-150.0, -150.0, -125.0),    # Left Mouth corner
                                (150.0, -150.0, -125.0)      # Right mouth corner
                             
                            ])
     
     
    # Camera internals
     
    focal_length = size[1]
    center = (size[1]/2, size[0]/2)
    camera_matrix = np.array(
                             [[focal_length, 0, center[0]],
                             [0, focal_length, center[1]],
                             [0, 0, 1]], dtype = "double"
                             )
     
    # print ("Camera Matrix :\n {0}".format(camera_matrix))
     
    dist_coeffs = np.zeros((4,1)) # Assuming no lens distortion
    (success, rotation_vector, translation_vector) = cv2.solvePnP(model_points, image_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE)
     
    print ("Rotation Vector:\n {0}".format(rotation_vector))
    # print ("Translation Vector:\n {0}".format(translation_vector))
     
     
    # Project a 3D point (0, 0, 1000.0) onto the image plane.
    # We use this to draw a line sticking out of the nose
     
    R = eulerAnglesToRotationMatrix([success, rotation_vector, translation_vector]) 
     
    # Display image
    return rotation_vector

def eulerAnglesToRotationMatrix(theta) :
     
    R_x = np.array([[1,         0,                  0                   ],
                    [0,         np.cos(theta[0]), -np.sin(theta[0]) ],
                    [0,         np.sin(theta[0]), np.cos(theta[0])  ]
                    ])
         
         
                     
    R_y = np.array([[np.cos(theta[1]),    0,      np.sin(theta[1])  ],
                    [0,                     1,      0                   ],
                    [-np.sin(theta[1]),   0,      np.cos(theta[1])  ]
                    ])
                 
    R_z = np.array([[np.cos(theta[2]),    -np.sin(theta[2]),    0],
                    [np.sin(theta[2]),    np.cos(theta[2]),     0],
                    [0,                     0,                      1]
                    ])
                     
                     
    R = np.dot(R_z, np.dot( R_y, R_x ))
    print (R)
    return R
def makeShinobi(image, shape):
    w = image.shape[0]
    h = image.shape[1]
    print("top of head: "+str(shape[27]))
    # shape30 --> nose tip
    # shape27 --> top of nose
    # pythagoran thm to get distance
    noseLength = math.sqrt(math.pow(shape[8][1] - shape[27][1], 2)+math.pow(shape[8][1] - shape[27][1], 2))/4.2
    
    # will be used to set the height of the headband
    headbandShape = headband.shape
    headbandWidth = headbandShape[1]*(noseLength/headbandShape[0])
    x1 = int(shape[27][0]- (headbandWidth/2))
    x2 = int(shape[27][0] + (headbandWidth/2))
    y1 = int(shape[27][1]- (noseLength)- (noseLength/4))
    y2 = int(shape[27][1]- (noseLength/4))
    if x1 < 0:
        x1 = 0
    if y1 < 0:
        y1 = 0
    if x2 > w:
        x2 = w
    if y2 > h:
        y2 = h
    print(" x1: " +str(x1) +" x2: " +str(x2) + " y1: " +str(y1) +" y2: " +str(y2))
    headbandWidth = (x2-x1)
    headbandHeight = (y2-y1)
    
    resizedHeadband  = cv2.resize(headband, (headbandWidth, headbandHeight), interpolation = cv2.INTER_AREA)
    
    alpha_s = resizedHeadband[:, :, 3] / 255.0
    alpha_l = 1.0 - alpha_s

    for c in range(0, 3):
        image[y1:y2, x1:x2, c] = (alpha_s * resizedHeadband[:, :, c] +
                                  alpha_l * image[y1:y2, x1:x2, c])

    #image[y1:y2, x1:x2]= resizedHeadband


# will detect landmarks of image draw the delauny triangles and save the image to the 
def detectLandmarks(imgPath, imgDest, isShinobi):
    # For better detection we need to get the image resizes and converted to grayscale
    image = cv2.imread(imgPath, -1)
    # image = small = cv2.resize(image, (0,0), fx=0.5, fy=0.5)
    size = image.shape
    
    rect = (0, 0, size[1], size[0])
    subdiv  = cv2.Subdiv2D(rect)
    gray = cv2.imread(imgPath, 0)
    # We run the detection on the grayscale version of the image
    # Notice the variable "rects" is plural this is because there may
    # be mutliple faces detected within the image
    rects = detector(gray, 1)
    # Add each frames data to this list so we can write to db in the end
    # Loop over all detected faces in the image
    for i, rect in enumerate(rects):
        # get the detections and convert them into a numpy array
        shape = predictor(gray, rect)
        # A list of 68 2-tuples representing facial landmark coordinates
        shape = shape_to_coord_list(shape, gray)
        rotation_vector= getYPRLine(size, shape, image, isShinobi)
        if isShinobi:
            makeShinobi(image, shape)
        # A list of two elements which are 2-tuples representing pupil coordinates.
        pupils = get_pupils(shape, gray)
        # draw facial landmarks on the image
        if not isShinobi:
            for x, y in shape:
                # print("(" + str(x) + ", " + str(y) +")")
                cv2.circle(image, (x, y), 2, (255, 255, 255), -1)
                subdiv.insert((x,y))
            draw_delaunay( image, subdiv, (255, 255, 255))
    # show the output image with detections and landmarks
    # image = small = cv2.resize(image, (0,0), fx=0.5, fy=0.5)
    cv2.imwrite(imgDest, image)
    # cv2.imshow("Output", image)
    # cv2.waitKey(0)
    return {"shape":shape, "pupils":pupils, "rotation": rotation_vector}

