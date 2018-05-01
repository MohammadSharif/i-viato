const config = require('config');
const pg = require('pg');

const crypto = require('./crypto');
const encrypt = crypto.encrypt;
const decrypt = crypto.decrypt;
const dbConfig = config.get('database');

module.exports.signup = async (first, last, email, password) => {
  if (!email || !password) { return false; }

  const client = new pg.Client({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.db,
    password: dbConfig.password,
    port: dbConfig.port,
  });

  client.connect();
  console.log('connected to postgres');
  let query = 'INSERT INTO develop.userdata(first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
  let values = [first, last, email, password];

  try {
    const user = await client.query(query, values);
    console.log('Created user');
    const id = user.rows[0].id;
    
    query = `CREATE TABLE videos.videos${id} (filename TEXT, url TEXT)`;
    try {
      const table = await client.query(query);
      console.log('Created user table');
    } catch (err) {
      console.log('Unable to create table');
      console.log(err);
    }
    client.end();
    return id;
  } catch (err) {
    console.log('Unable to create user');
    console.log(err);
    client.end();
    return;
  }
  client.end();
}

module.exports.login = async (email, password) => {
  if (!email || !password) { return false; }

  const client = new pg.Client({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.db,
    password: dbConfig.password,
    port: dbConfig.port,
  });

  client.connect();
  console.log('connected to postgres');
  const query = `SELECT * FROM develop.userdata WHERE "email"='${email}' AND "password"='${password}'`;
  
  try {
    const user = await client.query(query);
    if (user) {
      console.log('Found user');
      client.end()      
      return user.rows[0].id; 
    }
  } catch(error) {
    console.log('Unable to create');
    console.log(error);
    client.end();
  }
  client.end();
};

module.exports.videoUpload = async (id, name, videoUrl) => {
  console.log()
  const client = new pg.Client({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.db,
    password: dbConfig.password,
    port: dbConfig.port,
  });

  client.connect();
  console.log('connected to postgres');
  const query = `INSERT INTO videos.videos${id}(filename, url) VALUES ($1, $2)`;
  const values = [name, videoUrl];
  console.log(query);
  try {
    const upload = await client.query(query, values);
    console.log(upload);
    console.log('Uploaded video location');
    client.end();
  } catch (error) {
    console.log('Unable to upload video location');
    console.log(error);
    client.end();
  }
};