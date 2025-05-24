'use client';

import { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

interface ViewDetailsButtonProps extends ComponentPropsWithoutRef<typeof Link> {
  label?: string;
  href: string;
}

export default function ViewDetailsButton({
  label = 'View Details',
  className = '',
  ...linkProps
}: ViewDetailsButtonProps) {
  return (
    <Link
      {...linkProps}
      className={`
        group relative
        inline-flex items-center justify-center
        rounded-lg
        bg-neutral-800/80
        hover:bg-neutral-700/80
        px-4 py-2
        text-sm font-medium text-white
        ring-1 ring-inset ring-neutral-700/50
        transition-all duration-150
        hover:ring-neutral-600/70
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900
        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        <img src="/Source_Skyboxes_NextJS/icons/maximize.svg" alt="" className="invert w-3 h-3 text-neutral-300 group-hover:text-white transition-colors " />
        {label}
      </div>
    </Link>
  );
}
