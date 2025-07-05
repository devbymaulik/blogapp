// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
const {initializeApp} = require('firebase/app');
const { getStorage } = require('firebase/storage');
require('dotenv').config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp, 'gs://blogproject-f9e9c.appspot.com');

module.exports = {firebaseStorage}