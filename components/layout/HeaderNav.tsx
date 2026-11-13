'use client';

import { House, Menu, Newspaper, Rocket, Trophy, Users, X, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SKELETON_ON_DARK } from '@/components/common/Skeleton';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { NavItem } from './Header';
import { useLocaleTransition } from './LocaleTransition';

interface NavProps {
  items: NavItem[];
  label: string;
}

/** Whether `href` is the current page or, for sections, one of its subpages. */
function useIsActive() {
  const pathname = usePathname();
  return (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
}

/** A nav label that turns into a placeholder bar of the same width while the language is switching. */
function NavLabel({ label }: { label: string }) {
  const { pending } = useLocaleTransition();
  if (!pending) return label;
  return (
    <span className="relative">
      <span className="invisible">{label}</span>
      <Skeleton className={cn('absolute inset-x-0 top-1/2 h-3 -translate-y-1/2', SKELETON_ON_DARK)} />
    </span>
  );
}

/*
 * Main navigation links use `prefetch`: the whole page (not just its loading skeleton) is fetched
 * into the client cache while the link is on screen, so even the first click renders instantly.
 */
export function DesktopNav({ items, label }: NavProps) {
  const isActive = useIsActive();

  return (
    <nav aria-label={label} className="hidden items-center gap-1 md:flex">
      {items.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="ghost-inverse"
          className={cn('text-white/80', isActive(item.href) && 'bg-white/10 text-white')}
        >
          <Link href={item.href} prefetch aria-current={isActive(item.href) ? 'page' : undefined}>
            <NavLabel label={item.label} />
          </Link>
        </Button>
      ))}
    </nav>
  );
}

export interface MobileNavLabels {
  title: string;
  open: string;
  close: string;
}

const NAV_ICONS: Record<string, LucideIcon> = {
  '/': House,
  '/projects': Rocket,
  '/team': Users,
  '/news': Newspaper,
  '/achievements': Trophy,
};

/** Tailwind's `md` breakpoint, where the desktop navigation takes over from the menu button. */
const DESKTOP_QUERY = '(min-width: 48rem)';

/**
 * Hamburger button and slide-over menu for small screens (shadcn `Sheet`, i.e. a modal dialog:
 * focus is trapped inside, Escape and the backdrop close it, and focus returns to the button).
 * The sheet uses the header's dark brand surface, so it looks the same in light and dark mode.
 */
export function MobileNav({ items, labels }: { items: NavItem[]; labels: MobileNavLabels }) {
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);

  // The menu belongs to the phone layout: close it if the window grows into the desktop one
  // (e.g. a tablet is rotated), where its button no longer exists.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost-inverse" aria-label={labels.open} className="size-10 md:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        showCloseButton={false}
        // No description element in this dialog.
        aria-describedby={undefined}
        overlayClassName="bg-black/50"
        className="gap-0 border-white/10 bg-cosmo-dark-blue text-white duration-300 data-[side=right]:w-[85%]"
      >
        {/* As tall as the site header, so the close button lands exactly where the menu button was. */}
        <SheetHeader className="h-16 shrink-0 flex-row items-center justify-between border-b border-white/10 px-4 py-0">
          <SheetTitle className="text-lg font-semibold text-white">{labels.title}</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost-inverse" aria-label={labels.close} className="size-10">
              <X className="size-5" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <nav aria-label={labels.title} className="flex flex-col gap-1 overflow-y-auto p-3">
          {items.map((item) => {
            const active = isActive(item.href);
            const Icon = NAV_ICONS[item.href];
            return (
              // Choosing a page closes the menu.
              <SheetClose key={item.href} asChild>
                <Button
                  asChild
                  variant="ghost-inverse"
                  className={cn('h-12 justify-start gap-3 px-3 text-base text-white/80', active && 'bg-white/10 text-white')}
                >
                  <Link href={item.href} prefetch aria-current={active ? 'page' : undefined}>
                    {Icon && <Icon className={cn('size-5', active ? 'text-white' : 'text-white/60')} aria-hidden="true" />}
                    {item.label}
                  </Link>
                </Button>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
