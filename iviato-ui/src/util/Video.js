const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');
  
const api = require('./config/Default').api;
const isAuthorized = require('./User').isAuthorized;

export function upload(file) {
  if (!file) { return false; }

  const authorization = isAuthorized();
  const form = new FormData();
  form.append('file', file);
  const token = `Bearer ${authorization.token}`;

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

export function list() {
  const authorization = isAuthorized();
  const token = `Bearer ${authorization.token}`;

  axios.get(api.base + api.videos + `/${authorization.id}`, {
    headers: {
      'authorization': token,
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then((res) => {
      const videos = _.uniqBy(res.data, 'filename');
      storeVideos(videos);
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function mostRecentUpload() {
  const videos = getVideos();
  if (videos && videos.length > 0) {
    const video = videos[videos.length - 1];
    console.log(`Found video ${video.filename} at ${video.url}`);
    return video;
  } else {
    console.log('Unable to fetch most recent video');
  }
}

export function otherUploads() {
  const videos = getVideos();
  if (videos && videos.length > 0) {
    videos = videos.splice(-1, 1);
    console.log('Found videos');
    return _.reverse(videos);
  } else {
    console.log('Unable to fetch videos');
  }
}

export function storeVideos(videos) {
  localStorage.setItem('videos', JSON.stringify(videos));
}

export function getVideos() {
  return JSON.parse(localStorage.get('videos'));
}