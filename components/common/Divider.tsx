import { cva, type VariantProps } from 'class-variance-authority';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const dividerVariants = cva('', {
  variants: {
    tone: {
      /** Magenta brand rule between page sections. */
      brand: 'bg-cosmo-magenta',
      /** Inherits the text colour, like a plain `<hr>`. */
      current: 'bg-current',
    },
    weight: {
      thin: 'data-horizontal:h-px',
      thick: 'data-horizontal:h-0.5',
    },
  },
  defaultVariants: { tone: 'brand', weight: 'thick' },
});

type DividerProps = VariantProps<typeof dividerVariants> & { className?: string };

/** Horizontal rule built on the shadcn `Separator`. */
export function Divider({ tone, weight, className }: DividerProps) {
  return <Separator className={cn(dividerVariants({ tone, weight }), className)} />;
}
