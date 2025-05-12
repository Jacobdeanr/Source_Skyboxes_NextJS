/* app/ui/moremenu.tsx */
'use client';

import { useState } from 'react';
import IconLink from './iconlink';
import { profileLinks } from './profile-links';

export default function MoreMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open links"
        className="sm:hidden p-2 rounded-md bg-neutral-800/70 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neutral-300">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-md bg-neutral-900 shadow-lg ring-1 ring-neutral-700/60">
          <nav className="flex flex-col divide-y divide-neutral-700/60">
            {profileLinks.map((l) => (
              <IconLink key={l.label} {...l} />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
