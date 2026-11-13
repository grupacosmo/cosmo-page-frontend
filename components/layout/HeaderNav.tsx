'use client';

import Link from 'next/link';
import { Skeleton } from '@/components/common/Skeleton';
import type { NavItem } from './Header';
import { useLocaleTransition } from './LocaleTransition';

/** A nav label that turns into a shimmer bar of the same width while the language is switching. */
function NavLabel({ label }: { label: string }) {
  const { pending } = useLocaleTransition();
  if (!pending) return label;
  return (
    <span className="relative inline-block">
      <span className="invisible">{label}</span>
      <Skeleton tone="dark" shape="line" className="absolute inset-x-0 top-1/2 -translate-y-1/2" />
    </span>
  );
}

/*
 * Main navigation links use `prefetch`: the whole page (not just its loading skeleton) is fetched
 * into the client cache while the link is on screen, so even the first click renders instantly.
 */
const desktopLink =
  'relative cursor-pointer after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100';

export function DesktopNav({ items }: { items: NavItem[] }) {
  return (
    <ul className="flex gap-5 text-cosmo-m text-white max-md:hidden">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} prefetch className={desktopLink}>
            <NavLabel label={item.label} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

interface MobileMenuProps {
  id: string;
  items: NavItem[];
  open: boolean;
  onNavigate: () => void;
}

/** Full-screen overlay menu for small screens; slides down from the top. */
export function MobileMenu({ id, items, open, onNavigate }: MobileMenuProps) {
  return (
    <ul
      id={id}
      className={`fixed inset-0 -z-[1] hidden flex-col items-center justify-center gap-5 bg-black/90 transition-transform duration-500 max-md:flex ${
        open ? 'translate-y-0 ease-out' : '-translate-y-full ease-in'
      }`}
      inert={!open}
    >
      {items.map((item) => (
        <li key={item.href} className="w-full">
          <Link
            href={item.href}
            prefetch
            onClick={onNavigate}
            className="flex w-full items-center justify-center text-cosmo-xl text-white"
          >
            <NavLabel label={item.label} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
