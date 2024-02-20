function getArr(div: Element, offset = 22) {
  return Array
    .from(div.querySelectorAll(`span`))
    .filter(span => (span as HTMLSpanElement).innerText !== " ")
    .map(span => (span as HTMLSpanElement).innerText)
    .splice(offset);
}

function getMks(
  arr: string[],
  keys = [
    "no",
    "kode",
    "nama",
    "sks",
    "tp",
    "kelp",
    "jadwal1",
    "jadwal2",
    "jadwal3",
    "jam",
  ],
  limit = 45
) {
  const json: Object[] = [];

  for (let i = 0; i < arr.length;) {
    const el = {};
    for (let j = 0; j < keys.length; j++) {
      Object.assign(el, { [keys[j]]: arr[i++] })
    }
    json.push(el)
  }

  // returns up to limit
  return json.filter((obj, idx) =>
    idx <= limit && parseInt(obj["no"]) > 0
  );
}
