'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { IconButton } from '@/components/common/IconButton';

export interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  items: NavItem[];
  languagePicker: ReactNode;
}

const desktopLink =
  'relative cursor-pointer after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100';

export function Header({ items, languagePicker }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute top-0 left-0 z-[999] flex h-[70px] w-full items-center justify-between bg-black/15 p-5 select-none">
      <Link href="/" className="h-[150px]" aria-label="Cosmo PK">
        <Image src="/images/cosmo-white.png" alt="Cosmo PK" width={341} height={288} priority className="h-full w-auto" />
      </Link>

      <nav className="flex items-center">
        <ul className="flex gap-5 text-cosmo-m text-white max-md:hidden">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={desktopLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <IconButton
          tone="plain"
          size="auto"
          icon={menuOpen ? 'close' : 'menu'}
          iconSize={34}
          label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="hidden max-md:flex"
        />

        <div className="ml-[60px] flex max-md:ml-5">{languagePicker}</div>

        <ul
          id="mobile-menu"
          className={`fixed inset-0 -z-[1] hidden flex-col items-center justify-center gap-5 bg-black/90 transition-transform duration-500 max-md:flex ${
            menuOpen ? 'translate-y-0 ease-out' : '-translate-y-full ease-in'
          }`}
          inert={!menuOpen}
        >
          {items.map((item) => (
            <li key={item.href} className="w-full">
              <Link
                href={item.href}
                onClick={closeMenu}
                className="flex w-full items-center justify-center text-cosmo-xl text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
