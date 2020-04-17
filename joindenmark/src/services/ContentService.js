import { db } from "../firebase";
import { memoize } from "../Util/memoized";
import { trim } from "../Util/Helpers";
import { isEmpty } from "lodash";

export const getContentFilterBySettings = async (title, disabledSettings) => {
  const contentByTitle = await getContent(title);
  if (!isEmpty(disabledSettings)) {
    const getSettings = await getContent("settings");
    const settings = getSettings.docs
      .filter((doc) => disabledSettings.includes(doc.id))
      .reduce((acc, itr) => acc.concat(itr.data().related), []);
    return contentByTitle.docs.filter(
      (p) => !settings.includes(p.data().title.toLowerCase())
    );
  } else {
    return contentByTitle.docs;
  }
};

export const getContentSnapShot = memoize(async (title) => {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
});

export const getContent = async (title) => {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
};

export const getQuery = async (collection, docId) => {
  const docRef = await db.collection(collection).doc(docId).get();

  return docRef.data().settingsDisabled;
};

export const getQuerySteps = async (collection, docId) => {
  const docRef = await db.collection(collection).doc(docId).get();

  return docRef.data().joindkfields;
};

export const updateUserSettings = async (collection, docid, update) => {
  return db
    .collection(collection)
    .doc(docid)
    .update({
      settingsDisabled: update.join(),
    })
    .then(function () {
      console.log("Document successfully written with value: ", update);
      return true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      return false;
    });
};

export const updateJoinDkChecks = async (docid, update) => {
  return db
    .collection("users")
    .doc(docid)
    .update({
      joindkfields: update.join(),
    })
    .then(function () {
      console.log("Document successfully written with value: ", update);
      return true;
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
      return false;
    });
};
