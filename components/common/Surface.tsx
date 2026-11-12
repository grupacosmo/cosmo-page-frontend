import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * The one base for every card-like block in the app (page sheet, project/member/achievement cards,
 * image tiles, dialogs). It builds on shadcn `Card`, resets its default chrome and layers the Cosmo
 * look on top through variants, so blocks differ only in size/shape props, not in hand-written CSS.
 */
export const surfaceVariants = cva(
  // Neutralise shadcn Card defaults (flex/gap/padding/ring/text) so variants fully control the look.
  'block gap-0 overflow-visible py-0 text-[length:inherit] ring-0',
  {
    variants: {
      tone: {
        none: 'bg-transparent text-inherit',
        paper: 'bg-white text-black',
        /** Background-image tile with white text; set the image via `style.backgroundImage`. */
        media: 'overflow-hidden bg-cover bg-center text-white',
      },
      radius: {
        none: 'rounded-none',
        md: 'rounded-[10px]',
        lg: 'rounded-[15px]',
        /** Page sheet: rounded top, fully rounded on wide screens. */
        sheet: 'rounded-none rounded-t-[15px] xl:rounded-b-[15px]',
        /** Only the bottom-right corner, used by project cards. */
        corner: 'rounded-none rounded-br-[15px]',
      },
      elevation: {
        none: 'shadow-none',
        soft: 'shadow-[0_4px_6px_rgba(0,0,0,0.1)]',
        raised: 'shadow-elevation-5',
      },
      interactive: {
        none: '',
        /** Subtle lift for large cards. */
        lift: 'transition duration-500 hover:scale-[1.01] hover:shadow-elevation-6',
        /** Noticeable zoom for tiles. */
        zoom: 'cursor-pointer transition duration-500 hover:scale-105 hover:shadow-elevation-3',
        /** Barely-there zoom for large image tiles. */
        hover: 'cursor-pointer transition duration-500 hover:scale-[1.005] hover:shadow-elevation-3',
      },
      padding: {
        none: 'p-0',
        sm: 'p-[15px]',
        md: 'p-5',
        em: 'p-[1em]',
      },
    },
    defaultVariants: {
      tone: 'none',
      radius: 'none',
      elevation: 'none',
      interactive: 'none',
      padding: 'none',
    },
  },
);

export type SurfaceProps = Omit<ComponentProps<typeof Card>, 'size'> & VariantProps<typeof surfaceVariants>;

export function Surface({ className, tone, radius, elevation, interactive, padding, ...props }: SurfaceProps) {
  return (
    <Card
      className={cn(surfaceVariants({ tone, radius, elevation, interactive, padding }), className)}
      {...props}
    />
  );
}
