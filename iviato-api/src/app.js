const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const exec = require('child_process').exec;
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;

const db = require('./service/db');

const app = express();
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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    // console.log(req.body);
    const result = db.signup(email, password, firstName, lastName); 
    if (result) {
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
});

app.post('/login', bodyParser.json(), (req, res) => {
    const email = req.body.email;
    const password = req.body.password; 
    
    const result = db.login(email, password);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.post('/videos/upload', upload.single('file'), (req, res) => {
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
        // console.log(stdout);
        const scratchDir = path.resolve('../iviato-storage/scratchpad');
        // rimraf(scratchDir);
    });
});

app.get('/videos/:id', (req, res) => {
    const filePath = path.resolve(`../iviato-storage/videos/${req.params.id}.mov`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.sendStatus(400);
    }
})

const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
   
    console.log("API listening at http://%s:%s", host, port);
})