import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import SunParams from '@/app/ui/sunparameters';
import FogParams from '@/app/ui/fogparameters';
import MapList from '@/app/ui/maplist';
import DownloadButton from '@/app/ui/downloadbutton';
import TechnicalDetails from '@/app/ui/technical-details';

export async function generateStaticParams() {
  const allPath = path.join(process.cwd(), 'public', 'data', 'index.json');
  const allData = JSON.parse(fs.readFileSync(allPath, 'utf8'));
  return Object.keys(allData).map((slug) => ({ slug }));
}

export default async function SkyboxPage({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), 'public', 'data', `${params.slug}.json`);
  const skyboxData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  

  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${params.slug}/images`;

  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-neutral-900 rounded-lg shadow-xl ring-1 ring-neutral-700/60 overflow-hidden">
        {/* Header */}
        <div className="p-4">
          <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold leading-tight">{params.slug}</h1>
              {skyboxData.author && (
                <span className="text-sm text-neutral-400">By {skyboxData.author}</span>
              )}
            </div>
            <DownloadButton
              href={`/Source_Skyboxes_NextJS/skyboxes/${params.slug}/downloads/${params.slug}.7z`}
              download
              size={skyboxData.fileSize}
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 relative w-full aspect-[16/9]">
          <img 
            src={`${imgBase}/previews/1.webp`} 
            alt={`${params.slug} preview`} 
            className="w-full h-full object-cover rounded-md" 
          />
        </div>

        {/* Content Grid */}
        <div className="p-4 space-y-8">
          {/* Description */}
          <div className="bg-neutral-800/50 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-3">Description</h3>
            <p className="text-neutral-300">{skyboxData.description || 'A high-quality HDR skybox for Source Engine games.'}</p>
          </div>

          {/* Environment Parameters */}
          <div>
            <h3 className="text-lg font-medium mb-4">Environment Parameters</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-neutral-800/50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-neutral-400 mb-3">Sun Parameters</h4>
                <SunParams {...skyboxData.sunParameters} />
              </div>
              <div className="bg-neutral-800/50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-neutral-400 mb-3">Fog Parameters</h4>
                <FogParams {...skyboxData.fogParameters} />
              </div>
            </div>
          </div>

          {/* Community Maps */}
          <div>
            <h3 className="text-lg font-medium mb-4">Community Maps</h3>
            <div className="bg-neutral-800/50 p-4 rounded-md">
              <MapList maps={skyboxData.steamMaps} />
            </div>
          </div>

          {/* Technical Details */}
          <TechnicalDetails 
            resolution={skyboxData.resolution}
            fileSize={skyboxData.fileSize}
            compatibility={skyboxData.compatibility}
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="p-6 border-t border-neutral-800 mt-8">
        <h3 className="text-lg font-medium text-neutral-100 mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {skyboxData.categories?.map((category: string) => (
            <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-800 text-neutral-300">
              {category}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
