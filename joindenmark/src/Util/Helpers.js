import { getContent } from "../services/ContentService";

export function convertToPath(title, prefix) {
  return prefix ? trim(prefix) + "/" + trim(title) : "/" + trim(title);
}

export function trim(title) {
  return title.replace(/ /g, "").toLowerCase();
}

function mapSettings() {
  const arr = [];
  return new Promise(function(resolve, reject) {
    getContent("settings").then(function(query) {
      query.forEach(function(doc) {
        const data = doc.data();
        console.log("data.related is: ", data.related);
        if (!data.enabled) {
          // const rel = data.related.split(",");
          // rel.forEach(str => {
          //   console.log("what type is str: ", str, typeof str);
          arr.push(data.related);
          // });
        }
      });

      resolve(arr);
    }, reject);
  });
}
