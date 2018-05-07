const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const videoUpload = require('./db').videoUpload;
const S3_CONFIG = config.get('s3');

module.exports.store = async (userId, filePath) => {
  const pathObject = path.parse(filePath);
  const fileName = pathObject.name;
  console.log('FileName ' + fileName);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let s3 = new AWS.S3();
    let key =  `${userId}-${fileName}`
    let params = { Bucket: S3_CONFIG.bucket, Key: key, Body: data };
    s3.putObject(params, async (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
        console.log('Uploaded processed video');
        // console.log(data);

        const videoUrl = `https://s3.${S3_CONFIG.region}.amazonaws.com/${S3_CONFIG.bucket}/${key}`;
        await videoUpload(userId, fileName, videoUrl);
        const scratchDir = path.resolve('../iviato-storage/');
        // rimraf(scratchDir, () => {
        //   console.log('Deleting temporary file.')
        //   fs.mkdirSync(scratchDir);
        // });
    });
  });
};