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
            } else {
              entry.target.classList.remove('in-view');
            }
          });
        }, {
          threshold: 0.05,
          rootMargin: '0px 0px -25px 0px'
        });

        // Triggers Left & Right slide animations on all project cards
        const elements = document.querySelectorAll('#projects .reveal-left, #projects .reveal-right');
        elements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

}