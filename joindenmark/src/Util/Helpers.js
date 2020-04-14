export function convertToPath(title, prefix) {
  return prefix ? trim(prefix) + "/" + trim(title) : "/" + trim(title);
}

export function trim(title) {
  return title.replace(/ /g, "").toLowerCase();
}

export function updateArray(enabled, array, element) {
  const index = array.indexOf(element);
  if (enabled) {
    array.splice(index, 1);
    return array;
  } else {
    array.push(element);
    return array;
  }
}
