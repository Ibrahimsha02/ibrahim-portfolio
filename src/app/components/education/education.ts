import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrls: ['./education.css']
})
export class EducationComponent implements AfterViewInit {

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

        // Observes timeline cards & heading for Left & Right slide animations
        const elements = document.querySelectorAll('#education .reveal-left, #education .reveal-right');
        elements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

}