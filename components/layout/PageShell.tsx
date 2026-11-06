import type { ReactNode } from 'react';
import { cssUrl } from '@/lib/format';

interface PageShellProps {
  title: string;
  /** Banner background image path. */
  image: string;
  /** Vertical background position of the banner image, e.g. `50%`. */
  imagePositionY: string;
  /** Classes for the white content card. */
  cardClassName?: string;
  /** Stretch the content area to at least the viewport height. */
  fullHeight?: boolean;
  children: ReactNode;
}

/** Subpage layout: tinted image banner followed by the gradient content area with a white card. */
export function PageShell({ title, image, imagePositionY, cardClassName, fullHeight, children }: PageShellProps) {
  return (
    <div className="grow xl:grid xl:grid-rows-[400px_1fr]">
      <section
        className="relative z-[1] bg-cover bg-no-repeat py-[100px] before:absolute before:inset-0 before:bg-cosmo-overlay"
        style={{ backgroundImage: cssUrl(image), backgroundPositionY: imagePositionY }}
      >
        <div className="relative mx-auto max-w-[1600px] px-[60px] text-white">
          <h1 className="text-[40px] font-normal md:text-[60px]">{title}</h1>
        </div>
      </section>
      <section
        className={`relative z-[2] bg-linear-to-b from-cosmo-dark-blue to-cosmo-magenta shadow-content ${fullHeight ? 'min-h-[calc(100vh-70px)]' : ''}`}
      >
        <MainCard className={cardClassName}>{children}</MainCard>
      </section>
    </div>
  );
}

export function MainCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-[1600px] xl:px-[60px] xl:pb-10">
      <div className={`rounded-t-[15px] bg-white xl:rounded-b-[15px] ${className ?? 'p-5'}`}>{children}</div>
    </main>
  );
}
