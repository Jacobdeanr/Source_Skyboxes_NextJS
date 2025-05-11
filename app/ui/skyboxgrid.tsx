'use client';

import { useEffect, useMemo, useState } from 'react';
import Header from './header';
import SkyboxCard from './skyboxcard';

type Summary = {
  slug: string;
  name: string;
  author?: string;
  categories?: string[];
  publishDate?: string;
};

export default function SkyboxGrid() {
  const [index, setIndex] = useState<Summary[]>([]);
  const [options, setOptions] = useState<{ sort: string; query: string }>({
    sort: 'alpha',
    query: '',
  });

  // fetch once on mount
  useEffect(() => {
    fetch('/Source_Skyboxes_NextJS/data/index.json')
      .then((r) => r.json())
      .then(setIndex);
  }, []);

  const visible = useMemo(() => {
    let list = [...index];

    // search across slug + name + author + categories
    if (options.query) {
      const q = options.query.toLowerCase();
      list = list.filter(
        ({ slug, name, author, categories }) =>
          slug.toLowerCase().includes(q) ||
          name.toLowerCase().includes(q) ||
          author?.toLowerCase().includes(q) ||
          categories?.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (options.sort === 'date') {
      list.sort((a, b) => (b.publishDate ?? '').localeCompare(a.publishDate ?? ''));
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [index, options]);

  return (
    <>
      <Header onChange={setOptions} />

      <section className="grid gap-4 pt-6 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] …">
        {visible.map(({ slug }) => (
          <SkyboxCard key={slug} slug={slug} />
        ))}
      </section>
    </>
  );
}
