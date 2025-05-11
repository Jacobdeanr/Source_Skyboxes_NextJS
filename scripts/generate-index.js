const fs = require('fs');
const path = require('path');

const dataDir   = path.join(__dirname, '..', 'public', 'data');
const files     = fs
  .readdirSync(dataDir)
  .filter((f) => f.endsWith('.json') && f !== 'index.json');

const all = {};

files.forEach((fname) => {
  const slug  = fname.replace(/\.json$/, '');
  const data  = JSON.parse(fs.readFileSync(path.join(dataDir, fname), 'utf8'));
  all[slug]   = data;
});

const out = path.join(dataDir, 'index.json');
fs.writeFileSync(out, JSON.stringify(all, null, 2));