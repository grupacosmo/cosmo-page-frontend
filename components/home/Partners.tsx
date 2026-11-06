import Image from 'next/image';
import { partners } from '@/lib/data/site';

export function Partners({ title }: { title: string }) {
  return (
    <div className="flex flex-col justify-between p-[15px]">
      <h2>{title}</h2>
      <div className="grid w-full grid-cols-1 items-center justify-center gap-[2em] xs:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
        {partners.map((partner) => (
          <div key={partner.name} className="flex items-center justify-center">
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <Image
                src={partner.logo.src}
                alt={partner.name}
                width={partner.logo.width}
                height={partner.logo.height}
                sizes="240px"
                className="h-auto max-h-[120px] w-auto max-w-full"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
