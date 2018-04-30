# -----------------------------------------------------------------------------
# Name:     pipeline.py
# Purpose:  The entry point to the i-viato pipeline
#
# Author:   Nicholas J. Hernandez - Hirad Pourtahmasbi
# -----------------------------------------------------------------------------
import os
from sys import argv
from landmarks import detectLandmarks
from subprocess import call
from metadata import extract_metadata

movieToFrames = os.path.abspath('../iviato-pipeline/ffmpeg/FFMPEGMovieToFrames')
framesToMovie = os.path.abspath('../iviato-pipeline/ffmpeg/FFMPEGFramesToMovie')

def execute_pipeline(srcDir, srcName):
    """
    does the whole pipeline, takes in src directory and name, will put resulting video in same place with "out-' appended to the front of the filename
    """
    videoSrc = srcDir + '/' + srcName 
    metaDataDict = extract_metadata(videoSrc)
    
    # Splitting up 
    print("Starting splitting up...")
    call([
        movieToFrames, 
        videoSrc, 
        str(metaDataDict["fps"]), 
        srcDir + """/frames%d.png"""
    ])

    # Processing
    print("Starting landmark detection...")
    for i in range(1, metaDataDict["numframes"] + 1):
        imgPath = srcDir + "/frames" + str(i) + ".png"
        imgDest = srcDir + "/landmark" + str(i) + ".png"
        detectLandmarks(imgPath, imgDest)

    # Merging
    print("Starting stiching up...")
    call([
        framesToMovie, 
        str(metaDataDict["fps"]), 
        str(metaDataDict["width"]) + "x" + str(metaDataDict["height"]), 
        str(metaDataDict["numframes"]),
        srcDir + """/landmark%d.png""", 
        srcDir + "/out-" + srcName
    ])

execute_pipeline(argv[1], argv[2])