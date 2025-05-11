'use client';

import { useMemo, useState } from 'react';
import SkyboxCard from './skyboxcard';
import Header from './header';

export default function SkyboxGrid({
  slugs,
  meta,
}: {
  slugs: string[];
  meta: Record<string, any>;
}) {
  const [filter, setFilter] = useState<{ sort: string; query: string }>({
    sort: 'alpha',
    query: '',
  });

  const visible = useMemo(() => {
    let list = [...slugs];
    if (filter.query) {
      const q = filter.query.toLowerCase();
      list = list.filter((s) => s.includes(q));
    }
    if (filter.sort === 'date') list.sort().reverse();
    else list.sort();

    return list;
  }, [slugs, filter]);

  return (
    <>
      <Header onChange={setFilter} />

      <section
        className="
          grid gap-4 pt-6
          grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]
          sm:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]
          lg:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]
          2xl:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]
          px-4 sm:px-6 lg:px-8
        "
      >
        {visible.map((slug) => (
          <SkyboxCard key={slug} slug={slug} meta={meta[slug]} />
        ))}
      </section>
    </>
  );
}
