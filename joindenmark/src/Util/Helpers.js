export function convertToPath(title, prefix) {
  return prefix ? trim(prefix) + "/" + trim(title) : "/" + trim(title);
}

export function trim(title) {
  return title.replace(/ /g, "").toLowerCase();
}
