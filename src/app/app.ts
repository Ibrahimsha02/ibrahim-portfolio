import { Component } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Education } from './components/education/education';
import { Projects } from './components/projects/projects';
import { Certifications } from './components/certifications/certifications';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    Home,
    About,
    Skills,
    Education,
    Projects,
    Certifications,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}