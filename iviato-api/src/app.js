const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const multer = require('multer');
const path = require('path');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

const db = require('./service/db');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors())

const storage = multer.diskStorage({
    destination: '../iviato-storage/',
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
});
const upload = multer({ storage });


app.get('/', (req, res) => {
    res.send('Welecome to i-viato api!');
});

// sign-up and login
app.post('/signup', (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    console.log(req.body);
    var result = db.signup(email, password, firstName, lastName); 
    if (result) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

app.post('/login', bodyParser.json(), (req, res) => {
    var email = req.body.email;
    var password = req.body.password; 
    
    var result = db.login(email, password);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const invokePath =  path.resolve('../iviato-pipeline/landmark-detection/pipeline.py');
    const srcDir = path.resolve('../iviato-storage/')
    const srcName = file.originalname;

    exec(`python3 ${invokePath} ${srcDir} ${srcName}`, 
    (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        }
        if (stderr) {
            console.log(stderr)
        }
        console.log(stdout);
    });
});

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
   
    console.log("API listening at http://%s:%s", host, port);
})