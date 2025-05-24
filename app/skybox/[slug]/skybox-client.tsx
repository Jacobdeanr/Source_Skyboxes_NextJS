'use client';

import SunParams from '@/app/ui/sunparameters';
import FogParams from '@/app/ui/fogparameters';
import MapList from '@/app/ui/maplist';
import DownloadButton from '@/app/ui/downloadbutton';
import TechnicalDetails from '@/app/ui/technical-details';

interface SkyboxClientProps {
  slug: string;
  skyboxData: any;
}

export default function SkyboxClient({ slug, skyboxData }: SkyboxClientProps) {
  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;

  return (
    <article className="max-w-4xl mx-auto">
      <div className="bg-neutral-900 rounded-lg shadow-xl ring-1 ring-neutral-700/60 overflow-hidden">
        {/* Header */}
        <div className="p-4">
          <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold leading-tight">{slug}</h1>
              {skyboxData.author && (
                <span className="text-sm text-neutral-400">By {skyboxData.author}</span>
              )}
            </div>
            <DownloadButton
              href={`/Source_Skyboxes_NextJS/skyboxes/${slug}/downloads/${slug}.7z`}
              download
              size={skyboxData.fileSize}
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Preview Image */}
        <div className="relative w-full aspect-video bg-black">
          <img
            src={`${imgBase}/previews/1.webp`}
            alt={`${slug} skybox preview`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {skyboxData.description && (
            <p className="text-neutral-300">{skyboxData.description}</p>
          )}

          {/* Technical Details 
          <TechnicalDetails
            resolution={skyboxData.resolution}
            fileSize={skyboxData.fileSize}
            compatibility={skyboxData.compatibility}
          />
          */}

          {/* Sun Parameters */}
          {skyboxData.sunParameters && (
            <SunParams {...skyboxData.sunParameters} />
          )}

          {/* Fog Parameters */}
          {skyboxData.fogParameters && (
            <FogParams {...skyboxData.fogParameters} />
          )}

          {/* Map List */}
          {skyboxData.steamMaps && skyboxData.steamMaps.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-neutral-100 mb-4">Featured in</h3>
              <MapList maps={skyboxData.steamMaps} />
            </div>
          )}
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
