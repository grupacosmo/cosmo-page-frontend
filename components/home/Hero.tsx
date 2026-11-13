import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { ScrollLink } from '@/components/common/ScrollLink';
import { Button } from '@/components/ui/button';
import { socialLinks } from '@/lib/data/site';

interface HeroProps {
  subtitle: string;
  joinUsLabel: string;
  joinUsTargetId: string;
  projectsLabel: string;
}

/** Shared by `Hero` and its skeleton so both occupy the same box. */
export const heroLayout = 'flex flex-col items-center gap-6 py-16 text-center sm:items-start sm:py-24 sm:text-left';
export const heroTitle = 'text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl';

export function Hero({ subtitle, joinUsLabel, joinUsTargetId, projectsLabel }: HeroProps) {
  return (
    <section className="pt-16 text-white">
      <Container className={heroLayout}>
        <div className="flex flex-col gap-3">
          <h1 className={heroTitle}>COSMO PK</h1>
          <p className="max-w-2xl text-lg text-white/80 sm:text-xl">{subtitle}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="brand" size="lg" className="h-10 px-5 text-base">
            <ScrollLink targetId={joinUsTargetId}>{joinUsLabel}</ScrollLink>
          </Button>
          <Button asChild variant="ghost-inverse" size="lg" className="h-10 border-white/30 px-5 text-base">
            <Link href="/projects">
              {projectsLabel}
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <ul className="flex gap-1">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <Button asChild variant="ghost-inverse" size="icon-lg">
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  <Image src={link.icon} alt="" width={20} height={20} className="size-5" />
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
