import fs from 'fs';
import path from 'path';
import SkyboxClient from './skybox-client';

// This function runs at build time to generate all possible paths
export async function generateStaticParams() {
  const allPath = path.join(process.cwd(), 'public', 'data', 'index.json');
  const allData = JSON.parse(fs.readFileSync(allPath, 'utf8'));
  return Object.keys(allData).map((slug) => ({
    slug: slug.toString()
  }));
}

async function getSkyboxData(slug: string) {
  const dataPath = path.join(process.cwd(), 'public', 'data', `${slug}.json`);
  const fileContents = await fs.promises.readFile(dataPath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const skyboxData = await getSkyboxData(slug);
  
  if (!skyboxData) {
    return <div>Skybox not found</div>;
  }
  
  return <SkyboxClient slug={slug} skyboxData={skyboxData} />;
}
