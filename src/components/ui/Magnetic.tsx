import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  range = 80,
  strength = 0.2,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || prefersReducedMotion) return;

      const { clientX, clientY } = e;
      const rect = ref.current.getBoundingClientRect();
      
      // Calculate center of element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Pull towards mouse coordinates by 20% (strength = 0.2)
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current?.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, range, strength]);

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};
