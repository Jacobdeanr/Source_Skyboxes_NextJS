'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const profileLinks = [
  {
    href: "https://github.com/Jacobdeanr",
    label: "GitHub",
    svgPath: "Source_Skyboxes_NextJS/icons/github-mark-white.svg",
  },
  {
    href: "https://discord.gg/grqAfezMVs",
    label: "Discord",
    svgPath: "Source_Skyboxes_NextJS/icons/discord-symbol-white.svg",
  },
  {
    href: "https://steamcommunity.com/id/Jakobi_OBrien",
    label: "Steam",
    svgPath: "Source_Skyboxes_NextJS/icons/steam-logo.svg",
  },
];

function IconLink({
  href,
  label,
  svgPath,
}: {
  href: string;
  label: string;
  svgPath: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="
        flex items-center justify-center
        p-2 rounded-md
        bg-neutral-800/70 hover:bg-neutral-800
        focus:outline-none focus:ring-2 focus:ring-amber-500
      "
    >
      <Image src={svgPath} alt={label} width={24} height={24} />
    </a>
  );
}

function MoreMenu() {
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
            {profileLinks.map((link) => (
              <IconLink key={link.label} href={link.href} label={link.label} svgPath={link.svgPath} />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

interface HeaderProps {
  onChange: (opts: {
    sort: 'alpha' | 'alpha-desc' | 'published-date-desc' | 'published-date-asc';
    query: string;
  }) => void;
}

export default function Header({ onChange }: HeaderProps) {
  const [sort, setSort] = useState<'alpha' | 'alpha-desc' | 'published-date-desc' | 'published-date-asc'>('published-date-desc');
  const [query, setQuery] = useState('');

  useEffect(() => onChange({ sort, query }), [sort, query, onChange]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-neutral-900/70 border-b border-neutral-800/60">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
        {/* title */}
        <h1 className="text-lg sm:text-2xl font-bold tracking-wide whitespace-nowrap select-none">
          Jacob Robbins&rsquo; <span className="font-light">Skybox&nbsp;Library</span>
        </h1>

        {/* right side (search/sort/icons) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* search + sort: desktop only */}
          <div className="hidden sm:flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-48 rounded-md bg-neutral-800/70 px-3 py-1.5 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="rounded-md bg-neutral-800/70 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="published-date-desc">Newest</option>
              <option value="alpha">Name A → Z</option>
              <option value="alpha-desc">Name Z → A</option>
              <option value="published-date-asc">Oldest</option>
            </select>
          </div>

          {/* inline icons ≥640 px */}
          <nav className="hidden sm:flex items-center gap-2">
            {profileLinks.map((link) => (
              <IconLink key={link.label} href={link.href} label={link.label} svgPath={link.svgPath} />
            ))}
          </nav>

          {/* 3-dot menu on mobile */}
          <MoreMenu />
        </div>
      </div>
    </header>
  );
}
