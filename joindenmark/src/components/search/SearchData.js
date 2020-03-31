import { db } from '../../firebase';

const collections = ["accommodation", "culture", "jobmarket", "residencepermit", "su", "taxes"];

//Copy from https://stackoverflow.com/questions/40818769/get-all-substrings-of-a-string-in-javascript
function getAllSubstrings(str) {
    var i, j, result = [];
  
    for (i = 0; i < str.length; i++) {
        for (j = i + 1; j < str.length + 1; j++) {
            result.push(str.slice(i, j));
        }
    }
    return result;
  }

function deleteOldSearch(){
    db.collection("search").get().then(
        function(querySnapshot) {
            querySnapshot.forEach(
                function(doc){
                    db.collection("search").doc(doc.id).delete().then(function() {
                        console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                }
            );
        }
    );
}

export function addKeywordsToSearchDB(){
    console.log("Collections : ", collections);
    //Delete old searchresults
    deleteOldSearch();
    
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