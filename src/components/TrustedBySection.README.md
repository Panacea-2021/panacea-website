# TrustedBySection

Single file: `TrustedBySection.jsx` (inline CSS + Tailwind). Full integration notes are in the README comment at the bottom of that file.

```jsx
import TrustedBySection from "./components/TrustedBySection";

<TrustedBySection
  theme="blue"
  imageSrc="/images/team.jpg"
  badgeScale={1.12}
  badgeVariant="glow"
  autoplay
  autoplayInterval={4000}
  depth={96}
  speed={650}
  visibleCount={3}
  pauseOnHover
  pauseOnFocus
  loop
/>
```

**Dependencies:** `react`, `framer-motion`, `tailwindcss`

**Theming:** CSS variables `--accent`, `--neutral-900`, `--surface`, `--glass`, `--accent-soft`, `--radius`, `--shadow`, `--badge-accent` on `:root` and the section. Presets: `theme="blue"` (#0B6FFF) or `theme="teal"` (#00A99D).

**Reduced motion:** honors `prefers-reduced-motion` and the `reducedMotion` prop (disables 3D, autoplay, badge swing/pulse, parallax, cursor glow).

**Photos:** replace `imageSrc` / `products[].imageSrc` (placeholders are marked REPLACE).

**Carousel:** `autoplayInterval` (default 4000ms), `depth` (translateZ px), `speed` (ms), `pauseOnHover`, `pauseOnFocus`, `loop`, `visibleCount`.
