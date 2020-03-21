import {getContentSnapShot} from '../../services/ContentService';
import { db } from '../../firebase';

const collections = ["accommodation", "culture", "jobmarket"];
const collections2 = [];

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
                        const subStrings = getAllSubstrings(doc.data().headline.toLowerCase());
                        collections2.push(subStrings);
                        console.log(c, "=>", subStrings);
                    }
                );
            }
        )
    );
    console.log(collections2);
}