# Cervus Labs - Next.js Portfolio

A modern, production-ready Next.js application for Cervus Labs, featuring a premium design with dark/light mode support.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Theme Management:** next-themes
- **Fonts:** Inter & Manrope (via next/font/google)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts and theme provider
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles and Tailwind directives
├── components/
│   ├── layout/              # Layout components (Navbar, Footer, Background)
│   ├── home/                # Home page sections
│   ├── ui/                  # shadcn/ui components
│   └── providers/           # Context providers
├── lib/
│   └── utils.ts             # Utility functions
└── tailwind.config.ts       # Tailwind configuration with design tokens
```

## Design Tokens

The design system is configured in `tailwind.config.ts` with:
- Custom colors (primary, background-light/dark, card-light/dark)
- Font families (Manrope for display, Inter for body)
- Custom animations (float, network-pulse, draw)
- Letter spacing utilities

## Next Steps

1. Initialize shadcn/ui components as needed
2. Build out the component structure (Navbar, Hero, Services, etc.)
3. Implement the remaining sections from the reference design
