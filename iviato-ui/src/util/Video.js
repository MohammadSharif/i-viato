const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');
  
const api = require('./config/Default').api;
const isAuthorized = require('./User').isAuthorized;

export async function upload(file) {
  if (!file) { return false; }

  const authorization = isAuthorized();
  const form = new FormData();
  form.append('file', file);
  const token = `Bearer ${authorization.token}`;

  const result = await axios.post(api.base + api.upload + `/${authorization.id}`, form, {
    headers: {
      'authorization': token,
      'Access-Control-Allow-Origin': '*'
    }
  });

  console.log('result' + result);
}

export async function list() {
  const authorization = isAuthorized();
  const token = `Bearer ${authorization.token}`;

  const res = await axios.get(api.base + api.videos + `/${authorization.id}`, {
    headers: {
      'authorization': token,
      'Access-Control-Allow-Origin': '*'
    }
  })

  if (res.data) {
    const videos = _.uniqBy(res.data, 'filename');
    storeVideos(videos);
    return true;
  } else {
    console.log('Unable to list videos');
    console.log(res);
    return false;
  }
}

export function mostRecentUpload() {
  const videos = getVideos();
  if (videos && videos.length > 0) {
    const video = videos[0]
    console.log(`Found video ${video.filename} at ${video.url}`);
    return video;
  } else {
    console.log('Unable to fetch most recent video');
  }
}

export function otherUploads() {
  let videos = getVideos();
  if (videos && videos.length > 0) {
    console.log('Found videos');
    videos = videos.slice(1);
    console.log(videos);
    return videos;
  } else {
    console.log('Unable to fetch videos');
    return [];
  }
}

export function everyOtherUploadExcept(current) {
  let videos = getVideos();
  console.log(videos);
  return _.remove(videos, v => v.url === current.url);
}

export function storeVideos(videos) {
  localStorage.setItem('videos', JSON.stringify(videos));
}

export function getVideos() {
  return JSON.parse(localStorage.getItem('videos'));
}