import { Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { CONTACT_ADDRESS, CONTACT_EMAIL, socialLinks } from '@/lib/data/site';
import type { Translate } from '@/lib/i18n/server';
import type { NavItem } from './Header';

interface FooterProps {
  t: Translate;
  navItems: NavItem[];
}

const linkClasses = 'transition-colors hover:text-white';

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

export function Footer({ t, navItems }: FooterProps) {
  return (
    <footer className="mt-auto bg-cosmo-dark-blue text-sm text-white/70">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
        <div className="flex flex-col gap-3">
          <Image src="/images/cosmo-white.png" alt="Cosmo PK" width={341} height={288} className="h-8 w-[150px] object-cover" />
          <p className="max-w-xs">{t('home.name')}</p>
        </div>
        <FooterColumn title={t('navigation.links')}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClasses}>
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title={t('footer.followUs')}>
          {socialLinks.map((link) => (
            <li key={link.name}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                {link.name}
              </a>
            </li>
          ))}
        </FooterColumn>
        <FooterColumn title={t('footer.contactUs')}>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className={`flex items-center gap-2 break-all ${linkClasses}`}>
              <Mail className="size-4 shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            {CONTACT_ADDRESS}
          </li>
        </FooterColumn>
      </Container>
      <Separator className="bg-white/10" />
      <Container className="py-6 text-center text-xs sm:text-left">
        &copy; {new Date().getFullYear()} Cosmo PK Group. {t('footer.allRightsReserved')}.
      </Container>
    </footer>
  );
}
