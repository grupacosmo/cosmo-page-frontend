'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { LANGUAGES, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';
import { useLocaleTransition } from './LocaleTransition';

interface LanguagePickerProps {
  current: Locale;
  /** Translated language names keyed by locale. */
  labels: Partial<Record<Locale, string>>;
}

/**
 * Flag button with a language menu directly beneath it.
 *
 * The menu is positioned with plain CSS (`top-full right-0` inside a `relative` wrapper) rather than a
 * floating/popper library: the site sets `zoom: 0.8` on `<html>` for wide screens, which breaks
 * coordinate-based positioning, so popper menus opened far away from their trigger. Keyboard support
 * follows the WAI-ARIA menu-button pattern (arrows, Home/End, Esc, Tab).
 */
export function LanguagePicker({ current, labels }: LanguagePickerProps) {
  const { pending, switchLocale } = useLocaleTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = useId();

  const currentIndex = Math.max(
    0,
    LANGUAGES.findIndex((language) => language.code === current),
  );
  const currentLanguage = LANGUAGES[currentIndex]!;

  // While open: focus the active language and close on any press outside the picker.
  useEffect(() => {
    if (!open) return;
    itemRefs.current[currentIndex]?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, currentIndex]);

  const close = (restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  const select = (code: Locale) => {
    close(true);
    if (code !== current) switchLocale(code);
  };

  const onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent) => {
    const items = itemRefs.current.filter((item): item is HTMLButtonElement => item !== null);
    const focused = items.indexOf(document.activeElement as HTMLButtonElement);
    const focusAt = (index: number) => items[(index + items.length) % items.length]?.focus();

    switch (event.key) {
      case 'ArrowDown':
        focusAt(focused + 1);
        break;
      case 'ArrowUp':
        focusAt(focused - 1);
        break;
      case 'Home':
        focusAt(0);
        break;
      case 'End':
        focusAt(items.length - 1);
        break;
      case 'Escape':
        close(true);
        break;
      case 'Tab':
        close(false);
        return;
      default:
        return;
    }
    event.preventDefault();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={labels[current]}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        disabled={pending}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        className="relative flex rounded p-[5px] transition-colors duration-300 outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 disabled:cursor-wait disabled:opacity-70"
      >
        <Image src={currentLanguage.flag} alt="" width={32} height={32} className="size-8 object-cover" />
        {pending && (
          <span className="absolute inset-0 flex items-center justify-center rounded bg-black/30">
            <span className="inline-block size-5 animate-spin-slow rounded-full border-2 border-white/30 border-t-white" />
          </span>
        )}
      </button>

      <div
        id={menuId}
        role="menu"
        aria-label={labels[current]}
        hidden={!open}
        onKeyDown={onMenuKeyDown}
        className="absolute top-full right-0 z-[1000] mt-[5px] w-[150px] origin-top-right animate-fade-in overflow-hidden rounded bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
      >
        {LANGUAGES.map((language, index) => {
          const active = language.code === current;
          return (
            <button
              key={language.code}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={active}
              tabIndex={-1}
              onClick={() => select(language.code)}
              className={cn(
                'flex w-full cursor-pointer items-center px-3 py-2.5 text-left outline-none transition-colors duration-200 hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5]',
                active && 'bg-[#e0e0e0] hover:bg-[#e0e0e0] focus-visible:bg-[#e0e0e0]',
              )}
            >
              <Image src={language.flag} alt="" width={32} height={32} className="size-8 object-cover" />
              <span className="ml-2 text-sm text-[#333]">{labels[language.code]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
