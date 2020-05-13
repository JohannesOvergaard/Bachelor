
var firebase = require("firebase/app");
  require("firebase/firestore");

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAOtIgxp_wlTCVJHQa7bknqvrgaJkFnCBQ",
  authDomain: "joindenmark.firebaseapp.com",
  databaseURL: "https://joindenmark.firebaseio.com",
  projectId: "joindenmark",
  storageBucket: "joindenmark.appspot.com",
  messagingSenderId: "408739921787",
  appId: "1:408739921787:web:dc596021cca7e6cb4b47de",
});

const db = firebaseApp.firestore();

const collections = [
  "accommodation",
  "culture",
  "jobmarket",
  "residencepermit",
  "su",
  "taxes",
  "cpr",
];

function getAllSubstrings(str) {
  let i,
    j,
    result = [];

  for (i = 0; i < str.length; i++) {
    for (j = i + 1; j < str.length + 1; j++) {
      result.push(str.slice(i, j));
    }
  }
  return result;
}

function deleteOldSearch() {
  db.collection("search")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection("search")
          .doc(doc.id)
          .delete()
          .then(function () {
            console.log("Document successfully deleted!");
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
      });
    });
}

console.log("Collections : ", collections);
//Delete old searchresults
deleteOldSearch();

collections.map((c) =>
  db
    .collection(c)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        //Convert headlines to substrings
        const subStrings = getAllSubstrings(
          doc.data().headline.toLowerCase()
        );
        console.log(c, "=>", subStrings);

        //Set search
        db.collection("search")
          .doc(doc.data().headline)
          .set({
            keywords: subStrings,
            collection: c,
          })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      });
    })
);