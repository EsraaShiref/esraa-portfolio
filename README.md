# Esraa Shiref Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21.2-DD0031?logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Three.js-0.185-000000?logo=three.js&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=white" alt="GSAP">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

This project is a standalone Angular 21 application that serves as a personal portfolio. It integrates a Three.js 3D scene — an interactive character with encrypted GLTF model loading and DRACO decompression — with GSAP ScrollTrigger timelines and Lenis smooth scrolling to produce a scroll-driven visual experience. The UI is composed of 14 Angular standalone components arranged across 3 routed pages, with all content driven by a single TypeScript configuration file.

The application was ported from an existing React + Three.js template to Angular 21, adopting standalone components, signals, and Angular's `bootstrapApplication` API. Global CSS is intentionally kept un-encapsulated to allow GSAP to select elements across component boundaries.

---

## Key Features

- **Three.js 3D Character Scene** — Encrypted GLTF model (`character.enc`) decrypted at runtime via AES-CBC, loaded through `GLTFLoader` with DRACO geometry compression. The scene includes an HDR environment map, multiple light sources (directional + point), and a perspective camera positioned at `(0, 13.1, 24.7)`. Mouse and touch input drive head bone rotation with lerp-based smoothing and angular limits.
- **GSAP ScrollTrigger Timelines** — Three distinct GSAP timelines (`tl1`, `tl2`, `tl3`) animate the character and camera as the user scrolls through the Landing, About, and What I Do sections. A separate `setAllTimeline()` handles Career section animations. Timelines are re-initialized on window resize.
- **Custom Text Splitter** — A bespoke utility replaces the paid GSAP SplitText plugin. It splits DOM elements into `<span>`-wrapped characters, words, and lines, and provides a `revert()` method. Scroll-triggered reveal animations are driven by `ScrollTrigger` + `gsap.from()`.
- **Lenis Smooth Scroll Integration** — The Lenis library is wrapped in an injectable `LenisService` that provides `init()`, `start()`, `stop()`, `scrollTo()`, `destroy()`, and `get()` methods. The instance is shared across components and GSAP ScrollTrigger is configured to respect Lenis's scroll values.
- **Signal-Based Loading Screen** — A `LoadingService` exposes `isLoading` and `loadingPercent` signals. The shared loading component reads these signals, displays a simulated progress bar with marquee text, dynamically imports `initial-fx.ts` on completion, and transitions to the main application.
- **Content-Driven Architecture** — All portfolio data (projects, experience, education, skills, social links, contact info) is defined in `src/app/core/config.ts` as a typed configuration object. Components import and consume this data directly, making content updates a single-file operation.

---

## Tech Stack

| Category | Technology |
| -------- | ---------- |
| **Framework** | Angular 21 (standalone components, signals, `bootstrapApplication`) |
| **Language** | TypeScript 5.9 |
| **3D Rendering** | Three.js 0.185 + three-stdlib + DRACO loader |
| **Animations** | GSAP 3.15 (ScrollTrigger, Timeline) |
| **Smooth Scroll** | Lenis 1.3 |
| **Styling** | SCSS with global CSS files |
| **Testing** | Vitest 4.0 + jsdom |
| **Formatting** | Prettier 3.8 |
| **Build Tool** | Angular CLI (`@angular/build:application`) |
| **Model Encryption** | AES-CBC via Web Crypto API |

---

## Architecture Overview

### Data Flow

```
config.ts (typed config object)
  └─► Components (import config directly)
        ├─► Landing, About, What I Do, Career, Work, Tech Stack, Contact
        └─► Pages (Home, MyWorks)
```

All sections subscribe to the same `config` export. No HTTP calls or state management is needed for content.

### 3D Engine Layer

```
core/three/utils/
  ├── decrypt.ts         AES-CBC key derivation + file decryption
  ├── character.ts       GLTFLoader + DRACO + scene/compile/resolve
  ├── animation-utils.ts Bone-track filtering for blink, typing, hover
  ├── gsap-scroll.ts     Three GSAP timelines tied to scroll positions
  ├── lighting.ts        Directional + point lights, HDR environment
  ├── mouse-utils.ts     Input normalization + head bone rotation
  └── resize-utils.ts    Renderer resize + timeline re-init
```

The `CharacterComponent` orchestrates these utilities: it creates the renderer and camera, calls `loadCharacter()` from `character.ts`, attaches mouse/touch listeners via `mouse-utils.ts`, and runs GSAP timelines from `gsap-scroll.ts` on mount.

### Services Layer

- **`LoadingService`** — Signal-based (`isLoading`, `loadingPercent`) used by the shared loading overlay and by `CharacterComponent` to report decryption/progress status.
- **`LenisService`** — Singleton wrapper around the Lenis instance. Called once by `HomeComponent` on init, consumed by GSAP ScrollTrigger via `lenisService.get()`.

### Routing

Three routes defined in `app.routes.ts`:
- `/` — `HomeComponent` (composes all section components)
- `/myworks` — `MyWorksComponent` (project portfolio page)
- `/play` — `PlayComponent` (placeholder for future interactive content)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18.19 or later)
- npm 10.9+ (installed with Node.js)

### Installation

