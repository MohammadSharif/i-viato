from landmarks import detectLandmarks
from subprocess import call
from metadata import extract_metadata
ffmpegPath = "../ffmpeg/"
#does the whole pipeline, takes in src directory and name, will put resulting video in same place with "out-' appended to the front of the filename
def executePipeline(srcDir, srcName ):
    videoSrc = srcDir+srcName 
    metaDataDict = extract_metadata(videoSrc)
    print(metaDataDict)
    
    call([ffmpegPath+"FFMPEGMovieToFrames", videoSrc, str(metaDataDict["fps"]), srcDir+"""frames%d.png"""])
    for i in range(1, metaDataDict["numframes"]+1):
        detectLandmarks(srcDir+"frames"+str(i)+".png", srcDir+"landmark"+str(i)+".png")
    call([ffmpegPath+"FFMPEGFramesToMovie", str(metaDataDict["fps"]), str(metaDataDict["width"])+"x"+str(metaDataDict["height"]), str(metaDataDict["numframes"]) ,srcDir+"""landmark%d.png""", srcDir+"out-"+srcName])
