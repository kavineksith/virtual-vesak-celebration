import { useEffect, useRef } from "react";

export function Particles({ count = 100, speed = 0.5, color = "rgba(253, 224, 71, 0.4)" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number; dAlpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * speed,
          dy: (Math.random() - 0.5) * speed - speed * 0.5, // slightly upwards
          alpha: Math.random(),
          dAlpha: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        ctx.fillStyle = color.replace(/[\d\.]+\)$/g, `${p.alpha})`);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha += p.dAlpha;

        if (p.alpha <= 0) {
          p.alpha = 0;
          p.dAlpha *= -1;
        } else if (p.alpha >= 1) {
          p.alpha = 1;
          p.dAlpha *= -1;
        }

        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.alpha = 0;
          p.dAlpha = Math.abs(p.dAlpha);
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resize);
    resize();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 mix-blend-screen"
    />
  );
}
