import re
import psycopg2

# image must follow the formate videoId_frameNumber.png
# shapes is a list of tuples
def write_landmarks(image, shapes):
    splitted = re.split(r'[_|.png]', image)
    video_id = splitted[0]
    frame_number = splitted[1]
    
    insert = 'INSERT INTO frames."landmarks" VALUES ({0}, {1}'.format(video_id, frame_number)

    for x, y in shapes:
        tuple = ", ({0}, {1})".format(x, y)
        insert = insert + tuple

    insert += ')'
    #print(insert)   

    conn = connect()
    cursor = conn.cursor()
    cursor.execute(insert)
    cursor.commit()
    conn.close()     

# image must follow the formate videoId_frameNumber.png
# pupils[0] left eye (relative to user point of view of image)
# pupils[1] right eye (relative to user point of view of image)
def write_pupils(image, pupils):
    splitted = re.split(r'[_|.png]', image)
    video_id = splitted[0]
    frame_number = splitted[1]

    insert = 'INSERT INTO frames."pupils" VALUES ({0}, {1}, {2}, {3})'.format(video_id, frame_number, pupils[1], pupils[0])

    conn = connect()
    cursor = conn.cursor()
    cursor.execute(insert)
    cursor.commit()
    conn.close()     

# return a connection object
def connect():
    try:
        conn = psycopg2.connect(host="iviato.cq5kyayqghor.us-east-2.rds.amazonaws.com",
                                port=5428,
                                dbname="iviato",
                                user="iviato",
                                password="jini1234")
    except:
        print("Unable to connect to postgres")
