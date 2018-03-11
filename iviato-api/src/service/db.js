const crypto = require('./crypto');
const encrypt = crypto.encrypt;
const decrypt = crypto.decrypt;
const pg = require('pg')

const client = new pg.Client({
  user: 'iviato',
  host: 'iviato.cq5kyayqghor.us-east-2.rds.amazonaws.com',
  database: 'iviato',
  password: 'jini1234',
  port: 5428,
})

function signup(email, password, firstName, lastName) {
  if (!email || !password) { return false; }
  firstName = firstName || '';
  lastName = lastName || '';

  client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
      return false
    } else {
      console.log('connected to postgres')
      var queryText = 'INSERT INTO users."user-data"("firstName", "lastName", "accountName", "passphrase") VALUES($1, $2, $3,$4)'
      client.query(queryText, [firstName, lastName, email, password], function(err, result) {
        if(err) {
          console.log('Unable to create')
          console.log(err);
          client.end();
          return false
        } else {
          console.log('User created')
          client.end();
          return true
        }
      });
    }
  });
}

function login(email, password) {
  if (!email || !password) { return false; }
  client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
      return false
    } else {
      console.log('connected to postgres')
      var queryText = `SELECT * FROM users."user-data" WHERE "accountName"='${email}' AND "passphrase"='${password}'`
      client.query(queryText, function(err, result) {
        if(err) {
          console.log('Unable to login')
          console.log(err);
          client.end();
          return false
        } else {
          console.log('Logged In');
          client.end();
          return true
        }
      });
    }
  })
}

module.exports = {
  signup,
  login
};