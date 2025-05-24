import { use } from 'react';
import fs   from 'fs';
import path from 'path';
import SkyboxClient from './skybox-client';

export async function generateStaticParams() {
  const listPath = path.join(process.cwd(), 'public', 'data', 'index.json');
  const list     = JSON.parse(fs.readFileSync(listPath, 'utf8')) as Record<string, any>;
  return Object.keys(list).map((slug) => ({ slug }));
}

// Function to count preview images
function countPreviewImages(slug: string): number {
  const previewsDir = path.join(process.cwd(), 'public', 'skyboxes', slug, 'images', 'previews');
  try {
    const files = fs.readdirSync(previewsDir);
    // Count files that match the preview pattern (1.webp, 2.webp, etc.)
    return files.filter(file => /^\d+\.webp$/i.test(file)).length || 1; // Default to 1 if no previews found
  } catch (error) {
    console.error(`Error reading previews directory for ${slug}:`, error);
    return 1; // Default to 1 if there's an error
  }
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const dataPath = path.join(process.cwd(), 'public', 'data', `${slug}.json`);
  const skyboxData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const previewCount = countPreviewImages(slug);

  return <SkyboxClient slug={slug} skyboxData={skyboxData} previewCount={previewCount} />;
}
