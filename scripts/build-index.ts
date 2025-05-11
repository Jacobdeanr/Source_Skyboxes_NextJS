import fs from 'fs';
import path from 'path';

interface Summary {
  slug: string;
  name: string;
  author?: string;
  categories?: string[];
  publishDate?: string;
}

const root = path.join(process.cwd(), 'public', 'skyboxes');
const out  = path.join(process.cwd(), 'public', 'data', 'index.json');

const summaries: Summary[] = [];

for (const slug of fs.readdirSync(root)) {
  const metaPath = path.join(root, slug, `${slug}.json`);
  if (!fs.existsSync(metaPath)) continue;

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  summaries.push({
    slug,
    name: meta.skybox_name ?? slug,
    author: meta.author,
    categories: meta.categories,
    publishDate: meta.publishDate,
  });
}

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(summaries));
console.log(`✨ Wrote ${summaries.length} entries to public/data/index.json`);
