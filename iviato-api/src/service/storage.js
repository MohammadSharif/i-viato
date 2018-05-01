const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');
const path = require('path');

const S3_CONFIG = config.get('s3');

module.exports.store = (userId, filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let s3 = new AWS.S3();
    let params = { Bucket: S3_CONFIG.bucket, Key: `${userId}-${path.basename(filePath)}`, Body: data };
    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
        console.log('Uploaded processed video');
    });
  });
};