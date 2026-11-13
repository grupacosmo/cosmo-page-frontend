'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/common/Container';
import { useScrolled } from '@/lib/hooks/useScrolled';
import { cn } from '@/lib/utils';
import { DesktopNav, MobileNav, type MobileNavLabels } from './HeaderNav';

export interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  items: NavItem[];
  /** Accessible name of the navigation. */
  navLabel: string;
  /** Texts of the phone menu: its title and the open / close button names. */
  menuLabels: MobileNavLabels;
  languagePicker: ReactNode;
}

/**
 * Sticky site header. It is fixed to the top and floats over each page's banner; once the page is
 * scrolled it gets a solid, blurred backdrop so it stays readable over the white content sheet.
 */
export function Header({ items, navLabel, menuLabels, languagePicker }: HeaderProps) {
  const scrolled = useScrolled(8);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-white/10 bg-cosmo-dark-blue/85 backdrop-blur-md' : 'border-transparent bg-black/15',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" prefetch aria-label="Cosmo PK" className="shrink-0">
          {/* The wordmark sits in the middle of a tall transparent canvas; `object-cover` crops to it. */}
          <Image
            src="/images/cosmo-white.png"
            alt=""
            width={341}
            height={288}
            loading="eager"
            className="h-8 w-[150px] object-cover"
          />
        </Link>

        <div className="flex items-center gap-1">
          <DesktopNav items={items} label={navLabel} />
          {languagePicker}
          <MobileNav items={items} labels={menuLabels} />
        </div>
      </Container>
    </header>
  );
}
