# 💻 Ibrahim Sha — Personal Developer Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://ibrahimsha02.github.io/ibrahim-portfolio/)
[![Angular](https://img.shields.io/badge/Angular-22-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

> A modern, high-performance personal developer portfolio built with **Angular Standalone Architecture**, dark cyber-aesthetic glassmorphism, hardware-accelerated 60fps animations, and integrated EmailJS client messaging. Designed to showcase full-stack web applications, machine learning models, and professional credentials.

---

## 🌐 Live Portfolio Demo

Check out the live website deployed on GitHub Pages:  
👉 **[https://ibrahimsha02.github.io/ibrahim-portfolio/](https://ibrahimsha02.github.io/ibrahim-portfolio/)**

---

## ⭐ Key Highlights & Features

* ⚡ **Cyberpunk System Preloader (`app-loader`)**: Animated boot diagnostics sequence with numeric percentage counter (`0%` to `100%`) and glowing neon scanning bar.
* 📏 **Dynamic Reading Progress Bar**: Hardware-accelerated, passthru neon progress indicator tracking real-time scroll depth without causing layout recalculations.
* 📱 **Concept 3: Fullscreen Cyber Matrix Mobile Menu**: Mobile navigation featuring a morphing neon hamburger toggle (`✕`), system status beacon (`SYSTEM NAVIGATION // ONLINE`), staggered numbered links (`01 // HOME` to `07 // CONTACT ME`), and ambient gradient lighting.
* 🎯 **Dynamic Hero Presentation (`app-home`)**: Typing animation cycling across technical specializations (Python Full Stack Developer, AI Specialist), interactive quick-access CTA buttons, and social handles.
* 👨‍💻 **Professional About & Bio (`app-about`)**: Detailed background covering academic focus in Artificial Intelligence & Data Science, core engineering philosophies, and direct access to download the latest resume.
* 🧠 **Categorized Technical Skills Grid (`app-skills`)**: Interactive skill cards covering Programming Languages, Web Frameworks, Databases, Machine Learning, and Cloud/DevOps tools.
* 🎓 **Academic Milestone Timeline (`app-education`)**: Structured chronological journey detailing degree accomplishments and specialized engineering coursework.
* 🚀 **Interactive Project Showcase Gallery (`app-projects`)**: Production-ready projects featuring live preview links, source code repositories, architecture tags, and glassmorphic hover effects.
* 📜 **Industry Certifications & Credentials (`app-certifications`)**: Verified technical certifications with issuing institutions and domain specializations.
* ✉️ **Asynchronous Contact Form with EmailJS (`app-contact`)**: Direct message dispatch powered by `@emailjs/browser` with validation, feedback states, and contact coordinates.
* 🌊 **Bi-directional Scroll Reveal Animations**: Reactive `IntersectionObserver` triggering smooth staggered entry transitions (`.reveal-left`, `.reveal-right`, `.reveal-up`) dynamically across sections.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | Angular (Standalone Architecture) |
| **Core Language** | TypeScript, Modern ES6+ JavaScript |
| **Styling & Effects** | Vanilla CSS3 (Custom Design Tokens, Glassmorphism, CSS Grid & Flexbox, GPU Hardware Acceleration) |
| **Backend & AI Specialties** | Python, Django, REST APIs, Machine Learning, Data Science |
| **Third-Party Services** | EmailJS (`@emailjs/browser`) for serverless contact messaging |
| **Typography & Icons** | FontAwesome 6 Free, Google Fonts (`Plus Jakarta Sans`) |
| **Tooling & Build** | Angular CLI, Vite, Node.js, npm |
| **Deployment** | GitHub Pages (`angular-cli-ghpages`) |

---

## 📂 Project Structure

```
ibrahim-portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── loader/          # Cyberpunk system diagnostics & animated preloader
│   │   │   ├── navbar/          # Fixed glassmorphism navbar, scroll progress & mobile cyber overlay
│   │   │   ├── home/            # Hero banner with typing effect & CTA buttons
│   │   │   ├── about/           # Profile summary, core principles & resume download
│   │   │   ├── skills/          # Interactive tech stack categorized card grid
│   │   │   ├── education/       # Chronological academic milestones & honors
│   │   │   ├── projects/        # Featured projects showcase with live & GitHub links
│   │   │   ├── certifications/  # Verified technical certificates & credentials
│   │   │   ├── contact/         # Functional EmailJS direct contact inquiry form
│   │   │   └── footer/          # Social badges, copyright & back-to-top button
│   │   ├── app.ts               # Root component with IntersectionObserver scroll triggers
│   │   ├── app.html             # Main single-page application layout
│   │   └── app.css              # Global transitions & reveal keyframes
│   ├── index.html               # Meta tags, SEO, fonts, and OpenGraph social previews
│   └── styles.css               # Global theme variables, reset & utility classes
├── angular.json                 # Angular workspace configuration
├── package.json                 # Project dependencies & automated build scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🚀 Getting Started Locally

Follow these steps to run the portfolio on your local machine:

### 1. Prerequisites
Ensure you have the following installed:
* **Node.js**: `v18.x` or higher ([Download Node.js](https://nodejs.org/))
* **npm**: `v9.x` or higher

### 2. Clone the Repository
```bash
git clone https://github.com/Ibrahimsha02/ibrahim-portfolio.git
cd ibrahim-portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Local Development Server
```bash
npm start
# or
npx ng serve
```

Open your browser and navigate to:
```
http://localhost:4200/
```

The application will automatically reload if you make modifications to any of the source files.

---

## 📦 Build & Deployment

### Production Build
To create an optimized production build:
```bash
npm run build
```
The compiled output will be generated inside the `dist/ibrahim-portfolio/browser/` directory.

### Deploy to GitHub Pages
To deploy updates to GitHub Pages:
```bash
npm run deploy
```
*(Runs `ng build --base-href /ibrahim-portfolio/` and pushes the bundle directly to the `gh-pages` branch using `angular-cli-ghpages`).*

---

## 📬 Contact & Connect

Feel free to connect with me for collaborations, software development opportunities, or AI inquiries:

* **Name**: Ibrahim Sha
* **Role**: Python Full Stack Developer & AI Specialist
* **GitHub**: [@Ibrahimsha02](https://github.com/Ibrahimsha02)
* **LinkedIn**: [linkedin.com/in/ibrahim-sha-24b69b3b4](https://www.linkedin.com/in/ibrahim-sha-24b69b3b4)
* **Email**: [ibrahimsha20052022@gmail.com](mailto:ibrahimsha20052022@gmail.com)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE) — feel free to explore, learn from, or customize it for your personal needs.

Developed with ❤️ by **Ibrahim Sha**.
