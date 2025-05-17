
import { useMemo } from 'react';
import SkyboxCard from './skyboxcard';

// Define the SortOption type matching the one in header.tsx / page.tsx
import { SortOption } from './sort-types';

const TIME_OF_DAY_ORDER = ['Morning', 'Afternoon', 'Evening', 'Night', 'Other'];
const WEATHER_CONDITIONS_ORDER = ['Clear', 'Cloudy', 'Hazy', 'Overcast', 'Other'];

export default function SkyboxGrid({
  slugs,
  meta,
  sort = 'time-of-day',
  query,
}: {
  slugs: string[];
  meta: Record<string, any>;
  sort?: SortOption;
  query: string;
}) {
  const visible = useMemo(() => {
    let list = [...slugs];
    // Filter based on query prop
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((s) => s.includes(q) || meta[s]?.title?.toLowerCase().includes(q));
    }
    return list;
  }, [slugs, meta, query]);

  // Group skyboxes by time of day or weather conditions
  const groupedSkyboxes = useMemo(() => {
    console.log(sort);
    if (sort === 'time-of-day') {
      const groups: Record<string, string[]> = {};

      visible.forEach((slug) => {
        const timeOfDay = meta[slug]?.timeOfDay || 'Other';
        if (!groups[timeOfDay]) {
          groups[timeOfDay] = [];
        }
        groups[timeOfDay].push(slug);
      });

      // Sort groups by predefined time of day order
      return TIME_OF_DAY_ORDER
        .filter(time => groups[time])
        .map(time => ({ title: time, slugs: groups[time] }));
    } else {
      const groups: Record<string, string[]> = {};

      visible.forEach((slug) => {
        const weatherCondition = meta[slug]?.weatherCondition || 'Other';
        if (!groups[weatherCondition]) {
          groups[weatherCondition] = [];
        }
        groups[weatherCondition].push(slug);
      });

      // Sort groups by predefined weather conditions order
      return WEATHER_CONDITIONS_ORDER
        .filter(weather => groups[weather])
        .map(weather => ({ title: weather, slugs: groups[weather] }));
    }
  }, [visible, meta, sort]);

  return (
    <div className="space-y-8 mx-auto px-4 py-8">
      {groupedSkyboxes.map(({ title, slugs }) => (
        <div key={title}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-neutral-200">{title} Skies</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {slugs.map((slug) => (
              <SkyboxCard key={slug} slug={slug} meta={meta[slug]} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
