# Esraa Shiref - Portfolio (Angular 21 + TypeScript + Three.js)

Ported from a React + Three.js template to Angular 21, using standalone
components, signals, and the same underlying Three.js/GSAP character scene.

## Getting Started

```bash
npm install
npm start        # ng serve, http://localhost:4200
npm run build    # production build -> dist/esraa-portfolio/browser
```

## What's fully ported and working

- **3D character scene** (`src/app/components/character`) - the encrypted
  `character.enc` model, Draco loader, lighting, animations, mouse-follow
  head rotation, and GSAP scroll timelines - all ported from the original
  Three.js logic almost line-for-line.
- **Loading screen** with the same progress simulation and intro animation.
- **Lenis smooth scroll**, custom cursor, split-text intro animations.
- Landing, About, What I Do, Career, Work (horizontal pinned scroll),
  Tech Stack, Call To Action, Contact, and the My Works page - all wired
  to your CV data in `src/app/core/config.ts`.
- Global CSS ported as-is from the original (kept global rather than
  per-component scoped, since GSAP selects classes across component
  boundaries throughout the app).

## What still needs your attention

1. **Real photos/screenshots** - `public/images/project-1.webp` through
   `project-5.webp` and `mypicnbg.png` are currently placeholder images
   copied from the original template. Swap in your actual project
   screenshots and headshot.
2. **Resume PDF** - `SocialIcons` links to `/resume.pdf` for download;
   add your actual resume file to `public/resume.pdf`.
3. **`/play` route** - the original template had a chess engine + AI
   chatbot here that impersonated the original developer. That's stubbed
   out with a placeholder (`src/app/pages/play`) since it doesn't apply
   to your content - replace with your own feature or remove the route
   and its nav link entirely.
4. **Social links** - double check `src/app/core/config.ts` `contact`
   section has your correct GitHub/LinkedIn URLs.
5. **Analytics** - the original used Vercel Analytics/Speed Insights;
   add your own equivalent if you deploy elsewhere.

## Project structure

```
src/app/
  core/            # config data, services (Loading, Lenis), Three.js utils
  components/      # all UI sections (Navbar, Landing, About, Work, etc.)
  pages/           # routed pages (Home, MyWorks, Play)
  shared/          # Loading overlay component
```
