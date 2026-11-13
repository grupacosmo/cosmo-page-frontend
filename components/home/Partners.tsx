import Image from 'next/image';
import { Section, SectionHeader } from '@/components/common/Container';
import { Card } from '@/components/ui/card';
import { partners } from '@/lib/data/site';

export function Partners({ title }: { title: string }) {
  return (
    <Section>
      <SectionHeader title={title} />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {partners.map((partner) => (
          <li key={partner.name}>
            <Card asChild className="h-24 items-center justify-center px-4 transition-colors hover:bg-muted/50 sm:h-28">
              <a href={partner.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={partner.logo.src}
                  alt={partner.name}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  sizes="(max-width: 768px) 45vw, 240px"
                  className="max-h-12 w-auto object-contain sm:max-h-14"
                />
              </a>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
