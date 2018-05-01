const axios = require('axios');
const request = require('request');

const api = require('./config/Default').api;
const isAuthorized = require('./User').isAuthorized;

export function upload(file) {
  if (!file) { return false; }

  const authorization = isAuthorized();
  const form = new FormData();
  form.append('file', file);
  const token = `Bearer ${authorization.token}`

  axios.post(api.base + api.upload + `/${authorization.id}`, form, {
    headers: {
      'authorization': token,
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then((res) => {
      console.log('Video uploaded');
      return true;
    })
    .catch((err) => {
      console.log(err)
      return false;
    });
}