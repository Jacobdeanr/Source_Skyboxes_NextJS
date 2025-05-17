'use client';

import { useState } from 'react';

import Header from './ui/header';
import SkyboxGrid from './ui/skyboxgrid';

import { SortOption } from './ui/sort-types';

interface HomeClientProps {
  slugs: string[];
  meta: Record<string, any>;
}

export default function HomeClient({ slugs, meta }: HomeClientProps) {
  const [sort, setSort] = useState<SortOption>('time-of-day');
  const [query, setQuery] = useState('');

  return (
    <main>
      <Header
        sort={sort}
        setSort={setSort}
        query={query}
        setQuery={setQuery}
      />
      <SkyboxGrid slugs={slugs} meta={meta} sort={sort} query={query} />
    </main>
  );
}
