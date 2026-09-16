import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  @ViewChild('progressBar', { static: false }) progressBarRef?: ElementRef<HTMLDivElement>;

  menuOpen = false;
  private scrollListener: (() => void) | null = null;
  private ticking = false;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.scrollListener = () => {
          if (!this.ticking) {
            requestAnimationFrame(() => {
              this.updateScrollProgress();
              this.ticking = false;
            });
            this.ticking = true;
          }
        };

        window.addEventListener('scroll', this.scrollListener, { passive: true });
        window.addEventListener('resize', this.scrollListener, { passive: true });

        // Initial calculation on render
        this.updateScrollProgress();
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.scrollListener);
        this.scrollListener = null;
      }
    }
  }

  private updateScrollProgress(): void {
    if (!this.progressBarRef?.nativeElement) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

    this.progressBarRef.nativeElement.style.transform = `scaleX(${progress})`;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.updateBodyScrollLock();
  }

  closeMenu(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      this.updateBodyScrollLock();
    }
  }

  private updateBodyScrollLock(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
}