```bash
git clone https://github.com/EsraaShiref/esraa-portfolio.git
cd esraa-portfolio
npm install
```

### Environment Variables

This project does not require environment variables. All portfolio content is managed through `src/app/core/config.ts`.

### Run the Development Server

```bash
npm start
```

Navigate to `http://localhost:4200`. The development server enables hot-reload on source changes.

### Build for Production

```bash
npm run build
```

Output is written to `dist/esraa-portfolio/browser/`.

---

## Project Structure

```
src/
├── index.html                     # App entry HTML
├── main.ts                        # bootstrapApplication entry
├── styles.scss                    # Global styles entry (imports 17 CSS files)
├── styles/                        # Global CSS files (un-encapsulated for GSAP)
│   ├── index-base.css
│   ├── App.css
│   ├── style.css
│   ├── Cursor.css
│   ├── Navbar.css
│   ├── Landing.css
│   ├── Loading.css
│   ├── About.css
│   ├── WhatIDo.css
│   ├── TechStackNew.css
│   ├── Career.css
│   ├── Work.css
│   ├── CallToAction.css
│   ├── Contact.css
│   ├── SocialIcons.css
│   ├── MyWorks.css
│   └── Play.css
└── app/
    ├── app.ts                     # Root component (standalone)
    ├── app.html                   # Root template (<router-outlet />)
    ├── app.config.ts              # Providers (router, error listeners)
    ├── app.routes.ts              # Route definitions (3 routes)
    ├── core/
    │   ├── config.ts              # All portfolio data (typed object)
    │   ├── services/
    │   │   ├── loading.service.ts # Signal-based loading state
    │   │   └── lenis.service.ts   # Lenis smooth-scroll wrapper
    │   ├── three/
    │   │   ├── data/
    │   │   │   └── bone-data.ts   # Bone name constants for animations
    │   │   └── utils/
    │   │       ├── animation-utils.ts  # GLTF animation filtering
    │   │       ├── character.ts        # Model loading & scene setup
    │   │       ├── decrypt.ts          # AES-CBC decryption
    │   │       ├── gsap-scroll.ts      # Scroll-triggered timelines
    │   │       ├── lighting.ts         # Scene lighting & HDR map
    │   │       ├── mouse-utils.ts      # Mouse/touch head rotation
    │   │       └── resize-utils.ts     # Renderer resize handler
    │   └── utils/
    │       ├── initial-fx.ts      # Post-load animation orchestration
    │       ├── split-text.ts       # Scroll-triggered text splitting
    │       └── text-splitter.ts   # Custom SplitText replacement
    ├── components/                # 14 standalone components
    │   ├── about/                 # About section
    │   ├── call-to-action/        # CTA banner
    │   ├── career/                # Career timeline
    │   ├── character/             # Three.js 3D character component
    │   ├── contact/               # Contact info section
    │   ├── cursor/                # Custom cursor component
    │   ├── hover-links/           # Hover-effect link component
    │   ├── landing/               # Hero landing section
    │   ├── navbar/                # Top navigation
    │   ├── social-icons/          # Social link icons
    │   ├── tech-stack/            # Skills & tools grid
    │   ├── what-i-do/             # Services/offerings section
    │   ├── work/                  # Horizontal-scroll work showcase
    │   └── work-image/            # Work image card
    ├── pages/
    │   ├── home/                  # Home page (composes all sections)
    │   ├── my-works/              # Full project portfolio
    │   └── play/                  # Placeholder page
    └── shared/
        └── loading/               # Loading overlay component
public/
├── favicon.ico
├── resume.pdf
├── images/                        # Project screenshots & headshot
├── models/
│   ├── char_enviorment.hdr        # HDR environment map
│   └── character.enc              # Encrypted 3D character model
├── video/
│   └── video.webm                 # Background video asset
└── draco/                         # DRACO decoder WASM + JS
```

---

## Available Scripts

| Script | Description |
| ------ | ----------- |
| `npm start` | Start development server at `http://localhost:4200` |
| `npm run build` | Production build via `@angular/build:application` |
| `npm run watch` | Development build with file watching |
| `npm test` | Run unit tests via Vitest |
| `npm run ng` | Invoke Angular CLI directly |

---

## Deployment

The production build outputs static files to `dist/esraa-portfolio/browser/`, compatible with any static hosting provider:

- **Vercel** — Set build command to `ng build` and output directory to `dist/esraa-portfolio/browser`.
- **Netlify** — Set publish directory to `dist/esraa-portfolio/browser` and build command to `npm run build`.
- **GitHub Pages** — Build locally and deploy the output directory.

The Angular build configuration uses the `@angular/build:application` builder with Vite-based bundling, output hashing in production, and size budgets (initial: 1.5 MB warning / 3 MB error, component styles: 4 kB / 8 kB).

---

## Contributing

Contributions and suggestions are welcome. Please open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

- **Email:** [Israashiref@gmail.com](mailto:Israashiref@gmail.com)
- **GitHub:** [@EsraaShiref](https://github.com/EsraaShiref)
- **LinkedIn:** [esraa-shiref](https://linkedin.com/in/esraa-shiref)

---

<p align="center">
  Angular 21 · Three.js · GSAP · Lenis
</p>
