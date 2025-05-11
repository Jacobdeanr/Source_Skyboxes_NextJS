'use client';

import { useEffect, useState } from 'react';

interface HeaderProps {
  /** callback when the user changes filter/sort */
  onChange: (opts: { sort: string; query: string }) => void;
}

export default function Header({ onChange }: HeaderProps) {
  const [sort,  setSort]  = useState<'alpha' | 'date'>('alpha');
  const [query, setQuery] = useState('');

  // inform parent whenever options change
  useEffect(() => onChange({ sort, query }), [sort, query, onChange]);

  return (
    <header
      className="
        sticky top-0 z-40
        backdrop-blur-md bg-neutral-900/70
        border-b border-neutral-800/60
      "
    >
      <div
        className="
          mx-auto max-w-6xl
          flex items-center justify-between
          px-4 sm:px-6
          h-16
        "
      >
        {/* site title */}
        <h1 className="text-lg sm:text-2xl font-bold tracking-wide whitespace-nowrap select-none">
          Jacob Robbins&rsquo; <span className="font-light">Skybox&nbsp;Library</span>
        </h1>

        {/* right-side controls */}
        <div className="flex items-center gap-3">
          {/* search */}
          <input
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-32 sm:w-48
              rounded-md bg-neutral-800/70 px-3 py-1.5 text-sm
              placeholder:text-neutral-500
              focus:outline-none focus:ring-2 focus:ring-amber-500
            "
          />

          {/* sort dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="
              rounded-md bg-neutral-800/70 px-3 py-1.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-amber-500
            "
          >
            <option value="alpha">A → Z</option>
            <option value="date">Newest</option>
          </select>
        </div>
      </div>
    </header>
  );
}
