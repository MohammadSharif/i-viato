const db = require('./service/db');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors())



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
        res.send(201);
    } else {
        res.send(400);
    }
});

app.post('/login', bodyParser.json(), (req, res) => {
    var email = req.body.email;
    var password = req.body.password; 
    
    var result = db.login(email, password);
    if (result) {
        res.send(200);
    } else {
        res.send(400);
    }
});

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
   
    console.log("API listening at http://%s:%s", host, port);
})