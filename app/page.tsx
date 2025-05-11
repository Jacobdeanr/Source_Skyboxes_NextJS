import fs   from 'fs';
import path from 'path';
import SkyboxGrid from './ui/skyboxgrid';
import Header from './ui/header';
  
function getSkyboxSlugs(): string[] {
  const skyboxesDir = path.join(process.cwd(), 'public', 'skyboxes');

  // read everything in /public/skyboxes and keep only directories
  return fs
    .readdirSync(skyboxesDir)
    .filter((name) =>
      fs.statSync(path.join(skyboxesDir, name)).isDirectory()
    );
}

export default function Home() {
  const slugs = getSkyboxSlugs();

  return (
    <>
      <SkyboxGrid slugs={slugs} />
    </>
  );
}
