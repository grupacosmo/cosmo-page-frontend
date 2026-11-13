import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageSizeSelectProps {
  sizes: readonly number[];
  current: number;
  hrefFor: (size: number) => string;
  labels: { show: string; group: string };
}

/** "Show: 3 · 6 · 12" — page-size links (no client JS). */
export function PageSizeSelect({ sizes, current, hrefFor, labels }: PageSizeSelectProps) {
  return (
    <div role="group" aria-label={labels.group} className="flex items-center gap-1 text-sm text-muted-foreground">
      <span className="mr-2">{labels.show}:</span>
      {sizes.map((size) => {
        const active = size === current;
        return (
          <Button key={size} asChild variant={active ? 'default' : 'ghost'} size="icon">
            <Link href={hrefFor(size)} aria-current={active ? 'page' : undefined} scroll={false}>
              {size}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
