import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageSizeSelectProps {
  sizes: readonly number[];
  current: number;
  hrefFor: (size: number) => string;
  labels: { show: string; group: string };
}

/** "Show: 3 · 6 · 12" — page-size links (no client JS), on shadcn `Button`. */
export function PageSizeSelect({ sizes, current, hrefFor, labels }: PageSizeSelectProps) {
  return (
    <div role="group" aria-label={labels.group} className="flex items-center gap-2 text-cosmo-m text-black/55">
      <span className="mr-1">{labels.show}:</span>
      {sizes.map((size) => {
        const active = size === current;
        return (
          <Button
            key={size}
            asChild
            variant="bare"
            size="none"
            className={cn(
              'size-9 rounded-full text-cosmo-s font-bold transition-colors duration-200',
              active ? 'bg-cosmo-magenta text-white' : 'text-cosmo-magenta hover:bg-cosmo-magenta/10',
            )}
          >
            <Link href={hrefFor(size)} aria-current={active ? 'page' : undefined} scroll={false}>
              {size}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
