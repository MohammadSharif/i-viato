import os
import psycopg2
import re
from configparser import ConfigParser

def write_metadata(userId, fileName, width, height, fps, frame_number):
    id = None
    base = os.path.basename(fileName)
    name = os.path.splitext(base)[0]
    conn = connect()
    cursor = conn.cursor()
    insert = """
    INSERT INTO develop."metadata"(frames, width, height, fps, userid, filename) VALUES ({0}, {1}, {2}, {3}, {4}, '{5}') RETURNING id;
    """.format(frame_number, width, height, fps, userId, name)
    cursor.execute(insert)
    conn.commit()
    id = cursor.fetchone()[0]
    conn.close() 
    return id

# image must follow the formate videoId_frameNumber.png
# shapes is a list of tuples
def write_landmarks(video_id, shapeList):
    conn = connect()
    cursor = conn.cursor()  
    for i in range(0, len(shapeList)):
        insert = 'INSERT INTO develop."landmarks"(videoid, frameid, '
        for j in range(1, 68):
            insert+= " point"+str(j)+", "
        insert += 'point68 ) VALUES ({0}, {1}'.format(video_id, i)
        for x in shapeList[i]:
            shapeTuple = ", '({0}, {1})'".format(x[0], x[1])
            insert = insert + shapeTuple
        insert += ');'
        cursor.execute(insert)
    
    conn.commit()
    conn.close()

def write_skull(video_id, skullList):
    conn = connect()
    cursor = conn.cursor()  
    for i in range(0, len(skullList)):
        insert = 'INSERT INTO develop."skull"(videoid, frameid, yaw, pitch, roll ) VALUES ({0}, {1}, {2}, {3}, {4});'.format(video_id, i, skullList[i][0][0], skullList[i][1][0], skullList[i][2][0])
        print(insert)
        cursor.execute(insert)
    conn.commit()
    conn.close()   

# image must follow the formate videoId_frameNumber.png
# pupils[0] left eye (relative to user point of view of image)
# pupils[1] right eye (relative to user point of view of image)
def write_pupils(video_id, pupilList):
    conn = connect()
    cursor = conn.cursor()
    for i in range(0, len(pupilList)):
        insert = """INSERT INTO develop."pupils"("videoId", "frameId", "left", "right", ftleft, ftright) VALUES ({0}, {1}, point{2}, point{3}, point{4}, point{5});""".format(video_id, i, pupilList[i][0], pupilList[i][1], pupilList[i][0], pupilList[i][1])
        # print (insert)
        cursor.execute(insert)
    
    conn.commit()
    conn.close()

def get_video(user_id, video_id):
    conn = connect()
    cursor = conn.cursor()

    query = """SELECT * from videos."videos{0}" WHERE videoid={1}""".format(user_id, video_id)   
    try:
        cursor.execute(query)
    except: 
        print('Unable to find video')
    
    video = cursor.fetchone()
    conn.close()
    return video

def get_landmarks(video_id):
    conn = connect()
    cursor = conn.cursor()

    query = """SELECT * from videos."landmarks" WHERE video_id={1}""".format(video_id)   
    try:
        cursor.execute(query)
    except: 
        print('Unable to find video')
    
    landmarks = cursor.fetchall()
    conn.close()
    return landmarks

# return a connection object
def connect():
    configPath = os.path.abspath('../iviato-pipeline/landmark-detection/credentials.ini')
    parser = ConfigParser()
    parser.read(configPath)
    host = parser.get('default', 'host')
    port = parser.get('default', 'port')
    name = parser.get('default', 'database')
    username = parser.get('default', 'username')
    password = parser.get('default', 'password')

    try:
        conn = psycopg2.connect(host=host, port=port, dbname=name, user=username, password=password)
        return conn
    except:
        print("***************** Unable to connect to postgres *****************")
