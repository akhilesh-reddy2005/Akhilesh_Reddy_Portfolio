import { motion } from 'framer-motion';
import resumePDF from "@/assets/Akhilesh_Resume.pdf";
import {
  Github,
  Linkedin,
  Instagram,
  Download,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import avatar from '@/assets/avatar.png';
import { Magnetic } from '@/components/ui/Magnetic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12"
        >
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left max-w-3xl">
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border-[2px] border-[var(--border-primary)] bg-[var(--accent-lime)] text-black font-mono-custom text-xs font-bold uppercase neo-shadow">
                <Sparkles className="h-3.5 w-3.5 fill-black" />
                <span className="inline-block w-2 h-2 bg-black rounded-full animate-ping"></span>
                Open to Opportunities
              </div>
            </motion.div>

            {/* Giant fluid typography heading */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(2.5rem,7vw,5.5rem)] font-display font-black leading-[0.9] text-[var(--text-primary)] uppercase tracking-tighter mb-6"
            >
              Hi, I'm <br className="hidden md:block" />
              <span className="bg-[var(--accent-pink)] text-black px-4 py-1.5 inline-block border-[3px] border-[var(--border-primary)] neo-shadow mt-2">
                Akhilesh Reddy
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="font-mono-custom text-lg md:text-xl font-bold text-[var(--text-primary)] mb-5 uppercase tracking-wide"
            >
              [ Full-Stack Developer & Problem Solver ]
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-[var(--text-primary)]/80 mb-8 leading-relaxed max-w-2xl font-medium"
            >
              I build scalable web applications and intelligent digital solutions that combine performance, innovation, and exceptional user experiences. Specialized in full-stack development, cloud technologies, and AI-powered systems.
            </motion.p>

            {/* CTAs with Magnetic Pull */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-5 justify-center lg:justify-start mb-8"
            >
              <Magnetic>
                <a
                  href={resumePDF}
                  download="Akhilesh_Resume.pdf"
                  className="neo-btn px-6 py-4 text-sm bg-[var(--accent-lime)] text-black flex items-center gap-2 border-[3px]"
                >
                  <Download className="h-4 w-4 stroke-[2.5]" />
                  Download Resume
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="#contact"
                  className="neo-btn px-6 py-4 text-sm bg-[var(--bg-canvas)] text-[var(--text-primary)] flex items-center gap-2 border-[3px]"
                >
                  Get In Touch
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </a>
              </Magnetic>
            </motion.div>

            {/* Social Links with Magnetic attraction */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start items-center"
            >
              {[
                { icon: Github, href: 'https://github.com/akhilesh-reddy2005', label: 'GitHub', color: 'var(--accent-cyan)' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/akhilesh-reddy-612580292/', label: 'LinkedIn', color: 'var(--accent-pink)' },
                { icon: Instagram, href: 'https://www.instagram.com/akhilesh_reddy1107', label: 'Instagram', color: 'var(--accent-orange)' },
              ].map(({ icon: Icon, href, label, color }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="neo-btn w-12 h-12 flex items-center justify-center border-[3px]"
                    style={{ backgroundColor: color, color: '#0B0B0B' }}
                  >
                    <Icon className="h-5 w-5 stroke-[2.5]" />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </div>

          {/* Right Avatar Card in Offset Frame */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex justify-center lg:justify-end select-none"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Offset Background Block */}
              <div className="absolute inset-0 border-[3px] border-[var(--border-primary)] bg-[var(--accent-orange)] translate-x-4 translate-y-4" />

              {/* Core Avatar Frame */}
              <div className="absolute inset-0 border-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] overflow-hidden">
                <img
                  src={avatar}
                  alt="Akhilesh Reddy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Decorative Corner Labels */}
              <div className="absolute -top-3.5 -left-3.5 bg-[var(--text-primary)] text-[var(--bg-canvas)] font-mono-custom text-[9px] font-bold px-2 py-0.5 border-[2px] border-[var(--border-primary)]">
                Akhilesh Reddy
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
