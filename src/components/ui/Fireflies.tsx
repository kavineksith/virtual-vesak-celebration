import { useEffect, useRef, memo } from "react";

export const Fireflies = memo(function Fireflies({ count = 50 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number; dAlpha: number, history: {x: number, y: number}[] }[] = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          alpha: Math.random(),
          dAlpha: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
          history: []
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > 20) {
          p.history.shift();
        }

        if (p.history.length > 1) {
           ctx.beginPath();
           ctx.moveTo(p.history[0].x, p.history[0].y);
           for (let i = 1; i < p.history.length; i++) {
               ctx.lineTo(p.history[i].x, p.history[i].y);
           }
           ctx.strokeStyle = `rgba(217, 249, 157, ${p.alpha * 0.15})`; // soft green-yellow
           ctx.lineWidth = p.r * 2;
           ctx.lineCap = "round";
           ctx.lineJoin = "round";
           ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        ctx.fillStyle = `rgba(253, 224, 71, ${p.alpha})`; // gold
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(217, 249, 157, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;

        // gentle wandering
        p.dx += (Math.random() - 0.5) * 0.08;
        p.dy += (Math.random() - 0.5) * 0.08;

        // speed limit
        const speed = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        if (speed > 1) {
            p.dx = (p.dx / speed) * 1;
            p.dy = (p.dy / speed) * 1;
        }

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
          p.y = canvas.height - 10;
          p.alpha = 0;
          p.history = [];
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
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 w-full h-full mix-blend-screen"
    />
  );
});
