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
export const FieldPath = firebase.firestore().FieldPath;

function addNewUserToDB(userid) {
  db.collection("users")
    .doc(userid)
    .set({
      settingsDisabled: ""
    })
    .then(function() {
      console.log("Document successfully written with value: ");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

function onLogin(result){
  // The signed-in user info.
  var userID = result.user.uid;
  if (result.additionalUserInfo.isNewUser) {
    addNewUserToDB(userID);
  }
  return userID;
}

export async function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  return await firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result){
      return onLogin(result);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      return false;
    });
}

async function crateEmailUser(email,password){
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(result){
      return onLogin(result);
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

export async function emailLogin(email,password) {
  return await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(result){
      if (!result.isNewUser){
        return onLogin(result);
      }
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode === "auth/user-not-found"){
      if (window.confirm("The user was not found. \n Do you want to create a new user?")) {
        //Create new user
        return crateEmailUser(email,password);
      }
    } else {
      throw errorMessage
    }
  });
}

export async function firebaseLogout(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}