/* app/ui/sort-select.tsx */
'use client';

type SortOption = 'alpha' | 'alpha-desc' | 'published-date-desc' | 'published-date-asc';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="
        h-8 rounded-md bg-neutral-800/70
        px-2 py-1 text-xs
        focus:outline-none focus:ring-2 focus:ring-amber-500
      "
    >
      <option value="published-date-desc">Newest</option>
      <option value="alpha">Name A → Z</option>
      <option value="alpha-desc">Name Z → A</option>
      <option value="published-date-asc">Oldest</option>
    </select>
  );
}