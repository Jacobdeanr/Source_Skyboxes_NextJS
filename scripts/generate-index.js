const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'public', 'data');
const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
const slugs = files.map(fileName => path.basename(fileName, '.json'));

const outputPath = path.join(dataDir, 'index.json');
fs.writeFileSync(outputPath, JSON.stringify(slugs, null, 2));

console.log(`Generated index.json with ${slugs.length} entries at ${outputPath}`);
