'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

/** Menu button and slide-over navigation for small screens. */
export function MobileNav({ items, label }: NavProps) {
  const isActive = useIsActive();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost-inverse" size="icon" aria-label={label} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle>{label}</SheetTitle>
        </SheetHeader>
        <nav aria-label={label} className="flex flex-col gap-1 px-2">
          {items.map((item) => (
            <SheetClose key={item.href} asChild>
              <Button
                asChild
                variant={isActive(item.href) ? 'secondary' : 'ghost'}
                size="lg"
                className="justify-start text-base"
              >
                <Link href={item.href} prefetch aria-current={isActive(item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
