'use client';

import Image from 'next/image';
import Modal from './modal';
import { useState } from 'react';

import type { Sun } from './sunparameters';

interface SkyboxCardProps {
  slug: string;
  meta: {
    title?: string;
    timeOfDay?: string;
    weatherCondition?: string;
    sunParameters?: Sun;
  };
}

export default function SkyboxCard({ slug, meta }: SkyboxCardProps) {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;
  
  const displayTitle = meta?.title || slug

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="group relative block w-full h-full overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
        aria-label={`View ${displayTitle} skybox`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {/* Background image with smooth zoom effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url(${imgBase}/thumbnail.webp)`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1.0)',
            }}
          >
            <Image
              src={`${imgBase}/thumbnail.webp`}
              alt=""
              fill
              className="opacity-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
              aria-hidden="true"
            />
          </div>
          
          {/* Gradient overlay - bottom only */}
          <div className={[
            'absolute bottom-0 left-0 right-0 h-1/2 z-0',
            'transition-opacity duration-300',
            'bg-gradient-to-t from-black/80 to-transparent',
            'opacity-100', // Always visible on mobile
            'sm:opacity-0 sm:group-hover:opacity-100' // Hidden on desktop, show on hover
          ].join(' ')} />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
            <div className={[
              'transform transition-all duration-300',
              'sm:translate-y-2 sm:opacity-0',
              'sm:group-hover:translate-y-0 sm:group-hover:opacity-100',
              'space-y-1',
              // Always show on mobile, only animate on desktop
              isHovered ? 'translate-y-0' : 'translate-y-2',
              isHovered ? 'opacity-100' : 'opacity-0',
              'sm:opacity-0 sm:group-hover:opacity-100'
            ].join(' ')}>
              <h2 className="text-sm font-semibold text-white line-clamp-2">
                {displayTitle}
              </h2>
              {/*
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                {meta?.sunParameters?.pitch !== undefined && (
                  <span className="inline-flex items-center" title="Pitch">
                    <svg className="w-3 h-3 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    {meta.sunParameters.pitch}°
                  </span>
                )}
                {meta?.sunParameters?.sunAngle !== undefined && (
                  <span className="inline-flex items-center" title="Sun Angle">
                    <svg className="w-3 h-3 mr-1 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {meta.sunParameters.sunAngle}°
                  </span>
                )}
              </div>
              */}
            </div>
            
            {/* Always visible title on mobile */}
            <h2 className="text-sm font-semibold text-white sm:hidden mt-1">
              {displayTitle}
            </h2>
          </div>
          
          {/* Hover indicator */}
          <div className={[
            'absolute inset-0 border-2 border-transparent rounded-xl',
            'transition-all duration-300',
            isHovered ? 'border-white/20' : ''
          ].join(' ')} />
        </div>
      </button>

      {open && <Modal slug={slug} onClose={() => setOpen(false)} />}
    </>
  );
}
