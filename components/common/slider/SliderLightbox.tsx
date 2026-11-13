'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, useCarousel } from '@/components/ui/carousel';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { SlideImage } from '@/lib/types';
import { SliderArrows, SliderDots } from './SliderControls';

interface SliderLightboxProps {
  images: SlideImage[];
  /** Slide shown when the lightbox opens. */
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Reports the slide the visitor moved to, so the slider on the page follows along. */
  onIndexChange: (index: number) => void;
  /** Where focus goes when the lightbox closes. */
  onCloseAutoFocus: (event: Event) => void;
}

/**
 * Fullscreen gallery. Loaded lazily (see `Slider`): its code is only fetched the first time someone
 * opens an image, so it costs nothing on the initial page load.
 */
export function SliderLightbox({
  images,
  index,
  open,
  onOpenChange,
  onIndexChange,
  onCloseAutoFocus,
}: SliderLightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        // No description element in this dialog.
        aria-describedby={undefined}
        onCloseAutoFocus={onCloseAutoFocus}
        className="top-0 left-0 block h-dvh max-w-none translate-x-0 translate-y-0 overflow-hidden rounded-none bg-black/95 p-0 text-white ring-0 sm:max-w-none"
      >
        {/* Mounted on every open, so it starts from whichever slide the page slider is on. */}
        <LightboxCarousel images={images} index={index} onIndexChange={onIndexChange} />
      </DialogContent>
    </Dialog>
  );
}

type LightboxCarouselProps = Pick<SliderLightboxProps, 'images' | 'index' | 'onIndexChange'>;

function LightboxCarousel({ images, index, onIndexChange }: LightboxCarouselProps) {
  const t = useTranslations('common.carousel');
  // Frozen at mount: `index` keeps changing while the visitor browses, and feeding that back in as
  // an option would re-initialise the carousel in the middle of every slide change.
  const [startIndex] = useState(index);

  return (
    <Carousel opts={{ loop: images.length > 1, startIndex }} aria-label={t('gallery')} className="h-full">
      <LightboxStage images={images} startIndex={startIndex} onIndexChange={onIndexChange} />
    </Carousel>
  );
}

interface LightboxStageProps {
  images: SlideImage[];
  startIndex: number;
  onIndexChange: (index: number) => void;
}

function LightboxStage({ images, startIndex, onIndexChange }: LightboxStageProps) {
  const t = useTranslations('common.carousel');
  const { api, selectedIndex } = useCarousel();
  const count = images.length;
  // Until the carousel has initialised it reports slide 0; show the slide it will start on instead.
  const current = api ? selectedIndex : startIndex;

  useEffect(() => {
    if (!api) return;
    const report = () => onIndexChange(api.selectedScrollSnap());
    api.on('select', report);
    return () => {
      api.off('select', report);
    };
  }, [api, onIndexChange]);

  return (
    <>
      <DialogTitle className="sr-only">{images[current]?.alt}</DialogTitle>

      <CarouselContent viewportClassName="h-full" className="ml-0 h-full">
        {images.map((image, i) => (
          <CarouselItem
            key={`${image.src}-${i}`}
            aria-label={t('slideOf', { current: i + 1, total: count })}
            inert={i !== current}
            className="h-full pl-0"
          >
            <figure className="relative flex size-full items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="100vw"
                draggable={false}
                className="max-h-full max-w-full object-contain select-none"
              />
              {image.caption && (
                <figcaption className="absolute bottom-12 left-1/2 max-w-[80%] -translate-x-1/2 rounded-lg bg-black/80 px-4 py-2 text-center text-sm">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      <Badge variant="secondary" className="absolute top-4 left-4 z-10 tabular-nums">
        {current + 1} / {count}
      </Badge>
      <DialogClose asChild>
        <Button
          variant="ghost-inverse"
          aria-label={t('closeFullscreen')}
          className="absolute top-3 right-3 z-20 size-11 rounded-full bg-white/10"
        >
          <X className="size-5" />
        </Button>
      </DialogClose>

      {count > 1 && (
        <>
          <SliderArrows variant="lightbox" />
          <SliderDots count={count} />
        </>
      )}
    </>
  );
}
