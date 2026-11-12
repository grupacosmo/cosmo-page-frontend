import { IconButton } from '@/components/common/IconButton';
import { Pagination as PaginationRoot, PaginationContent, PaginationItem } from '@/components/ui/pagination';

interface PaginationProps {
  /** Zero-based index of the current page. */
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  /** URL of a (zero-based) page, preserving any other query parameters. */
  hrefFor: (page: number) => string;
  labels: { of: string; previous: string; next: string; pagination: string };
}

const arrow = 'disabled:opacity-100 disabled:text-black/25';

/** Range label with previous/next controls (Material paginator look) on shadcn `Pagination`. */
export function Pagination({ page, pageSize, totalItems, totalPages, hrefFor, labels }: PaginationProps) {
  const start = totalItems === 0 ? 0 : page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, totalItems);
  const hasPrevious = page > 0;
  const hasNext = page < totalPages - 1;

  return (
    <PaginationRoot aria-label={labels.pagination} className="mx-0 w-auto items-center gap-2 text-cosmo-m text-black/55">
      <span className="mr-4">
        {start} – {end} {labels.of} {totalItems}
      </span>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <IconButton
            icon="chevronLeftSmall"
            label={labels.previous}
            href={hasPrevious ? hrefFor(page - 1) : undefined}
            disabled={!hasPrevious}
            className={arrow}
          />
        </PaginationItem>
        <PaginationItem>
          <IconButton
            icon="chevronRightSmall"
            label={labels.next}
            href={hasNext ? hrefFor(page + 1) : undefined}
            disabled={!hasNext}
            className={arrow}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
