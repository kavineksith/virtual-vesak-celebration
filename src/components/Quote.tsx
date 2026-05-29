import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ClayLamp } from "./ui/Decorations";
import { LanternAsset } from "./ui/LanternAsset";

function FloatingLantern({ color, delay, position, scale, scrollYProgress }: any) {
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, -150 * scale]);
    return (
       <motion.div style={{ y: yTransform, scale }} className={`absolute pointer-events-none z-0 ${position} opacity-50 blur-[2px]`}
           animate={{ y: [0, -30, 0], x: [-15, 15, -15], rotate: [-3, 3, -3] }}
           transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
       >
         <LanternAsset color={color} interactive={false} />
       </motion.div>
    );
}

export function Quote() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 px-4 md:px-6 flex items-center justify-center overflow-hidden bg-vesak-dark z-20">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-vesak-gold/5 via-vesak-dark to-vesak-base opacity-70 pointer-events-none" />
      
      {/* Background Scattered Lanterns */}
      <FloatingLantern color="gold" delay={0.5} scale={0.5} position="top-[5%] left-[5%] md:left-[15%]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="white" delay={1.2} scale={0.4} position="top-[15%] right-[5%] md:right-[20%]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="orange" delay={2.1} scale={0.6} position="bottom-[10%] left-[10%] md:left-[25%]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="red" delay={0.8} scale={0.45} position="bottom-[20%] right-[10%] md:right-[15%]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="gold" delay={1.5} scale={0.55} position="top-[40%] left-[-5%] md:left-[2%]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="orange" delay={2.5} scale={0.35} position="top-[50%] right-[-5%] md:right-[3%]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="white" delay={0.3} scale={0.8} position="top-[30%] left-[20%] md:left-[35%] opacity-20 blur-[4px]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="gold" delay={1.8} scale={0.7} position="bottom-[35%] right-[20%] md:right-[35%] opacity-20 blur-[4px]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="red" delay={2.2} scale={0.4} position="bottom-[5%] left-[40%] opacity-30 blur-[3px]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="blue" delay={0.9} scale={0.5} position="top-[10%] left-[60%] opacity-30 blur-[3px]" scrollYProgress={scrollYProgress} />
      <FloatingLantern color="gold" delay={3.1} scale={0.6} position="bottom-[15%] right-[40%] opacity-40 blur-[2px]" scrollYProgress={scrollYProgress} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-auto text-center"
      >
        <div className="relative py-12 px-6 md:py-20 md:px-16 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-[2rem] md:rounded-[3rem] shadow-[0_4px_30px_rgba(0,0,0,0.1)] mx-2 md:mx-0">
          <ClayLamp className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 text-vesak-gold/80 drop-shadow-[0_0_15px_rgba(253,224,71,0.3)]" />
          
          <span className="text-vesak-gold/20 text-7xl md:text-9xl font-serif leading-none block absolute top-4 left-4 md:top-12 md:left-12 font-style-italic pointer-events-none">"</span>
          
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif text-slate-100 leading-snug md:leading-relaxed mb-6 md:mb-8 relative z-10 drop-shadow-lg max-w-3xl mx-auto pt-6 md:pt-8 font-light">
            Hatred is never appeased by hatred in this world; by non-hatred alone is hatred appeased. This is a law eternal.
          </h3>
          
          <div className="flex items-center justify-center gap-4 md:gap-6 relative z-10 opacity-80">
            <div className="w-10 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-vesak-gold/50" />
            <p className="text-vesak-gold font-sans tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-medium">
              Dhammapada
            </p>
            <div className="w-10 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-vesak-gold/50" />
          </div>
          
          <ClayLamp className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 text-vesak-gold/80 drop-shadow-[0_0_15px_rgba(253,224,71,0.3)]" />
        </div>
      </motion.div>
    </section>
  );
}
