import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBX_XKYSYBlp58YoCDJGbZ6PRwTsYdQiYg",
    authDomain: "realtimechat-74141.firebaseapp.com",
    databaseURL: "https://realtimechat-74141-default-rtdb.firebaseio.com"
};

firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();