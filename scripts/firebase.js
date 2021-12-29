// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

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

import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const database = getDatabase(app);

function initNewUser(userId, name) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        groups: null,
        userinfo: {
            bio: "",
            name: name
        }
    });
}

function getUserData(userId) {
    const starCountRef = ref(database, 'users/' + userId + '/userinfo');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        updateStarCount(postElement, data);
    });
}



/*
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
*/

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

function newUser(email, password, username, name) {
    createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    
    initNewUser(username, name)
}

function signIn(email, password) {
    signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

function signInG() {
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

    
}


