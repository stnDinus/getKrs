/** JSON format for Kelas */
export type KlsJSON = {
  no: string;
  kode: string;
  nama: string;
  sks: string;
  tp: string;
  kelp: string;
  jadwal1: string;
  jadwal2: string;
  jadwal3: string;
  jam: string;
}

/** Parsed JSON format for Kelas */
export type ParsedKlsJSON = {
  no: number;
  kode: string;
  nama: string;
  sks: number;
  tp: string;
  kelp: string;
  jdwl1Hari?: string;
  jdwl1JamMulai?: number;
  jdwl1MntMuali?: number;
  jdwl1JamSlsai?: number;
  jdwl1MntSlsai?: number;
  jdwl2Hari?: string;
  jdwl2JamMulai?: number;
  jdwl2MntMuali?: number;
  jdwl2JamSlsai?: number;
  jdwl2MntSlsai?: number;
  jdwl3Hari?: string;
  jdwl3JamMulai?: number;
  jdwl3MntMuali?: number;
  jdwl3JamSlsai?: number;
  jdwl3MntSlsai?: number;
  jam: string;
}

enum Day {
  Minggu = 0,
  Senin,
  Selasa,
  Rabu,
  Kamis,
  Jumat,
  Sabtu,
}

const daymap = new Map([
  ["MINGGU", Day.Minggu],
  ["SENIN", Day.Senin],
  ["SELASA", Day.Selasa],
  ["RABU", Day.Rabu],
  ["KAMIS", Day.Kamis],
  ["JUMAT", Day.Jumat],
  ["SABTU", Day.Sabtu],
]);

function toDay(dayStr: string): Day {
  return daymap.get(dayStr)!
}

class Jadwal {
  dayStr: string;
  day: Day;
  start: Date;
  end: Date;

  constructor(jadwalStr: string) {
    const jadwalStrSplit = jadwalStr.split(', ');
    this.dayStr = jadwalStrSplit[0];
    this.day = toDay(this.dayStr);

    const durationStr = jadwalStrSplit[1].split(' - ');

    const startStr = durationStr[0];
    const endStr = durationStr[1];

    const startSplit = startStr.split(':')
    const startH = parseInt(startSplit[0])
    const startM = parseInt(startSplit[1])

    const endSplit = endStr.split(':')
    const endH = parseInt(endSplit[0])
    const endM = parseInt(endSplit[1])

    const dtmpl = { year: 0, monthIndex: 0, day: 0 }
    this.start = new Date(dtmpl.year, dtmpl.monthIndex, dtmpl.day + this.day, startH, startM)
    this.end = new Date(dtmpl.year, dtmpl.monthIndex, dtmpl.day + this.day, endH, endM)
  }
}

export class Kelas {
  no: number;
  kode: string;
  nama: string;
  sks: number;
  teori: boolean;
  praktek: boolean;
  kelompok: string;
  jadwal: [Jadwal?, Jadwal?, Jadwal?];
  pagi: boolean;
  malam: boolean;

  constructor(
    json: KlsJSON
  ) {
    // number
    this.no = parseInt(json.no);
    this.sks = parseInt(json.sks);

    // string
    this.kode = json.kode;
    this.nama = json.nama;
    this.kelompok = json.kelp;

    // boolean
    this.teori = json.tp.includes('T')
    this.praktek = json.tp.includes('P')
    this.pagi = json.jam.includes('P')
    this.malam = json.jam.includes('M')

    // Jadwal
    this.jadwal = [
      json.jadwal1 !== '-, -' ? new Jadwal(json.jadwal1) : undefined,
      json.jadwal2 !== '-, -' ? new Jadwal(json.jadwal2) : undefined,
      json.jadwal3 !== '-, -' ? new Jadwal(json.jadwal3) : undefined,
    ];
  }

  filterStr(str: string, rgxStr: string) { return str.match(rgxStr) !== null }
  /** filter e.g.: >=3 */
  filterNum(num: number, filter: string) {
    const opPvt = filter.search('[0-9]')
    const op = filter.substring(0, opPvt)
    const rNumStr = filter.substring(opPvt)
    const rNum = parseInt(rNumStr)
    switch (op) {
      case '<': return num < rNum
      case '>': return num > rNum
      case '<=': return num <= rNum
      case '>=': return num >= rNum
      case '==': return num == rNum
    }
    return false
  }
  filterJdwls(filter: string) {
    // "<0|<1-3>>:<day>[:hour[:minute]]"
    //   ^
    //   all
    const filterSplt = filter.split(':');

    return false
  }

  filter(fieldStr: string, filter: string) {
    const field = this[fieldStr as keyof Kelas];
    if (field === undefined) return false;

    const fieldT = typeof field;
    switch (fieldT) {
      case "string": return this.filterStr(field as string, filter)
      case "number": return this.filterNum(field as number, filter)
      case "boolean": return field
      // jadwal tuple
      case "object": return this.filterJdwls(filter)
    }

    return false
  }

  format(): ParsedKlsJSON {
    return {
      no: this.no,
      kode: this.kode,
      nama: this.nama,
      sks: this.sks,
      tp: (this.teori ? "T" : "") + (this.praktek ? "P" : ""),
      kelp: this.kelompok,
      jdwl1Hari: this.jadwal[0]?.dayStr,
      jdwl1JamMulai: this.jadwal[0]?.start.getHours(),
      jdwl1MntMuali: this.jadwal[0]?.start.getMinutes(),
      jdwl1JamSlsai: this.jadwal[0]?.end.getHours(),
      jdwl1MntSlsai: this.jadwal[0]?.end.getMinutes(),
      jdwl2Hari: this.jadwal[1]?.dayStr,
      jdwl2JamMulai: this.jadwal[1]?.start.getHours(),
      jdwl2MntMuali: this.jadwal[1]?.start.getMinutes(),
      jdwl2JamSlsai: this.jadwal[1]?.end.getHours(),
      jdwl2MntSlsai: this.jadwal[1]?.end.getMinutes(),
      jdwl3Hari: this.jadwal[2]?.dayStr,
      jdwl3JamMulai: this.jadwal[2]?.start.getHours(),
      jdwl3MntMuali: this.jadwal[2]?.start.getMinutes(),
      jdwl3JamSlsai: this.jadwal[2]?.end.getHours(),
      jdwl3MntSlsai: this.jadwal[2]?.end.getMinutes(),
      jam: (this.pagi ? "P" : "") + (this.malam ? "M" : "")
    }
  }
}
