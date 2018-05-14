const axios = require('axios');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
  
const api = require('./config/Default').api;
const isAuthorized = require('./User').isAuthorized;

export async function upload(file, shinobify) {
  if (!file) { return false; }

  const authorization = isAuthorized();
  const form = new FormData();
  form.append('file', file);
  form.append('shinobi', shinobify);
  const token = `Bearer ${authorization.token}`;

  const result = await axios.post(api.base + api.upload + `/${authorization.id}`, form, {
    headers: {
      'authorization': token,
      'Access-Control-Allow-Origin': '*'
    }
  });

  if (result.data) {
    console.log(result.data);
    xChangeCurrentVideo(result.data.video)
  }
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
    if (videos && videos.length > 0) {
      setCurrentVideo(videos[0]);
      setOtherVideos(videos.slice(1));
      return videos;
    }
    return false;
  } else {
    console.log('Unable to list videos');
    return false;
  }
}

export function changeCurrentVideo(video) {
  console.log('changing current video to ' + video.filename);
  const all = getAllVideos();
  if (all) {
    let others = _.map(all, (v) => { 
      if (v.filename !== video.filename && v.filename) {
        return v;
      }  
    });
    others = _.without(others, undefined);
    setOtherVideos(others)
    setCurrentVideo(video);
  } else {
    return undefined;
  }
}

export function setCurrentVideo(video) {
  localStorage.setItem('current_video', JSON.stringify(video));
}

export function getCurrentVideo() {
  return localStorage.getItem('current_video') ? JSON.parse(localStorage.getItem('current_video')) : defaultVideo();
}

export function setOtherVideos(videos) {
  localStorage.setItem('other_videos', JSON.stringify(videos));
}

export function getOtherVideos() {
  return localStorage.getItem('other_videos') ? JSON.parse(localStorage.getItem('other_videos')) : [];
}

export function getAllVideos() {
  const all = [getCurrentVideo()].concat(getOtherVideos());
  return all;
}

function defaultVideo() {
  const video = {
    filename: 'My Aviato?',
    url: 'https://s3.us-east-2.amazonaws.com/iviato-videos/Aviato.mp4',
    description: 'One of our favorite scenes from our favorite show.'
  }
  setCurrentVideo(video);
  console.log(video.url);
  return video;
}

function xChangeCurrentVideo(video) {
  console.log('Changing Current video');
  setOtherVideos([getCurrentVideo()])
  setCurrentVideo(video);
}