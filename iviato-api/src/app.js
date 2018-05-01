const axios = require('axios');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const exec = require('child_process').exec;
const express = require('express');
const fs = require('fs');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const multer = require('multer');
const path = require('path');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;

const auth = config.get('auth0');
const authorize = require('./service/auth').authorize;
const db = require('./service/db');
const store = require('./service/storage').store;

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

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth.domain}.well-known/jwks.json`
  }),
  // This is the identifier we set when we created the API
  audience: auth.audience,
  issuer: `https://${auth.domain}`,
  algorithms: ['RS256']
});

app.get('/', (req, res) => {
  res.send('Welecome to i-viato api!');
});

// sign-up and login
app.post('/signup', async (req, res) => {
  const first = req.body.first;
  const last = req.body.last;
  const email = req.body.email;
  const password = req.body.password;
  
  const id = await db.signup(first, last, email, password);
  if (id) {
    let auth = await authorize();
    let body = {
      token: auth,
      id: id,
    };
    res.statusCode = 201;
    res.send(body);
  } else {
    res.sendStatus(400);
  }
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const result = await db.login(email, password);
  if (result) {
    let auth = await authorize();
    res.statusCode = 200;
    res.send(auth);
  } else {
    res.sendStatus(400);
  }
});

app.post('/videos/upload/:id', [authCheck, upload.single('file')], (req, res) => {
  const id = req.params.id;

  const file = req.file;
  const invokePath = path.resolve('../iviato-pipeline/landmark-detection/pipeline.py');
  const srcDir = path.resolve('../iviato-storage/')
  const srcName = file.originalname;

  exec(`python3 ${invokePath} ${id} ${srcDir} ${srcName}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error)
      }
      if (stderr) {
        console.log(stderr)
      }
      console.log(stdout);
      store(id, `${path.resolve('../iviato-storage/')}/out-${srcName}`);
    });
});

const server = app.listen(8081, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("API listening at http://%s:%s", host, port);
});