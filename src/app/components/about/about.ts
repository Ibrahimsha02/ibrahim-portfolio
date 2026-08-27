import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.01,
        rootMargin: '0px 0px -50px 0px'
      });

      const elements = document.querySelectorAll('.reveal-left, .reveal-right');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }

}