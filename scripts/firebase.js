// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmwn-ugD1VBhS85U3m4gdBa0wOvyFGLmY",
    authDomain: "cas-ch.firebaseapp.com",
    projectId: "cas-ch",
    storageBucket: "cas-ch.appspot.com",
    messagingSenderId: "461771511833",
    appId: "1:461771511833:web:9101baadf07874ff783288",
    measurementId: "G-HSBJ3LXEQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);