'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogTitle } from '@/components/ui/dialog';
import type { SlideImage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { ModalContent } from './Modal';

interface SliderProps {
  images: SlideImage[];
  emptyText: string;
  autoSlideInterval?: number;
  height?: string;
}

const SWIPE_THRESHOLD = 50;
const SCROLL_PREVENTION_THRESHOLD = 10;
const TRANSITION_MS = 300;

/** Image carousel with autoplay, swipe, dots/arrows and a fullscreen lightbox. */
export function Slider({ images, emptyText, autoSlideInterval = 5000, height = '400px' }: SliderProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touch = useRef({ startX: 0, endX: 0, active: false });
  const count = images.length;
  const hasMultiple = count > 1;

  const goTo = useCallback(
    (next: number, animateLock = true) => {
      if (!hasMultiple) return;
      setIndex(((next % count) + count) % count);
      if (animateLock) {
        setIsTransitioning(true);
        window.setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
      }
    },
    [count, hasMultiple],
  );

  const next = useCallback(() => setIndex((i) => (hasMultiple ? (i + 1) % count : i)), [count, hasMultiple]);

  // Autoplay; restarts whenever the slide changes so manual navigation resets the timer.
  useEffect(() => {
    if (!hasMultiple || isPaused || isFullscreen || autoSlideInterval <= 0) return;
    const timer = window.setInterval(next, autoSlideInterval);
    return () => window.clearInterval(timer);
  }, [hasMultiple, isPaused, isFullscreen, autoSlideInterval, next, index]);

  const onLightboxKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') goTo(index - 1, false);
    if (event.key === 'ArrowRight') goTo(index + 1, false);
  };

  const onTouchStart = (event: TouchEvent) => {
    const x = event.touches[0]?.clientX ?? 0;
    touch.current = { startX: x, endX: x, active: true };
    if (isFullscreen) event.stopPropagation();
  };

  const onTouchMove = (event: TouchEvent) => {
    if (!touch.current.active) return;
    touch.current.endX = event.touches[0]?.clientX ?? touch.current.endX;
    if (Math.abs(touch.current.endX - touch.current.startX) > SCROLL_PREVENTION_THRESHOLD && event.cancelable) {
      event.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touch.current.active) return;
    touch.current.active = false;
    const distance = touch.current.startX - touch.current.endX;
    if (Math.abs(distance) > SWIPE_THRESHOLD) goTo(distance > 0 ? index + 1 : index - 1, !isFullscreen);
  };

  const wasSwipe = () => Math.abs(touch.current.startX - touch.current.endX) > SWIPE_THRESHOLD;

  if (count === 0) {
    return (
      <div
        className="flex w-full items-center justify-center rounded-lg bg-[#f8f9fa] text-[#6c757d]"
        style={{ height }}
      >
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="group relative w-full touch-pan-y overflow-hidden rounded-lg bg-[#f0f0f0] select-none"
        style={{ height }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="h-full w-full" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <div
            className="flex h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((image, i) => (
              <Button
                key={i}
                variant="bare"
                size="none"
                className="relative flex h-full w-full flex-[0_0_100%] items-center justify-center rounded-none border-0 active:not-aria-[haspopup]:translate-y-0"
                onClick={() => !wasSwipe() && setIsFullscreen(true)}
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

        {hasMultiple && (
          <>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-[5px] opacity-0 group-hover:opacity-100 md:px-2.5">
              {(['prev', 'next'] as const).map((direction) => (
                <IconButton
                  key={direction}
                  tone="light"
                  size="lg"
                  icon={direction === 'prev' ? 'chevronLeft' : 'chevronRight'}
                  iconSize={20}
                  label={direction === 'prev' ? 'Previous image' : 'Next image'}
                  disabled={isTransitioning}
                  onClick={() => goTo(direction === 'prev' ? index - 1 : index + 1)}
                  className="pointer-events-auto z-10"
                />
              ))}
            </div>
            <Dots count={count} index={index} disabled={isTransitioning} onSelect={(i) => goTo(i)} />
          </>
        )}
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <ModalContent
          variant="lightbox"
          onKeyDown={onLightboxKeyDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <DialogTitle className="sr-only">{images[index]?.alt}</DialogTitle>
          <DialogClose asChild>
            <IconButton
              tone="glass"
              size="lg"
              icon="close"
              label="Close fullscreen"
              className="absolute top-2.5 right-2.5 z-[10001]"
            />
          </DialogClose>

          <div className="flex h-full w-full items-center overflow-hidden">
            <div
              className="flex h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {images.map((image, i) => (
                <div key={i} className="relative flex h-full w-full flex-[0_0_100%] items-center justify-center">
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
            <div className="pointer-events-none absolute inset-0 z-[10000] flex items-center justify-between px-2.5 md:px-5">
              {(['prev', 'next'] as const).map((direction) => (
                <IconButton
                  key={direction}
                  tone="glass"
                  size="xl"
                  icon={direction === 'prev' ? 'chevronLeft' : 'chevronRight'}
                  iconSize={28}
                  label={direction === 'prev' ? 'Previous image' : 'Next image'}
                  onClick={() => goTo(direction === 'prev' ? index - 1 : index + 1, false)}
                  className="pointer-events-auto hover:scale-110 active:scale-95"
                />
              ))}
            </div>
          )}

          {hasMultiple && (
            <Dots
              count={count}
              index={index}
              onSelect={(i) => goTo(i, false)}
              className="bottom-[15px] z-[10000] gap-[5px] md:bottom-5 md:gap-[7.5px]"
              dotClassName="size-3 md:size-4 hover:border-white/90"
              inactiveClassName="border-white/60"
            />
          )}

          <div className="absolute top-2.5 left-2.5 z-[10001] rounded-[20px] bg-black/60 px-2.5 py-[5px] text-xs font-medium text-white">
            {index + 1} / {count}
          </div>
        </ModalContent>
      </Dialog>
    </>
  );
}

interface DotsProps {
  count: number;
  index: number;
  disabled?: boolean;
  onSelect: (index: number) => void;
  className?: string;
  dotClassName?: string;
  inactiveClassName?: string;
}

function Dots({ count, index, disabled, onSelect, className, dotClassName, inactiveClassName }: DotsProps) {
  return (
    <div
      className={cn(
        'absolute bottom-[7.5px] left-1/2 z-10 flex -translate-x-1/2 gap-[3.75px] md:bottom-2.5 md:gap-[5px]',
        className,
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <Button
          key={i}
          variant="bare"
          size="none"
          disabled={disabled}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index}
          className={cn(
            'size-2.5 rounded-full border-2 bg-clip-border transition-all duration-200 hover:not-disabled:scale-110 hover:not-disabled:border-white active:not-aria-[haspopup]:translate-y-0 disabled:cursor-not-allowed md:size-3 md:hover:not-disabled:scale-120',
            dotClassName,
            i === index ? 'border-white bg-white/90' : cn('border-white/80 bg-transparent', inactiveClassName),
          )}
        />
      ))}
    </div>
  );
}
