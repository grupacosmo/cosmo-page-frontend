'use client';

import { LoaderCircle, Maximize2, Pause, Play } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from '@/components/ui/carousel';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { SlideImage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { SliderArrows, SliderDots } from './slider/SliderControls';

// Code-split: fetched on the first "open fullscreen", not with the page.
const SliderLightbox = dynamic(() => import('./slider/SliderLightbox').then((module) => module.SliderLightbox), {
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 text-white">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  ),
});

interface SliderProps {
  images: SlideImage[];
  emptyText: string;
  /** Milliseconds between automatic slide changes; `0` turns autoplay off. */
  autoSlideInterval?: number;
  /** Sizing of the slider box; defaults to a responsive aspect ratio. */
  className?: string;
}

const boxClasses = 'aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted sm:aspect-video lg:aspect-[4/3]';
/** Round controls drawn over the photo (pause, fullscreen hint). */
const chipClasses = 'flex size-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm';

/**
 * Image carousel: swipe or drag (the photo follows the finger), arrow keys, always-visible arrows
 * and dots, pausable autoplay and a fullscreen lightbox. The box has a fixed aspect ratio, so
 * nothing around it moves while images load.
 */
export function Slider({ images, emptyText, autoSlideInterval = 5000, className }: SliderProps) {
  const t = useTranslations('common.carousel');
  const root = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Stays true after the first open so the lightbox can play its closing animation.
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);

  if (images.length === 0) {
    return (
      <p className={cn(boxClasses, 'flex items-center justify-center text-sm text-muted-foreground', className)}>
        {emptyText}
      </p>
    );
  }

  const openFullscreen = () => {
    setLightboxStart(api?.selectedScrollSnap() ?? 0);
    setLightboxLoaded(true);
    setIsFullscreen(true);
  };

  // The photo that opened the lightbox may have scrolled away meanwhile; focus the visible one.
  const focusCurrentSlide = (event: Event) => {
    event.preventDefault();
    root.current?.querySelector<HTMLElement>('[data-slot="carousel-item"]:not([inert]) button')?.focus();
  };

  return (
    <>
      <Carousel
        ref={root}
        setApi={setApi}
        opts={{ loop: images.length > 1 }}
        aria-label={t('gallery')}
        className={cn(boxClasses, 'select-none', className)}
      >
        <SliderStage
          images={images}
          autoSlideInterval={autoSlideInterval}
          suspended={isFullscreen}
          onOpen={openFullscreen}
        />
      </Carousel>

      {/* Outside the carousel above, so keys pressed in the lightbox don't also drive that one. */}
      {lightboxLoaded && (
        <SliderLightbox
          images={images}
          index={lightboxStart}
          open={isFullscreen}
          onOpenChange={setIsFullscreen}
          onIndexChange={(index) => api?.scrollTo(index, true)}
          onCloseAutoFocus={focusCurrentSlide}
        />
      )}
    </>
  );
}

interface SliderStageProps {
  images: SlideImage[];
  autoSlideInterval: number;
  /** Holds autoplay while the lightbox is open. */
  suspended: boolean;
  onOpen: () => void;
}

/** Slides, controls and autoplay; lives inside `Carousel` so it can read the carousel's position. */
function SliderStage({ images, autoSlideInterval, suspended, onOpen }: SliderStageProps) {
  const t = useTranslations('common.carousel');
  const { api, selectedIndex } = useCarousel();
  const reducedMotion = usePrefersReducedMotion();
  const count = images.length;
  const hasMultiple = count > 1;

  // Autoplay runs unless the visitor switched it off, or is busy with the slider right now.
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const canAutoplay = hasMultiple && autoSlideInterval > 0 && !reducedMotion;
  const playing = canAutoplay && autoplay && !hovered && !focused && !dragging && !suspended;

  // Restarts whenever the slide changes, so manual navigation resets the countdown.
  useEffect(() => {
    if (!api || !playing) return;
    const timer = window.setTimeout(() => api.scrollNext(), autoSlideInterval);
    return () => window.clearTimeout(timer);
  }, [api, playing, autoSlideInterval, selectedIndex]);

  useEffect(() => {
    if (!api) return;
    const start = () => setDragging(true);
    const end = () => setDragging(false);
    api.on('pointerDown', start).on('pointerUp', end);
    return () => {
      api.off('pointerDown', start).off('pointerUp', end);
    };
  }, [api]);

  // Only a real mouse "hovers": on touch screens the pointer never leaves, which would pause forever.
  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setHovered(true);
  };
  // Likewise only keyboard focus pauses, not the focus a tap leaves behind on a button.
  const onFocus = (event: FocusEvent) => {
    if (event.target.matches(':focus-visible')) setFocused(true);
  };
  const onBlur = (event: FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <div
      className="size-full"
      onPointerEnter={onPointerEnter}
      onPointerLeave={() => setHovered(false)}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <CarouselContent viewportClassName="h-full" className="ml-0 h-full">
        {images.map((image, i) => (
          <CarouselItem
            key={`${image.src}-${i}`}
            aria-label={t('slideOf', { current: i + 1, total: count })}
            // Slides outside the frame are skipped by the keyboard and screen readers.
            inert={i !== selectedIndex}
            className="h-full pl-0"
          >
            <button
              type="button"
              onClick={onOpen}
              aria-label={`${image.alt} (${t('openFullscreen')})`}
              className="relative block size-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
            >
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                draggable={false}
                loading={i === 0 ? 'eager' : 'lazy'}
                placeholder={SHIMMER_PLACEHOLDER}
                className="pointer-events-none size-full object-cover"
              />
              {image.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-black/70 px-4 pt-6 pb-10 text-center text-sm text-white">
                  {image.caption}
                </span>
              )}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Hint that the photo opens fullscreen; the photo itself is the button. */}
      <span aria-hidden="true" className={cn(chipClasses, 'pointer-events-none absolute top-3 right-3 z-10')}>
        <Maximize2 className="size-4" />
      </span>

      {canAutoplay && (
        <button
          type="button"
          onClick={() => setAutoplay(!autoplay)}
          aria-label={t(autoplay ? 'pause' : 'play')}
          className={cn(
            chipClasses,
            'absolute top-3 left-3 z-10 touch-manipulation transition-colors outline-none hover:bg-black/75 focus-visible:ring-3 focus-visible:ring-white/70',
          )}
        >
          {autoplay ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      )}

      {hasMultiple && (
        <>
          <SliderArrows variant="inline" />
          <SliderDots count={count} />
        </>
      )}

      {/* Announces the slide after a manual change; silent while autoplay is running. */}
      <span aria-live="polite" className="sr-only">
        {playing ? '' : `${t('slideOf', { current: selectedIndex + 1, total: count })}: ${images[selectedIndex]?.alt ?? ''}`}
      </span>
    </div>
  );
}
