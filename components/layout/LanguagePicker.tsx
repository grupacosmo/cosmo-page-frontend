'use client';

import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LANGUAGES, isLocale, type Locale } from '@/lib/i18n/config';
import { useLocaleTransition } from './LocaleTransition';

interface LanguagePickerProps {
  current: Locale;
  /** Translated language names keyed by locale. */
  labels: Partial<Record<Locale, string>>;
}

const flagClasses = 'size-5 rounded-full object-cover';

/** Flag button that opens the language menu (shadcn `DropdownMenu`). */
export function LanguagePicker({ current, labels }: LanguagePickerProps) {
  const { pending, switchLocale } = useLocaleTransition();
  const currentLanguage = LANGUAGES.find((language) => language.code === current) ?? LANGUAGES[0]!;

  const onValueChange = (code: string) => {
    if (isLocale(code) && code !== current) switchLocale(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost-inverse" size="icon" aria-label={labels[current]} disabled={pending}>
          {pending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Image src={currentLanguage.flag} alt="" width={20} height={20} className={flagClasses} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuRadioGroup value={current} onValueChange={onValueChange}>
          {LANGUAGES.map((language) => (
            <DropdownMenuRadioItem key={language.code} value={language.code} className="gap-2">
              <Image src={language.flag} alt="" width={20} height={20} className={flagClasses} />
              {labels[language.code]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
