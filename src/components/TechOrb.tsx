import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const TechOrb = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.35;

    const animate = () => {
      time += 0.005;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw orbiting particles
      const particleCount = 40;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time;
        const orbitRadius = radius * (0.6 + Math.sin(time + i) * 0.2);
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius * 0.5;

        const size = 1 + Math.sin(time + i * 0.1) * 0.5;
        const alpha = 0.6 + Math.sin(time + i * 0.05) * 0.4;

        ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw pulsing core
      const coreSize = radius * 0.15;
      const corePulse = Math.sin(time * 1.5) * 0.3 + 0.7;
      
      // Glow effect
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, coreSize * 2
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core circle
      ctx.fillStyle = `rgba(168, 85, 247, ${corePulse})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * corePulse, 0, Math.PI * 2);
      ctx.fill();

      // Inner bright core
      ctx.fillStyle = 'rgba(196, 181, 253, 0.9)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * corePulse * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Draw connecting lines
      for (let i = 0; i < particleCount; i += 4) {
        const angle1 = (i / particleCount) * Math.PI * 2 + time;
        const orbitRadius1 = radius * (0.6 + Math.sin(time + i) * 0.2);
        const x1 = centerX + Math.cos(angle1) * orbitRadius1;
        const y1 = centerY + Math.sin(angle1) * orbitRadius1 * 0.5;

        ctx.strokeStyle = `rgba(59, 130, 246, 0.2)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
      />
    </motion.div>
  );
};
