# Wesley Joseph Co.

Cinematic holding-company website. Black-and-white operating-system aesthetic. The homepage is a single full-screen orbital experience; deeper routes carry the brand into Lumina, Network, Insider, Ventures, and Login.

Tech: Next.js App Router, TypeScript, Tailwind, Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To replay the intro animation, run in the browser console:

```js
localStorage.removeItem("wjc:intro:v1:seen");
```

## Production build

```bash
npm run build
npm run start
```

## Deploy workflow (GitHub → Vercel)

Every push to `main` triggers a Vercel deploy. Setup is one-time:

### 1. Configure git author (one-time, machine-wide)

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 2. Make the first commit

```bash
cd "/Users/wesleyjoseph1/Desktop/WesleyJosephCo"
git commit -m "Initial Wesley Joseph Co website"
```

### 3. Create the GitHub repo

Visit [github.com/new](https://github.com/new). Name it `wesley-joseph-co`. Choose private (recommended) or public. Do NOT initialize with a README, .gitignore, or license (the local repo already has them).

Copy the SSH or HTTPS URL GitHub gives you (it looks like `git@github.com:USER/wesley-joseph-co.git` or `https://github.com/USER/wesley-joseph-co.git`).

### 4. Push

```bash
cd "/Users/wesleyjoseph1/Desktop/WesleyJosephCo"
git branch -M main
git remote add origin <PASTE_THE_URL>
git push -u origin main
```

### 5. Connect Vercel

Visit [vercel.com/new](https://vercel.com/new). Sign in with GitHub. Pick the `wesley-joseph-co` repo. Vercel auto-detects Next.js, so click **Deploy** without changing settings.

After ~60 seconds the first deploy is live. Vercel gives you:

- A production URL like `wesley-joseph-co.vercel.app`
- A unique preview URL for every push to a branch

### 6. Day-to-day

Code locally with `npm run dev`. When a change is review-ready:

```bash
git add .
git commit -m "Tighten orbital pacing"
git push
```

Vercel runs the build on each push and updates the preview/live URL automatically.

## Project structure

```
app/
  layout.tsx              Root: fonts, metadata, header, grain
  page.tsx                Homepage = orbital experience only
  globals.css
  (deep)/                 Route group; shares Footer
    layout.tsx
    ventures/page.tsx
    insider/page.tsx
    network/page.tsx
    lumina/page.tsx
    login/page.tsx

components/
  home/
    IntroAnimation.tsx    One-time orbital reveal
    OrbitalHomepage.tsx   The single full-screen experience
  layout/
    Header.tsx            Logo dot + NY clock + 4 nav links
    Footer.tsx            Used only by deeper routes
    MobileMenu.tsx
  ui/
    OrbitalSystem.tsx     CSS 3D orbital rings, sphere, nodes
    MovingParticles.tsx   Seeded drifting particle field
    MovingGradient.tsx    Slow radial highlight pan
    Grain.tsx             Static SVG grain overlay
    PageHeader.tsx        Shared header for deep routes

content/ventures.ts       Lumina, Network, Insider metadata
lib/constants.ts          Site, nav, footer, intro storage key
```

## Brand tokens

- `bg`: `#000000` matte black
- `bg-elevated`: `#0A0A0A`
- `ink`: `#FFFFFF`
- `ink-soft`: `#EEEEEE`, `ink-muted`: `#B5B5B5`, `ink-subtle`: `#7A7A7A`
- Display font: Cormorant Garamond
- Body: Inter
- Mono: JetBrains Mono

No gold. No black-and-gold. Black-and-white only.
