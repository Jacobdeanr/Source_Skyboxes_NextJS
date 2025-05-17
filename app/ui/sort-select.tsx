'use client';

import { SortOption } from './sort-types';

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
      <option value="time-of-day">Time of Day</option>
      <option value="weather-conditions">Weather Conditions</option>
    </select>
  );
}