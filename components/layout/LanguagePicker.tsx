'use client';

import Image from 'next/image';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setLocale } from '@/lib/i18n/actions';
import { LANGUAGES, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface LanguagePickerProps {
  current: Locale;
  /** Translated language names keyed by locale. */
  labels: Partial<Record<Locale, string>>;
}

export function LanguagePicker({ current, labels }: LanguagePickerProps) {
  const [isPending, startTransition] = useTransition();

  const selectLanguage = (code: Locale) => {
    if (code === current) return;
    // Setting a cookie in a Server Action re-renders the current route with the new locale.
    startTransition(() => setLocale(code));
  };

  const currentLanguage = LANGUAGES.find((language) => language.code === current) ?? LANGUAGES[0]!;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <Button
          variant="bare"
          size="none"
          aria-label={labels[current]}
          className="relative flex rounded p-[5px] transition-colors duration-300 hover:bg-white/10 active:not-aria-[haspopup]:translate-y-0 disabled:opacity-70"
        >
          <Image src={currentLanguage.flag} alt="" width={32} height={32} className="size-8 object-cover" />
          {isPending && (
            <span className="absolute inset-0 flex items-center justify-center rounded bg-black/30">
              <span className="inline-block size-5 animate-spin-slow rounded-full border-2 border-white/30 border-t-white" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={5}
        className="z-[1000] w-[150px] min-w-0 rounded bg-white p-0 shadow-[0_4px_6px_rgba(0,0,0,0.1)] ring-0 duration-300"
      >
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onSelect={() => selectLanguage(language.code)}
            aria-current={language.code === current}
            className={cn(
              'cursor-pointer gap-0 rounded-none px-3 py-2.5 transition-colors duration-200 focus:bg-[#f5f5f5]',
              language.code === current && 'bg-[#e0e0e0] focus:bg-[#e0e0e0]',
            )}
          >
            <Image src={language.flag} alt="" width={32} height={32} className="size-8 object-cover" />
            <span className="ml-2 text-sm text-[#333]">{labels[language.code]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
