
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
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {groupedSkyboxes.map(({ title, slugs }: { title: string; slugs: string[] }) => (
          <section key={title} className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
              <h2 className="flex items-center pl-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-2xl md:text-3xl font-bold">
                  {title} Skies
                </span>
                <span className="ml-4 text-sm md:text-base font-normal text-neutral-400 bg-neutral-800/50 px-3 py-1.5 rounded-full inline-flex items-center h-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                  {slugs.length} {slugs.length === 1 ? 'Skybox' : 'Skyboxes'}
                </span>
              </h2>
              <p className="mt-2 text-sm text-neutral-400 pl-6 max-w-2xl">
                Browse the collection of {title.toLowerCase()} skyboxes for your next project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {slugs.map((slug: string) => (
                <SkyboxCard key={slug} slug={slug} meta={meta[slug] || {}} />
              ))}
            </div>
            {/*
            {slugs.length > 4 && (
              <div className="text-center pt-4">
                <button className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  View all {slugs.length} {title.toLowerCase()} skies
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
            */}
          </section>
        ))}
      </div>
    </div>
  );
}
