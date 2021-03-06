# -----------------------------------------------------------------------------
# Name:     metadata.py
# Purpose:  Given a path to a video file, extract the metadata of the video and 
#           return it.
#
# Author:   Hirad Pourtahmasbi  
# -----------------------------------------------------------------------------
import cv2
import numpy as np
import os
import psycopg2
import uuid

use_db = False

def extract_metadata(path):
    cap = cv2.VideoCapture(path)
    
    if(cap.isOpened()):
        ret, frame = cap.read()

        width = int(cap.get(3))  
        height = int(cap.get(4)) 
        resolution = "{0}x{1}".format(width, height)
        fps = round(cap.get(5)) 
        frame_number = round(cap.get(7)) 

        duration = frame_number / fps

    else:
        return None
    cap.release()
    cv2.destroyAllWindows()
    #write_to_db(path, width, height, fps, frame_number)
    return {"path": path, "width": width, "height": height, "fps": 15, "numframes": round(duration * 15)}


