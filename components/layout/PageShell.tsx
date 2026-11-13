import type { ReactNode } from 'react';
import { Container } from '@/components/common/Container';
import { Skeleton } from '@/components/common/Skeleton';
import { Surface } from '@/components/common/Surface';
import { cssUrl } from '@/lib/format';

interface PageShellProps {
  /** Banner heading; omitted in loading skeletons, where it renders as a shimmer bar. */
  title?: string;
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
        <Container gutter="page" className="relative text-white">
          {title === undefined ? (
            // Same box as the heading (font-size × line-height 1.5), so nothing shifts when it arrives.
            <div className="flex h-[60px] items-center md:h-[90px]">
              <Skeleton tone="dark" shape="line" className="h-[40px] w-[min(320px,80%)] md:h-[56px]" />
            </div>
          ) : (
            <h1 className="text-[40px] font-normal md:text-[60px]">{title}</h1>
          )}
        </Container>
      </section>
      <section
        className={`relative z-[2] bg-linear-to-b from-cosmo-dark-blue to-cosmo-magenta shadow-content ${fullHeight ? 'min-h-[calc(100vh-70px)]' : ''}`}
      >
        <MainCard className={cardClassName}>{children}</MainCard>
      </section>
    </div>
  );
}

/** The white page sheet that holds a page's content. */
export function MainCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Container asChild gutter="sheet">
      <main>
        <Surface tone="paper" radius="sheet" padding="md" className={className}>
          {children}
        </Surface>
      </main>
    </Container>
  );
}
