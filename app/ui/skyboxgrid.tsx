
import { useMemo } from 'react';
import SkyboxCard from './skyboxcard';

// Define the SortOption type matching the one in header.tsx / page.tsx
type SortOption = 'alpha' | 'alpha-desc' | 'published-date-desc' | 'published-date-asc';

export default function SkyboxGrid({
  slugs,
  meta,
  sort,
  query,
}: {
  slugs: string[];
  meta: Record<string, any>;
  sort: SortOption;
  query: string;
}) {

  const visible = useMemo(() => {
    let list = [...slugs];
    // Filter based on query prop
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((s) => s.includes(q) || meta[s]?.title?.toLowerCase().includes(q));
    }
    // Sort based on sort prop
    switch (sort) {
      case 'alpha-desc':
        list.sort().reverse(); // Z-A
        break;
      case 'published-date-desc': // Newest to Oldest
        list.sort((a, b) => {
          const dateA = meta[a]?.publishDate ? new Date(meta[a].publishDate).getTime() : 0;
          const dateB = meta[b]?.publishDate ? new Date(meta[b].publishDate).getTime() : 0;
          return dateB - dateA; // Sorts undefined/null dates to the end (as oldest)
        });
        break;
      case 'published-date-asc': // Oldest to Newest
        list.sort((a, b) => {
          const dateA = meta[a]?.publishDate ? new Date(meta[a].publishDate).getTime() : Number.MAX_SAFE_INTEGER;
          const dateB = meta[b]?.publishDate ? new Date(meta[b].publishDate).getTime() : Number.MAX_SAFE_INTEGER;
          return dateA - dateB; // Sorts undefined/null dates to the end (as newest)
        });
        break;
      case 'alpha': // A-Z
      default:
        list.sort();
        break;
    }

    return list; // Add this line back
  }, [slugs, meta, query, sort]); // Update dependencies

  return (
    // Correctly render only the grid section
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
  );
}
