# Business Assessment Suite

![Build Status](https://img.shields.io/badge/build-passing-15290C?style=flat-square)
![React](https://img.shields.io/badge/React-19-15290C?style=flat-square&logo=react&logoColor=D4FF4F)
![TypeScript](https://img.shields.io/badge/TypeScript-7-15290C?style=flat-square&logo=typescript&logoColor=D4FF4F)
![Vite](https://img.shields.io/badge/Vite-8-15290C?style=flat-square&logo=vite&logoColor=D4FF4F)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-15290C?style=flat-square&logo=tailwindcss&logoColor=D4FF4F)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-15290C?style=flat-square&logo=vitest&logoColor=D4FF4F)

A mobile-first editorial category landing page for the **Business Assessment Suite**, connecting HR teams, hiring managers, consultants, and coaches to three focused assessment tools:

1. **Behaviour Assessments** — psychometric framework analytics
2. **Aptitude Assessments** — structured talent evaluation platforms
3. **Personality Assessments** — advanced behavioral profiling analytics

---

## Architecture

```mermaid
flowchart TD
    HTML[index.html + SEO / JSON-LD] --> Main[src/main.tsx]
    Main --> App[src/App.tsx]

    App --> Header[Header]
    App --> Hero[Hero]
    App --> Catalogue[CatalogueSection]
    App --> Guide[GuideSection]
    App --> Footer[Footer]

    Catalogue --> HookUseAssessments[useAssessments Hook]
    Catalogue --> HookCarousel[useCarouselSync Hook]
    Hero --> HookMotion[usePrefersReducedMotion Hook]

    HookUseAssessments --> Utils[utils/assessments.ts]
    HookUseAssessments --> Data[data/assessments.ts]

    Catalogue --> Card[AssessmentCard]
    Catalogue --> States[Loading / Empty / Error States]
    Card --> SVG[AssessmentIllustration]
```

---

## Local Setup

### Prerequisites

- **Node.js** `>= 20`
- **npm** `>= 10`

### Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Copy environment template for custom static subpath testing
cp .env.example .env

# 3. Start development server on http://localhost:3000
npm run dev
```

### Verification Commands

```bash
# Run TypeScript typechecking
npm run lint

# Run Vitest + React Testing Library suite
npm test -- --run

# Build static production bundle into dist/
npm run build
```

---

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs typechecking, the automated Vitest suite, and builds `dist/` with the repository's GitHub Pages `base` path before publishing via `actions/deploy-pages`.

---

## Project Structure

```text
├── .github/workflows/deploy.yml   # Automated CI + GitHub Pages deploy
├── public/favicon.svg             # Geometric SVG favicon
├── src/
│   ├── components/                # Reusable UI sections, cards, SVG artwork & states
│   ├── data/assessments.ts        # Assessment tool definitions & guide mappings
│   ├── hooks/                     # Custom React hooks (catalogue, carousel, motion)
│   ├── test/setup.ts              # Vitest + jsdom environment setup
│   ├── types/assessment.ts        # Shared TypeScript interfaces
│   ├── utils/assessments.ts       # Pure validation & carousel calculation utilities
│   ├── App.tsx                    # Top-level page composition
│   ├── index.css                  # Tailwind CSS v4 + design tokens & dark mode
│   └── main.tsx                   # React root mount
├── index.html                     # Entry HTML with SEO metadata & ItemList JSON-LD
└── vite.config.ts                 # Vite + Vitest configuration
```
