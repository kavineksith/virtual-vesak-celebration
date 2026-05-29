import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useEffect } from "react";
import { LanternAsset } from "./ui/LanternAsset";
import { Fireflies } from "./ui/Fireflies";
import { SkeletonLanternParticles } from "./ui/SkeletonLanterns";
import { StringLights } from "./ui/StringLights";

export function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Interactive Moon tracking
  const moonHoverX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const moonHoverY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

  // Dramatic rising and growing moon on scroll
  const moonScale = useTransform(scrollY, [0, 800], [0.55, 1.5]);
  const moonY = useTransform(scrollY, [0, 800], [300, 0]);
  const filterBlur = useTransform(scrollY, [0, 500], ["blur(12px)", "blur(1px)"]);
  const moonOpacity = useTransform(scrollY, [0, 400, 1000], [0.7, 1, 0]);

  // Title Animations
  const textY = useTransform(scrollY, [0, 800], [0, -250]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  
  // Immersive Parallax Village Tiers
  const bgVillageY = useTransform(scrollY, [0, 1000], [0, 250]); // Furthest - moves down
  const midVillageY = useTransform(scrollY, [0, 1000], [0, 120]); // Mid - moves down slightly
  const fgVillageY = useTransform(scrollY, [0, 1000], [0, -80]);  // Closest - moves up faster

  return (
    <section ref={ref} className="relative h-[120vh] w-full overflow-hidden flex flex-col items-center justify-start pt-[20vh] bg-vesak-base">
      
      <SkeletonLanternParticles />
      <StringLights />
      
      {/* Interactive & Rising Moon */}
      <motion.div
        style={{ 
          y: moonY, 
          scale: moonScale, 
          opacity: moonOpacity,
          filter: filterBlur,
          x: moonHoverX,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-vesak-moon moon-glow z-0 flex items-center justify-center"
      >
        <motion.div style={{ y: moonHoverY }} className="w-full h-full rounded-full opacity-30 mix-blend-overlay bg-gradient-to-tr from-black/20 to-transparent" />
      </motion.div>

      {/* Magical Particles expanding from the moon */}
      <motion.div
        style={{ y: moonY, scale: moonScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full z-0 opacity-40 pointer-events-none"
      >
        <div className="absolute inset-0 rounded-full animate-ping shadow-[0_0_80px_20px_rgba(253,224,71,0.2)]" style={{ animationDuration: '4s' }} />
      </motion.div>

      {/* Cinematic Background Lanterns (Depth layer) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
         <div className="absolute top-[5%] left-[10%] pointer-events-auto"><LanternAsset color="orange" className="scale-75 opacity-60 blur-[3px]" delay={0.3} interactive={true} /></div>
         <div className="absolute top-[15%] right-[12%] pointer-events-auto"><LanternAsset color="gold" className="scale-[0.6] opacity-50 blur-[4px]" delay={1.5} interactive={true} /></div>
         <div className="absolute top-[35%] left-[25%] pointer-events-auto"><LanternAsset color="red" className="scale-100 opacity-90 blur-[1px]" delay={2.1} interactive={true} /></div>
         <div className="absolute top-[10%] right-[35%] pointer-events-auto"><LanternAsset color="blue" className="scale-[0.8] opacity-70 blur-[2px]" delay={0.8} interactive={true} /></div>
         <div className="absolute top-[28%] right-[20%] pointer-events-auto"><LanternAsset color="white" className="scale-110 opacity-80 blur-[1px]" delay={3.5} interactive={true} /></div>
         <div className="absolute top-[45%] left-[15%] pointer-events-auto"><LanternAsset color="gold" className="scale-[0.65] opacity-60 blur-[4px]" delay={1.1} interactive={true} /></div>
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-vesak-base via-transparent to-transparent opacity-80 pointer-events-none" />
      
      {/* Hero Title */}
      <motion.div
        style={{ y: textY, opacity: textOpacity, scale: textScale }}
        className="relative z-30 text-center px-4 max-w-5xl mt-12"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="text-vesak-gold font-cinzel tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm mb-6 uppercase"
        >
          A Virtual Celebration of Light
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-5xl md:text-7xl lg:text-9xl font-serif text-white glowing-text leading-tight mb-8 drop-shadow-2xl"
        >
          Illuminate the <br className="hidden md:block" />
          <span className="text-vesak-gold font-style-italic glow-gold pr-4">Night</span>
        </motion.h1>
      </motion.div>

      {/* Layer 1: Distant Background Stupas & Mountains */}
      <motion.div
        style={{ y: bgVillageY }}
        className="absolute bottom-0 left-0 w-full h-[30vh] z-10 pointer-events-none opacity-40 fill-[#080d1a]"
      >
         <svg preserveAspectRatio="none" viewBox="0 0 1440 320" className="w-full h-full">
           <path d="M0,280 L1440,220 L1440,320 L0,320 Z" />
           {/* Distant Stupas */}
           <path d="M250,260 Q280,120 310,260 Z M1150,230 Q1170,130 1190,230 Z" />
         </svg>
      </motion.div>

      {/* Layer 2: Midground Canopy & Huts */}
      <motion.div
        style={{ y: midVillageY }}
        className="absolute bottom-[-5vh] left-0 w-full h-[40vh] z-20 pointer-events-none opacity-90 fill-[#0d1428]"
      >
         <svg preserveAspectRatio="none" viewBox="0 0 1440 320" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
           <path d="M0,230 Q350,180 720,250 T1440,210 L1440,320 L0,320 Z" />
           {/* Trees */}
           <path d="M120,230 Q140,140 160,230 Z M180,240 Q195,160 210,240 Z M1280,220 Q1300,130 1320,220 Z M850,260 Q870,140 890,260 Z" />
           {/* Tiny Midground Huts */}
           <path d="M550,235 L580,210 L610,235 L610,260 L550,260 Z" />
           <motion.circle cx="580" cy="245" r="2" fill="#FDE047" animate={{ opacity: [0.2, 0.7, 0.3, 0.8] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }} className="blur-[1px]" />
         </svg>
      </motion.div>

      {/* Layer 3: Foreground Detailed Village Silhouette */}
      <motion.div
        style={{ y: fgVillageY }}
        className="absolute bottom-[-10vh] left-0 w-full h-[55vh] z-30 pointer-events-none fill-vesak-base"
      >
        <svg preserveAspectRatio="none" viewBox="0 0 1440 320" className="w-full h-full drop-shadow-[0_-15px_30px_rgba(0,0,0,0.9)]">
          {/* Main Ground */}
          <path d="M0,200 Q250,250 500,180 T1100,230 T1440,150 L1440,320 L0,320 Z" />
          {/* Large Framing Trees (Left & Right margins) */}
          <path d="M20,210 Q40,50 120,0 Q130,60 140,220 Z M40,210 Q10,100 -20,50 L-20,320 Z" />
          <path d="M1320,180 Q1350,30 1420,-20 Q1430,40 1440,180 Z M1410,180 Q1440,100 1460,50 L1460,320 Z" />
          {/* Village Huts */}
          <path d="M400,210 L480,150 L560,210 L560,260 L400,260 Z" />
          <path d="M920,220 L980,160 L1040,220 L1040,270 L920,270 Z" />
          {/* Glowing Windows */}
          <motion.circle cx="480" cy="230" r="4" fill="#FDE047" animate={{ opacity: [0.2, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="blur-[1px]" />
          <motion.circle cx="980" cy="240" r="3" fill="#F59E0B" animate={{ opacity: [0.4, 0.8, 0.2] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }} className="blur-[1px]" />
        </svg>
        
        {/* Ambient Fireflies in Foreground */}
        <div className="absolute bottom-0 left-0 w-full h-[60vh] pointer-events-none z-30 mix-blend-screen">
           <Fireflies count={60} />
        </div>
        
        {/* Hanging Lanterns anchored to foreground elements */}
        {/* Left Tree Lanterns */}
        <div className="absolute left-[6%] bottom-[42%] z-40 pointer-events-auto">
          <LanternAsset color="gold" className="scale-[0.55] opacity-100" delay={0.2} interactive={true} />
        </div>
         <div className="absolute left-[11%] bottom-[58%] z-40 pointer-events-auto">
          <LanternAsset color="red" className="scale-[0.4] opacity-90" delay={1.4} interactive={true} />
        </div>

        {/* Right Tree Lanterns */}
        <div className="absolute right-[4%] bottom-[50%] z-40 pointer-events-auto">
           <LanternAsset color="orange" className="scale-75 opacity-100" delay={0.8} interactive={true} />
        </div>
        <div className="absolute right-[9%] bottom-[40%] z-40 pointer-events-auto">
           <LanternAsset color="white" className="scale-[0.45] opacity-80" delay={2.3} interactive={true} />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-white/50 tracking-[0.4em] uppercase font-cinzel">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-vesak-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
