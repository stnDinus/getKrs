# getKrs
## Dependencies
- `npm`

## Pre-setup
Install required dependencies:
```bash
npm i
```

### Compile Options
Manipulate the following environment variables to change corresponding options:
Environment Variable | Default | Possible Values | Description
--- | --- | --- | ---
`OUTPUT_FILE_FORMAT` | `csv` | `csv`, `json` | Changes logged file format
`OUTPUT_FORMAT` | `parsed` | `parsed`, `raw` | Raw will match the logged columns with the pdf table columns

## Usage
1. Compile to `temp.js`:
```bash
npm run compile
```
2. Copy contents of temp.js
3. Open `krs_tawar_***.****.*****.pdf` in browser
4. Open browser console, paste and run
5. Wait for array object > right click > `Copy Object`
6. Paste and save in a file (e.g. `krs.csv`)
