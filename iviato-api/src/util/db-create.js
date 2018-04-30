const config = require('config');
const pg = require('pg');
const dbConfig = config.get('database');


const client = new pg.Client({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.db,
  password: dbConfig.password,
  port: dbConfig.password,
});

// Video Metadata
// var queryString = `CREATE TABLE videos.meta (id SERIAL PRIMARY KEY, frames INT, width INT, height INT, fps REAL)`;

// Skull
// var queryString = `CREATE TABLE frames.skull (videoId SERIAL, frameId INT, yaw INT, pitch INT, roll REAL)`;

// Pupil
var queryString = `CREATE TABLE frames.pupil (videoid SERIAL, frameid INT, left POINT, right POINT, ftleft POINT,ftright POINT)`;

// Landmarks DB
// var createBegin = `CREATE TABLE frames.landmarks (videoId SERIAL, frameId INT`;
// var pointsString = ''
// for (var i = 1; i < 69; i++) {
//   pointsString += `, point${i} POINT`;
// }
// var queryString = `${createBegin}${pointsString})`;

client.connect();
client.query(queryString, (err, res) => {
  if (err) {
    console.log(err.stack);
    client.end();
  } else {
    console.log('success');
    client.end();
  }
});



