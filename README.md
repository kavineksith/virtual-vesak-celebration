# Vesak Festival of Lights

A visually immersive, interactive single-page application celebrating Vesak, the Festival of Lights. Built with modern web technologies, it features physics-based lantern interactions, scroll-bound animations, and a real-time wishing experience.

## Features

- **Interactive Lanterns:** Physics-based springing lanterns that respond to mouse movements.
- **Dynamic Particles:** Custom HTML5 Canvas rendering for performant fireflies and embers.
- **Scroll Animations:** Smooth, cinematic fade-ins and parallax effects utilizing `motion`.
- **Wishing Experience:** A dedicated section allowing users to release their own personalized, animated wish lantern into the digital sky.
- **Responsive Design:** Optimized layouts that gracefully adapt from mobile devices to ultra-wide desktop monitors, employing a mobile-first Tailwind configuration.

## Tech Stack

- **React 18** (Vite)
- **Tailwind CSS** (for utility-first, performant styling)
- **Motion / Framer Motion** (for fluid spring physics and scroll animations)
- **Lucide React** (for iconography)

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## Design Philosophy

The application interface is grounded in intentional visual design:
- **Atmospheric Depth:** Using layered SVG filters, `mix-blend-mode`, and carefully tuned drop-shadows to emulate natural light scattering in the dark.
- **Elegance:** A refined typographic pairing of serif headings and clean sans-serif body text to convey a serene, festival-appropriate mood.
- **Performance:** Extensive use of component memoization (`React.memo`) and raw canvas rendering for complex particle systems to maintain a high framerate during interactions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.