/* app/ui/header.tsx */
'use client';

import type { Dispatch, SetStateAction } from 'react';

import IconLink from './iconlink';
import MoreMenu from './moremenu';
import { profileLinks } from './profile-links';

import SortSelect from './sort-select';

import { SortOption } from './sort-types';

/* ------------------ main header ------------------ */
interface HeaderProps {
  sort: SortOption;
  setSort: Dispatch<SetStateAction<SortOption>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function Header({ sort, setSort, query, setQuery }: HeaderProps) {

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-neutral-900/95 via-neutral-900/90 to-neutral-900/95 border-b border-neutral-800/50 backdrop-blur-sm">
      <div className="mx-auto max-w-[1800px] flex items-center justify-between gap-4 px-4 sm:px-6 h-16">
        {/* Clean title with gradient */}
        <div className="group">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Jacob Robbins' Skybox Library</span>
          </h1>
        </div>

        {/* Right-side cluster with enhanced search */}
        <div className="flex justify-end items-center gap-2 sm:gap-4">
          {/* Enhanced Search + Sort */}
          <div className="hidden sm:flex items-center gap-3 bg-neutral-800/30 backdrop-blur-sm rounded-xl p-1 border border-neutral-800/50">
            <div className="relative flex-1 max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skyboxes…"
                className="block w-full rounded-lg border-0 bg-neutral-800/20 py-2.5 pl-10 pr-4 text-sm text-neutral-200 placeholder-neutral-500 ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all duration-200 hover:bg-neutral-800/40"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="h-6 w-px bg-neutral-700/50" />
            
            {/* Sort */}
            {/* SortSelect visible md and up */}
            <div className="hidden md:block w-48">
              <SortSelect value={sort} onChange={setSort} />
            </div>
          </div>

          {/* Icons: Desktop (lg and up) */}
          <nav className="hidden lg:flex items-center gap-2">
            {profileLinks.map((l) => (
              <IconLink key={l.label} {...l} />
            ))}
          </nav>

          {/* More Menu Button: Visible below lg */}
          {/* Contains items hidden from the main bar at smaller breakpoints */}
          <div className="lg:hidden flex-shrink-0">
            <MoreMenu
              profileLinks={profileLinks}
              sort={sort}
              setSort={setSort}
              query={query}
              setQuery={setQuery}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
