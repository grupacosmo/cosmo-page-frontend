'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Trapezoid tab shapes: first/last are slanted on one side, middle tabs on both.
function tabShape(index: number, count: number): string {
  if (index === 0) return '[clip-path:polygon(0_0,90%_0,100%_100%,0%_100%)] rounded-tl-[15px]';
  if (index === count - 1) return '[clip-path:polygon(0_0,100%_0,100%_100%,10%_100%)] rounded-tr-[15px]';
  return '[clip-path:polygon(0_0,90%_0,100%_100%,10%_100%)]';
}

const rootClasses = 'w-full gap-0';
const listClasses =
  'flex w-full rounded-none rounded-t-[15px] bg-cosmo-magenta p-0 text-white select-none group-data-horizontal/tabs:h-auto';
const triggerClasses =
  'h-auto min-h-20 flex-1 rounded-none border-0 px-0 py-2.5 text-cosmo-m font-normal whitespace-normal text-white transition duration-150 hover:text-white lg:text-cosmo-l data-active:grow-[1.15] data-active:scale-105 data-active:bg-cosmo-magenta-light data-active:text-white group-data-[variant=default]/tabs-list:data-active:shadow-elevation-2';

export interface TabItem {
  value: string;
  label: string;
}

/** Client-side tabs: all panels are rendered up front and switched without navigation. */
export function CosmoTabs({ tabs }: { tabs: Array<TabItem & { content: ReactNode }> }) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className={rootClasses}>
      <TabsList className={listClasses}>
        {tabs.map((tab, index) => (
          <TabsTrigger key={tab.value} value={tab.value} className={cn(triggerClasses, tabShape(index, tabs.length))}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="text-[length:inherit]">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

interface TabLinksProps {
  tabs: Array<TabItem & { href: string }>;
  active: string;
  /** Content of the active tab (rendered on the server). */
  children: ReactNode;
}

/** URL-driven tabs: each tab is a link, so the active tab survives reloads and can be shared. */
export function CosmoTabLinks({ tabs, active, children }: TabLinksProps) {
  return (
    <Tabs value={active} className={rootClasses}>
      <TabsList className={listClasses}>
        {tabs.map((tab, index) => (
          <TabsTrigger key={tab.value} value={tab.value} asChild className={cn(triggerClasses, tabShape(index, tabs.length))}>
            <Link href={tab.href} scroll={false}>
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={active} className="text-[length:inherit]">
        {children}
      </TabsContent>
    </Tabs>
  );
}
