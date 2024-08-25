# getKrs
## Dependencies
- `typescript`
- `jq` (optional, for csv conversion)

## Usage
1. Compile typescript:
```bash
tsc
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
