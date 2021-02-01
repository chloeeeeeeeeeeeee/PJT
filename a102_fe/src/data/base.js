import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAZZj8r69C50Y0VxXzdehzJjqZcv4j7u60",
  authDomain:"a102-8559b.firebaseapp.com",
  databaseURL: "https://a102-8559b.firebaseio.com",
  projectId: "a102-8559b",
  storageBucket: "a102-8559b.appspot.com",
  messagingSenderId: "128335102138",
  appId:"1:128335102138:web:62e5b93f2d518619a58283",
  measurementId: "G-3S2VVK8M8K"
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const db = firebase.firestore();

export default app;