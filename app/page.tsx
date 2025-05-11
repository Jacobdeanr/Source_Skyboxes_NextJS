import fs from 'fs';
import path from 'path';
import SkyboxGrid from './ui/skyboxgrid';

const allPath = path.join(process.cwd(), 'public', 'data', 'index.json');
const allData = JSON.parse(fs.readFileSync(allPath, 'utf8')) as Record<string, any>;
const slugs   = Object.keys(allData);

export default function Home() {
  return <SkyboxGrid slugs={slugs} meta={allData} />;
}