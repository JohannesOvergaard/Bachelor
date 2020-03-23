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

export const db = firebaseApp.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

/*
provider.addScope('profile');
provider.addScope('email');
provider.addScope('https://www.googleapis.com/auth/plus.me');
*/
export function login(){
    return firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log('user:' , user.uid , result.additionalUserInfo.isNewUser);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    
    //return firebase.auth().signInWithPopup(provider)
}; // Opens a popup window and returns a promise to handle errors.