# Ronit Madage — Portfolio

A cinematic, 3D, scroll-animated portfolio built with Next.js 15,
TypeScript, Tailwind CSS, React Three Fiber, GSAP, Framer Motion, and Lenis.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Add the robot model

This is the **one manual step** required. See
`public/models/README.md` for the direct download link and full
instructions. In short:

1. Download `humanoid_robot_low_poly_by_get3dmodels.glb` from
   https://www.get3dmodels.com/download/humanoid_robot_low_poly_by_get3dmodels.glb
2. Rename it to `robot.glb`
3. Place it at `public/models/robot.glb`
4. Refresh the dev server

Without this file, the hero section will show a clear "Robot model
not found" message instead of breaking — so the rest of the site
still works while you sort out the model.

## What's animated

- **Loading screen**: animated ring + progress bar, ~2.2s, then fades out.
- **Hero robot**: idle breathing motion, subtle head/body tracking
  toward your mouse cursor, plus its own built-in GLB animation if
  the model has one.
- **Scroll**: Lenis smooth scrolling drives GSAP ScrollTrigger, which
  moves the 3D camera through different angles as you scroll past
  each section (see `CameraScrollRig` in `components/RobotScene.tsx`).
- **Sections**: Framer Motion scroll-reveal on About, Skills,
  Experience, Projects, and Contact.

## Project structure

```
app/
  layout.tsx       — fonts, metadata
  page.tsx         — assembles loader + sections
  globals.css       — palette, fonts, glass/glow utility classes
components/
  Loader.tsx        — cinematic loading screen
  Navbar.tsx
  Hero.tsx           — robot stage + headline
  RobotScene.tsx     — R3F canvas, GLTF loader, lighting, scroll camera rig
  About.tsx
  Experience.tsx
  Skills.tsx
  Projects.tsx
  Contact.tsx
  SmoothScroll.tsx   — Lenis + GSAP ScrollTrigger wiring
lib/
  data.ts            — all your content (name, projects, skills, etc.)
public/
  models/robot.glb   — you add this (see above)
```

## Editing your content

Everything text-based (projects, skills, experience, links) lives in
`lib/data.ts` — edit there, it flows into every section automatically.

## Color palette / fonts (from your spec)

- Background: `#050816` / `#070B1A`
- Accent: `#8B5CF6` / `#A855F7`
- Headings: Clash Display (via Fontshare CDN)
- Body: General Sans (via Fontshare CDN)
- Code/labels: JetBrains Mono (via next/font/google)

## Deploying

Push to GitHub, then import the repo on **Vercel** (zero-config for
Next.js). Make sure `public/models/robot.glb` is committed — GLB
files under ~50MB work fine in a normal git repo; if yours is
larger, consider Git LFS.
