'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// Above the absolutely positioned site header (z-999).
const LAYER = 'z-[1000]';

const modalVariants = cva(`${LAYER} gap-0 text-[length:inherit] ring-0 outline-none`, {
  variants: {
    variant: {
      /** Centered white panel (e.g. achievement details). */
      panel: 'block max-h-[calc(100dvh-2rem)] max-w-[min(800px,calc(100%-2rem))] overflow-y-auto rounded bg-white p-5 text-black shadow-elevation-5 sm:max-w-[min(800px,calc(100%-2rem))]',
      /** Full-screen dark lightbox (image gallery). */
      lightbox:
        'top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none bg-black/95 p-0 text-white duration-300 sm:max-w-none data-open:zoom-in-100 data-closed:zoom-out-100',
    },
  },
  defaultVariants: { variant: 'panel' },
});

type ModalContentProps = Omit<ComponentProps<typeof DialogContent>, 'showCloseButton'> &
  VariantProps<typeof modalVariants>;

/**
 * Shared dialog surface on shadcn `Dialog` (focus trap, Esc, scroll lock, portal). Both variants keep
 * the original look: the panel has no dimmed backdrop, the lightbox is itself the dark backdrop.
 */
export function ModalContent({ variant, className, overlayClassName, ...props }: ModalContentProps) {
  return (
    <DialogContent
      showCloseButton={false}
      // No description element in these dialogs.
      aria-describedby={undefined}
      overlayClassName={cn(LAYER, 'bg-transparent supports-backdrop-filter:backdrop-blur-none', overlayClassName)}
      className={cn(modalVariants({ variant }), className)}
      {...props}
    />
  );
}
