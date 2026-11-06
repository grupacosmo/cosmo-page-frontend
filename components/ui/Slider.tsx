'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import type { SlideImage } from '@/lib/types';
import { Icon } from './Icon';

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

  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
      if (event.key === 'ArrowLeft') goTo(index - 1, false);
      if (event.key === 'ArrowRight') goTo(index + 1, false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, index, goTo]);

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
              <button
                key={i}
                type="button"
                className="relative flex h-full w-full flex-[0_0_100%] cursor-pointer items-center justify-center"
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
              </button>
            ))}
          </div>
        </div>

        {hasMultiple && (
          <>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-[5px] opacity-0 group-hover:opacity-100 md:px-2.5">
              {(['prev', 'next'] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  disabled={isTransitioning}
                  onClick={() => goTo(direction === 'prev' ? index - 1 : index + 1)}
                  aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
                  className="pointer-events-auto z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/70 text-[#333] transition-all duration-200 hover:not-disabled:scale-105 active:not-disabled:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:size-12 md:hover:not-disabled:scale-110"
                >
                  <Icon name={direction === 'prev' ? 'chevronLeft' : 'chevronRight'} size={20} />
                </button>
              ))}
            </div>
            <Dots count={count} index={index} disabled={isTransitioning} onSelect={(i) => goTo(i)} />
          </>
        )}
      </div>

      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex animate-fade-in cursor-pointer items-center justify-center bg-black/95 motion-reduce:animate-none"
          onClick={() => setIsFullscreen(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
            className="absolute top-2.5 right-2.5 z-[10001] flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 md:size-12"
          >
            <Icon name="close" />
          </button>

          <div className="flex h-full w-full cursor-default items-center overflow-hidden" onClick={(e) => e.stopPropagation()}>
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
                <button
                  key={direction}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(direction === 'prev' ? index - 1 : index + 1, false);
                  }}
                  aria-label={direction === 'prev' ? 'Previous image' : 'Next image'}
                  className="pointer-events-auto flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-all duration-200 hover:scale-110 hover:bg-white/30 active:scale-95 md:size-[60px]"
                >
                  <Icon name={direction === 'prev' ? 'chevronLeft' : 'chevronRight'} size={28} />
                </button>
              ))}
            </div>
          )}

          {hasMultiple && (
            <div className="absolute bottom-[15px] left-1/2 z-[10000] flex -translate-x-1/2 gap-[5px] md:bottom-5 md:gap-[7.5px]">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i, false);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`size-3 cursor-pointer rounded-full border-2 transition-all duration-200 hover:scale-110 hover:border-white/90 md:size-4 md:hover:scale-120 ${
                    i === index ? 'border-white bg-white/90' : 'border-white/60 bg-transparent'
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute top-2.5 left-2.5 z-[10001] rounded-[20px] bg-black/60 px-2.5 py-[5px] text-xs font-medium text-white">
            {index + 1} / {count}
          </div>
        </div>
      )}
    </>
  );
}

function Dots({
  count,
  index,
  disabled,
  onSelect,
}: {
  count: number;
  index: number;
  disabled: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-[7.5px] left-1/2 z-10 flex -translate-x-1/2 gap-[3.75px] md:bottom-2.5 md:gap-[5px]">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`size-2.5 cursor-pointer rounded-full border-2 transition-all duration-200 hover:not-disabled:scale-110 hover:not-disabled:border-white disabled:cursor-not-allowed disabled:opacity-50 md:size-3 md:hover:not-disabled:scale-120 ${
            i === index ? 'border-white bg-white/90' : 'border-white/80 bg-transparent'
          }`}
        />
      ))}
    </div>
  );
}
