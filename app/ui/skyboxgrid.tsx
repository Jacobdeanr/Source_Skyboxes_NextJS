'use client';

import { useMemo, useState } from 'react';
import SkyboxCard from './skyboxcard';
import Header from './header';

export default function SkyboxGrid({ slugs }: { slugs: string[] }) {
  const [options, setOptions] = useState<{ sort: string; query: string }>({
    sort: 'alpha',
    query: '',
  });

  const visible = useMemo(() => {
    let list = [...slugs];

    if (options.query) {
      const q = options.query.toLowerCase();
      list = list.filter((s) => s.toLowerCase().includes(q));
    }

    if (options.sort === 'date') {
      list.sort().reverse(); // slug folders are ISO dates? adjust as needed
    } else {
      list.sort();
    }
    return list;
  }, [slugs, options]);

  return (
    <>
      <Header onChange={setOptions} />

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
          <SkyboxCard key={slug} slug={slug} />
        ))}
      </section>
    </>
  );
}
