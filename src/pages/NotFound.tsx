import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Magnetic } from '@/components/ui/Magnetic';

const NotFound = () => {
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-canvas)] graph-grid">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 max-w-lg neo-card p-8 md:p-12 text-center"
      >
        {/* Warning Icon Frame */}
        <div 
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-[3px] border-[var(--border-primary)] neo-shadow text-black"
          style={{ backgroundColor: 'var(--accent-orange)', boxShadow: '4px 4px 0px var(--border-primary)' }}
        >
          <AlertTriangle className="h-8 w-8 stroke-[2.5]" />
        </div>

        {/* 404 Title */}
        <h1 className="mb-4 text-7xl font-display font-black text-[var(--text-primary)] uppercase tracking-tighter">
          404
        </h1>
        <p className="mb-2 text-xl md:text-2xl font-mono-custom font-bold text-[var(--text-primary)] uppercase">
          [ PAGE NOT FOUND ]
        </p>
        <p className="mb-8 text-sm text-[var(--text-primary)]/80 font-medium leading-relaxed">
          The page you are looking for does not exist or has been shifted.
        </p>

        {/* Back to Home CTA */}
        <div className="inline-block">
          <Magnetic>
            <Link
              to="/"
              className="neo-btn px-6 py-4 text-xs bg-[var(--accent-lime)] text-black border-[3px] flex items-center gap-2"
            >
              <Home className="h-4 w-4 stroke-[2.5]" />
              BACK TO HOME SYSTEM
            </Link>
          </Magnetic>
        </div>

        {/* Requested Path Logs */}
        <p className="mt-8 font-mono-custom text-[10px] text-[var(--text-primary)]/60 uppercase">
          Requested path: <span className="underline select-all">{location.pathname}</span>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
