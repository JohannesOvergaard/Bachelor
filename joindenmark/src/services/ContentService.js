import { db } from "../firebase";
import { memoize } from "../Util/memoized";

export const getContent = memoize(function(title) {
  const dataFromDB = db.collection(title.toLowerCase()).get();
  return dataFromDB;
});
