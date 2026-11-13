'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { IconButton } from '@/components/common/IconButton';
import { useScrolled } from '@/lib/hooks/useScrolled';
import { cn } from '@/lib/utils';
import { DesktopNav, MobileMenu } from './HeaderNav';

export interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  items: NavItem[];
  languagePicker: ReactNode;
}

const MOBILE_MENU_ID = 'mobile-menu';

/**
 * Sticky site header. It is fixed to the top and floats over each page's banner; once the page is
 * scrolled it gets a solid, blurred backdrop so it stays readable over the white content sheet.
 */
export function Header({ items, languagePicker }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(8);

  return (
    <header className="fixed inset-x-0 top-0 z-[999] flex h-[70px] w-full items-center justify-between p-5 select-none">
      {/*
        Backdrop on its own layer: `backdrop-filter` on the <header> itself would become the containing
        block of the fixed mobile menu and squeeze it into the 70px bar.
      */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-[2] transition-[background-color,box-shadow] duration-300',
          scrolled ? 'bg-cosmo-dark-blue/85 shadow-elevation-3 backdrop-blur-md' : 'bg-black/15',
        )}
      />

      <Link href="/" className="h-[150px]" aria-label="Cosmo PK">
        <Image src="/images/cosmo-white.png" alt="Cosmo PK" width={341} height={288} priority className="h-full w-auto" />
      </Link>

      <nav className="flex items-center">
        <DesktopNav items={items} />

        <IconButton
          tone="plain"
          size="auto"
          icon={menuOpen ? 'close' : 'menu'}
          iconSize={34}
          label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setMenuOpen((open) => !open)}
          className="hidden max-md:flex"
        />

        <div className="ml-[60px] flex max-md:ml-5">{languagePicker}</div>

        <MobileMenu id={MOBILE_MENU_ID} items={items} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      </nav>
    </header>
  );
}
