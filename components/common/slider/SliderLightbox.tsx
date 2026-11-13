'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import type { KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSwipe } from '@/lib/hooks/useSwipe';
import type { SlideImage } from '@/lib/types';
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
  const { handlers } = useSwipe({ onSwipe: (direction) => onGoTo(index + direction), stopPropagation: true });

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') onGoTo(index - 1);
    if (event.key === 'ArrowRight') onGoTo(index + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        // No description element in this dialog.
        aria-describedby={undefined}
        onKeyDown={onKeyDown}
        className="top-0 left-0 block h-dvh max-w-none translate-x-0 translate-y-0 overflow-hidden rounded-none bg-black/95 p-0 text-white ring-0 sm:max-w-none"
        {...handlers}
      >
        <DialogTitle className="sr-only">{images[index]?.alt}</DialogTitle>

        <div className={trackClasses} style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((image, i) => (
            <figure key={`${image.src}-${i}`} className="relative flex h-full w-full flex-[0_0_100%] items-center justify-center">
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
          ))}
        </div>

        <Badge variant="secondary" className="absolute top-4 left-4 z-10">
          {index + 1} / {count}
        </Badge>
        <DialogClose asChild>
          <Button
            variant="ghost-inverse"
            size="icon-lg"
            aria-label="Close fullscreen"
            className="absolute top-3 right-3 z-20 rounded-full bg-white/10"
          >
            <X />
          </Button>
        </DialogClose>

        {count > 1 && (
          <>
            <SliderArrows variant="lightbox" onStep={(direction) => onGoTo(index + direction)} />
            <SliderDots count={count} index={index} onSelect={onGoTo} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
