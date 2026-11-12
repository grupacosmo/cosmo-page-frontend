import Image from 'next/image';
import { Container } from '@/components/common/Container';
import { CtaContent, CtaSlot } from '@/components/common/CtaButton';
import { ScrollLink } from '@/components/common/ScrollLink';
import { socialLinks } from '@/lib/data/site';

interface HeroProps {
  subtitle: string;
  joinUsLabel: string;
  joinUsTargetId: string;
}

export function Hero({ subtitle, joinUsLabel, joinUsTargetId }: HeroProps) {
  return (
    <section className="py-[100px] text-white">
      <Container gutter="page" className="flex flex-col max-xs:items-center max-xs:gap-2.5 max-xs:text-center">
        <h1 className="m-0 text-[50px] font-normal xs:text-[60px]">COSMO PK</h1>
        <p className="mb-2.5 text-[20px] xs:text-[30px]">{subtitle}</p>
        <div className="flex gap-5 max-xs:justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="transition-transform duration-500 ease-in-out hover:scale-120"
            >
              <Image src={link.icon} alt="" width={20} height={20} className="size-5" />
            </a>
          ))}
        </div>
        <CtaSlot className="mt-5 w-fit">
          <ScrollLink targetId={joinUsTargetId}>
            <CtaContent text={joinUsLabel} />
          </ScrollLink>
        </CtaSlot>
      </Container>
    </section>
  );
}
