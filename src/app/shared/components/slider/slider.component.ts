import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

export interface SliderImage {
  src: string;
  alt?: string;
  caption?: string;
}

@Component({
  selector: "app-slider",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit, OnDestroy {
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
  protected readonly fullscreenCurrentIndex = signal<number>(0);

  private readonly touchStartX = signal<number>(0);
  private readonly touchEndX = signal<number>(0);
  private readonly isDragging = signal<boolean>(false);
  private readonly dragStartTime = signal<number>(0);

  private readonly fullscreenTouchStartX = signal<number>(0);
  private readonly fullscreenTouchEndX = signal<number>(0);
  private readonly isFullscreenDragging = signal<boolean>(false);

  private autoSlideTimer?: number;

  ngOnInit(): void {
    if (this.enableAutoSlide() && this.autoSlideInterval() > 0) {
      this.startAutoSlide();
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(): void {
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
        event.preventDefault();
        this.prevSlideFullscreen();
        break;
      case "ArrowRight":
        event.preventDefault();
        this.nextSlideFullscreen();
        break;
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    if (this.isFullscreen()) return;

    this.stopAutoSlide();
    this.touchStartX.set(event.touches[0].clientX);
    this.touchEndX.set(event.touches[0].clientX);
    this.isDragging.set(true);
    this.dragStartTime.set(Date.now());
  }

  protected onTouchMove(event: TouchEvent): void {
    if (this.isFullscreen() || !this.isDragging()) return;

    this.touchEndX.set(event.touches[0].clientX);
    if (Math.abs(this.touchEndX() - this.touchStartX()) > 10) {
      event.preventDefault();
    }
  }

  protected onTouchEnd(): void {
    if (this.isFullscreen() || !this.isDragging()) return;

    this.isDragging.set(false);
    this.handleSwipe();

    if (this.enableAutoSlide()) {
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
    this.stopAutoSlide();
    this.goToSlide(index);
  }

  protected onMouseEnter(): void {
    this.stopAutoSlide();
  }

  protected onMouseLeaveContainer(): void {
    if (this.enableAutoSlide() && !this.isDragging()) {
      this.startAutoSlide();
    }
  }

  protected onSlideClick(e: Event): void {
    if (
      this.enableFullscreen() &&
      !this.isDragging() &&
      !this.wasRecentTouchSwipe()
    ) {
      this.openFullscreen(e);
    }
  }

  protected closeFullscreen(): void {
    this.currentIndex.set(this.fullscreenCurrentIndex());
    this.updateSliderPosition();

    this.isFullscreen.set(false);

    document.body.style.overflow = "";

    if (this.enableAutoSlide()) {
      this.startAutoSlide();
    }
  }

  protected nextSlideFullscreen(): void {
    if (this.images().length <= 1) return;

    this.fullscreenCurrentIndex.set(
      (this.fullscreenCurrentIndex() + 1) % this.images().length
    );
    this.updateFullscreenSliderPosition();
  }

  protected prevSlideFullscreen(): void {
    if (this.images().length <= 1) return;

    this.fullscreenCurrentIndex.set(
      this.fullscreenCurrentIndex() === 0
        ? this.images().length - 1
        : this.fullscreenCurrentIndex() - 1
    );
    this.updateFullscreenSliderPosition();
  }

  protected goToSlideFullscreen(index: number): void {
    if (index < 0 || index >= this.images().length) return;

    this.fullscreenCurrentIndex.set(index);
    this.updateFullscreenSliderPosition();
  }

  protected onFullscreenTouchStart(event: TouchEvent): void {
    event.stopPropagation();
    this.fullscreenTouchStartX.set(event.touches[0].clientX);
    this.fullscreenTouchEndX.set(event.touches[0].clientX);
    this.isFullscreenDragging.set(true);
  }

  protected onFullscreenTouchMove(event: TouchEvent): void {
    if (!this.isFullscreenDragging()) return;
    event.stopPropagation();
    this.fullscreenTouchEndX.set(event.touches[0].clientX);

    if (
      Math.abs(this.fullscreenTouchEndX() - this.fullscreenTouchStartX()) > 10
    ) {
      event.preventDefault();
    }
  }

  protected onFullscreenTouchEnd(): void {
    if (!this.isFullscreenDragging()) return;

    this.isFullscreenDragging.set(false);
    this.handleFullscreenSwipe();
  }

  private openFullscreen(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.fullscreenCurrentIndex.set(this.currentIndex());
    this.isFullscreen.set(true);
    this.stopAutoSlide();

    this.touchStartX.set(0);
    this.touchEndX.set(0);
    this.isDragging.set(false);
    this.fullscreenTouchStartX.set(0);
    this.fullscreenTouchEndX.set(0);
    this.isFullscreenDragging.set(false);

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      this.updateFullscreenSliderPosition();
    }, 50);
  }

  private nextSlide(): void {
    if (this.isTransitioning() || this.images().length <= 1) return;

    this.isTransitioning.set(true);
    this.currentIndex.set((this.currentIndex() + 1) % this.images().length);
    this.updateSliderPosition();

    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 300);
  }

  private prevSlide(): void {
    if (this.isTransitioning() || this.images().length <= 1) return;

    this.isTransitioning.set(true);
    this.currentIndex.set(
      this.currentIndex() === 0
        ? this.images().length - 1
        : this.currentIndex() - 1
    );
    this.updateSliderPosition();

    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 300);
  }

  private goToSlide(index: number): void {
    if (
      this.isTransitioning() ||
      index === this.currentIndex() ||
      index < 0 ||
      index >= this.images().length
    )
      return;

    this.isTransitioning.set(true);
    this.currentIndex.set(index);
    this.updateSliderPosition();

    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 300);

    if (this.enableAutoSlide()) {
      this.startAutoSlide();
    }
  }

  private wasRecentTouchSwipe(): boolean {
    const swipeThreshold = 30;

    if (this.touchStartX() === 0 && this.touchEndX() === 0) {
      return false;
    }

    const distance = Math.abs(this.touchStartX() - this.touchEndX());
    return distance > swipeThreshold;
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const swipeDistance = this.touchStartX() - this.touchEndX();

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
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
    if (this.enableAutoSlide() && this.images().length > 1) {
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
        const translateX = -this.fullscreenCurrentIndex() * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
      }
    }
  }

  private handleFullscreenSwipe(): void {
    const swipeThreshold = 50;
    const swipeDistance =
      this.fullscreenTouchStartX() - this.fullscreenTouchEndX();

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.nextSlideFullscreen();
      } else {
        this.prevSlideFullscreen();
      }
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }
}
