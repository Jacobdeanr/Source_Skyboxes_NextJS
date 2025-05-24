import { use } from 'react';
import fs   from 'fs';
import path from 'path';
import SkyboxClient from './skybox-client';

export async function generateStaticParams() {
  const listPath = path.join(process.cwd(), 'public', 'data', 'index.json');
  const list     = JSON.parse(fs.readFileSync(listPath, 'utf8')) as Record<string, any>;
  return Object.keys(list).map((slug) => ({ slug }));
}

export default function Page({
  params,                 // 👈 promise!
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);            // unwrap

  const dataPath   = path.join(process.cwd(), 'public', 'data', `${slug}.json`);
  const skyboxData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  return <SkyboxClient slug={slug} skyboxData={skyboxData} />;
}
