'use client';

import type { ComponentProps, MouseEvent } from 'react';

type ScrollLinkProps = Omit<ComponentProps<'a'>, 'href'> & { targetId: string };

/** In-page anchor that scrolls smoothly to the element with `targetId`. */
export function ScrollLink({ targetId, onClick, ...rest }: ScrollLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  };

  return <a href={`#${encodeURIComponent(targetId)}`} onClick={handleClick} {...rest} />;
}
