# KINETIK STUDIO — Awwward-Winning Digital Experience & Cultural Motion

A highly interactive, visually stunning web experience for **KINETIK STUDIO**, built with **Next.js 15 + React 19**, **GSAP (ScrollTrigger, InertiaPlugin)**, and **Lenis Smooth Scrolling**. This project captures the bold aesthetics, hyper-digital motion design, and high-performance interactive graphing characteristic of top-tier Awwward-winning digital studios.

---

## 🚀 Overview

**KINETIK STUDIO** is an award-winning creative production and hyper-digital design studio. The platform features an avant-garde editorial visual system, live video streaming hero and showreel components, fluid inertia physics, interactive performance graphing, and dynamic color-inverting navigation.

---

## ✨ Key Features & Motion Architecture

### 🎭 Animation & Physics System
- **GSAP InertiaPlugin Fling & Tracking**: Motion cards and floating badge tags calculate real-time cursor velocity, flinging with physical momentum before snapping smoothly back into alignment.
- **Interactive SVG Charting & Metrics**: Live data graphing with smooth cubic Bézier curves, dynamic gradient area fills, stroke-dasharray drawing triggers, and tabbed KPI switching (Viral Reach, Conversion Velocity, Cultural Index).
- **Interactive Video Showreel**: Fullscreen video player with live play/pause controls, mute/unmute audio toggling, and animated playback indicators.
- **Horizontal Kinetic Track & Letter Bounce**: Pinned narrative track with letter-by-letter scroll scrubbing and elastic SVG sticker bounces.
- **Context-Aware Dynamic Navbar**: Real-time section detection that switches the navbar seamlessly between `.on-dark` and `.on-light` palettes across alternating content blocks.
- **Interactive Pop-Out Overlays**: Work catalog preview and WhatsApp executive connect drawers with scale/rotation physics and backdrop blur overlays.
- **Elastic Card Spreading**: Service cards dynamically spread horizontally on hover with spring easing.
- **Full-Screen Transition Scribble**: Multi-color SVG scribble mask overlay triggered on logo click with automatic smooth scroll-to-top.
- **Magnetic Custom Cursor**: Custom cursor bubble tracking pointer movements with contextual text badges (`Play`, `Mute`, `Explore`, `Drag`).
- **Infinite Double Marquee**: Seamless dual-row loop with randomized brand color palettes.
- **Lenis Smooth Scroll Engine**: Synchronized with GSAP's requestAnimationFrame ticker for high-framerate scrolling.

---

## 🎨 Typography & Design Tokens

- **Display Font**: `Syne` (Google Fonts) — Bold, high-fashion geometric typography.
- **Heading Font**: `Space Grotesk` (Google Fonts) — Tech-forward, high-contrast monospace-inspired sans.
- **Body Font**: `Plus Jakarta Sans` (Google Fonts) — Modern, clean readability.

```css
:root {
    --font-display: 'Syne', 'Epilogue', sans-serif;
    --font-heading: 'Space Grotesk', 'DM Sans', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
    --color-green: #29725f;
    --color-lightblue: #82a0ff;
    --color-darkblue: #4b69f0;
    --color-lightgreen: #e6fab9;
    --color-orange: #f5693c;
    --color-maroon: #a0325a;
    --color-pink: #f0befa;
    --bg-color: #f0ebe6;
    --color-white: #ffffff;
    --color-black: #000000;
}
```

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css                # Master CSS stylesheet importing all modules
│   ├── layout.jsx                 # Root layout with Google Fonts preconnection
│   ├── page.jsx                   # Home page assembling all sections
│   └── styles/
│       ├── base.css               # Design tokens, typography, CSS resets
│       ├── navbar.css             # Navigation & pop-out drawers
│       ├── vimeo-hero.css         # Hero video background & typography
│       ├── horizontal-words.css   # Horizontal scrolling letter track
│       ├── motion-cards.css       # Inertia physics project cards
│       ├── showreel.css           # Video showreel component
│       ├── metrics.css            # Interactive SVG graphing & metrics
│       ├── cards.css              # Service cards & stickers
│       ├── marquee.css            # Infinite double marquee
│       ├── footer.css             # Footer layout, credits & stickers
│       ├── cursor.css             # Magnetic cursor bubble
│       └── responsive.css         # Responsive media queries
├── components/
│   ├── Navbar.jsx                 # Dynamic navbar with work pop-out & WA modal
│   ├── VimeoHero.jsx              # Streaming hero video player
│   ├── HorizontalWords.jsx        # Pinned horizontal kinetic letters
│   ├── MotionCards.jsx            # Project showcase with inertia fling
│   ├── Showreel.jsx               # Interactive studio showreel video
│   ├── StudioMetrics.jsx          # Interactive performance graphing component
│   ├── ServiceCards.jsx           # Elastic service cards
│   ├── DoubleMarquee.jsx          # Infinite brand marquee
│   ├── Footer.jsx                 # Footer with stickers & credits
│   ├── CursorBubble.jsx           # Magnetic cursor system
│   ├── SmoothScroll.jsx           # Lenis integration
│   └── TransitionScribble.jsx     # Fullscreen scribble transition
├── lib/
│   └── data.js                    # Brand configuration, cards, and data
└── public/
    └── assets/                    # Optimized SVGs, stickers, and brand icons
```

---

## 🛠️ Getting Started

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live studio experience.

### Production Build
```bash
npm run build
npm run start
```
