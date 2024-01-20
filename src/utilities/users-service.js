import * as usersAPI from './users-api';

export async function getFiles(userId) {
  const result = await usersAPI.getFiles(userId);
  return result;
}

export async function saveImage(imageToSend, userId) {
  const result = await usersAPI.saveImage(imageToSend, userId);
  return result;
};

export async function generateCraft(file, craftType, convertTo) {
  const result = await usersAPI.generateCraft(file, craftType, convertTo);
  return result; 
}

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  // Persist the "token"
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(userData) {
  const token = await usersAPI.login(userData);
  console.log(`token: ${token}`);
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem('token');
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function checkToken() {

  return usersAPI.checkToken()
  // checkToken returns a string, but let's
  // make it a Date object for more flexibility
  .then(dateStr => new Date(dateStr));
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}

// Convert the image buffer in a readable image file
export function arrayBufferToBase64(buffer) {
  const binary = new Uint8Array(buffer);
  const bytes = Array.from(binary);
  const binaryString = String.fromCharCode.apply(null, bytes);
  return btoa(binaryString);
}