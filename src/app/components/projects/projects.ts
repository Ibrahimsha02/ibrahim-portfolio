import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements AfterViewInit {

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

        // Triggers Left & Right slide animations on all project cards
        const elements = document.querySelectorAll('#projects .reveal-left, #projects .reveal-right');
        elements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

}