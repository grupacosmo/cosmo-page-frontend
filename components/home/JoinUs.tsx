import { ArrowUpRight, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { JOIN_FORM_URL } from '@/lib/data/site';
import type { Translate } from '@/lib/i18n/server';

/** Recruitment call-to-action on the brand gradient. */
export function JoinUs({ id, t }: { id: string; t: Translate }) {
  return (
    <Card id={id} className="bg-linear-to-r from-cosmo-magenta to-cosmo-blue py-8 text-base text-white ring-0 sm:py-10">
      <CardContent className="flex flex-col items-center gap-6 text-center md:flex-row md:px-10 md:text-left">
        <Rocket className="size-12 shrink-0" aria-hidden="true" />
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">{t('home.joinCosmo')}</h2>
          <p className="text-white/80">{t('home.joinCosmoDescription')}</p>
        </div>
        <Button asChild variant="secondary" size="lg" className="h-10 px-5 text-base">
          <a href={JOIN_FORM_URL} target="_blank" rel="noopener noreferrer">
            {t('common.fillForm')}
            <ArrowUpRight />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
