import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class SkillsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.01, /* Triggers immediately when 1% enters the screen */
        rootMargin: '0px 0px -50px 0px'
      });

      const elements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }

} 