import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certifications.html',
  styleUrls: ['./certifications.css']
})
export class CertificationsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.01,
          rootMargin: '50px 0px 50px 0px'
        });

        // Observes certification cards & heading for Left & Right slide animations
        const elements = document.querySelectorAll('#certifications .reveal-left, #certifications .reveal-right');
        elements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

}