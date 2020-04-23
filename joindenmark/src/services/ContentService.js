import { db } from "../services/firebase";
import { memoize } from "../Util/memoized";
import { trim } from "../Util/Helpers";
import { isEmpty } from "lodash";

export const getContentSnapShot = memoize(async (title) => {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
});

export const getContent = async (title) => {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
};

export const getSettingsQuery = async (collection, docId) => {
  const docRef = await db.collection(collection).doc(docId).get();

  return docRef.data().settingsDisabled;
};

export const getStepsQuery = async (collection, docId) => {
  const docRef = await db.collection(collection).doc(docId).get();

  return docRef.data().joindkfields;
};

export const updateUserSettings = async (docid, update) => {
  return db
    .collection("users")
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

export const getContentFilterBySettings = async (title, disabledSettings) => {
  const contentByTitle = await getContent(title);
  if (!isEmpty(disabledSettings)) {
    const getSettings = await getContent("settings");
    const settings = getSettings.docs
      .filter((setting) => disabledSettings.includes(setting.id)) //if disabled settings contains setting (doc) then (next line)
      .reduce((acc, itr) => acc.concat(itr.data().related), []); // reduce accumulates related titles
    return contentByTitle.docs.filter(
      (tile) => !settings.includes(tile.data().title.toLowerCase()) //filter the titles, if settings does not include the tile title return it.
    );
  } else {
    return contentByTitle.docs;
  }
};
