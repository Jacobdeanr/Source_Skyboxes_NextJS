'use client';
import { withBase, downloadHref } from '@/app/lib/basepath';
import { formatDate } from '@/app/lib/date-utils';

import { useState } from 'react';
import Link from 'next/link';
import SunParams from '@/app/ui/sunparameters';
import FogParams from '@/app/ui/fogparameters';
import MapList from '@/app/ui/maplist';
import DownloadButton from '@/app/ui/downloadbutton';
import { SkyboxDownload } from '@/app/types/skybox';

interface SkyboxClientProps {
  slug: string;
  skyboxData: any;
  previewCount: number;
}

export default function SkyboxClient({ slug, skyboxData, previewCount }: SkyboxClientProps) {
  const [activeImage, setActiveImage] = useState(1);
  const imgBase = withBase(`/skyboxes/${slug}/images`);
  // Generate array of preview numbers based on previewCount
  const previews = Array.from({ length: previewCount }, (_, i) => i + 1);
  const publishDate = formatDate(skyboxData.publishDate)

  //Fall back until I implement all formats and file sizes
  const downloads: Record<string, SkyboxDownload> =
  skyboxData.downloads ?? {
    source: {
      file: `${slug}.7z`,
      format: 'Source engine',
      size: skyboxData.fileSize,
    }
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-6"
        >
          <img 
            src={withBase(`/icons/back.svg`)} 
            alt="" 
            className="invert w-5 h-5 mr-2" 
          />
          Back to all skyboxes
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {slug}
            </h1>
            <div className="mt-2 space-y-1">
              {skyboxData.author && (
                <p className="text-lg text-neutral-300">
                  Created by <span className="text-blue-400">{skyboxData.author}</span>
                </p>
              )}
              {skyboxData.license && (
                <p className="text-sm text-neutral-400">
                  License:{' '}
                  <a 
                    href={`https://creativecommons.org/licenses/by/4.0/deed.en`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {skyboxData.license}
                  </a>
                  {skyboxData.publishDate && (
                    <span className="text-neutral-500 text-xs ml-2">
                      • Published {publishDate}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {Object.entries(downloads).map(([kind, d]) => (
              <DownloadButton
                key={d.file}
                href={downloadHref(kind, d.file)}
                format={d.format}
                size={d.size}
                className="flex-1 sm:flex-none"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <img
              src={`${imgBase}/previews/${activeImage}.webp`}
              alt={`${slug} skybox preview ${activeImage}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            
          </div>
          
          {/* Thumbnail Grid */}
          <div className="grid grid-cols-6 gap-2">
            {previews.map((num) => (
              <button
                key={num}
                onClick={() => setActiveImage(num)}
                className={`aspect-square rounded-lg overflow-hidden transition-all ${
                  activeImage === num 
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-neutral-900 transform scale-105' 
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={`${imgBase}/previews/${num}.webp`}
                  alt={`Preview ${num}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar with Details */}
        <div className="space-y-8">
          {/* Description */}
          {/*
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800">
            <h2 className="text-xl font-semibold text-white mb-4">About this Skybox</h2>
            {skyboxData.description ? (
              <p className="text-neutral-300 leading-relaxed">{skyboxData.description}</p>
            ) : (
              <p className="text-neutral-500 italic">No description available.</p>
            )}
          </div>
          */}

          {/* Technical Details 
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800">
            <h2 className="text-xl font-semibold text-white mb-4">Technical Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-400">Resolution</p>
                <p className="text-white">{skyboxData.resolution || '4096x4096'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">File Size</p>
                <p className="text-white">{skyboxData.fileSize || '~50MB'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Format</p>
                <p className="text-white">.vtf/.vmt</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Compatibility</p>
                <p className="text-white">Source Engine</p>
              </div>
            </div>
          </div>
          */}

          {/* Sun Parameters */}
          {skyboxData.sunParameters && (
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800">
              <h2 className="text-xl font-semibold text-white mb-4">Sun Parameters</h2>
              <SunParams {...skyboxData.sunParameters} />
            </div>
          )}

          {/* Fog Parameters */}
          {skyboxData.fogParameters && (
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800">
              <h2 className="text-xl font-semibold text-white mb-4">Fog Parameters</h2>
              <FogParams {...skyboxData.fogParameters} />
            </div>
          )}


        </div>
      </div>

      {/* Featured Maps */}
      {skyboxData.steamMaps && skyboxData.steamMaps.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Featured in these maps
          </h2>
          <MapList maps={skyboxData.steamMaps} />
        </div>
      )}
    </div>
  );
}
