import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
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

/** Previous/next control: a link when there is a page to go to, a disabled button otherwise. */
function PageArrow({ href, label, children }: { href?: string; label: string; children: ReactNode }) {
  return href === undefined ? (
    <Button variant="outline" size="icon" aria-label={label} disabled>
      {children}
    </Button>
  ) : (
    <Button asChild variant="outline" size="icon">
      <Link href={href} aria-label={label}>
        {children}
      </Link>
    </Button>
  );
}

/** Range label ("1 – 6 of 14") with previous/next controls, on shadcn `Pagination`. */
export function Pagination({ page, pageSize, totalItems, totalPages, hrefFor, labels }: PaginationProps) {
  const start = totalItems === 0 ? 0 : page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, totalItems);

  return (
    <PaginationRoot aria-label={labels.pagination} className="mx-0 w-auto items-center gap-4 text-sm text-muted-foreground">
      <span>
        {start} – {end} {labels.of} {totalItems}
      </span>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PageArrow href={page > 0 ? hrefFor(page - 1) : undefined} label={labels.previous}>
            <ChevronLeft />
          </PageArrow>
        </PaginationItem>
        <PaginationItem>
          <PageArrow href={page < totalPages - 1 ? hrefFor(page + 1) : undefined} label={labels.next}>
            <ChevronRight />
          </PageArrow>
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
