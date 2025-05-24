
import { useMemo, ReactElement } from 'react';
import SkyboxCard from './skyboxcard';

// Define the SortOption type matching the one in header.tsx / page.tsx
import { SortOption } from './sort-types';

// Import Sun type from SunParams component
import type { Sun } from './sunparameters';

const TIME_OF_DAY_ORDER = ['Morning', 'Afternoon', 'Evening', 'Night', 'Other'];
const WEATHER_CONDITIONS_ORDER = ['Clear', 'Cloudy', 'Hazy', 'Overcast', 'Other'];

// Helper types
interface SkyboxMeta {
  timeOfDay?: string;
  weatherCondition?: string;
  sunParameters?: Sun;
  title?: string;
}

// Helper functions
function getSkyboxCategory(slug: string, meta: Record<string, SkyboxMeta>, category: 'timeOfDay' | 'weatherCondition'): string {
  return meta[slug]?.[category] || 'Other';
}

function filterByQuery(slugs: string[], meta: Record<string, SkyboxMeta>, query: string): string[] {
  if (!query) return slugs;
  const q = query.toLowerCase();
  return slugs.filter(slug => 
    slug.includes(q) || 
    meta[slug]?.title?.toLowerCase().includes(q)
  );
}

function sortSkyboxesByPitch(slugs: string[], meta: Record<string, SkyboxMeta>): string[] {
  const sortedSlugs = [...slugs];
  return sortedSlugs.sort((slugA, slugB) => {
    const pitchA = meta[slugA]?.sunParameters?.pitch;
    const pitchValueA = pitchA !== undefined 
      ? (typeof pitchA === 'string' ? parseFloat(pitchA) : pitchA)
      : 0;
    const pitchB = meta[slugB]?.sunParameters?.pitch;
    const pitchValueB = pitchB !== undefined 
      ? (typeof pitchB === 'string' ? parseFloat(pitchB) : pitchB)
      : 0;
    const absPitchA = Math.abs(pitchValueA);
    const absPitchB = Math.abs(pitchValueB);
    return absPitchB - absPitchA;
  });
}

// Helper function to group skyboxes by category
function groupSkyboxes(
  slugs: string[], 
  meta: Record<string, SkyboxMeta>,
  category: 'timeOfDay' | 'weatherCondition'
): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  
  slugs.forEach(slug => {
    const categoryValue = getSkyboxCategory(slug, meta, category);
    if (!groups[categoryValue]) {
      groups[categoryValue] = [];
    }
    groups[categoryValue].push(slug);
  });

  return groups;
}

function groupAndSortSkyboxes(
  slugs: string[], 
  meta: Record<string, SkyboxMeta>,
  category: 'timeOfDay' | 'weatherCondition'
): { title: string; slugs: string[] }[] {
  const groups = groupSkyboxes(slugs, meta, category);
  const order = category === 'timeOfDay' ? TIME_OF_DAY_ORDER : WEATHER_CONDITIONS_ORDER;
  return order
    .filter(cat => groups[cat])
    .map(cat => ({
      title: cat,
      slugs: sortSkyboxesByPitch(groups[cat], meta)
    }));
}

export default function SkyboxGrid({
  slugs,
  meta,
  sort = 'time-of-day',
  query,
}: {
  slugs: string[];
  meta: Record<string, SkyboxMeta>;
  sort?: SortOption;
  query: string;
}): ReactElement {
  const visible = useMemo(() => filterByQuery(slugs, meta, query), [slugs, meta, query]);

  // Group skyboxes by time of day or weather conditions
  const groupedSkyboxes = useMemo(() => {
    return groupAndSortSkyboxes(
      visible,
      meta,
      sort === 'time-of-day' ? 'timeOfDay' : 'weatherCondition'
    );
  }, [visible, meta, sort]);

  return (
    <div className="space-y-8 mx-auto px-4 py-8">
      {groupedSkyboxes.map(({ title, slugs }: { title: string; slugs: string[] }) => (
        <div key={title}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-neutral-200">{title} Skies</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {slugs.map((slug: string) => (
              <SkyboxCard key={slug} slug={slug} meta={meta[slug]} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
