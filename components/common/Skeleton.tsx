import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shimmer placeholders. Every loading state in the app (route `loading.tsx`, Suspense fallbacks,
 * language switching) is composed from these, so they all share one look. Server-safe: no hooks
 * beyond `useTranslations`, which works in both server and client components.
 */
const skeletonVariants = cva('block shrink-0', {
  variants: {
    /** `light` on the white page sheet, `dark` on banners, the header and the footer. */
    tone: { light: 'shimmer', dark: 'shimmer-dark' },
    shape: {
      block: 'rounded-[10px]',
      line: 'h-[1em] rounded-md',
      pill: 'rounded-full',
      circle: 'rounded-full',
      none: '',
    },
  },
  defaultVariants: { tone: 'light', shape: 'block' },
});

type SkeletonProps = ComponentProps<'div'> & VariantProps<typeof skeletonVariants>;

export function Skeleton({ tone, shape, className, ...props }: SkeletonProps) {
  return <div aria-hidden="true" className={cn(skeletonVariants({ tone, shape }), className)} {...props} />;
}

const LINE_WIDTHS = ['w-full', 'w-[96%]', 'w-[92%]', 'w-[98%]', 'w-[88%]'];

/** A paragraph of shimmer lines; the last line is shorter, like real text. */
export function SkeletonText({
  lines = 3,
  tone,
  className,
  lineClassName,
}: {
  lines?: number;
  tone?: 'light' | 'dark';
  className?: string;
  lineClassName?: string;
}) {
  return (
    <div className={cn('flex w-full flex-col gap-[0.6em]', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          tone={tone}
          shape="line"
          className={cn(i === lines - 1 && lines > 1 ? 'w-[60%]' : LINE_WIDTHS[i % LINE_WIDTHS.length], lineClassName)}
        />
      ))}
    </div>
  );
}

/** Placeholder for a `CtaLink` pill. */
export function SkeletonCta({ className }: { className?: string }) {
  return <Skeleton shape="pill" className={cn('h-10 w-[150px] xl:h-12', className)} />;
}

/** Placeholder for the trapezoid tab bar (`CosmoTabs` / `CosmoTabLinks`). */
export function SkeletonTabBar({ tabs = 2 }: { tabs?: number }) {
  return (
    <div className="flex min-h-20 w-full rounded-t-[15px] bg-cosmo-magenta">
      {Array.from({ length: tabs }, (_, i) => (
        <div key={i} className="flex flex-1 items-center justify-center">
          <Skeleton tone="dark" shape="line" className="h-5 w-[40%] max-w-[180px]" />
        </div>
      ))}
    </div>
  );
}

/**
 * Wraps a loading layout: announces "Loading…" to screen readers once and marks the region busy,
 * while the shimmer blocks themselves stay hidden from assistive tech.
 */
export function LoadingRegion({ className, children, ...props }: ComponentProps<'div'>) {
  const t = useTranslations('common');
  return (
    <div aria-busy="true" className={className} {...props}>
      <span role="status" className="sr-only">
        {t('loading')}
      </span>
      {children}
    </div>
  );
}
