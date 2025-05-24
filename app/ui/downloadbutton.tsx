'use client';

import type { ComponentPropsWithoutRef } from 'react';

interface DownloadButtonProps extends ComponentPropsWithoutRef<'a'> {
  label?: string;
  format?: string;
  size?: string;
}

export default function DownloadButton({
  label = 'Download Skybox',
  format,
  size,
  className = '',
  ...anchorProps
}: DownloadButtonProps) {
  return (
    <a
      {...anchorProps}
      className={`
        group relative
        inline-flex items-center justify-center
        gap-2.5
        rounded-lg
        bg-gradient-to-br from-blue-600/90 to-purple-600/90
        px-5 py-2.5
        text-sm font-medium text-white
        shadow-md shadow-blue-500/20
        transition-all duration-200
        hover:shadow-lg hover:shadow-blue-500/30
        hover:brightness-110
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900
        active:scale-[0.98]
        ${className}
      `}
    >
      {/* Shine effect on hover */}
      <span 
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 via-transparent to-transparent 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
      
      <span className="relative flex items-center gap-2">
        <img 
          src="/Source_Skyboxes_NextJS/icons/download.svg" 
          alt="" 
          className="w-4 h-4 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity invert brightness-0"
        />
        <span className="whitespace-nowrap font-medium">
          {label}
          {(format || size) && (
            <span className="font-normal opacity-90 ml-1.5">
              ({format ?? ''}
              {format && size ? ' • ' : ''}
              {size ?? ''})
            </span>
          )}
        </span>
      </span>
    </a>
  );
}
