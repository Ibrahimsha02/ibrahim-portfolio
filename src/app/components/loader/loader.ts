import { Component, OnInit, OnDestroy, signal, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class LoaderComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  progress = signal<number>(0);
  statusText = signal<string>('INITIALIZING CORE...');
  isLoaded = signal<boolean>(false);
  isRemoved = signal<boolean>(false);

  private animFrameId: number | null = null;
  private intervalId: any = null;
  private masterSafetyTimeoutId: any = null;
  private hasStarted = false;

  constructor() {
    // Secondary trigger if afterNextRender fires first
    afterNextRender(() => {
      this.startProgress();
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Master safety guarantee: unconditionally dismiss after 1.8s max under ANY circumstance
      this.masterSafetyTimeoutId = setTimeout(() => {
        this.finishLoading();
      }, 1800);

      // 2. Start progress immediately in the browser
      this.startProgress();
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private cleanup(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterSafetyTimeoutId) {
      clearTimeout(this.masterSafetyTimeoutId);
      this.masterSafetyTimeoutId = null;
    }
  }

  public dismiss(): void {
    this.finishLoading();
  }

  private startProgress(): void {
    if (this.hasStarted || !isPlatformBrowser(this.platformId)) return;
    this.hasStarted = true;

    const startTime = performance.now();
    const duration = 1100; // 1.1s smooth count

    const update = (now: number) => {
      if (this.isLoaded()) return;

      const elapsed = now - startTime;
      const fraction = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic curve
      const eased = 1 - Math.pow(1 - fraction, 3);
      const currentVal = Math.min(Math.round(eased * 100), 100);

      this.progress.set(currentVal);

      if (currentVal < 30) {
        this.statusText.set('INITIALIZING CORE...');
      } else if (currentVal < 70) {
        this.statusText.set('LOADING EXPERIENCE...');
      } else if (currentVal < 100) {
        this.statusText.set('FINALIZING ASSETS...');
      } else {
        this.statusText.set('SYSTEM READY');
      }

      if (fraction >= 1) {
        this.finishLoading();
      }
    };

    // Use a dual ticker: interval for rock-solid mobile compatibility + rAF for high refresh rate screens
    this.intervalId = setInterval(() => {
      update(performance.now());
    }, 20);

    const step = (time: number) => {
      update(time);
      if (!this.isLoaded()) {
        this.animFrameId = requestAnimationFrame(step);
      }
    };
    this.animFrameId = requestAnimationFrame(step);
  }

  private finishLoading(): void {
    if (this.isLoaded()) return;

    this.progress.set(100);
    this.statusText.set('SYSTEM READY');
    this.cleanup();

    setTimeout(() => {
      this.isLoaded.set(true);

      setTimeout(() => {
        this.isRemoved.set(true);
      }, 550);
    }, 250);
  }
}
