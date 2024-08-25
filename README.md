# getKrs
## Dependencies
- `npm`
- `jq` (optional, for csv conversion)

## Pre-setup
Install required dependencies:
```bash
npm i
```

## Usage
1. Compile to `temp.js`:
```bash
npm run compile
```
2. Copy contents of temp.js
3. Open `krs_tawar_***.****.*****.pdf` in browser
4. Open browser console, paste and run
5. Wait for array object > right click > `Copy Object`
6. Paste and save in a file (e.g. `krs.json`)
7. (Optional) Convert to CSV:
```bash
jq -r ".[] | [.no, .kode, .nama, .sks, .tp, .kelp, .jadwal1, .jadwal2, .jadwal3, .jam] | @csv" krs.json > krs.csv
```
