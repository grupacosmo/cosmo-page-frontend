import { Slot } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Centered page column with responsive gutters; every page-width wrapper uses it. */
export function Container({ className, asChild, ...props }: ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'div';
  return <Comp className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />;
}

/** A titled block of a page; the parent sets the spacing between sections. */
export function Section({ className, ...props }: ComponentProps<'section'>) {
  return <section className={cn('flex flex-col gap-6', className)} {...props} />;
}

interface SectionHeaderProps {
  title: string;
  /** Optional control (e.g. a "see all" button) aligned to the right. */
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, action, className }: SectionHeaderProps) {
  return (
    <header className={cn('flex flex-wrap items-center justify-between gap-x-4 gap-y-2', className)}>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {action}
    </header>
  );
}

/** Responsive grid for cards: one column on phones, two on tablets, `columns` on desktops. */
export function CardGrid({ columns = 3, className, ...props }: ComponentProps<'div'> & { columns?: 3 | 4 }) {
  return (
    <div
      className={cn('grid gap-6 sm:grid-cols-2', columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3', className)}
      {...props}
    />
  );
}
