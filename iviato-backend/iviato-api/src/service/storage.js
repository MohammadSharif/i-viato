const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const videoUpload = require('./db').videoUpload;
const S3_CONFIG = config.get('s3');

module.exports.store = async (userId, filePath) => {
  const pathObject = path.parse(filePath);
  const s3 = new AWS.S3();

  fs.readFile(pathObject.dir + '/' + 'landmark1.png', (err, data) => {
    if (err) {
      console.log(err);
    }
    let key =  `${pathObject.name}.png`
    let params = { Bucket: S3_CONFIG.bucket, Key: key, Body: data };
    s3.putObject(params, async (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log('Uploaded thumbnail of video');
    });
  });

  fs.readFile(pathObject.dir + '/' + pathObject.name + '.mov', (err, data) => {
    if (err) {
      console.log(err);
    }
    let key =  pathObject.name + '.mov';
    let params = { Bucket: S3_CONFIG.bucket, Key: key, Body: data };
    s3.putObject(params, async (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log('Uploaded processed video');
    });
  });

  const videoUrl = `https://s3.${S3_CONFIG.region}.amazonaws.com/${S3_CONFIG.bucket}/${pathObject.name}.mov`;
  const imageUrl = `https://s3.${S3_CONFIG.region}.amazonaws.com/${S3_CONFIG.bucket}/${pathObject.name}.png`;
  const metadata = require(pathObject.dir + '/' + pathObject.base + '.json');
  await videoUpload(userId, pathObject.name.split('_')[1], videoUrl, imageUrl, metadata);
};