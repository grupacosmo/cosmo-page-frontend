import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

interface PaginationProps {
  /** Zero-based index of the current page. */
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  ofLabel: string;
}

const control = 'flex size-10 items-center justify-center rounded-full text-black/70 transition-colors hover:bg-black/5';
const disabled = 'flex size-10 items-center justify-center rounded-full text-black/25';

function pageHref(page: number): string {
  return page === 0 ? '/news' : `/news?page=${page + 1}`;
}

/** Range label with previous/next controls, styled after the Material paginator. */
export function Pagination({ page, pageSize, totalElements, totalPages, ofLabel }: PaginationProps) {
  const start = totalElements === 0 ? 0 : page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, totalElements);
  const hasPrevious = page > 0;
  const hasNext = page < totalPages - 1;

  return (
    <nav aria-label="Pagination" className="mt-5 flex items-center justify-end gap-2 text-cosmo-m text-black/55">
      <span className="mr-4">
        {start} – {end} {ofLabel} {totalElements}
      </span>
      {hasPrevious ? (
        <Link href={pageHref(page - 1)} aria-label="Previous page" className={control}>
          <Icon name="chevronRightSmall" className="rotate-180" />
        </Link>
      ) : (
        <span aria-hidden="true" className={disabled}>
          <Icon name="chevronRightSmall" className="rotate-180" />
        </span>
      )}
      {hasNext ? (
        <Link href={pageHref(page + 1)} aria-label="Next page" className={control}>
          <Icon name="chevronRightSmall" />
        </Link>
      ) : (
        <span aria-hidden="true" className={disabled}>
          <Icon name="chevronRightSmall" />
        </span>
      )}
    </nav>
  );
}
