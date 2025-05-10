'use client';

import { useState, ReactNode } from 'react';

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
}

export function Tabs({ items, defaultValue }: TabsProps) {
  const [active, setActive] = useState(
    defaultValue ?? items[0]?.value
  );

  return (
    <div className="w-full">
      {/* Full-width tab bar with equal-width buttons */}
      <div className="flex w-full divide-x divide-neutral-700/60 rounded-md">
        {items.map(({ value, label }) => {
          const isActive = value === active;
          return (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`
                flex-1
                px-4 py-1.5
                text-sm font-medium
                text-center
                transition
                ${isActive
                  ? 'bg-neutral-700 text-neutral-100 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div className="mt-4">
        {items.map(({ value, content }) =>
          value === active ? (
            <div key={value} className="animate-fade-in">
              {content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
