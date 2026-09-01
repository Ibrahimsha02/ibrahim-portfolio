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
  private canvasAnimationFrameId: number | null = null;

  // Video Scroll Animation State
  private scrollAnimationFrameId: number | null = null;
  private scrollListener: (() => void) | null = null;
  private targetScale = 0.85;
  private currentScale = 0.85;
  private targetRadius = 24;
  private currentRadius = 24;
  private isReducedMotion = false;

  // 3D Card Tilt State
  tiltStyle = '';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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
    if (this.scrollListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  /* ==========================================================================
     Scroll-Driven Video Zoom Animation (requestAnimationFrame + Lerp)
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

    // Run scroll listener outside Angular change detection for max 60fps performance
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

    // Calculate progress: 0 when container enters viewport bottom, 1 when aligned at top/center
    const startOffset = windowHeight * 0.85;
    const endOffset = windowHeight * 0.15;
    const totalDistance = startOffset - endOffset;
    const currentDistance = startOffset - rect.top;

    let progress = currentDistance / totalDistance;
    progress = Math.max(0, Math.min(1, progress));

    // Map progress (0 to 1) -> scale (0.85 to 1.12) & border-radius (24px to 0px)
    this.targetScale = 0.85 + progress * 0.27;
    this.targetRadius = 24 * (1 - progress);
  }

  private startVideoAnimationLoop = (): void => {
    // Lerp (Linear Interpolation) for butter-smooth motion without jitter
    this.currentScale += (this.targetScale - this.currentScale) * 0.1;
    this.currentRadius += (this.targetRadius - this.currentRadius) * 0.1;

    if (this.videoWrapper?.nativeElement) {
      this.videoWrapper.nativeElement.style.transform = `scale(${this.currentScale.toFixed(4)})`;
      this.videoWrapper.nativeElement.style.borderRadius = `${this.currentRadius.toFixed(1)}px`;
    }

    this.scrollAnimationFrameId = requestAnimationFrame(this.startVideoAnimationLoop);
  };

  /* ==========================================================================
     Interactive 60fps Tech Canvas Background
     ========================================================================== */
  private initCanvasAnimation(): void {
    const canvas = document.getElementById('techCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const numParticles = Math.min(Math.floor(width / 25), 45);
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#a855f7' : '#06b6d4'
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.25 * (1 - dist / 130)})`;
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
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      this.canvasAnimationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  /* ==========================================================================
     3D Profile Photo Tilt
     ========================================================================== */
  onMouseMove(event: MouseEvent): void {
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
    this.tiltStyle = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}