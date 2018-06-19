import cv2
import datetime
import dlib
import json
import os
from sys import argv

from landmarks import detectLandmarks, draw_delaunay, get_pupils, getYPRLine, makeShinobi, predictor, shape_to_coord_list
from db import write_metadata
from db import write_landmarks
from db import write_pupils
from db import write_skull

detector = dlib.get_frontal_face_detector()
encoding = cv2.VideoWriter_fourcc(*'MP4V')

def execute_pipeline(user_id, src_dir, src_name, is_shinobi):
  start_time = datetime.datetime.now()
  video_name = src_name.split('.')[0]
  video_src = src_dir + '/' + src_name
  video_tgt = '../iviato-storage/' + str(user_id) + '_' + video_name + '.mp4'
  image_tgt = '../iviato-storage/' + str(user_id) + '_' + video_name + '.png'
  data_tgt = '../iviato-storage/' + str(user_id) + '_' + video_name + '.json'
  
  # For writing to DB
  shapePoints = []
  pupilPoints = []
  skullPoints = []
  
  # Extract Metadata
  cap = cv2.VideoCapture(video_src)
  width = int(cap.get(3))  
  height = int(cap.get(4)) 
  fps = round(cap.get(5)) 
  frame_number = round(cap.get(7))
  duration = frame_number / fps
  video_id = write_metadata(
    user_id,
    src_name,
    width,
    height,
    fps,
    frame_number
  )
  data_dict = {
    "video_id": video_id,
    "path": video_name, 
    "width": width, 
    "height": height, 
    "fps": fps, 
    "numframes": frame_number,
  }

  # Create VideoWriter object
  out = cv2.VideoWriter(video_tgt, encoding, fps, (width, height))

  # Read and Process video
  count = 0
  while(cap.isOpened()):
    success, image = cap.read()
    if success:
        size = image.shape
        rect = (0, 0, size[1], size[0])
        subdiv = cv2.Subdiv2D(rect)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        rects = detector(gray, 1)

        for i, rect in enumerate(rects):
          shape = predictor(gray, rect)
          shape = shape_to_coord_list(shape, gray)
          rotation_vector = getYPRLine(size, shape, image, is_shinobi)
          pupils = get_pupils(shape, gray)
          if is_shinobi:
            makeShinobi(image, shape)
          else:
            for x, y in shape:
              cv2.circle(image, (x, y), 2, (255, 255, 255), -1)
              subdiv.insert((x, y))
            draw_delaunay(image, subdiv, (255, 255, 255))

        # write frame and image
        if count == 0:
          cv2.imwrite(image_tgt, image)
        out.write(image)

        # add the data to write to db later
        shapePoints.append(shape)
        pupilPoints.append(pupils)
        skullPoints.append(rotation_vector)

        if cv2.waitKey(1) & 0xFF == ord('q'):
          break
    else:
      break
    count += 1

  # Release everything if job is finished
  cap.release()
  out.release()
  cv2.destroyAllWindows()

  write_pupils(video_id, pupilPoints)
  write_landmarks(video_id, shapePoints)
  write_skull(video_id, skullPoints)
  with open(data_tgt, 'w') as cache: 
    json.dump(data_dict, cache)

  end_time = datetime.datetime.now()
  print('Pipeline total time for a ' + str(duration) + ' second video: ' + str(end_time - start_time))


execute_pipeline(argv[1], argv[2], argv[3], (argv[4] == "true"))
