import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-lg rounded-2xl border border-border bg-muted/40 p-10 text-center backdrop-blur-md shadow-glow"
      >
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
          <AlertTriangle className="h-8 w-8 text-white" />
        </div>

        {/* Text */}
        <h1 className="mb-2 text-6xl font-display font-bold gradient-text">
          404
        </h1>
        <p className="mb-2 text-2xl font-semibold">
          Page Not Found
        </p>
        <p className="mb-8 text-muted-foreground">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-medium text-white transition hover:shadow-glow"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Path info (subtle dev touch) */}
        <p className="mt-6 text-xs text-muted-foreground">
          Requested path: <span className="font-mono">{location.pathname}</span>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
