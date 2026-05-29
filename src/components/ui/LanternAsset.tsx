import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, memo } from "react";
import { cn } from "../../lib/utils";

interface LanternProps {
  className?: string;
  color?: "gold" | "white" | "red" | "blue" | "orange";
  delay?: number;
  interactive?: boolean;
}

export const LanternAsset = memo(function LanternAsset({ className, color = "gold", delay = 0, interactive = true }: LanternProps) {
  const fills = {
    gold: "fill-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]",
    white: "fill-stone-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]",
    red: "fill-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.6)]",
    blue: "fill-blue-300 drop-shadow-[0_0_15px_rgba(147,197,253,0.6)]",
    orange: "fill-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.8)]",
  };

  const tails = {
    gold: "stroke-yellow-400/60",
    white: "stroke-stone-300/60",
    red: "stroke-red-400/60",
    blue: "stroke-blue-400/60",
    orange: "stroke-orange-400/60",
  };

  const mouseX = useMotionValue(0);
  
  useEffect(() => {
    if (!interactive) return;
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 based on screen width
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseX.set(x);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseX]);

  // Spring animation for smooth mouse following
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  // Map mouse movement to lean rotation and subtle translation
  const leanRotate = useTransform(springX, [-1, 1], [-12, 12]);
  const leanX = useTransform(springX, [-1, 1], [-15, 15]);

  return (
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
      whileHover={interactive ? { scale: 1.15, filter: "brightness(1.5) drop-shadow(0 0 25px rgba(253,224,71,0.6)) blur(0px)", zIndex: 50 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay }}
      className={cn("relative w-16 h-40 origin-top pointer-events-auto cursor-pointer", className)}
    >
      <motion.div

        style={interactive ? { x: leanX, rotate: leanRotate } : {}}
        className="w-full h-full origin-top"
      >
        <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
          {/* String */}
          <line x1="50" y1="-50" x2="50" y2="20" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          
          {/* Main Body */}
          <path d="M30,20 L70,20 L90,50 L90,80 L70,110 L30,110 L10,80 L10,50 Z" className={fills[color]} />
          
          {/* Frame lines overlay */}
          <path d="M30,20 L70,20 L90,50 L90,80 L70,110 L30,110 L10,80 L10,50 Z M30,20 L10,50 L50,50 M70,20 L90,50 L50,50 M10,80 L50,50 M90,80 L30,110 L50,50 L70,110" fill="none" stroke="black" strokeWidth="1" strokeOpacity="0.3" />

          {/* Paper Tails swaying */}
          <motion.path
            d="M20,100 Q25,150 15,190" fill="none" strokeWidth="2"
            className={tails[color]}
            animate={{ d: ["M20,100 Q25,150 15,190", "M20,100 Q15,150 25,190"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
          />
          <motion.path
            d="M50,110 Q55,160 45,200" fill="none" strokeWidth="2"
            className={tails[color]}
            animate={{ d: ["M50,110 Q50,150 40,200", "M50,110 Q40,150 60,200"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }}
          />
          <motion.path
            d="M80,100 Q75,150 85,190" fill="none" strokeWidth="2"
            className={tails[color]}
            animate={{ d: ["M80,100 Q75,150 85,190", "M80,100 Q85,150 75,190"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: delay + 0.2 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
});
