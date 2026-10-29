# Revanth Kasula — portfolio

React 18 + TypeScript + Vite, styled with Tailwind CSS, animated with Framer Motion,
smooth scrolling by Lenis. Deployed to GitHub Pages on every push to `main`.

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Structure

```
src/
├── components/
│   ├── layout/      Navbar, Footer, Background, ScrollProgress
│   ├── sections/    Hero, About, Projects, Experience, Skills, Contact
│   └── ui/          AnimatedText, RotatingText, Reveal, SpotlightCard, Button, SectionHeading
├── data/            profile, projects, experience, skills  ← edit content here
├── hooks/           useSmoothScroll, useActiveSection
├── lib/             motion presets, cn helper
├── styles/          globals.css (Tailwind layers, glass utilities)
└── types/           shared TypeScript types
```

All content lives in `src/data/`, so updating a project or skill never touches a component.
