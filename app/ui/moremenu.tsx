/* app/ui/moremenu.tsx */
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import IconLink from './iconlink';
import SortSelect from './sort-select';

// Types matching those in Header/Page
import { SortOption } from './sort-types';
interface ProfileLink {
  href: string;
  label: string;
  svg: string;
}

interface MoreMenuProps {
  profileLinks: ProfileLink[];
  sort: SortOption;
  setSort: Dispatch<SetStateAction<SortOption>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function MoreMenu({ profileLinks, sort, setSort, query, setQuery }: MoreMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
        className="p-2 rounded-md bg-neutral-800/70 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500 lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neutral-300">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-neutral-900 shadow-lg ring-1 ring-neutral-700/60 z-50">
          <div className="flex flex-col p-2 gap-2 divide-y divide-neutral-700/60">

            {/* Search Input - Shown below sm */}
            <div className="sm:hidden px-2 pt-1 pb-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-md bg-neutral-800 px-3 py-1.5 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Sort Select - Shown below md */}
            <div className="md:hidden px-2 pt-2 pb-1">
              <label className="block text-xs text-neutral-400 mb-1">Sort by:</label>
              <SortSelect value={sort} onChange={setSort} />
            </div>

            {/* Profile Links - Shown below lg */}
            <nav className="lg:hidden flex flex-col pt-2">
              {profileLinks.map((l) => (
                <IconLink key={l.label} {...l} menuMode={true} />
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
