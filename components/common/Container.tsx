import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Centered content column; every page-width wrapper uses it instead of ad-hoc `max-w-*` classes. */
export const containerVariants = cva('mx-auto w-full', {
  variants: {
    width: {
      page: 'max-w-[1600px]',
      narrow: 'max-w-[600px]',
    },
    gutter: {
      none: '',
      /** Hero and banner text. */
      page: 'px-[60px]',
      /** White page sheet: side gutters only where the sheet floats on wide screens. */
      sheet: 'xl:px-[60px] xl:pb-10',
    },
  },
  defaultVariants: { width: 'page', gutter: 'none' },
});

type ContainerProps = ComponentProps<'div'> & VariantProps<typeof containerVariants> & { asChild?: boolean };

export function Container({ className, width, gutter, asChild, ...props }: ContainerProps) {
  const Comp = asChild ? Slot.Root : 'div';
  return <Comp className={cn(containerVariants({ width, gutter }), className)} {...props} />;
}

/** Vertical rhythm block used between dividers on content pages. */
export function Section({ className, ...props }: ComponentProps<'section'>) {
  return <section className={cn('my-[2em]', className)} {...props} />;
}

/** Section title with an optional action (e.g. a "read more" CTA) aligned to the right. */
export function SectionHeader({ title, action, className }: { title: string; action?: ReactNode; className?: string }) {
  return (
    <header className={cn('flex justify-between p-[15px]', className)}>
      <h2 className="m-0">{title}</h2>
      {action}
    </header>
  );
}
