# -----------------------------------------------------------------------------
# Name:     pipeline.py
# Purpose:  The entry point to the i-viato pipeline
#
# Author:   Nicholas J. Hernandez - Hirad Pourtahmasbi
# -----------------------------------------------------------------------------
import os
import json 
from sys import argv
from landmarks import detectLandmarks
from subprocess import call
from metadata import extract_metadata
from db import write_metadata
from db import write_landmarks
from db import write_pupils
from db import write_skull
movieToFrames = os.path.abspath('../iviato-pipeline/ffmpeg/FFMPEGMovieToFrames')
framesToMovie = os.path.abspath('../iviato-pipeline/ffmpeg/FFMPEGFramesToMovie')


def execute_pipeline(userID, srcDir, srcName, isShinobi):
    """
    does the whole pipeline, takes in src directory and name, will put resulting video in same place with "out-' appended to the front of the filename
    """
    print(f'{userId} - {srcDir} - {srcName}')
    videoSrc = srcDir + '/' + srcName 
    metaDataDict = extract_metadata(videoSrc)

    video_id = write_metadata(
        userId, 
        srcName,
        metaDataDict["width"], 
        metaDataDict["height"], 
        metaDataDict["fps"], 
        metaDataDict["numframes"]
    )
    
    # Splitting up 
    print("***************** Splitting up... *****************")
    call([
        movieToFrames, 
        videoSrc, 
        str(metaDataDict["fps"]), 
        srcDir + """/frames%d.png"""
    ])
    
    # Processing
    shapePoints = []
    pupilPoints = []

    skullPoints = []
    print("Starting landmark detection...")
    print("***************** Starting landmark detection... *****************")
    for i in range(1, metaDataDict["numframes"] + 1):
        imgPath = srcDir + "/frames" + str(i) + ".png"
        imgDest = srcDir + "/landmark" + str(i) + ".png"
        tempDict = detectLandmarks(imgPath, imgDest, isShinobi)
        shapePoints.append(tempDict["shape"])
        pupilPoints.append(tempDict["pupils"])
        skullPoints.append(tempDict["rotation"])
    # Merging
    print("***************** Starting stiching up... *****************")
    call([
        framesToMovie, 
        str(metaDataDict["fps"]), 
        str(metaDataDict["width"]) + "x" + str(metaDataDict["height"]), 
        str(metaDataDict["numframes"]),
        srcDir + """/landmark%d.png""", 
        srcDir +  "/" + str(userId) + '_' + srcName
    ])
    
    write_pupils(video_id, pupilPoints)
    write_landmarks(video_id, shapePoints)
    write_skull(video_id, skullPoints)


    with open(srcDir + "/" + str(userId) + '_' + srcName + '.json', 'w') as cache: 
        metaDataDict["video_id"] = video_id
        json.dump(metaDataDict, cache)

execute_pipeline(argv[1], argv[2], argv[3], bool(argv[4]))