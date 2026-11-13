import type { ReactNode } from 'react';
import { Container } from '@/components/common/Container';
import { SKELETON_ON_DARK } from '@/components/common/Skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { cssUrl } from '@/lib/format';
import { cn } from '@/lib/utils';

interface PageShellProps {
  /** Banner heading; omitted in loading skeletons, where it renders as a placeholder bar. */
  title?: string;
  /** Banner background image path. */
  image: string;
  /** Vertical background position of the banner image, e.g. `50%`. */
  imagePositionY: string;
  children: ReactNode;
}

/** Subpage layout: tinted image banner followed by the brand gradient holding the white page sheet. */
export function PageShell({ title, image, imagePositionY, children }: PageShellProps) {
  return (
    <div className="flex grow flex-col">
      <section
        className="relative isolate bg-cover bg-no-repeat pt-16 text-white before:absolute before:inset-0 before:-z-10 before:bg-cosmo-overlay"
        style={{ backgroundImage: cssUrl(image), backgroundPositionY: imagePositionY }}
      >
        <Container className="py-12 sm:py-16 lg:py-20">
          {title === undefined ? (
            <Skeleton className={cn('h-10 w-64 max-w-full sm:h-12 lg:h-[3.75rem]', SKELETON_ON_DARK)} />
          ) : (
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          )}
        </Container>
      </section>
      <div className="relative z-10 grow bg-linear-to-b from-cosmo-dark-blue to-cosmo-magenta shadow-content">
        <PageSheet>{children}</PageSheet>
      </div>
    </div>
  );
}

/**
 * The white sheet that holds a page's content: edge-to-edge on phones, a floating panel above.
 * Deliberately not a shadcn `Card`: a card drops its bottom padding when anything inside it has a
 * card footer, which the project cards on the sheet do.
 */
export function PageSheet({ children }: { children: ReactNode }) {
  return (
    <Container asChild className="px-0 sm:pb-12 lg:pb-16">
      <main>
        <div className="flex flex-col gap-10 bg-card p-5 text-card-foreground sm:gap-12 sm:rounded-xl sm:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </Container>
  );
}
