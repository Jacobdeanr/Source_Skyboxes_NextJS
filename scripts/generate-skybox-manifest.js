const fs   = require('fs');
const path = require('path');

const rootDir   = path.join(__dirname, '..');
const skyboxDir = path.join(rootDir, 'public', 'skyboxes');
const outFile   = path.join(rootDir, 'public', 'data', 'skyboxManifest.json');

if (!fs.existsSync(skyboxDir)) {
  console.error('❌  Skybox directory not found:', skyboxDir);
  process.exit(1);
}

const slugs = fs.readdirSync(skyboxDir).filter((name) =>
  fs.statSync(path.join(skyboxDir, name)).isDirectory()
);

const manifest = slugs.map((slug) => {
  const previewsPath = path.join(skyboxDir, slug, 'images', 'previews');
  if (!fs.existsSync(previewsPath)) {
    console.warn(`⚠️  No preview folder for ${slug}`);
    return { slug, previewCount: 0, previews: [] };
  }

  const files = fs
    .readdirSync(previewsPath)
    .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return {
    slug,
    previewCount: files.length,
    previews: files,
  };
});

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));
console.log(`✅  Wrote manifest with ${manifest.length} skyboxes → ${outFile}`);
