/**
 * Glossary:
 * Mk = Mata Kuliah
 */

import { Kelas, KlsJSON, ParsedKlsJSON } from "./format";

function getPageMks(page: Element, offset = 22) {
  return Array
    .from(page.querySelectorAll(`span`))
    .filter(span => (span as HTMLSpanElement).innerText !== " ")
    .map(span => (span as HTMLSpanElement).innerText)
    .splice(offset);
}

function parsePageMks(
  pageMks: string[],
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
  const json: KlsJSON[] = [];

  for (let i = 0; i < pageMks.length;) {
    const el = {};
    for (let j = 0; j < keys.length; j++) {
      el[keys[j]] = pageMks[i++]
    }
    json.push(el as KlsJSON)
  }

  // returns up to limit
  return json.filter((obj, idx) =>
    idx <= limit && parseInt(obj["no"]) > 0
  );
}

async function getAllMks(viewer: HTMLElement, delay = 2000): Promise<(KlsJSON | ParsedKlsJSON)[]> {
  const allMks = []

  const pages = viewer.getElementsByClassName("page")

  for (const page of pages) {
    page.scrollIntoView()
    await new Promise(r => setTimeout(r, delay));
    allMks.push(parsePageMks(getPageMks(page)).map(mk => {
      //@ts-expect-error
      if (!PARSE_JSON) return mk
      const kls = new Kelas(mk)
      return kls.format()
    }))
  }

  return allMks.flat()
}

async function getKrs(delay?: number): Promise<Object[]> {
  const viewer = document.getElementById("viewer")
  if (viewer === null) throw Error("Element with id `viewer` not found")

  return await getAllMks(viewer, delay)
}

let krs: Object[];
let delay = 2000;
async function loadKrs() {
  try {
    krs = await getKrs(delay)
  } catch (error) {
    console.error(error);
    return
  }
  console.log(krs);
}
loadKrs()
