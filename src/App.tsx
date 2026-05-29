/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Particles } from "./components/ui/Particles";
import { Hero } from "./components/Hero";
import { Quote } from "./components/Quote";
import { LanternsGallery } from "./components/LanternsGallery";
import { Timeline } from "./components/Timeline";
import { WishLantern } from "./components/WishLantern";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-vesak-base text-slate-100 overflow-clip">
      <Particles count={80} speed={0.3} color="rgba(253, 224, 71, 0.5)" />
      
      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <Quote />
        <LanternsGallery />
        <Timeline />
        <WishLantern />
        <Footer />
      </main>
    </div>
  );
}
