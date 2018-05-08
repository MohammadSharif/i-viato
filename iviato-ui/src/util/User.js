import { list, setCurrentVideo, setOtherVideos } from './Video';

const request = require('request-promise');

const api = require('./config/Default').api;

export async function signUp(first, last, email, password) {
  const headers = new Headers()
  headers.append('Content-type', 'application/json');

  const options = {
    method: 'POST',
    url: api.base + api.signup,
    headers: headers,
    form: {
      'first': first,
      'last': last,
      'email': email,
      'password': password,
    }
  };

  try {
    const response = await request(options);
    storeToken(JSON.parse(response));
    setCurrentVideo({});
    setOtherVideos([]);
    return true;
  } catch (error) {
    console.log(`-----Error: ${error}`);
    return false;
  }
};

export async function login(email, password) {
  const headers = new Headers()
  headers.append('Content-type', 'application/json');

  const options = {
    method: 'POST',
    url: api.base + api.login,
    headers: headers,
    form: {
      'email': email,
      'password': password,
    }
  };

  try {
    const response = await request(options);
    storeToken(JSON.parse(response));
    await list();
    return true;
  } catch (error) {
    console.log(`-----Error: ${error}`);
    return false;
  }
};

export function logout() {
  localStorage.clear();
}

// @Todo: Add timeout and whatnot
export function isAuthorized() {
  const token = localStorage.getItem('access_token');
  const id = localStorage.getItem('user_id');
  return {
    id: id,
    token: token,
  };
}

function storeToken(result) {
  localStorage.setItem('access_token', result.token);
  localStorage.setItem('user_id', result.id);
}