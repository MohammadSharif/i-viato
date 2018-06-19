# I-Viato Backend

### Using Docker

From the `./iviato-backend`, build and tag the image by running:

  `$ docker build -t iviato-backend .`

After the build is complete, you can start up a container by running:

  `$ docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/iviato-api/node_modules -p 8081:8081 --rm iviato-backend`

Point your browser to http://localhost:8081/. 

---

#### I-Viato API

This API is dependent on files in the `../iviato-pipeline` directory. Please install the dependencies there as well. 
 
To install npm dependencies: 
 * Run: `npm install`. 
 
To run the API: 
 * Run `npm run start`. 
 
The API will be listening on localhost:8081.

#### I-Viato Pipeline

This directory contains the i-viato pipeline. To install the depenedencies required, please the below instructions. 

* Homebrew: Make sure you download and install homebrew on your mac by following the instructions stated [here](https://brew.sh/)

After installing Homebrew, we can move on to the rest of the dependencies.

* FFMPEG: Run the command `brew install ffmpeg`

* Python Libraries: Run the command `pip3 install requirements.txt`

The Pipeline is designed to be invoked by the i-viato API located at `../iviato-api` and is not set up to be used as a standalone app. 
