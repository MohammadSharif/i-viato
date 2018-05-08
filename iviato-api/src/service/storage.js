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

  fs.readFile(pathObject.dir + '/landmark1.png', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let key =  `${pathObject.name}.png`
    let params = { Bucket: S3_CONFIG.bucket, Key: key, Body: data };
    s3.putObject(params, async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Uploaded thumbnail of video');
    });
  });

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let key =  pathObject.base;
    let params = { Bucket: S3_CONFIG.bucket, Key: key, Body: data };
    s3.putObject(params, async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Uploaded processed video');
  
      const videoUrl = `https://s3.${S3_CONFIG.region}.amazonaws.com/${S3_CONFIG.bucket}/${key}`;
      const metadata = require(filePath + '.json');
      console.log(metadata)
      await videoUpload(userId, pathObject.base.split('_')[1], videoUrl, metadata);
    });
  });
};