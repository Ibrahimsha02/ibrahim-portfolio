# 💻 Ibrahimsha — Personal Developer Portfolio Website

![Angular 19](https://img.shields.io/badge/Angular-19.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3 Glassmorphism](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, high-performance personal developer portfolio website built to showcase Full-Stack and Angular projects, technical skills, client work, and contact inquiries. Designed with **Angular 19 Standalone Components**, glassmorphic design system, dynamic theme switching, and smooth section scrolling.

---

## ⭐ Key Features

* 🚀 **Interactive Project Showcase Gallery**: Displays featured web applications with tech stack badges, live demo links, and GitHub repository links.
* 🎨 **Executive Glassmorphism UI Design**: Ultra-responsive layout supporting mobile viewports (320px) up to 4K desktop screens (1920px+).
* 🌙 **Instant Light / Dark Mode Toggle**: Smooth appearance theme switching with CSS design tokens and Angular signals.
* 📄 **Interactive Resume / Experience Timeline**: Highlights technical experience, education, key achievements, and downloadable PDF resume.
* 📬 **Direct Contact & Inquiry Form**: Built-in contact form allowing recruiters and prospective clients to get in touch directly.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Angular 19 (Standalone Architecture) |
| **State & Logic** | Angular Signals (`signal<T>`, `computed()`), TypeScript 5.6 |
| **Styling** | Vanilla CSS3 (Custom Variables, Flexbox, Grid, Glassmorphism) |
| **Icons & Fonts** | FontAwesome 6 Pro, Google Fonts (`Outfit`, `Inter`) |
| **Deployment** | Vercel / Netlify (Continuous Deployment) |

---

## 📂 Project Folder Architecture

```
src/
├── app/
│   ├── components/
│   │   ├── hero/            # Intro banner & CTA buttons
│   │   ├── about/           # Bio & technical skills grid
│   │   ├── projects/        # Featured projects showcase gallery
│   │   ├── experience/      # Work history timeline & resume download
│   │   ├── contact/         # Direct email inquiry form & social links
│   │   ├── navbar/          # Responsive header & theme toggle
│   │   └── footer/          # Copyright & quick links
│   ├── services/            # Theme & Project data signals services
│   ├── app.routes.ts        # Routing navigation
│   └── app.ts               # Root component
└── index.html               # Meta description & OpenGraph social tags
```

---

## 🚀 Local Installation & Setup

### Prerequisites
* Node.js `v18.x` or higher
* npm `v9.x` or higher

```bash
# 1. Clone the repository
git clone https://github.com/Ibrahimsha02/ibrahim-portfolio.git

# 2. Change into the project directory
cd ibrahim-portfolio

# 3. Install project dependencies
npm install

# 4. Run local development server
npm run dev
# or
npx ng serve
```

Navigate to `http://localhost:4200/` in your web browser.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

Developed with ❤️ by **Ibrahimsha**.
