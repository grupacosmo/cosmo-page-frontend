import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface CtaStyleProps {
  text: string;
  /** Text-only variant whose gradient fills in on hover. */
  secondary?: boolean;
  /** Back arrow before the label (instead of a chevron after it), in dark blue. */
  back?: boolean;
  className?: string;
}

function CtaContent({ text, back }: Pick<CtaStyleProps, 'text' | 'back'>) {
  return back ? (
    <>
      <Icon name="arrowBack" /> {text}
    </>
  ) : (
    <>
      {text} <Icon name="chevronRightSmall" />
    </>
  );
}

type CtaSlotProps = Omit<CtaStyleProps, 'text'> & { children: ReactNode };

/**
 * Shared shadcn `Button` setup behind every Cosmo call-to-action. The single child element
 * (link, button, `ScrollLink`, …) receives the classes.
 */
export function CtaSlot({ secondary, back, className, children }: CtaSlotProps) {
  return (
    <Button
      asChild
      variant={secondary ? 'cosmo-outline' : 'cosmo'}
      size="cta"
      className={cn(secondary && back && 'text-cosmo-dark-blue', className)}
    >
      {children}
    </Button>
  );
}

type CtaLinkProps = CtaStyleProps & { href: string; external?: boolean };

/** Call-to-action rendered as a link (internal route or external URL). */
export function CtaLink({ href, external, ...style }: CtaLinkProps) {
  const content = <CtaContent text={style.text} back={style.back} />;
  return (
    <CtaSlot {...style}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={href}>{content}</Link>
      )}
    </CtaSlot>
  );
}

type CtaButtonProps = CtaStyleProps & Omit<ComponentProps<'button'>, 'className' | 'children'>;

/** Call-to-action rendered as a `<button>`. */
export function CtaButton({ text, secondary, back, className, type = 'button', ...rest }: CtaButtonProps) {
  return (
    <CtaSlot secondary={secondary} back={back} className={className}>
      <button type={type} {...rest}>
        <CtaContent text={text} back={back} />
      </button>
    </CtaSlot>
  );
}

export { CtaContent };
