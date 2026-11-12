import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './Icon';

/** Round icon-only buttons (slider arrows, close buttons, pagination, menu toggle) on shadcn `Button`. */
const iconButtonVariants = cva('shrink-0 rounded-full border-0 p-0 transition-all duration-200', {
  variants: {
    tone: {
      /** Dark icon on white content, light hover wash. */
      ghost: 'text-black/70 transition-colors hover:bg-black/5',
      /** Frosted white disc over images. */
      light:
        'bg-white/70 text-[#333] hover:not-disabled:scale-105 active:not-disabled:scale-95 disabled:cursor-not-allowed md:hover:not-disabled:scale-110',
      /** Translucent disc over the dark lightbox. */
      glass: 'bg-white/20 text-white hover:bg-white/30',
      /** Bare white icon (header). */
      plain: 'rounded-none text-white',
    },
    size: {
      auto: '',
      md: 'size-10',
      lg: 'size-10 md:size-12',
      xl: 'size-12 md:size-[60px]',
    },
  },
  defaultVariants: { tone: 'ghost', size: 'md' },
});

type IconButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size' | 'children'> &
  VariantProps<typeof iconButtonVariants> & {
    icon: IconName;
    iconSize?: number;
    /** Accessible name; icon buttons have no visible text. */
    label: string;
    /** Renders a link styled as the icon button instead of a `<button>`. */
    href?: string;
  };

export function IconButton({ icon, iconSize, label, href, tone, size, className, ...props }: IconButtonProps) {
  const iconElement = <Icon name={icon} size={iconSize} />;
  return (
    <Button
      variant="bare"
      size="none"
      asChild={href !== undefined}
      aria-label={label}
      className={cn(iconButtonVariants({ tone, size }), className)}
      {...props}
    >
      {href !== undefined ? <Link href={href}>{iconElement}</Link> : iconElement}
    </Button>
  );
}
