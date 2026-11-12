import { Container } from '@/components/common/Container';
import { CtaLink } from '@/components/common/CtaButton';
import { JOIN_FORM_URL } from '@/lib/data/site';
import type { Translate } from '@/lib/i18n/server';

const ROCKET_ILLUSTRATION = 'https://cdn-icons-png.freepik.com/512/5537/5537993.png';

export function JoinUs({ t }: { t: Translate }) {
  return (
    <Container width="narrow" className="my-[60px] flex items-start justify-center gap-5">
      {/* External illustration kept from the original design; replace with a local asset when available. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ROCKET_ILLUSTRATION}
        alt=""
        className="h-full max-h-[100px] select-none md:max-h-[150px]"
        referrerPolicy="no-referrer"
      />
      <div>
        <h1 className="my-2.5 text-cosmo-xl font-bold text-cosmo-magenta">{t('home.joinCosmo')}</h1>
        <p className="my-2.5">{t('home.joinCosmoDescription')}</p>
        <CtaLink href={JOIN_FORM_URL} external text={t('common.fillForm')} />
      </div>
    </Container>
  );
}
