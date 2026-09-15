import { Component, AfterViewInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer implements AfterViewInit {
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        }, {
          threshold: 0.01
        });

        const elements = document.querySelectorAll('.footer .reveal-left, .footer .reveal-right');
        elements.forEach(el => observer.observe(el));
      }, 50);
    }
  }
}
