// auth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAxbU2viTgoLFDcoiH0VjI_p3CcIbb9nxI",
    authDomain: "eunaservice.firebaseapp.com",
    databaseURL: "https://eunaservice-default-rtdb.firebaseio.com",
    projectId: "eunaservice",
    storageBucket: "eunaservice.appspot.com",
    messagingSenderId: "594238513671",
    appId: "1:594238513671:web:f9d92e3fa36f4b507d80a2",
    measurementId: "G-8ES48QPW97"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithEmailAndPassword, getRedirectResult };
