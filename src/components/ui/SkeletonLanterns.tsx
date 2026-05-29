import { motion, useScroll, useTransform } from "motion/react";
import { useRef, memo } from "react";

export const SkeletonLantern = memo(function SkeletonLantern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6">
      {/* Top cap */}
      <polygon points="30,10 70,10 80,20 20,20" />
      {/* Upper body lines */}
      <line x1="30" y1="10" x2="10" y2="50" />
      <line x1="70" y1="10" x2="90" y2="50" />
      <line x1="20" y1="20" x2="10" y2="50" />
      <line x1="80" y1="20" x2="90" y2="50" />
      {/* Mid body equator */}
      <polygon points="10,50 90,50 85,80 15,80" />
      <line x1="10" y1="50" x2="15" y2="80" />
      <line x1="90" y1="50" x2="85" y2="80" />
      {/* Lower body lines */}
      <line x1="15" y1="80" x2="30" y2="110" />
      <line x1="85" y1="80" x2="70" y2="110" />
      <line x1="30" y1="110" x2="70" y2="110" />
      {/* Tassels */}
      <line x1="35" y1="110" x2="30" y2="120" strokeOpacity="0.4" />
      <line x1="50" y1="110" x2="50" y2="120" strokeOpacity="0.4" />
      <line x1="65" y1="110" x2="70" y2="120" strokeOpacity="0.4" />
      {/* Inner candle glow representation */}
      <circle cx="50" cy="55" r="4" fill="currentColor" fillOpacity="0.4" stroke="none" />
    </svg>
  );
});

export const SkeletonLanternParticles = memo(function SkeletonLanternParticles() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lanterns = [
    { left: "10%", top: "20%", scale: 0.8, delay: 0.2, drift: 20 },
    { left: "80%", top: "15%", scale: 1.2, delay: 1.5, drift: -30 },
    { left: "25%", top: "65%", scale: 0.6, delay: 0.8, drift: 15 },
    { left: "75%", top: "75%", scale: 0.9, delay: 2.1, drift: -25 },
    { left: "5%", top: "85%", scale: 1.1, delay: 0.5, drift: 35 },
    { left: "90%", top: "50%", scale: 0.7, delay: 1.2, drift: -15 },
    { left: "45%", top: "10%", scale: 0.5, delay: 2.8, drift: 20 },
    { left: "60%", top: "85%", scale: 1.3, delay: 1.9, drift: -20 },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {lanterns.map((lantern, i) => (
        <motion.div
           key={i}
           className="absolute text-vesak-gold opacity-30 mix-blend-screen"
           style={{
             left: lantern.left,
             top: lantern.top,
             scale: lantern.scale,
           }}
           animate={{
             y: [-10, 10, -10],
             x: [0, lantern.drift, 0],
             rotate: [-3, 3, -3],
           }}
           transition={{
             duration: 8 + Math.random() * 4,
             repeat: Infinity,
             ease: "easeInOut",
             delay: lantern.delay
           }}
        >
          <SkeletonLantern className="w-16 h-20 drop-shadow-[0_0_8px_rgba(253,224,71,0.4)]" />
        </motion.div>
      ))}
    </div>
  );
});
