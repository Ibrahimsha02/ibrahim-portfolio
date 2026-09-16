import { Component, OnDestroy, signal, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class LoaderComponent implements OnDestroy {
  progress = signal<number>(0);
  statusText = signal<string>('INITIALIZING CORE...');
  isLoaded = signal<boolean>(false);
  isRemoved = signal<boolean>(false);

  private animFrameId: number | null = null;
  private fallbackTimeoutId: any = null;

  constructor() {
    afterNextRender(() => {
      this.startProgress();
    });
  }

  ngOnDestroy(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.fallbackTimeoutId) {
      clearTimeout(this.fallbackTimeoutId);
    }
  }

  private startProgress(): void {
    const startTime = performance.now();
    const duration = 1200; // 1.2s smooth count

    // Safety guarantee: under no circumstances will the site remain stuck
    this.fallbackTimeoutId = setTimeout(() => {
      this.finishLoading();
    }, 2200);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve
      const eased = 1 - Math.pow(1 - progressFraction, 3);
      const currentVal = Math.min(Math.round(eased * 100), 100);

      this.progress.set(currentVal);

      if (currentVal < 35) {
        this.statusText.set('INITIALIZING CORE...');
      } else if (currentVal < 75) {
        this.statusText.set('LOADING EXPERIENCE...');
      } else if (currentVal < 100) {
        this.statusText.set('FINALIZING ASSETS...');
      } else {
        this.statusText.set('SYSTEM READY');
      }

      if (progressFraction < 1) {
        this.animFrameId = requestAnimationFrame(step);
      } else {
        this.finishLoading();
      }
    };

    this.animFrameId = requestAnimationFrame(step);
  }

  private finishLoading(): void {
    if (this.isLoaded()) return;

    this.progress.set(100);
    this.statusText.set('SYSTEM READY');

    setTimeout(() => {
      this.isLoaded.set(true);

      setTimeout(() => {
        this.isRemoved.set(true);
      }, 650);
    }, 350);
  }
}
