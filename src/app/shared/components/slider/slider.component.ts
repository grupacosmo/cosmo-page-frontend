import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  input,
  signal,
  viewChild,
  computed,
  effect,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe } from "../../pipes/translate/translate.pipe";
import { SliderImage } from "src/app/core/models/slider/slider-image.interface";

@Component({
  selector: "app-slider",
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslatePipe],
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  private readonly SWIPE_THRESHOLD = 50;
  private readonly SWIPE_DETECTION_THRESHOLD = 30;
  private readonly SCROLL_PREVENTION_THRESHOLD = 10;
  private readonly TRANSITION_DURATION = 300;

  private readonly destroyRef = inject(DestroyRef);

  readonly images = input.required<SliderImage[]>();
  readonly autoSlideInterval = input<number>(5000);
  readonly enableAutoSlide = input<boolean>(true);
  readonly showDots = input<boolean>(true);
  readonly showArrows = input<boolean>(true);
  readonly height = input<string>("400px");
  readonly enableFullscreen = input<boolean>(true);

  protected readonly sliderContainer =
    viewChild.required<ElementRef>("sliderContainer");
  protected readonly fullscreenModal = viewChild<ElementRef>("fullscreenModal");

  protected readonly currentIndex = signal<number>(0);
  protected readonly isTransitioning = signal<boolean>(false);
  protected readonly isFullscreen = signal<boolean>(false);

  private readonly touchStartX = signal<number>(0);
  private readonly touchEndX = signal<number>(0);
  private readonly isDragging = signal<boolean>(false);
  private readonly dragStartTime = signal<number>(0);
  private readonly isFullscreenDragging = signal<boolean>(false);

  readonly hasMultipleImages = computed(() => this.images().length > 1);
  readonly canShowDots = computed(() => this.showDots() && this.hasMultipleImages());
  readonly canShowArrows = computed(() => this.showArrows() && this.hasMultipleImages());

  private autoSlideTimer?: number;

  constructor() {
    effect(() => {
      console.log(this.images().length)
      if (this.enableAutoSlide() && this.autoSlideInterval() > 0 && this.hasMultipleImages()) {
        this.startAutoSlide();
      } else {
        this.stopAutoSlide();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.stopAutoSlide();
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(): void {
    this.resetTouchStateOnMouseEvent();
    this.updateSliderPosition();
  }

  @HostListener("document:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isFullscreen()) return;

    switch (event.key) {
      case "Escape":
        this.closeFullscreen();
        break;
      case "ArrowLeft":
        if (event.cancelable) {
          event.preventDefault();
        }
        this.prevSlide(true);
        break;
      case "ArrowRight":
        if (event.cancelable) {
          event.preventDefault();
        }
        this.nextSlide(true);
        break;
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    const isFullscreenMode = this.isFullscreen();
    
    if (!isFullscreenMode) {
      this.stopAutoSlide();
    }
    
    this.touchStartX.set(event.touches[0].clientX);
    this.touchEndX.set(event.touches[0].clientX);
    
    if (isFullscreenMode) {
      event.stopPropagation();
      this.isFullscreenDragging.set(true);
    } else {
      this.isDragging.set(true);
      this.dragStartTime.set(Date.now());
    }
  }

  protected onTouchMove(event: TouchEvent): void {
    const isFullscreenMode = this.isFullscreen();
    const isDragging = isFullscreenMode ? this.isFullscreenDragging() : this.isDragging();
    
    if (!isDragging) return;

    if (isFullscreenMode) {
      event.stopPropagation();
    }

    this.touchEndX.set(event.touches[0].clientX);
    if (Math.abs(this.touchEndX() - this.touchStartX()) > this.SCROLL_PREVENTION_THRESHOLD) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  }

  protected onTouchEnd(): void {
    const isFullscreenMode = this.isFullscreen();
    const isDragging = isFullscreenMode ? this.isFullscreenDragging() : this.isDragging();
    
    if (!isDragging) return;

    if (isFullscreenMode) {
      this.isFullscreenDragging.set(false);
    } else {
      this.isDragging.set(false);
    }
    
    this.handleSwipe(isFullscreenMode);

    if (!isFullscreenMode && this.enableAutoSlide()) {
      this.startAutoSlide();
    }
  }

  protected onArrowClick(direction: "prev" | "next"): void {
    this.stopAutoSlide();

    if (direction === "prev") {
      this.prevSlide();
    } else {
      this.nextSlide();
    }

    if (this.enableAutoSlide()) {
      this.startAutoSlide();
    }
  }

  protected onDotClick(index: number): void {
    const isFullscreenMode = this.isFullscreen();
    
    if (!isFullscreenMode) {
      this.stopAutoSlide();
    }
    
    this.goToSlide(index, isFullscreenMode);
  }

  protected onMouseEnter(): void {
    this.resetTouchStateOnMouseEvent();
    this.stopAutoSlide();
  }

  protected onMouseLeaveContainer(): void {
    if (this.enableAutoSlide() && !this.isDragging()) {
      this.startAutoSlide();
    }
  }

  protected onSlideClick(e: Event): void {
    const isMouseEvent = e instanceof MouseEvent;
    
    if (isMouseEvent) {
      this.resetTouchStateOnMouseEvent();
    }
    
    if (
      this.enableFullscreen() &&
      !this.isDragging() &&
      !this.wasRecentTouchSwipe()
    ) {
      this.openFullscreen(e);
    }
  }

  protected closeFullscreen(): void {
    this.updateSliderPosition();
    this.isFullscreen.set(false);
    document.body.style.overflow = "";
    
    if (this.enableAutoSlide()) {
      this.startAutoSlide();
    }
  }

  protected nextSlide(isFullscreen = false): void {
    if (!this.hasMultipleImages()) return;
    if (!isFullscreen && this.isTransitioning()) return;

    this.performSlideTransition(isFullscreen, () => {
      this.currentIndex.set((this.currentIndex() + 1) % this.images().length);
    });
  }

  protected prevSlide(isFullscreen = false): void {
    if (!this.hasMultipleImages()) return;
    if (!isFullscreen && this.isTransitioning()) return;

    this.performSlideTransition(isFullscreen, () => {
      this.currentIndex.set(
        this.currentIndex() === 0
          ? this.images().length - 1
          : this.currentIndex() - 1
      );
    });
  }

  private openFullscreen(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    
    this.isFullscreen.set(true);
    this.stopAutoSlide();
    
    this.touchStartX.set(0);
    this.touchEndX.set(0);
    this.isDragging.set(false);
    this.isFullscreenDragging.set(false);
    
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      this.updateFullscreenSliderPosition();
    }, 50);
  }

  private goToSlide(index: number, isFullscreen = false): void {
    if (
      index === this.currentIndex() ||
      index < 0 ||
      index >= this.images().length
    )
      return;

    if (!isFullscreen && this.isTransitioning()) return;

    this.performSlideTransition(isFullscreen, () => {
      this.currentIndex.set(index);
    });

    if (!isFullscreen && this.enableAutoSlide()) {
      this.startAutoSlide();
    }
  }

  private performSlideTransition(isFullscreen: boolean, updateIndex: () => void): void {
    if (!isFullscreen) {
      this.isTransitioning.set(true);
    }

    updateIndex();
    
    if (isFullscreen) {
      this.updateFullscreenSliderPosition();
    } else {
      this.updateSliderPosition();
      setTimeout(() => {
        this.isTransitioning.set(false);
      }, this.TRANSITION_DURATION);
    }
  }

  private wasRecentTouchSwipe(): boolean {
    if (this.touchStartX() === 0 && this.touchEndX() === 0) {
      return false;
    }

    const distance = Math.abs(this.touchStartX() - this.touchEndX());
    return distance > this.SWIPE_DETECTION_THRESHOLD;
  }

  private resetTouchStateOnMouseEvent(): void {
    if (this.touchStartX() !== 0 || this.touchEndX() !== 0) {
      this.touchStartX.set(0);
      this.touchEndX.set(0);
    }
  }

  private handleSwipe(isFullscreen = false): void {
    const swipeDistance = this.touchStartX() - this.touchEndX();

    if (Math.abs(swipeDistance) > this.SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        this.nextSlide(isFullscreen);
      } else {
        this.prevSlide(isFullscreen);
      }
    }
  }

  private updateSliderPosition(): void {
    const container = this.sliderContainer();
    if (container && container.nativeElement) {
      const translateX = -this.currentIndex() * 100;
      container.nativeElement.style.transform = `translateX(${translateX}%)`;
    }
  }

  private startAutoSlide(): void {
    this.stopAutoSlide();
    if (this.enableAutoSlide() && this.hasMultipleImages()) {
      this.autoSlideTimer = window.setInterval(() => {
        this.nextSlide();
      }, this.autoSlideInterval());
    }
  }

  private stopAutoSlide(): void {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
      this.autoSlideTimer = undefined;
    }
  }

  private updateFullscreenSliderPosition(): void {
    const modal = this.fullscreenModal();
    if (modal && modal.nativeElement) {
      const sliderTrack = modal.nativeElement.querySelector(
        ".fullscreen-slider-track"
      );
      if (sliderTrack) {
        const translateX = -this.currentIndex() * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
      }
    }
  }
}
