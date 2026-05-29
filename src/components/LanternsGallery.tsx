import { motion } from "motion/react";
import { LanternAsset } from "./ui/LanternAsset";
import { Fireflies } from "./ui/Fireflies";
import { StringLights } from "./ui/StringLights";

import { SkeletonLanternParticles } from "./ui/SkeletonLanterns";

export function LanternsGallery() {
  const lanterns = [
    { color: "white", size: "scale-110", top: "10%", left: "15%", z: "z-10" },
    { color: "gold", size: "scale-150", top: "30%", left: "30%", z: "z-20" },
    { color: "red", size: "scale-100", top: "20%", left: "55%", z: "z-10" },
    { color: "orange", size: "scale-125", top: "45%", left: "70%", z: "z-20" },
    { color: "blue", size: "scale-90", top: "15%", left: "85%", z: "z-0" },
    { color: "gold", size: "scale-75", top: "60%", left: "10%", z: "z-0" },
    { color: "white", size: "scale-110", top: "65%", left: "80%", z: "z-10" },
    { color: "red", size: "scale-100", top: "75%", left: "45%", z: "z-10" },
    { color: "orange", size: "scale-[0.85]", top: "35%", left: "5%", z: "z-0" },
    { color: "blue", size: "scale-125", top: "55%", left: "90%", z: "z-20" },
    { color: "gold", size: "scale-110", top: "85%", left: "25%", z: "z-10" },
    { color: "white", size: "scale-[1.3]", top: "80%", left: "65%", z: "z-20" },
    { color: "red", size: "scale-95", top: "40%", left: "15%", z: "z-10" },
    { color: "orange", size: "scale-[1.15]", top: "15%", left: "40%", z: "z-20" },
    { color: "white", size: "scale-[0.8]", top: "25%", left: "95%", z: "z-0" },
  ] as const;

  return (
    <section className="relative w-full min-h-[70vh] bg-vesak-base overflow-hidden py-24 md:py-32 z-10 flex flex-col justify-center">
      <SkeletonLanternParticles />
      <StringLights />
      {/* Background Village Silhouette to fill bottom emptiness */}
      <div className="absolute bottom-[-10vh] left-0 w-full h-[40vh] opacity-20 pointer-events-none fill-vesak-dark z-0 scale-y-125 origin-bottom">
         <svg preserveAspectRatio="none" viewBox="0 0 1440 320" className="w-full h-full">
           <path d="M0,320 L1440,320 L1440,150 Q1300,100 1200,160 T900,130 T750,180 T600,110 T400,160 T150,140 L0,200 Z" />
           <path d="M700,180 Q750,50 800,180 Z" />
           <motion.circle cx="1200" cy="180" r="3" fill="#FDE047" animate={{ opacity: [0.1, 0.8, 0.2] }} transition={{ repeat: Infinity, duration: 4 }} className="blur-[1px]" />
           <motion.circle cx="750" cy="190" r="4" fill="#F59E0B" animate={{ opacity: [0.3, 0.7, 0.2] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="blur-[1px]" />
           <motion.circle cx="450" cy="170" r="2" fill="#FDE047" animate={{ opacity: [0.2, 0.9, 0.3] }} transition={{ repeat: Infinity, duration: 5, delay: 2 }} className="blur-[1px]" />
         </svg>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-50">
         <Fireflies count={40} />
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-16 md:mb-32 relative z-30">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-20px" }}
           transition={{ duration: 1 }}
           className="text-center bg-white/[0.02] backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg">The Festival of Lights</h2>
          <p className="text-slate-300 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            In every village and city, thousands of intricate paper lanterns are lit to signify the light of wisdom overcoming the darkness of ignorance. Try hovering over the lanterns drifting in the night wind.
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 top-64 pointer-events-none">
        {lanterns.map((l, i) => (
          <div key={i} className={`absolute ${l.top} ${l.left} ${l.z} pointer-events-auto`}>
            <LanternAsset
              color={l.color}
              className={l.size}
              delay={i * 0.3}
              interactive={true}
            />
          </div>
        ))}
      </div>

      {/* Floating Fog */}
      <motion.div
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
         className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-vesak-base to-transparent z-40 opacity-80 pointer-events-none mix-blend-screen"
         style={{ filter: "blur(40px)" }}
      >
        <div className="w-full h-full bg-white/5 opacity-50 block"></div>
      </motion.div>
    </section>
  );
}
