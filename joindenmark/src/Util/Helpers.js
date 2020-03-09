export function convertToPath(title) {
    return "/" + trim(title);
  }

export function trim(title){
    return title.replace(/ /g, "").toLowerCase();
}