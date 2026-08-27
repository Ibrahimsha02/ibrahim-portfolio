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
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.01, /* Triggers as soon as timeline enters the screen */
        rootMargin: '0px 0px -40px 0px'
      });

      // Observes timeline cards & heading for Left & Right slide animations
      const elements = document.querySelectorAll('#education .reveal-left, #education .reveal-right');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }

}