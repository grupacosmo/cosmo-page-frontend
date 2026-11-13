'use client';

import Image from 'next/image';
import type { KeyboardEvent } from 'react';
import { Dialog, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { useSwipe } from '@/lib/hooks/useSwipe';
import type { SlideImage } from '@/lib/types';
import { IconButton } from '../IconButton';
import { ModalContent } from '../Modal';
import { SliderArrows, SliderDots } from './SliderControls';
import { trackClasses } from './SlideTrack';

interface SliderLightboxProps {
  images: SlideImage[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Moves to a slide without the inline slider's transition lock. */
  onGoTo: (index: number) => void;
}

/**
 * Fullscreen gallery. Loaded lazily (see `Slider`): its code is only fetched the first time someone
 * opens an image, so it costs nothing on the initial page load.
 */
export function SliderLightbox({ images, index, open, onOpenChange, onGoTo }: SliderLightboxProps) {
  const count = images.length;
  const hasMultiple = count > 1;
  const { handlers } = useSwipe({ onSwipe: (direction) => onGoTo(index + direction), stopPropagation: true });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') onGoTo(index - 1);
    if (event.key === 'ArrowRight') onGoTo(index + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ModalContent variant="lightbox" onKeyDown={onKeyDown} {...handlers}>
        <DialogTitle className="sr-only">{images[index]?.alt}</DialogTitle>
        <DialogClose asChild>
          <IconButton tone="glass" size="lg" icon="close" label="Close fullscreen" className="absolute top-2.5 right-2.5 z-[10001]" />
        </DialogClose>

        <div className="flex h-full w-full items-center overflow-hidden">
          <div className={trackClasses} style={{ transform: `translateX(-${index * 100}%)` }}>
            {images.map((image) => (
              <div key={image.src} className="relative flex h-full w-full flex-[0_0_100%] items-center justify-center">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="100vw"
                  draggable={false}
                  className="block max-h-full max-w-full object-contain select-none"
                />
                {image.caption && (
                  <div className="absolute bottom-[45px] left-1/2 max-w-[80%] -translate-x-1/2 rounded-lg bg-black/80 px-5 py-2.5 text-center text-base text-white">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {hasMultiple && (
          <>
            <SliderArrows variant="lightbox" onStep={(direction) => onGoTo(index + direction)} />
            <SliderDots
              count={count}
              index={index}
              onSelect={onGoTo}
              className="bottom-[15px] z-[10000] gap-[5px] md:bottom-5 md:gap-[7.5px]"
              dotClassName="size-3 md:size-4 hover:border-white/90"
              inactiveClassName="border-white/60"
            />
          </>
        )}

        <div className="absolute top-2.5 left-2.5 z-[10001] rounded-[20px] bg-black/60 px-2.5 py-[5px] text-xs font-medium text-white">
          {index + 1} / {count}
        </div>
      </ModalContent>
    </Dialog>
  );
}
