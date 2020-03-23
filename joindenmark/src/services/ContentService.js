import { db } from "../firebase";
import { memoize } from "../Util/memoized";
import { trim } from "../Util/Helpers";

export const getContentFilterBySettings = async title => {
  // fetch settings from db and use await for waiting promises.
  const settings = await getContent("settings");

  // filter not enabled settings and get related
  const disabledSettings = settings.docs
    .filter(p => !p.data().enabled)
    //like  fold in f#
    .reduce((acc, itr) => acc.concat(itr.data().related), []);

  const contentByTitle = await getContentSnapShot(title);
  // compare the two datas and return it.
  return contentByTitle.docs.filter(
    p => !disabledSettings.includes(p.data().title.toLowerCase())
  );
};

export const getContentSnapShot = memoize(async title => {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
});

export const getContent = async title => {
  const dataFromDB = db.collection(trim(title)).get();
  return dataFromDB;
};
