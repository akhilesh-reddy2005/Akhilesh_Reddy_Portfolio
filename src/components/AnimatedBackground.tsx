import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TechOrb } from '../TechOrb';

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  /* Mouse parallax */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* Network canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.strokeStyle = `rgba(56,189,248,${0.12 * (1 - d / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        ctx.fillStyle = 'rgba(226,232,240,0.45)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-[#05080f]"
      style={{ perspective: '1000px' }}
    >
      {/* Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        animate={{
          rotateX: mouse.y * 0.25,
          rotateY: -mouse.x * 0.25,
        }}
        transition={{ type: 'spring', stiffness: 40 }}
      />

      {/* Soft glows */}
      <motion.div
        className="absolute top-1/4 left-1/4 h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(37,99,235,0.4), transparent 70%)',
        }}
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(34,197,94,0.35), transparent 70%)',
        }}
        animate={{ x: -mouse.x, y: -mouse.y }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* Canvas network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* 🔥 REAL 3D OBJECT */}
      <TechOrb />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/85" />
    </div>
  );
};
