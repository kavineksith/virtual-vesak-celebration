import { useEffect, useRef } from "react";

export function EmberExplosion({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number; life: number; color: string }[] = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    const colors = ["#FDE047", "#F59E0B", "#EF4444", "#FFFBEB"];

    const emitParticles = () => {
        const x = canvas.width / 2;
        const y = canvas.height * 0.7; // emit roughly from the start of the lantern rise
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: x + (Math.random() - 0.5) * 80,
                y: y + (Math.random() - 0.5) * 40,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 6,
                dy: -(Math.random() * 8 + 3), // shoot upwards
                alpha: 1,
                life: Math.random() * 0.015 + 0.005,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        
        ctx.shadowBlur = 10 + Math.random() * 5;
        ctx.shadowColor = p.color;
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        p.x += p.dx;
        p.dy -= 0.08; // upward acceleration for embers
        p.dx += (Math.random() - 0.5) * 1; // sideways wind flutter
        
        // slow down horizontal speed slightly
        p.dx *= 0.95;

        p.y += p.dy;
        p.alpha -= p.life;

        if (p.alpha <= 0) {
           particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resize);
    resize();
    drawParticles();

    if (active) {
       emitParticles();
       // emit continuously for a brief moment to create a blast
       const interval = setInterval(emitParticles, 150);
       setTimeout(() => clearInterval(interval), 1200);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 w-full h-full mix-blend-screen"
    />
  );
}
