# i-viato UI

### Using Docker

From the `./iviato-ui`, build and tag the image by running:

  `$ docker build -t iviato-ui .`

After the build is complete, you can start up a container by running:

  `$ docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3000:3000 --rm iviato-ui`

Point your browser to http://localhost:3000/. Hot-realoding works as well.

--- 
To install npm dependencies: 
 * Run: `npm install`. 
 
To run the UI: 
 * Run `npm run start`. 
 
For local development, the app will open up a browser window at localhost:3000.
