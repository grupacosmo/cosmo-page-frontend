'use client';

import Image from 'next/image';
import type { TouchEvent } from 'react';
import { Button } from '@/components/ui/button';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { SlideImage } from '@/lib/types';
import { Icon } from '../Icon';

const trackClasses =
  'flex h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform motion-reduce:transition-none';

interface SlideTrackProps {
  images: SlideImage[];
  index: number;
  onOpen: () => void;
  swipeHandlers: {
    onTouchStart: (event: TouchEvent) => void;
    onTouchMove: (event: TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

/** The strip of slides; moves by translating, so only the transform changes between slides. */
export function SlideTrack({ images, index, onOpen, swipeHandlers }: SlideTrackProps) {
  return (
    <div className="h-full w-full" {...swipeHandlers}>
      <div className={trackClasses} style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((image, i) => (
          <Button
            key={image.src}
            variant="bare"
            size="none"
            className="relative flex h-full w-full flex-[0_0_100%] items-center justify-center rounded-none border-0 active:not-aria-[haspopup]:translate-y-0"
            onClick={onOpen}
            aria-label={`${image.alt} (fullscreen)`}
            tabIndex={i === index ? 0 : -1}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1280px) 100vw, 45vw"
              draggable={false}
              priority={i === 0}
              placeholder={SHIMMER_PLACEHOLDER}
              className="pointer-events-none block h-full w-full object-cover"
            />
            {image.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-black/70 px-[15px] pt-5 pb-[30px] text-center text-base text-white">
                {image.caption}
              </span>
            )}
            <span className="pointer-events-none absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:size-10">
              <Icon name="fullscreen" size={20} />
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export { trackClasses };
