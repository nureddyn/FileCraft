import { getToken } from "./users-service";

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

export async function deleteFile(fileId) {
  const formData = new FormData();
  formData.append('fileId', fileId);
  return sendRequest(`${BASE_URL}/files/delete`, 'POST', formData);
}

export async function getFiles(userId) {
  const formData = new FormData();
  formData.append('userId', userId);
  return sendRequest(`${BASE_URL}/files`, 'POST', formData);
}

export async function saveImage(imageToSend, userId, imageId = null) {
  const formData = new FormData();
  formData.append('file', imageToSend);
  formData.append('userId', userId);
  formData.append('imageId', imageId);
  return sendRequest(`${BASE_URL}/craft/save`, 'POST', formData);
};

export function generateCraft(file, craftType, convertTo) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('craftType', craftType);
  formData.append('convertTo', convertTo);
  return sendRequest(`${BASE_URL}/craft`, 'POST', formData);
}

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function getPhoto(userId) {
  const formData = new FormData();
  formData.append('userId', userId);
  return sendRequest(`${BASE_URL}/photo`, 'POST', formData);
}

export async function changePhoto(userId, photo) {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('photo', photo);
  return sendRequest(`${BASE_URL}/photo/change`, 'POST', formData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };


  if (payload) {
    if (payload instanceof FormData) {
      // If payload is FormData, set content type to multipart/form-data
      options.body = payload;
    } else {
      // If payload is not FormData, set content type to application/json
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
  }

  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}