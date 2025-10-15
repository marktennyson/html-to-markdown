## HTML → Markdown Studio

Hyper-modern HTML-to-Markdown playground built on the Next.js App Router. The experience ships with animated glassmorphism UI, responsive layouts tailored from small mobile screens to 4K desktops, and instant clipboard-ready Markdown output.

### Stack

- **Next.js 15 App Router** with the latest React 19 features
- **TypeScript** and Tailwind CSS (v3.4) with custom tokens for light/dark theming
- **Framer Motion 12** for immersive micro-interactions
- **Turndown** for deterministic HTML → Markdown transforms
- **Lucide icons** and custom font pairing (Geist + Nunito)

### Getting started

```bash
yarn install
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) to explore the studio. The primary workspace lives in `app/page.tsx` and uses the `app/providers.tsx` wrapper for theme management.

### Production build

```bash
yarn build
yarn start
```

### Features at a glance

- Dual-pane editor with live Markdown preview, conversion guardrails, and copy toast
- Adaptive layout with 3XL/4XL breakpoints and glassy gradients for retina screens
- Motion-enhanced hero, feature grid, and automation timeline with staggered reveals
- Theme toggle powered by `next-themes` and persistent design tokens
- API example using App Router route handlers under `app/api`

### Project structure

```
app/
	layout.tsx        # Root layout + fonts and global glass background
	page.tsx          # Animated workspace, feature highlights, CTA
	providers.tsx     # Client-side providers (theme)
	api/hello/        # Route handler example
	fonts/            # Local Geist font files
components/
	ThemeToggle.tsx   # Rich icon theme switcher
styles/globals.css  # Tailwind base + design tokens
```

### Contributing

Feel free to fork, extend the conversion rules, or swap in your own preset tokens. Run `yarn lint` to ensure the codebase stays compliant with the configured rules.
