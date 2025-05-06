import fs   from 'fs';
import path from 'path';
import SkyboxCard from './ui/skyboxcard';

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
        <header
          className="
            flex items-center justify-center
            bg-neutral-900
            shadow-md shadow-black/40
            h-20
            mb-4
          "
        >
        <h1 className="text-1xl sm:text-4xl font-bold text-neutral-100 tracking-wide text-center text-nowrap">
          Jacob Robbins&rsquo; Skybox Textures
        </h1>
      </header>

      <section
        className="
          grid gap-4
          grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]
          sm:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]
          lg:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]
          2xl:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]
          px-4 sm:px-6 lg:px-8
        "
      >
        {slugs.map((slug) => (
          <SkyboxCard key={slug} slug={slug} />
        ))}
      </section>

      </main>
    );
  }
