import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAOtIgxp_wlTCVJHQa7bknqvrgaJkFnCBQ",
    authDomain: "joindenmark.firebaseapp.com",
    databaseURL: "https://joindenmark.firebaseio.com",
    projectId: "joindenmark",
    storageBucket: "joindenmark.appspot.com",
    messagingSenderId: "408739921787",
    appId: "1:408739921787:web:dc596021cca7e6cb4b47de"
});

const db = firebaseApp.firestore();

export { db };