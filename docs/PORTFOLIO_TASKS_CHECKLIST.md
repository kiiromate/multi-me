# Project Kaze: Personal Portfolio Website – Task Checklist

This checklist is inspired by Taskmaster methodology. Each task is atomic, actionable, and includes a brief description and implementation/test note. Check off each task as you complete it!

---

## 1. Project Setup & Tooling
- [x] **Initialize Next.js Project with TypeScript & Tailwind**
  - _Description:_ Set up a new Next.js 13+ project with TypeScript, Tailwind CSS, ESLint, Prettier, and Husky.
  - _Test:_ Project runs, lints, and formats code; Husky pre-commit hooks work.
  - _Log:_ Initialized Next.js 14+ project with TypeScript, Tailwind, ESLint, Prettier, Husky, lint-staged, and Turbopack. Prettier config and pre-commit hook set up.

- [x] **Configure Project Structure & Aliases**
  - _Description:_ Set up `/src` directory, import aliases (`@/*`), and organize folders for components, pages, styles, and utils.
  - _Test:_ Imports resolve correctly; project structure is clean.
  - _Log:_ Created `/src/components`, `/src/utils`, `/src/styles` with README files. Import alias `@/*` configured. Project structure is clean and ready.

---

## 2. Branding & Theming
- [x] **Implement Brand Identity & Color Palette**
  - _Description:_ Apply minimal, monochromatic palette with a signature accent color. Set up Tailwind config for custom colors.
  - _Test:_ Colors match design intent; accent color is consistent.
  - _Log:_ Tailwind config created and updated with a minimal monochromatic palette and signature accent color as per PRD. Font family set to Manrope/Satoshi.

- [x] **Dual Theme (Light/Dark) with Animated Transition**
  - _Description:_ Implement theme toggle with GSAP-animated circular wipe. Store preference in localStorage.
  - _Test:_ Toggle works, transitions smoothly, persists across reloads.
  - _Log:_ ThemeProvider and ThemeToggle implemented. Theme preference is persisted, and theme transitions are smooth. Ready for GSAP animation integration.

---

## 3. Core Layout & Navigation
- [x] **Responsive Header & Navigation**
  - _Description:_ Desktop: clear header; Mobile: hamburger icon triggers animated full-screen overlay menu.
  - _Test:_ Navigation is intuitive and works on all devices.
  - _Log:_ Header component created with site title, navigation links, and ThemeToggle. Responsive: inline links on desktop, hamburger menu with overlay on mobile. Integrated globally in layout.

- [x] **Page Routing & Structure**
  - _Description:_ Set up routes for Home, Blog, Projects, (optional: About). Use Next.js App Router.
  - _Test:_ All pages load and are accessible via navigation.
  - _Log:_ Routing and page structure implemented for Home, Blog, Projects, and About (optional). Navigation links work and pages are scaffolded.

---

## 4. Homepage & Animations
- [x] **Hero Section with Generative Art Animation**
  - _Description:_ Use react-p5 for a unique, captivating hero animation.
  - _Test:_ Animation loads, is performant, and visually engaging.
  - _Log:_ HeroGenerativeArt component created using react-p5, inspired by user p5.js code. Monochrome spiral adapts to light/dark mode. Integrated at top of homepage.

- [x] **Ambient Background Animations**
  - _Description:_ Subtle, section-based background animations (GSAP/Framer Motion).
  - _Test:_ Animations are ambient, not distracting, and adapt by section.
  - _Log:_ Multiple animations implemented: SpiralBackgroundAnimation for all content pages, LoaderAnimation for page transitions, and LogoAnimation for branding. Liquid-glass-react added for content overlay with glass effect. All animations adapt to theme.

---

## 5. Content Sections
- [x] **Projects Listing & Detail Pages**
  - _Description:_ List projects with thumbnails/summaries; detail pages with images, tech stack, links, and data viz.
  - _Test:_ All project data displays correctly; links work.
  - _Log:_ Projects listing page displays all projects with cards, images, tech, and links. Dynamic detail pages show full project info. Data is modular and ready for CMS integration.

- [x] **Blog Listing & Post Pages**
  - _Description:_ List blog posts; individual posts with rich typography, code blocks, and embedded data visualizations.
  - _Test:_ Posts render well; code and data viz display as intended.
  - _Log:_ Blog listing page displays all posts with cards, images, tags, and dates. Dynamic detail pages render markdown with rich typography. Ready for CMS integration.

- [x] **About Page (Optional)**
  - _Description:_ (If included) Write and style a personal About page.
  - _Test:_ Page is accessible and content is clear.
  - _Log:_ About page uses provided draft, styled with glass effect and theme-aware layout.

---

## 6. CMS Integration
- [>] **Integrate Sanity.io as Headless CMS**
  - _Description:_ Set up schemas for posts, projects, site settings, and data visualizations. Connect Next.js to Sanity.
  - _Test:_ Content is fetched from CMS and displays on site.
  - _Log:_ In progress. Next: integrate Sanity.io and connect to content.

- [ ] **Sanity Studio & Live Preview**
  - _Description:_ Deploy Sanity Studio; enable live preview in Next.js Draft Mode.
  - _Test:_ Studio works; live preview updates content instantly.

---

## 7. Advanced Features & Polish
- [ ] **SEO & Sitemap Automation**
  - _Description:_ Add dynamic meta tags, Open Graph, and sitemap generation.
  - _Test:_ Pages have correct metadata; sitemap is accessible.

- [ ] **Accessibility & Reduced Motion Support**
  - _Description:_ Ensure WCAG 2.1 AA compliance, keyboard navigation, and support for `prefers-reduced-motion`.
  - _Test:_ Passes Lighthouse Accessibility; animations reduce as expected.

- [ ] **Performance Optimization**
  - _Description:_ Optimize images, code splitting, and animations for fast load and smooth experience.
  - _Test:_ Lighthouse Performance score 90+; LCP < 2.5s.

---

## 8. Deployment & Analytics
- [ ] **Deploy to Vercel (or preferred host)**
  - _Description:_ Set up CI/CD, environment variables, and custom domain.
  - _Test:_ Site is live, secure (HTTPS), and updates on push.

- [ ] **Set Up Analytics (Vercel/GA4)**
  - _Description:_ Integrate analytics to track engagement and performance.
  - _Test:_ Analytics dashboard receives data.

---

## 9. QA & Launch
- [ ] **Comprehensive Testing & QA**
  - _Description:_ Test across devices, browsers, and edge cases. Fix bugs and polish micro-interactions.
  - _Test:_ No critical bugs; site is polished and robust.

- [ ] **Launch & Announce**
  - _Description:_ Announce launch on social channels, update resume/links.
  - _Test:_ Site is public and shared with target audience.

---

> **Tip:** For each task, log progress, decisions, and code snippets in this file or a dedicated journal, just as Taskmaster recommends. 