'use client';

import type { ComponentPropsWithoutRef } from 'react';

interface DownloadButtonProps extends ComponentPropsWithoutRef<'a'> {
  label?: string;
  format?: string;
  size?: string;
}

export default function DownloadButton({
  label = 'Download',
  format,
  size,
  className = '',
  ...anchorProps
}: DownloadButtonProps) {
  return (
    <a
      {...anchorProps}
      className={`
        inline-flex items-center gap-3
        rounded-lg
        bg-gradient-to-r from-yellow-400 to-amber-500
        px-5 py-2
        font-semibold text-neutral-900
        shadow-md shadow-black/40
        ring-1 ring-inset ring-yellow-500/40
        transition
        hover:brightness-110 hover:shadow-lg
        active:scale-95
        ${className}
      `}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-5 h-5 fill-current shrink-0"
      >
        <path d="M12 3a1 1 0 0 1 1 1v9.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42L11 13.59V4a1 1 0 0 1 1-1z" />
        <path d="M5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" />
      </svg>

      <span className="whitespace-nowrap">
        {label}
        {(format || size) && (
          <span className="font-normal">
            {' '}
            ( {format ?? ''}
            {format && size ? ' • ' : ''}
            {size ?? ''}
            )
          </span>
        )}
      </span>
    </a>
  );
}
