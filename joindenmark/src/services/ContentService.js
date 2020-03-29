import { db } from "../firebase";
import { memoize } from "../Util/memoized";
import { trim } from "../Util/Helpers";
import { isEmpty } from "lodash";

export const getContentFilterBySettings = async (title, disabledSettings) => {
  // fetch settings from db and use await for waiting promises.
  // const settings = await getContent("settings");

  // // filter not enabled settings and get related
  // const disabledSettings = settings.docs
  //   .filter(p => !p.data().enabled)
  //   //like  fold in f#
  //   .reduce((acc, itr) => acc.concat(itr.data().related), []);
  const contentByTitle = await getContent(title);
  if (!isEmpty(disabledSettings)) {
    return contentByTitle.docs.filter(
      p => !disabledSettings.includes(p.data().title.toLowerCase())
    );
  } else {
    return contentByTitle.docs;
  }
};

export const getContentSnapShot = memoize(async title => {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
});

export const getContent = async title => {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
};

export const getQuery = async (collection, docId) => {
  const docRef = await db
    .collection(collection)
    .doc(docId)
    .get();

  return docRef.data().settingsDisabled;
};

export const updateUserSettings = async (collection, docid, update) => {
  return db
    .collection(collection)
    .doc(docid)
    .update({
      settingsDisabled: update.join()
    })
    .then(function() {
      console.log("Document successfully written with value: ", update);
      return true;
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
      return false;
    });
};
