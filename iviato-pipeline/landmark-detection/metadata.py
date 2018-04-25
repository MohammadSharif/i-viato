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
    else:
        return None
    cap.release()
    cv2.destroyAllWindows()
    #write_to_db(path, width, height, fps, frame_number)
    return {"path": path, "width": width, "height": height, "fps": fps, "numframes": frame_number}

def write_to_db(name, width, height, fps, frame_number):
    id = None
    conn = None
    insert = """
    INSERT INTO videos."meta"(frames, width, height, fps, name) VALUES ({0}, {1}, {2}, {3}, '{4}') RETURNING id
    """.format(frame_number, width, height, fps, name)
    print(insert)
    try:
        conn = psycopg2.connect(host="iviato.cq5kyayqghor.us-east-2.rds.amazonaws.com",
                                port=5428,
                                dbname="iviato",
                                user="iviato",
                                password="jini1234")
        cursor = conn.cursor()
        cursor.execute(insert)
        cursor.commit()
        id = cursor.fetchone()[0]
        print(id)
    except e:
        print(e)
    finally:
        conn.close() 
    
    if id is not None:
        return id
