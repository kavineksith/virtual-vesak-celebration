import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import DOMPurify from "dompurify";
import { LanternAsset } from "./ui/LanternAsset";
import { CornerFrame, ClayLamp } from "./ui/Decorations";
import { EmberExplosion } from "./ui/EmberExplosion";
import { StringLights } from "./ui/StringLights";

import { SkeletonLanternParticles } from "./ui/SkeletonLanterns";

export function WishLantern() {
  const [wish, setWish] = useState("");
  const [released, setReleased] = useState(false);
  const [sanitizedWish, setSanitizedWish] = useState("");

  const handleRelease = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWish = DOMPurify.sanitize(wish.trim());
    if (!cleanWish) return;
    
    setSanitizedWish(cleanWish);
    setReleased(true);
    setTimeout(() => {
      setReleased(false);
      setWish("");
    }, 6000);
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center p-6 py-32 bg-vesak-base z-30 overflow-hidden">
      <SkeletonLanternParticles />
      <StringLights />
      {/* Ambient background rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none scale-y-50 blur-[2px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-vesak-gold/10 rounded-full pointer-events-none scale-y-50 blur-[1px]" />
    
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        className="max-w-3xl w-full text-center relative z-20 bg-white/[0.02] p-8 md:p-16 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] group"
      >
        <CornerFrame className="absolute top-6 left-6 w-8 h-8 text-vesak-gold/30 rotate-0 group-hover:text-vesak-gold/60 transition-colors" />
        <CornerFrame className="absolute top-6 right-6 w-8 h-8 text-vesak-gold/30 rotate-90 group-hover:text-vesak-gold/60 transition-colors" />
        <CornerFrame className="absolute bottom-6 right-6 w-8 h-8 text-vesak-gold/30 rotate-180 group-hover:text-vesak-gold/60 transition-colors" />
        <CornerFrame className="absolute bottom-6 left-6 w-8 h-8 text-vesak-gold/30 -rotate-90 group-hover:text-vesak-gold/60 transition-colors" />
        
        <ClayLamp className="w-16 h-16 text-vesak-gold/40 mx-auto mb-8 drop-shadow-lg" />

        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Release a Wish</h2>
        <p className="text-slate-400 mb-12 font-sans max-w-md mx-auto text-base md:text-lg leading-relaxed">
          Light your own digital lantern. Send a wish of peace or compassion to the night sky.
        </p>

        <form onSubmit={handleRelease} className="relative z-20 max-w-lg mx-auto w-full">
          <input
            type="text"
            required
            maxLength={120}
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            disabled={released}
            placeholder="Write your wish (max 120 chars)..."
            className="w-full bg-black/40 border border-white/10 rounded-full px-6 py-4 md:px-8 md:py-5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-vesak-gold/50 transition-all font-sans text-base md:text-lg mb-8 backdrop-blur-md shadow-inner"
          />
          <button
            type="submit"
            disabled={released || !wish.trim()}
            className="px-8 py-3 md:px-10 md:py-4 bg-gradient-to-b from-yellow-300 to-yellow-500 text-vesak-base rounded-full font-medium tracking-wider hover:from-yellow-200 hover:to-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(253,224,71,0.3)] hover:shadow-[0_0_30px_rgba(253,224,71,0.5)] transform hover:-translate-y-1 w-full md:w-auto"
          >
            {released ? "Releasing into the night..." : "Release Lantern"}
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {released && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], y: -800, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 7, ease: "easeOut" }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none w-full max-w-md"
          >
            <LanternAsset color="gold" className="w-24 h-60 md:w-32 md:h-80 relative z-20" interactive={false} />
            <div className="absolute inset-x-0 bottom-0 h-[200px] pointer-events-none z-10">
              <EmberExplosion active={true} />
            </div>
            
            {/* Added highlight decorations when released */}
            <motion.div 
               className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-vesak-gold/15 blur-[50px] mix-blend-screen z-0 pointer-events-none"
               animate={{ scale: [1, 2, 2.5], opacity: [1, 0.5, 0] }}
               transition={{ duration: 4, ease: "easeOut" }}
            />
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-[40%] left-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(253,224,71,0.8)] z-10 pointer-events-none"
                initial={{ 
                  x: 0, y: 0, scale: 1, opacity: 1 
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 400, 
                  y: ((Math.random() - 0.5) * 400) - Math.random() * 200,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  ease: "easeOut",
                  delay: Math.random() * 0.3
                }}
              />
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 md:mt-20 px-4 py-4 md:px-8 md:py-6 bg-white/[0.05] backdrop-blur-md rounded-2xl border border-vesak-gold/40 shadow-[0_0_50px_10px_rgba(253,224,71,0.3)] max-w-[90%] mx-auto text-center relative overflow-hidden z-30"
            >
              <div className="absolute inset-0 bg-vesak-gold/10 mix-blend-screen animate-pulse pointer-events-none" />
              <p className="relative text-vesak-gold font-serif text-lg md:text-xl italic tracking-wide break-words whitespace-pre-wrap drop-shadow-md z-10">{sanitizedWish}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
