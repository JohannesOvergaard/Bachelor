import { db } from "../firebase";
import { memoize } from "../Util/memoized";
import { trim } from "../Util/Helpers";

export const getContentSnapShot = memoize(function(title) {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
});

export const getContent = function(title) {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
};
