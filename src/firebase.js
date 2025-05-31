// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyC6dwvyZ3ZZnqqJoYpNOiPbrpWBZQhrQvE",
  authDomain: "login-app-434e2.firebaseapp.com",
  projectId: "login-app-434e2",
  storageBucket: "login-app-434e2.firebasestorage.app",
  messagingSenderId: "424934008376",
  appId: "1:424934008376:web:139c944351ba79a58aa8cd",
  measurementId: "G-5HJ38KXTQ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
