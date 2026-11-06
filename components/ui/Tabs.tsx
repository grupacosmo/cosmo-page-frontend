'use client';

import { useId, useState, type ReactNode } from 'react';

export interface TabItem {
  label: string;
  content: ReactNode;
}

// Trapezoid tab shapes: first/last are slanted on one side, middle tabs on both.
function tabShape(index: number, count: number): string {
  if (index === 0) return '[clip-path:polygon(0_0,90%_0,100%_100%,0%_100%)] rounded-tl-[15px]';
  if (index === count - 1) return '[clip-path:polygon(0_0,100%_0,100%_100%,10%_100%)] rounded-tr-[15px]';
  return '[clip-path:polygon(0_0,90%_0,100%_100%,10%_100%)]';
}

export function Tabs({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <div className="flex w-full flex-col">
      <div role="tablist" className="flex w-full rounded-t-[15px] bg-cosmo-magenta text-white select-none">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`${id}-panel-${index}`}
            onClick={() => setActive(index)}
            className={`flex min-h-20 flex-1 cursor-pointer items-center justify-center py-2.5 text-cosmo-m transition duration-150 lg:text-cosmo-l ${tabShape(index, tabs.length)} ${
              index === active ? 'grow-[1.15] scale-105 bg-cosmo-magenta-light shadow-elevation-2' : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== active}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
