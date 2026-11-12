import Link from 'next/link';
import { Divider } from '@/components/common/Divider';
import type { Translate } from '@/lib/i18n/server';
import { CONTACT_ADDRESS, CONTACT_EMAIL, socialLinks } from '@/lib/data/site';
import type { NavItem } from './Header';

interface FooterProps {
  t: Translate;
  navItems: NavItem[];
}

const SOCIAL_IN_FOOTER = ['Facebook', 'Instagram', 'X'];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[0.5em]">
      <h3 className="m-0 text-center">{title}</h3>
      <ul className="flex flex-col items-center justify-center gap-[0.5em] text-center">{children}</ul>
    </div>
  );
}

export function Footer({ t, navItems }: FooterProps) {
  return (
    <footer className="mt-auto flex w-full flex-col gap-[1em] bg-cosmo-dark-blue py-[1em] text-cosmo-xs text-white md:pt-[3em] md:pb-[0.5em] md:pl-[4em] md:text-cosmo-s">
      <div className="flex flex-col gap-[2em] text-cosmo-s md:flex-row md:gap-[8em] xl:text-cosmo-m">
        <FooterColumn title={t('navigation.links')}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title={t('footer.followUs')}>
          {socialLinks
            .filter((link) => SOCIAL_IN_FOOTER.includes(link.name))
            .sort((a, b) => SOCIAL_IN_FOOTER.indexOf(a.name) - SOCIAL_IN_FOOTER.indexOf(b.name))
            .map((link) => (
              <li key={link.name}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
        </FooterColumn>
        <FooterColumn title={t('footer.contactUs')}>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
          <li>{CONTACT_ADDRESS}</li>
        </FooterColumn>
      </div>
      <Divider weight="thin" className="md:-ml-[2em]" />
      <p className="text-center md:text-left">
        &copy; {new Date().getFullYear()}, {t('footer.allRightsReserved')}{' '}
        <span className="underline">Cosmo PK Group</span>
      </p>
    </footer>
  );
}
