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
}

export async function list() {
  const authorization = isAuthorized();
  const token = `Bearer ${authorization.token}`;

  const res = await axios.get(api.base + api.videos + `/${authorization.id}`, {
    headers: {
      'authorization': token,
      'Access-Control-Allow-Origin': '*'
    }
  });

  if (res.data) {
    const videos = _.uniqBy(res.data, 'filename');
    setCurrentVideo(videos[0]);
    setOtherVideos(videos.slice(1));
    return videos;
  } else {
    console.log('Unable to list videos');
    return false;
  }
}

export function changeCurrentVideo(video) {
  const all = getAllVideos();
  if (all) {
    let others = _.map(all, (v) => { 
      if (v.filename !== video.filename) {
        return v;
      }  
    });
    others = _.without(others, undefined);
    setCurrentVideo(video);
    setOtherVideos(others);
  } else {
    return undefined;
  }
}

export function setCurrentVideo(video) {
    localStorage.setItem('current_video', JSON.stringify(video));
}

export function getCurrentVideo() {
  return JSON.parse(localStorage.getItem('current_video')) || {};
}

export function setOtherVideos(videos) {
  localStorage.setItem('other_videos', JSON.stringify(videos));
}

export function getOtherVideos() {
  return JSON.parse(localStorage.getItem('other_videos')) || [];
}

export function getAllVideos() {
  const all = [getCurrentVideo()].concat(getOtherVideos());
  return all;
}