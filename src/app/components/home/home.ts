import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  @ViewChild('videoContainer') videoContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('videoWrapper') videoWrapper!: ElementRef<HTMLDivElement>;

  // Role Text Typing State
  roles: string[] = [
    'Python Full Stack Developer',
    'AI & Data Science Specialist',
    'Django REST Architect',
    'Angular Web Engineer'
  ];
  currentRoleIndex = 0;
  currentRole = this.roles[0];
  isFading = false;
  private intervalId: any;

  // Animation Frame Handles
  private canvasAnimationFrameId: number | null = null;
  private scrollAnimationFrameId: number | null = null;
  private resizeListener: (() => void) | null = null;
  private scrollListener: (() => void) | null = null;

  // Scroll-Driven Video Zoom Lerp State
  private targetScale = 0.88;
  private currentScale = 0.88;
  private targetRadius = 24;
  private currentRadius = 24;
  private targetShadow = 0.15;
  private currentShadow = 0.15;

  private isReducedMotion = false;
  private isTouchDevice = false;

  // 3D Card Tilt State
  tiltStyle = '';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check for touch device capabilities to optimize mouse-tilt
      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;

      // Dynamic Role Typing Switcher
      this.intervalId = setInterval(() => {
        this.isFading = true;
        setTimeout(() => {
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          this.currentRole = this.roles[this.currentRoleIndex];
          this.isFading = false;
        }, 300);
      }, 3200);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCanvasAnimation();
      this.initVideoScrollAnimation();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.canvasAnimationFrameId !== null) {
      cancelAnimationFrame(this.canvasAnimationFrameId);
    }
    if (this.scrollAnimationFrameId !== null) {
      cancelAnimationFrame(this.scrollAnimationFrameId);
    }
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
      }
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
      }
    }
  }

  /* ==========================================================================
     1. Scroll-Driven Video Motion Zoom (rAF + Lerp + Controlled Range)
     ========================================================================== */
  private initVideoScrollAnimation(): void {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.isReducedMotion) {
      if (this.videoWrapper?.nativeElement) {
        this.videoWrapper.nativeElement.style.transform = 'scale(1)';
        this.videoWrapper.nativeElement.style.borderRadius = '16px';
      }
      return;
    }

    // Run scroll calculations outside Angular's Zone to prevent 60fps change-detection overhead
    this.ngZone.runOutsideAngular(() => {
      this.scrollListener = () => {
        this.calculateVideoScrollProgress();
      };

      window.addEventListener('scroll', this.scrollListener, { passive: true });
      this.calculateVideoScrollProgress();
      this.startVideoAnimationLoop();
    });
  }

  private calculateVideoScrollProgress(): void {
    if (!this.videoContainer?.nativeElement) return;

    const rect = this.videoContainer.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Responsive zoom configuration
    const isMobile = windowWidth <= 600;
    const isTablet = windowWidth <= 992 && windowWidth > 600;

    const minScale = isMobile ? 0.94 : isTablet ? 0.90 : 0.88;
    const maxScale = isMobile ? 1.04 : isTablet ? 1.08 : 1.14;

    const minRadius = isMobile ? 8 : 0;
    const maxRadius = isMobile ? 16 : 24;

    // Controlled Animation Trigger Range:
    // Starts when video container enters lower 85% of viewport, reaches maximum scale at top/center
    const startTrigger = windowHeight * 0.85;
    const endTrigger = windowHeight * 0.18;
    const totalDistance = startTrigger - endTrigger;
    const currentPos = startTrigger - rect.top;

    let progress = currentPos / totalDistance;
    progress = Math.max(0, Math.min(1, progress));

    // Interpolate targets based on progress
    this.targetScale = minScale + progress * (maxScale - minScale);
    this.targetRadius = maxRadius - progress * (maxRadius - minRadius);
    this.targetShadow = 0.15 + progress * 0.25;
  }

  private startVideoAnimationLoop = (): void => {
    // Linear Interpolation (Lerp) for smooth motion without jitter
    this.currentScale += (this.targetScale - this.currentScale) * 0.1;
    this.currentRadius += (this.targetRadius - this.currentRadius) * 0.1;
    this.currentShadow += (this.targetShadow - this.currentShadow) * 0.1;

    if (this.videoWrapper?.nativeElement) {
      this.videoWrapper.nativeElement.style.transform = `scale(${this.currentScale.toFixed(4)})`;
      this.videoWrapper.nativeElement.style.borderRadius = `${this.currentRadius.toFixed(1)}px`;
      this.videoWrapper.nativeElement.style.boxShadow = `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(168, 85, 247, ${this.currentShadow.toFixed(3)})`;
    }

    this.scrollAnimationFrameId = requestAnimationFrame(this.startVideoAnimationLoop);
  };

  /* ==========================================================================
     2. Interactive 60fps Tech Canvas Background
     ========================================================================== */
  private initCanvasAnimation(): void {
    const canvas = document.getElementById('techCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    this.resizeListener = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', this.resizeListener);

    // Adaptive particle count (fewer particles on mobile for high performance)
    const isMobile = width <= 600;
    const numParticles = isMobile ? 20 : Math.min(Math.floor(width / 28), 42);

    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#a855f7' : '#06b6d4'
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const linkDistance = isMobile ? 90 : 125;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.22 * (1 - dist / linkDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      this.canvasAnimationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  /* ==========================================================================
     3. 3D Profile Photo Tilt (Disabled on Touch Devices)
     ========================================================================== */
  onMouseMove(event: MouseEvent): void {
    // Skip tilt calculation on touch/mobile devices to ensure smooth native scrolling
    if (this.isTouchDevice) return;

    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    this.tiltStyle = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
  }

  onMouseLeave(): void {
    if (this.isTouchDevice) return;
    this.tiltStyle = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}