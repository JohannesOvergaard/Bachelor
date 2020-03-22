import { db } from '../../firebase';

const collections = ["accommodation", "culture", "jobmarket", "residencepermit", "su", "taxes"];

function getAllSubstrings(str) {
    var i, j, result = [];
  
    for (i = 0; i < str.length; i++) {
        for (j = i + 1; j < str.length + 1; j++) {
            result.push(str.slice(i, j));
        }
    }
    return result;
  }

export function getStrings(){
    console.log("Collections : ", collections);
    collections.map(
        c => db.collection(c).get().then(
            function(querySnapshot) {
                querySnapshot.forEach(
                    function(doc) {
                        //Convert headlines to substrings
                        const subStrings = getAllSubstrings(doc.data().headline.toLowerCase());
                        console.log(c, "=>", subStrings);

                        //Set search
                        db.collection("search").doc(doc.data().headline).set({
                            keywords: subStrings,
                            collection: c
                        }).then(function() {
                            console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    }
                );
            }
        )
    );
}