import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface Sticker {
  id: string;
  text: string;
  color: string;
  x: string; // initial left position (%)
  y: string; // initial top position (%)
  rotate: number; // initial rotate offset (degrees)
}

const STICKERS: Sticker[] = [
  { id: 'raw', text: '⚡ 100% RAW', color: 'var(--accent-lime)', x: '8%', y: '18%', rotate: -8 },
  { id: 'templates', text: '🚫 NO TEMPLATES', color: 'var(--accent-orange)', x: '62%', y: '12%', rotate: 12 },
  { id: 'brutalist', text: '📦 NEO-BRUTALIST', color: 'var(--accent-cyan)', x: '35%', y: '35%', rotate: -5 },
  { id: 'mern', text: '💻 MERN STACK', color: 'var(--accent-pink)', x: '12%', y: '60%', rotate: 6 },
  { id: 'cloud', text: '☁️ CLOUD DEVOPS', color: 'var(--accent-lime)', x: '68%', y: '55%', rotate: -15 },
  { id: 'sih', text: '🏆 SIH HACKATHON WINNER', color: 'var(--accent-orange)', x: '38%', y: '72%', rotate: 8 },
  { id: 'jain', text: '🎓 JAIN UNIVERSITY', color: 'var(--accent-cyan)', x: '45%', y: '10%', rotate: -6 },
  { id: 'react', text: '⚛️ REACT / TS / FRAMER', color: 'var(--accent-pink)', x: '75%', y: '32%', rotate: 14 },
];

interface StickerSandboxProps {
  resetKey: number;
  onResetStickers: () => void;
  showGrid: boolean;
  setShowGrid: (g: boolean) => void;
}

export const StickerSandbox: React.FC<StickerSandboxProps> = ({
  resetKey,
  onResetStickers,
  showGrid,
  setShowGrid,
}) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="py-24 border-t-[3px] border-b-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="font-mono-custom font-bold uppercase text-[var(--accent-pink)] text-xs px-3 py-1 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] neo-shadow inline-block mb-4">
            Interactive Playground
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-[var(--text-primary)]">
            Sticker Sandbox
          </h2>
          <p className="font-mono-custom text-xs text-[var(--text-primary)]/70 max-w-xl mx-auto uppercase">
            [ Grab, move, and scatter the badges below to design the page. Use the control buttons below to toggle grid lines or reset. ]
          </p>
        </div>

        {/* Sandbox Local Controls Row */}
        <div className="flex justify-between items-center mb-3 max-w-5xl mx-auto">
          <span className="font-mono-custom text-[10px] text-[var(--text-primary)]/50 uppercase">
            [ Sandbox Board: DRAG_ACTIVE ]
          </span>
          <div className="flex gap-2">
            {/* Grid Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="px-2.5 py-1 border-[2px] border-[var(--border-primary)] font-mono-custom font-bold uppercase text-[9px] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--text-primary)]/10"
              style={{ borderRadius: '0px' }}
            >
              GRID: {showGrid ? 'VISIBLE' : 'HIDDEN'}
            </button>
            {/* Reset */}
            <button
              onClick={onResetStickers}
              className="px-2.5 py-1 border-[2px] border-[var(--border-primary)] font-mono-custom font-bold uppercase text-[9px] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--text-primary)]/10 active:translate-x-0.5 active:translate-y-0.5"
              style={{ borderRadius: '0px' }}
            >
              RESET BADGES
            </button>
          </div>
        </div>

        {/* Sandbox Canvas */}
        <div 
          ref={constraintsRef} 
          className="relative w-full h-[400px] border-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] neo-shadow overflow-hidden select-none cursor-grab active:cursor-grabbing"
        >
          {/* Faint local grid overlay */}
          <div className="absolute inset-0 graph-grid opacity-20 pointer-events-none" />

          {/* Draggable badges */}
          {STICKERS.map((sticker) => {
            const motionProps = prefersReducedMotion ? {} : {
              drag: true,
              dragConstraints: constraintsRef,
              dragElastic: 0.15,
              whileHover: { scale: 1.05, rotate: sticker.rotate * 1.2, zIndex: 10 },
              whileDrag: { scale: 1.1, rotate: sticker.rotate - 6, zIndex: 30 }
            };

            return (
              <motion.div
                key={`${sticker.id}-${resetKey}`}
                {...motionProps}
                className="absolute px-4 py-2.5 border-[3px] border-[var(--border-primary)] font-mono-custom font-bold text-xs md:text-sm select-none"
                style={{
                  backgroundColor: sticker.color,
                  color: '#0B0B0B',
                  left: sticker.x,
                  top: sticker.y,
                  rotate: sticker.rotate,
                  boxShadow: '4px 4px 0px var(--border-primary)',
                  cursor: 'grab'
                }}
              >
                {sticker.text}
              </motion.div>
            );
          })}

          <div className="absolute bottom-3 left-3 font-mono-custom text-[9px] text-[var(--text-primary)]/40 pointer-events-none">
            [ STATUS: STICKER_SANDBOX_ACTIVE ]
          </div>
        </div>
      </div>
    </section>
  );
};
