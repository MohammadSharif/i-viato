![I-VIATO Logo](/iviato-ui/src/img/iviato.png)
This README will contain the necessary links to navigate through our
repository according to each major component to the application and pipeline.

* [Application Front End](https://github.com/MohammadSharif/i-viato/tree/develop/iviato-ui)
The application front end is implemented using HTML, CSS, and [ReactJS](https://github.com/facebook/react).
React makes it easy to reuse stateful components and allows for efficient rendering. We also made use of the
[Material UI](https://github.com/mui-org/material-ui) component library to help stylize our UI.  

* [Application Back End](https://github.com/MohammadSharif/i-viato/tree/develop/iviato-api)
The back end for the application is written using NodeJS.

* [Application Pipeline Code](https://github.com/MohammadSharif/i-viato/tree/develop/iviato-pipeline)
The pipeline of the application is written using C and Python. We've also made use of Tristan Hume's
[eyeLike](https://github.com/trishume/eyeLike) for pupil tracking, [dlib](https://github.com/davisking/dlib),
[OpenCV](https://github.com/opencv/opencv), and [ffmpeg](https://github.com/FFmpeg/FFmpeg)

--- 
### Assignments 

* **Assignment 1:** Database Schema
  To satisfy this requirement, we set up 2 different schemas. 
    1. 'develop': This is a temporary schema used for our development. During deployment, we will migrate to 'production'. Inside this schema, we have 5 tables.
        * Metadata - Used to store video metadata including assoicated user and video id.
        
        ![Metadata](/etc/database/Metadata.png)

        * Landmarks - Used to store the landmark location of each frame with its assoicated video id and frame number.
        
        ![Landmarks](/etc/database/Landmarks.png)
         
        * Pupils - Used to store the pupil location of each frame with its assoicated video id and frame number.
        
        ![Pupils](/etc/database/Pupils.png)
        
        * Skull - Used to store the yaw/pitch/roll of each frame with its assoicated video id and frame number.
        
        ![Skull](/etc/database/Skull.png)
        
        * Userdata - Used to store user information including name, encrypted email and password, and most recent IP address and login time.
        
        ![User Data](/etc/database/UserData.png)
        
    2. 'videos': Each user will have its own table in this schema following the pattern `videos{id}`. This table keeps track of each uploaded video and its location. 
        
        ![Video Id](/etc/database/VideoId.png)
  
