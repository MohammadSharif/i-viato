import psycopg2
import numpy as np
import cv2

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

    cap.release()
    cv2.destroyAllWindows()

    write_to_db(path, width, height, fps, frame_number)

def write_to_db(name, width, height, fps, frame_number):
    """If not created, create a database with the name specified in
    the constructor"""
    conn = None
    insert = ""
    print(insert)
    try:
        conn = psycopg2.connect(host="iviato.cq5kyayqghor.us-east-2.rds.amazonaws.com",
                                port=5428,
                                dbname="iviato",
                                user="iviato",
                                password="jini1234")
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO videos."meta" VALUES (%s, %s, $s, $s, $s) RETURNING id
        """, (frame_number, width, height, fps, name))
        id = cursor.fetchone()[0]
        print(id)
    except e:
        print(e)
    finally:
        conn.close() 

extract_metadata("nick.mov")