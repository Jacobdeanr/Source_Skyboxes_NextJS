'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  onChange: (opts: { sort: 'alpha' | 'alpha-desc' | 'published-date-desc' | 'published-date-asc'; query: string }) => void;
}

export default function Header({ onChange }: HeaderProps) {
  const [sort, setSort]   = useState<'alpha' | 'alpha-desc' | 'published-date-desc' | 'published-date-asc'>('published-date-desc');
  const [query, setQuery] = useState('');

  useEffect(() => onChange({ sort, query }), [sort, query, onChange]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-900/70 border-b border-neutral-800/60">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
        {/* title */}
        <h1 className="text-lg sm:text-2xl font-bold tracking-wide whitespace-nowrap select-none">
          Jacob Robbins&rsquo; <span className="font-light">Skybox&nbsp;Library</span>
        </h1>

        {/* controls */}
        <div className="hidden sm:flex items-center gap-3 w-full sm:w-auto">
          {/* search */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="
              flex-auto min-w-0
              w-48
              rounded-md bg-neutral-800/70
              px-3 py-1.5 text-sm
              placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-amber-500
            "
          />

          {/* sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="
              flex-none
              rounded-md bg-neutral-800/70
              px-3 py-1.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-amber-500
            "
          >
            <option value="published-date-desc">Published Date (Newest)</option>
            <option value="alpha">Name (A → Z)</option>
            <option value="alpha-desc">Name (Z → A)</option>
            <option value="published-date-asc">Published Date (Oldest)</option>
          </select>
        </div>
      </div>
    </header>
  );
}
