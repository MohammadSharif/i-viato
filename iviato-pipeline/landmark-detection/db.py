import re
import psycopg2

def write_metaData(userId, name, width, height, fps, frame_number):
    id = None
    conn = connect()
    cursor = conn.cursor()
    insert = """
    INSERT INTO develop."metadata"(userId, name, frames, width, height, fps) VALUES ({0}, {1}, {2}, {3}, {4}, {5}) RETURNING id;
    """.format(userId, name, frame_number, width, height, fps)
    # print(insert)
    cursor.execute(insert)
    conn.commit()
    id = cursor.fetchone()[0]
    # print(id)
    conn.close() 
    # print(id)
    return id

# image must follow the formate videoId_frameNumber.png
# shapes is a list of tuples
def write_landmarks(video_id, shapeList):
    # print(insert) 
    # print (shapeList)
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
        # print (insert)
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
        #print (insert)
        cursor.execute(insert)
    
    conn.commit()
    conn.close()     

# return a connection object
def connect():
    try:
        conn = psycopg2.connect(host="iviato.c3ijaiuifmlm.us-east-2.rds.amazonaws.com",
                                port=5432,
                                dbname="iviato_db",
                                user="iviato",
                                password="jini1234")
        return conn
    except:
        print("***************** Unable to connect to postgres *****************")

