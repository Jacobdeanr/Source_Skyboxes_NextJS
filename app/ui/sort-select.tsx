'use client';

import { SortOption } from './sort-types';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="
          w-full h-10 pl-4 pr-10 appearance-none
          rounded-lg bg-neutral-800/50 border border-neutral-700/50
          text-sm text-neutral-200
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
          transition-all duration-200 hover:bg-neutral-800/70
          cursor-pointer
        "
      >
        <option value="time-of-day">Sort: Time of Day</option>
        <option value="weather-conditions">Sort: Weather Conditions</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}