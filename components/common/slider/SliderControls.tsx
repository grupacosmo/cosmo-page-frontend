'use client';

import { useTranslations } from 'next-intl';
import { CarouselNext, CarouselPrevious, useCarousel } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface SliderArrowsProps {
  /** `inline` over the slider on the page, `lightbox` in fullscreen. */
  variant: 'inline' | 'lightbox';
}

/** Previous / next buttons on both sides of a slider. Always visible, so touch users see them too. */
export function SliderArrows({ variant }: SliderArrowsProps) {
  const t = useTranslations('common.carousel');
  const lightbox = variant === 'lightbox';
  const buttonVariant = lightbox ? 'ghost-inverse' : 'secondary';
  const buttonClasses = cn(
    'pointer-events-auto size-10',
    lightbox ? 'bg-white/10 sm:size-12' : 'bg-background/85 shadow-md backdrop-blur-sm hover:bg-background',
  );

  return (
    <div className="pointer-events-none absolute inset-x-2 top-1/2 z-10 flex -translate-y-1/2 justify-between sm:inset-x-4">
      <CarouselPrevious variant={buttonVariant} label={t('previousImage')} className={buttonClasses} />
      <CarouselNext variant={buttonVariant} label={t('nextImage')} className={buttonClasses} />
    </div>
  );
}

/**
 * One dot per slide; the current one is filled. Each dot sits in a 28px button, so it is easy to
 * hit with a finger, on a soft dark fade that keeps the dots readable over bright photos.
 */
export function SliderDots({ count }: { count: number }) {
  const t = useTranslations('common.carousel');
  const { selectedIndex, scrollTo } = useCarousel();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-linear-to-t from-black/50 to-transparent px-12 pt-6 pb-1">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => scrollTo(i)}
          aria-label={t('goToSlide', { index: i + 1 })}
          aria-current={i === selectedIndex ? 'true' : undefined}
          className="group/dot pointer-events-auto flex size-7 touch-manipulation items-center justify-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-white/70"
        >
          <span
            className={cn(
              'size-2.5 rounded-full border border-white transition-colors',
              i === selectedIndex ? 'bg-white' : 'bg-white/20 group-hover/dot:bg-white/60',
            )}
          />
        </button>
      ))}
    </div>
  );
}
