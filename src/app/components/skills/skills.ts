import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class SkillsComponent implements AfterViewInit {

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

        const elements = document.querySelectorAll('#skills .reveal-left, #skills .reveal-right, #skills .reveal-up');
        elements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

} 