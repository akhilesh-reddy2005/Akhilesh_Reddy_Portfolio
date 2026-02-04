import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export const TechOrb = () => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 70, damping: 18 });
  const smoothY = useSpring(rotateY, { stiffness: 70, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
      rotateY.set(x);
      rotateX.set(-y);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [rotateX, rotateY]);

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Core Sphere */}
        <motion.div
          className="h-40 w-40 md:h-56 md:w-56 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.9), rgba(30,64,175,0.4), rgba(0,0,0,0.8))',
            boxShadow:
              '0 0 80px rgba(56,189,248,0.6), inset 0 0 40px rgba(255,255,255,0.2)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Energy Ring */}
        <motion.div
          className="absolute inset-[-25%] rounded-full border border-sky-400/30"
          style={{ transform: 'translateZ(40px)' }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Secondary Ring */}
        <motion.div
          className="absolute inset-[-40%] rounded-full border border-sky-300/20"
          style={{ transform: 'rotateX(70deg) translateZ(20px)' }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
};
