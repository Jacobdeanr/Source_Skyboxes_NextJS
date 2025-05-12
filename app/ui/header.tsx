/* app/ui/header.tsx */
'use client';

import type { Dispatch, SetStateAction } from 'react';

import IconLink from './iconlink';
import MoreMenu from './moremenu';
import { profileLinks } from './profile-links';

import SortSelect from './sort-select';

type SortOption = 'alpha' | 'alpha-desc' | 'published-date-desc' | 'published-date-asc';

/* ------------------ main header ------------------ */
interface HeaderProps {
  sort: SortOption;
  setSort: Dispatch<SetStateAction<SortOption>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function Header({ sort, setSort, query, setQuery }: HeaderProps) {

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-900/70 border-b border-neutral-800/60">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
          {/* title */}
          <h1 className="text-lg sm:text-2xl font-bold tracking-wide whitespace-nowrap select-none">
            Jacob Robbins&rsquo; <span className="font-light">Skybox&nbsp;Library</span>
          </h1>

        {/* right-side cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search + Sort: Desktop (>= sm) */}
          <div className="hidden sm:flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="
                flex-auto min-w-0 max-w-[40vw]
                rounded-md bg-neutral-800/70
                px-3 py-1.5 text-sm placeholder:text-neutral-500
                focus:outline-none focus:ring-2 focus:ring-amber-500
              "
            />
            {/* SortSelect visible md and up */}
            <div className="hidden md:block">
              <SortSelect value={sort} onChange={setSort} />
            </div>
          </div>

          {/* Icons: Desktop (lg and up) */}
          <nav className="hidden lg:flex items-center gap-2">
            {profileLinks.map((l) => (
              <IconLink key={l.label} {...l} />
            ))}
          </nav>

          {/* More Menu Button: Mobile-only (< sm) */}
          {/* TODO: Consider moving Search/Sort/Profile Links into MoreMenu content for mobile */}
          <div className="sm:hidden">
            <MoreMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
