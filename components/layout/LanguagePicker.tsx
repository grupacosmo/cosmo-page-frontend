'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useTransition } from 'react';
import { setLocale } from '@/lib/i18n/actions';
import { LANGUAGES, type Locale } from '@/lib/i18n/config';

interface LanguagePickerProps {
  current: Locale;
  /** Translated language names keyed by locale. */
  labels: Record<Locale, string>;
}

export function LanguagePicker({ current, labels }: LanguagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const selectLanguage = (code: Locale) => {
    setIsOpen(false);
    if (code === current) return;
    // Setting a cookie in a Server Action re-renders the current route with the new locale.
    startTransition(() => setLocale(code));
  };

  const currentLanguage = LANGUAGES.find((language) => language.code === current) ?? LANGUAGES[0]!;

  return (
    <div ref={containerRef} className="relative flex select-none">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={labels[current]}
        className="relative flex cursor-pointer items-center justify-center rounded p-[5px] transition-colors duration-300 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-70"
      >
        <Image src={currentLanguage.flag} alt="" width={32} height={32} className="size-8 object-cover" />
        {isPending && (
          <span className="absolute inset-0 flex items-center justify-center rounded bg-black/30">
            <span className="inline-block size-5 animate-spin-slow rounded-full border-2 border-white/30 border-t-white" />
          </span>
        )}
      </button>

      <div
        className={`absolute top-full right-0 z-[100] w-[150px] overflow-hidden rounded bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-[opacity,transform,visibility] duration-300 ${
          isOpen ? 'visible translate-y-[5px] opacity-100' : 'invisible -translate-y-2.5 opacity-0'
        }`}
      >
        <ul role="listbox" aria-label="Language">
          {LANGUAGES.map((language) => (
            <li key={language.code} role="option" aria-selected={language.code === current}>
              <button
                type="button"
                onClick={() => selectLanguage(language.code)}
                className={`flex w-full cursor-pointer items-center px-3 py-2.5 transition-colors duration-200 hover:bg-[#f5f5f5] ${
                  language.code === current ? 'bg-[#e0e0e0]' : ''
                }`}
              >
                <Image src={language.flag} alt="" width={32} height={32} className="size-8 object-cover" />
                <span className="ml-2 text-sm text-[#333]">{labels[language.code]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
