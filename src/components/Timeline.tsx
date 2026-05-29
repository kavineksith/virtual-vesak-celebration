import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CornerFrame, ClayLamp, TraditionalOrnament } from "./ui/Decorations";
import { StringLights } from "./ui/StringLights";

function FloatingDecoration({ children, offset, position, delay, scrollYProgress }: any) {
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, offset]);
    return (
       <motion.div style={{ y: yTransform }} className={`absolute pointer-events-none z-10 ${position}`}
           animate={{ y: [0, -15, 0], rotate: [-4, 4, -4] }}
           transition={{ duration: 6 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay }}
       >
         {children}
       </motion.div>
    );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const events = [
    { title: "The Birth", desc: "Prince Siddhartha was born in Lumbini, bringing hope to the world." },
    { title: "The Enlightenment", desc: "Attaining supreme wisdom under the Bodhi tree in Bodh Gaya." },
    { title: "The Passing", desc: "Entering Parinirvana, leaving behind a legacy of peace." }
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-vesak-dark relative overflow-hidden text-center md:text-left z-20">
      <StringLights />
      {/* Decorative ambient glows */}
      <div className="absolute left-0 top-1/4 w-64 md:w-96 h-64 md:h-96 bg-vesak-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-64 md:w-96 h-64 md:h-96 bg-vesak-blue/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Floating Paper-craft Decors filling empty space */}
        <FloatingDecoration offset={150} position="left-[2%] md:left-[5%] top-[15%]" delay={0} scrollYProgress={scrollYProgress}>
           <ClayLamp className="w-16 h-16 md:w-24 md:h-24 text-vesak-gold/40 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" />
        </FloatingDecoration>
        <FloatingDecoration offset={-100} position="right-[5%] md:right-[8%] top-[30%]" delay={1} scrollYProgress={scrollYProgress}>
           <TraditionalOrnament className="w-12 h-20 md:w-16 md:h-28 text-vesak-gold/20" />
        </FloatingDecoration>
        <FloatingDecoration offset={200} position="left-[5%] md:left-[12%] bottom-[25%]" delay={0.5} scrollYProgress={scrollYProgress}>
           <TraditionalOrnament className="w-10 h-16 md:w-14 md:h-24 text-vesak-gold/15" />
        </FloatingDecoration>
        <FloatingDecoration offset={-150} position="right-[2%] md:right-[5%] bottom-[15%]" delay={1.5} scrollYProgress={scrollYProgress}>
           <ClayLamp className="w-20 h-20 md:w-32 md:h-32 text-vesak-gold/20 drop-shadow-[0_0_15px_rgba(253,224,71,0.3)] blur-[1px]" />
        </FloatingDecoration>
        <FloatingDecoration offset={80} position="left-[35%] md:left-[40%] top-[45%]" delay={0.8} scrollYProgress={scrollYProgress}>
           <ClayLamp className="w-12 h-12 md:w-16 md:h-16 text-vesak-gold/10 blur-[2px]" />
        </FloatingDecoration>

        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-vesak-gold/30 to-transparent" />
        
        {events.map((event, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            key={index}
            className={`relative flex flex-col md:flex-row items-start md:items-center mb-24 md:mb-32 last:mb-0 group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Interactive Center Marker */}
            <div className="absolute left-[24px] md:left-1/2 w-4 h-4 rounded-full bg-vesak-dark border border-vesak-gold shadow-[0_0_15px_3px_rgba(253,224,71,0.5)] -translate-x-1/2 mt-8 md:mt-0 flex items-center justify-center group-hover:scale-150 group-hover:bg-vesak-gold transition-all duration-500 z-20">
               <div className="w-1.5 h-1.5 rounded-full bg-vesak-gold group-hover:bg-vesak-dark transition-colors duration-500" />
            </div>
            
            <div className={`pl-14 md:pl-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-20' : 'md:pr-20 text-left md:text-right'}`}>
              <div className="relative p-8 md:p-14 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden hover:border-vesak-gold/40 transition-all duration-500 cursor-default shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_0_rgba(253,224,71,0.15)]">
                {/* Ornate Corner Accents */}
                <CornerFrame className="absolute top-4 left-4 w-6 h-6 md:w-8 md:h-8 text-vesak-gold/20 rotate-0" />
                <CornerFrame className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 text-vesak-gold/20 rotate-90" />
                <CornerFrame className="absolute bottom-4 right-4 w-6 h-6 md:w-8 md:h-8 text-vesak-gold/20 rotate-180" />
                <CornerFrame className="absolute bottom-4 left-4 w-6 h-6 md:w-8 md:h-8 text-vesak-gold/20 -rotate-90" />
                
                {/* Background Decor */}
                <ClayLamp className={`w-24 h-24 md:w-32 md:h-32 text-vesak-gold/5 absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? '-left-6 md:-left-8' : '-right-6 md:-right-8'} pointer-events-none group-hover:text-vesak-gold/10 transition-colors duration-700 blur-[2px]`} />

                <h4 className="text-2xl md:text-4xl font-serif text-vesak-gold mb-3 md:mb-5 relative z-10">{event.title}</h4>
                <p className="text-slate-300 font-sans leading-relaxed text-base md:text-lg relative z-10">{event.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
