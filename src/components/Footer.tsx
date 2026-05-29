import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="relative bg-vesak-base pt-32 pb-12 overflow-hidden border-t border-white/5">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-vesak-gold/10 blur-[120px] rounded-[100%] pointer-events-none transform -translate-y-1/2" />
       
       <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
         >
           <h2 className="text-3xl font-serif text-white mb-4 glowing-text">May all beings be happy and peaceful.</h2>
           <div className="w-12 h-[1px] bg-vesak-gold/50 mx-auto my-8" />
           <p className="text-sm text-slate-500 font-sans tracking-widest uppercase">
             Virtual Vesak Celebration
           </p>
         </motion.div>
       </div>
    </footer>
  );
}
