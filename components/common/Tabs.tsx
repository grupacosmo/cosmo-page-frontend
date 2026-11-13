import Link from 'next/link';
import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface TabItem {
  value: string;
  label: string;
}

/** Client-side tabs: all panels are rendered up front and switched without navigation. */
export function ContentTabs({ tabs }: { tabs: Array<TabItem & { content: ReactNode }> }) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className="gap-6">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="px-4">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

interface LinkTabsProps {
  tabs: Array<TabItem & { href: string }>;
  active: string;
  /** Content of the active tab (rendered on the server). */
  children: ReactNode;
}

/** URL-driven tabs: each tab is a link, so the active tab survives reloads and can be shared. */
export function LinkTabs({ tabs, active, children }: LinkTabsProps) {
  return (
    <Tabs value={active} className="gap-6">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} asChild className="px-4">
            <Link href={tab.href} scroll={false}>
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={active}>{children}</TabsContent>
    </Tabs>
  );
}
