import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut } from "firebase/auth";

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
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup, signOut };
