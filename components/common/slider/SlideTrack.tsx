'use client';

import { Maximize2 } from 'lucide-react';
import Image from 'next/image';
import type { TouchEvent } from 'react';
import { SHIMMER_PLACEHOLDER } from '@/lib/shimmer';
import type { SlideImage } from '@/lib/types';

export const trackClasses =
  'flex h-full w-full transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none';

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
          <button
            key={`${image.src}-${i}`}
            type="button"
            className="relative h-full w-full flex-[0_0_100%] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
            onClick={onOpen}
            aria-label={`${image.alt} (fullscreen)`}
            tabIndex={i === index ? 0 : -1}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1024px) 100vw, 50vw"
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
              placeholder={SHIMMER_PLACEHOLDER}
              className="pointer-events-none h-full w-full object-cover"
            />
            {image.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-black/70 px-4 pt-6 pb-8 text-center text-sm text-white">
                {image.caption}
              </span>
            )}
            <span className="pointer-events-none absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 className="size-4" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
