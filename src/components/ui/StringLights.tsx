import { motion } from "motion/react";
import { useEffect, useState, memo } from "react";

export const StringLights = memo(function StringLights() {
  const bulbColors = ["fill-red-500", "fill-yellow-400", "fill-blue-500", "fill-green-500", "fill-orange-500"];
  const glowColors = ["rgba(239,68,68,0.8)", "rgba(250,204,21,0.8)", "rgba(59,130,246,0.8)", "rgba(34,197,94,0.8)", "rgba(249,115,22,0.8)"];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute top-0 left-0 w-full overflow-visible pointer-events-none z-10 opacity-80">
      <svg viewBox="0 0 1440 300" className="w-full min-w-[1200px] h-auto drop-shadow-xl" preserveAspectRatio="none">
        {/* Wires */}
        <path d="M-50,80 Q300,200 720,100 T1500,80" fill="none" stroke="#222" strokeWidth="2" opacity="0.8" />
        <path d="M-50,150 Q400,280 800,160 T1500,120" fill="none" stroke="#222" strokeWidth="2" opacity="0.6" />
        
        {/* Bulbs Wire 1 */}
        {Array.from({ length: 20 }).map((_, i) => {
          const t = (i + 0.5) / 20;
          let x, y;
          if (t <= 0.5) {
            const nt = t * 2;
            x = Math.pow(1-nt, 2) * -50 + 2*(1-nt)*nt * 300 + Math.pow(nt, 2) * 720;
            y = Math.pow(1-nt, 2) * 80 + 2*(1-nt)*nt * 200 + Math.pow(nt, 2) * 100;
          } else {
            const nt = (t - 0.5) * 2;
            x = Math.pow(1-nt, 2) * 720 + 2*(1-nt)*nt * 1140 + Math.pow(nt, 2) * 1500;
            y = Math.pow(1-nt, 2) * 100 + 2*(1-nt)*nt * 0 + Math.pow(nt, 2) * 80;
          }

          const colorIdx = i % bulbColors.length;

          return (
            <g key={`w1-${i}`} transform={`translate(${x}, ${y}) rotate(${(Math.random() - 0.5) * 20})`}>
               <rect x="-3" y="-2" width="6" height="7" fill="#1f2937" rx="1" />
               <motion.path 
                 d="M-4,5 Q-6,15 0,18 Q6,15 4,5 Z"
                 className={bulbColors[colorIdx]}
                 animate={{ opacity: [0.4, 1, 0.4] }}
                 transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                 style={{ filter: `drop-shadow(0 0 12px ${glowColors[colorIdx]})` }}
               />
            </g>
          );
        })}

        {/* Bulbs Wire 2 */}
        {Array.from({ length: 25 }).map((_, i) => {
          const t = (i + 0.5) / 25;
          let x, y;
          if (t <= 0.5) {
            const nt = t * 2;
            x = Math.pow(1-nt, 2) * -50 + 2*(1-nt)*nt * 400 + Math.pow(nt, 2) * 800;
            y = Math.pow(1-nt, 2) * 150 + 2*(1-nt)*nt * 280 + Math.pow(nt, 2) * 160;
          } else {
            const nt = (t - 0.5) * 2;
            x = Math.pow(1-nt, 2) * 800 + 2*(1-nt)*nt * 1200 + Math.pow(nt, 2) * 1500;
            y = Math.pow(1-nt, 2) * 160 + 2*(1-nt)*nt * 40 + Math.pow(nt, 2) * 120;
          }

          const colorIdx = (i + 3) % bulbColors.length;

          return (
            <g key={`w2-${i}`} transform={`translate(${x}, ${y}) rotate(${(Math.random() - 0.5) * 30})`}>
               <rect x="-2" y="-2" width="4" height="6" fill="#1f2937" rx="1" />
               <motion.circle 
                 cx="0" cy="8" r="4" 
                 className={bulbColors[colorIdx]}
                 animate={{ opacity: [0.3, 0.9, 0.3] }}
                 transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                 style={{ filter: `drop-shadow(0 0 10px ${glowColors[colorIdx]})` }}
               />
            </g>
          );
        })}
      </svg>
    </div>
  );
});
