import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
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

  // 3D Card Tilt State
  tiltStyle = '';

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.isFading = true;
      setTimeout(() => {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.currentRole = this.roles[this.currentRoleIndex];
        this.isFading = false;
      }, 300);
    }, 3200);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

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