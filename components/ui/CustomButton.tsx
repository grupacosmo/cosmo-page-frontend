import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Icon } from './Icon';

export interface ButtonStyleProps {
  text: string;
  /** Outlined magenta variant (gradient fills in on hover). */
  secondary?: boolean;
  /** Shows a back arrow before the label instead of a chevron after it. */
  back?: boolean;
  className?: string;
}

export function buttonClasses({ secondary, back }: Omit<ButtonStyleProps, 'text'>): string {
  return [
    'relative z-[1] inline-flex cursor-pointer items-center justify-center gap-[0.3em] overflow-hidden rounded-[15px]',
    'border-2 border-transparent bg-origin-border py-[0.2em] pr-[0.2em] pl-[1em] text-cosmo-m font-bold outline-none',
    'transition-[color] duration-500 xl:border-3 xl:px-[1em] xl:py-[0.5em]',
    'before:absolute before:top-0 before:left-0 before:-z-[1] before:h-full before:w-0 before:transition-[width] before:duration-500 hover:before:w-full',
    secondary
      ? 'bg-none before:rounded-[15px] before:bg-linear-to-r before:from-cosmo-magenta before:to-cosmo-blue hover:text-white'
      : 'bg-linear-to-r from-cosmo-magenta to-cosmo-blue text-white before:rounded-[10px] before:bg-white hover:text-cosmo-magenta',
    secondary && (back ? 'text-cosmo-dark-blue' : 'text-cosmo-magenta'),
  ]
    .filter(Boolean)
    .join(' ');
}

export function ButtonContent({ text, back }: Pick<ButtonStyleProps, 'text' | 'back'>): ReactNode {
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

type LinkButtonProps = ButtonStyleProps & { href: string; external?: boolean };

/** Gradient call-to-action rendered as a link (internal route or external URL). */
export function LinkButton({ href, external, className, ...style }: LinkButtonProps) {
  const classes = `${buttonClasses(style)} ${className ?? ''}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <ButtonContent {...style} />
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      <ButtonContent {...style} />
    </Link>
  );
}

type ButtonProps = ButtonStyleProps & Omit<ComponentProps<'button'>, 'className' | 'children'>;

export function Button({ text, secondary, back, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={`${buttonClasses({ secondary, back })} ${className ?? ''}`} {...rest}>
      <ButtonContent text={text} back={back} />
    </button>
  );
}
