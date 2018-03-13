const pg = require('pg')

const client = new pg.Client({
  user: 'iviato',
  host: 'iviato.cq5kyayqghor.us-east-2.rds.amazonaws.com',
  database: 'iviato',
  password: 'jini1234',
  port: 5428,
})

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



