import { db } from "../firebase";
import { memoize } from "../Util/memoized";
import { trim } from "../Util/Helpers";

export const getContent = memoize(function(title) {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
});

export const getNonCacheContent = function(title) {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
};
