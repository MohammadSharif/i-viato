<div style="text-align:center"><img src="/iviato-ui/src/img/iviato.png" width="500"/></div>

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

        <img src="/etc/database/Metadata.png" width="500"/>

        * Landmarks - Used to store the landmark location of each frame with its assoicated video id and frame number.

        <img src="/etc/database/Landmarks.png" width="500"/>

        * Pupils - Used to store the pupil location of each frame with its assoicated video id and frame number.

        <img src="/etc/database/Pupils.png" width="500"/>

        * Skull - Used to store the yaw/pitch/roll of each frame with its assoicated video id and frame number.

        <img src="/etc/database/Skull.png" width="500"/>

        * Userdata - Used to store user information including name, encrypted email and password, and most recent IP address and login time.

        <img src="/etc/database/UserData.png" width="500"/>

    2. 'videos': Each user will have its own table in this schema following the pattern `videos{id}`. This table keeps track of each uploaded video and its location.

        <img src="/etc/database/VideoId.png" width="500"/>


* Assignment 2: Web Based User Login/Registration
For UI design we decided to go with React because of it's large community and plethora of component libraries. Our user login and registration page is a simple form that can toggle between login and sign up. We used the Raised Button and TextField components from the Material-UI library to give the sign in a simple look. Code can be found (here)[/i-viato/tree/develop/iviato-api]

* Assignment 3: Extract Still Images from Video
    * Video Upload (UI) - The UI for uploading a video to our database is designed as a modal form which also displays the accepted file formats. On the click of our “Choose File” button the file selection window is opened. The user is able to change the file, cancel, or submit what they’ve selected. The UI also does not allow the user to select an incorrect file type so there is no need to update the user their file type was incorrect, by utilizing the “accepted” field of an input element we can narrow down the capability of file selection to only our accepted format.
  * Video Upload (Back End) -
  * Video Metadata - Video metadata was found using the python CV2 library and implementation for it can be found (here)[/iviato-pipeline/landmark-detection/metadata.py].
  * Extracting Still Images - We used FFMPEG to break apart the video to images the Code is written in C. The code takes in a link to a file on the file system and will expand the frames and  also has the functionality to put the frames back together after the pipeline is run. can be found [here](/iviato-pipeline/ffmpeg).

* Assignment 4: Determine Facial Landmarks
    * dlib - We made use of the dlib python library for detecting facial landmarks. By using dlib along with a file for Haar Cascades we’re able to find all 68 points of facial landmarks. Can be found [here](https://github.com/MohammadSharif/i-viato/tree/develop/iviato-pipeline/landmark-detection)
    * opencv - After we determine the 68 points, we use opencv to draw Delaunay triangles on the subjects face. We’ve also used opencv to draw a leaf village headband on our subject if the video is uploaded via the “shinobify” upload. Can be found [here](/iviato-pipeline/landmark-detection)

* Assignment 5: Pupil Tracking
    * pyLike - For pupil tracking we decided to use and modify a python implementation of Fabian Timm’s algorithm which was viewed as acceptable by Tristan Hume himself. [pyLike](https://github.com/trishume/eyeLike/issues/12)
    * Eye Cropping - Since we already have access to the 68 landmark points, we crop out the eyes of the subject by using the eye corners’ x coordinates and the eye lids maximum y-coordinate and minimum y coordinate. Can be found [here](/iviato-pipeline/landmark-detection/pupils.py)

* Assignment 6: Web based desplay results
1. Code for this can be found [here](/iviato-pipeline/landmark-detection/landmarks.py)
2. Querys the database [here](/iviato-pipeline/landmark-detection/db.py)
3. Code for the query can be found [here](/iviato-pipeline/landmark-detection/db.py)
And code for the drawing Delaunay triangles can be found [here](/iviato-pipeline/landmark-detection/db.py)
4. We used FFMPEG to break apart the video to images the Code is written in C. The code takes in a link to a files also and has the functionality to put the frames back together after the pipeline is run. can be found [here](/iviato-pipeline/ffmpeg).
    5. We embed the video into our application dashboard which is only accessible to users who have logged in. With the use of [Video-React](https://github.com/video-react/video-react/) we are easily able to serve up a nice video player with controls available to the user.
