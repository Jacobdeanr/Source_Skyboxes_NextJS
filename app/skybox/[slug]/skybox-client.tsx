'use client';

import { useState } from 'react';
import Link from 'next/link';
import SunParams from '@/app/ui/sunparameters';
import FogParams from '@/app/ui/fogparameters';
import MapList from '@/app/ui/maplist';
import DownloadButton from '@/app/ui/downloadbutton';
import TechnicalDetails from '@/app/ui/technical-details';

interface SkyboxClientProps {
  slug: string;
  skyboxData: any;
  previewCount: number;
}

export default function SkyboxClient({ slug, skyboxData, previewCount }: SkyboxClientProps) {
  const [activeImage, setActiveImage] = useState(1);
  console.log(activeImage)
  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;
  // Generate array of preview numbers based on previewCount
  const previews = Array.from({ length: previewCount }, (_, i) => i + 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Back Button */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-6"
        >
          <img 
            src="/Source_Skyboxes_NextJS/icons/back.svg" 
            alt="" 
            className="invert w-5 h-5 mr-2" 
          />
          Back to all skyboxes
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {/*{slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}*/}
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
                    href={`https://creativecommons.org/licenses/${skyboxData.license.toLowerCase().replace(' ', '-')}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {skyboxData.license}
                  </a>
                  {skyboxData.publishDate && (
                    <span className="text-neutral-500 text-xs ml-2">
                      • Published {new Date(skyboxData.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          <DownloadButton
            href={`/Source_Skyboxes_NextJS/skyboxes/${slug}/downloads/${slug}.7z`}
            download
            size={skyboxData.fileSize}
            className="w-full md:w-auto"
          />
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white text-sm">Preview angle: {activeImage}/{previews.length}</p>
            </div>
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

          {/* Technical Details */}
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

          {/* Categories 
          {skyboxData.categories?.length > 0 && (
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800">
              <h2 className="text-xl font-semibold text-white mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {skyboxData.categories.map((category: string) => (
                  <span 
                    key={category} 
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium 
                             bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-200
                             border border-blue-800/30 hover:border-blue-600/50 transition-all cursor-pointer
                             hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-purple-800/50"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
            */}


        </div>
      </div>

      {/* Featured Maps */}
      {skyboxData.steamMaps && skyboxData.steamMaps.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured in these maps
            </h2>
          </div>
          <MapList maps={skyboxData.steamMaps} />
        </div>
      )}
    </div>
  );
}
