const axios = require('axios');
const request = require('request');

const api = require('./config/Default').api;
const isAuthorized = require('./User').isAuthorized;

export function upload(file) {
  if (!file) { return false; }

  // const form = new FormData();
  // form.append('file', file);
  // const authorization = `Bearer ${isAuthorized()}`;

  // axios({
  //   method: 'POST',
  //   url: api.base + api.upload,
  //   data: form,
  //   config: { headers: { 'Authorization': authorization } }
  // }).then((res) => {
  //     console.log('Video uploaded');
  //     return true;
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     return false;
  //   });

  // const token = isAuthorized();
  // const options = {
  //   method: 'POST',
  //   url: api.base + api.upload,
  //   headers: { authorization: `Bearer ${token}` },
  //   FormData: {
  //     file: file
  //   }
  // };

  // request(options, (error, response, body) => {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  //   console.log(response);
  //   console.log('----------');
  //   console.log(body);
  // });

  // const instance = axios.create({

  // })

  const form = new FormData();
  form.append('file', file);
  const token = `Bearer ${isAuthorized()}`
  console.log(token);

  axios.post(api.base + api.upload, form, {
    headers: {
      'authorization': token
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