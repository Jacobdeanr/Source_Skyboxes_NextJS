import fs   from 'fs';
import path from 'path';
import Image from 'next/image';

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
    <main>
      <div className='Header'>
        <h1>
          Jacob Robbins' Skyboxes
        </h1>
      </div>
      <div className="grid">
      {slugs.map((slug) => (
        <Image
          key={slug}
          src={`/Source_Skyboxes_NextJS/skyboxes/${slug}/images/thumb.webp`}
          alt={`${slug} thumbnail`}
          width={400}
          height={225}
        />
      ))}
      </div>
    </main>
  );
}
