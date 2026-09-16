import { Component, AfterViewInit } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { EducationComponent } from './components/education/education';
import { ProjectsComponent } from './components/projects/projects';
import { CertificationsComponent } from './components/certifications/certifications';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { LoaderComponent } from './components/loader/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoaderComponent,
    NavbarComponent,
    Home,
    AboutComponent,
    SkillsComponent,
    EducationComponent,
    ProjectsComponent,
    CertificationsComponent,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

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

        const elements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
        elements.forEach(el => observer.observe(el));
      }, 150);
    }
  }

}