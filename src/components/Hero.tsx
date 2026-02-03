import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Github,
  Linkedin,
  Instagram,
  Download,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import avatar from '@/assets/avatar.png';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 bg-transparent"
    >
      {/* Ambient dark glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center justify-between gap-14"
        >
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full
                         border border-white/10 bg-white/5
                         px-4 py-2 mb-5 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-white/70">
                Open to internships & entry-level SDE roles
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-display font-bold mb-5 text-white"
            >
              Hi, I’m{' '}
              <span className="gradient-text">Akhilesh Reddy</span> 👋
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/70 mb-6"
            >
              Full-Stack Developer · Cloud Enthusiast · AI Explorer
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/60 mb-8 max-w-2xl"
            >
              I build fast, scalable web applications using{' '}
              <span className="text-white font-medium">
                React, Node.js, Express, and MongoDB
              </span>
              . I also explore{' '}
              <span className="text-white font-medium">
                Google Cloud & AI
              </span>{' '}
              to create practical, real-world solutions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                asChild
              >
                <a href="/Akhilesh_Resume.pdf" download="Akhilesh_Resume.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>

              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-glow text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                asChild
              >
                <a href="#contact" className="flex items-center gap-2">
                  Get In Touch
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 mt-8 justify-center md:justify-start"
            >
              {[ 
                { icon: Github, href: 'https://github.com/akhilesh-reddy2005', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/akhilesh-reddy-612580292/', label: 'LinkedIn' },
                { icon: Instagram, href: 'https://www.instagram.com/akhilesh_reddy1107', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/5"
                  asChild
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex justify-center md:justify-end"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-2xl opacity-25" />
              <img
                src={avatar}
                alt="Akhilesh Reddy"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full
                           object-cover border border-white/10"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
