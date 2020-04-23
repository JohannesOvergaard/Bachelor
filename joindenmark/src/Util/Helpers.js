export function convertToPath(title, prefix) {
  return prefix ? trim(prefix) + "/" + trim(title) : "/" + trim(title);
}

export function trim(title) {
  return title.replace(/ /g, "").toLowerCase();
}

export function updateArray(enabled, array, element) {
  //Find the index of the element to update
  const index = array.indexOf(element);
  if (enabled) {
    //if the element is enabled do not save it, remove from array
    array.splice(index, 1);
    return array;
  } else {
    //if the element is disabled save it, add it to the array
    array.push(element);
    return array;
  }
}
