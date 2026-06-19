import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, TrendingUp, X } from 'lucide-react';
import { Magnetic } from '@/components/ui/Magnetic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  code: string;
  demo: string;
  featured?: boolean;
  impact?: string;
  metrics?: { label: string; value: string }[];
}

const projects: Project[] = [
  {
    title: "Bus Pass Management System",
    description:
      "Digital bus pass platform with real-time generation, verification, and renewal. Built with Firebase and React.",
    longDescription:
      "A comprehensive digital bus pass platform solving student transportation bottlenecks. Features instant ticket/pass generation, admin approval queues, QR-based verification, and automated renewal reminders. Integrated with Firebase for secure, real-time Firestore database updates and user authentication.",
    tags: ["React", "Firebase", "Firestore", "Authentication"],
    color: "var(--accent-cyan)",
    code: "#",
    demo: "https://buss-passfinal-chi.vercel.app/",
    featured: true,
    impact: "Digitized pass management for 1000+ campus students",
    metrics: [
      { label: "Active Users", value: "1,000+" },
      { label: "Verification Time", value: "< 2s" },
      { label: "Admin Queue Load", value: "-80%" }
    ]
  },
  {
    title: "Campus Reporting Portal",
    description:
      "Real-time issue tracking system built during Buildverse Hackathon. Features status logs and Socket.io alerts.",
    longDescription:
      "A real-time complaint filing and monitoring dashboard developed under high pressure during the Buildverse Hackathon. It features socket-based messaging, enabling instant issue reporting to maintenance, active status updates for reporters, and admin analysis panels to filter issues by campus department.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    color: "var(--accent-orange)",
    code: "#",
    demo: "",
    featured: true,
    impact: "Created in 24 hours at Buildverse Hackathon",
    metrics: [
      { label: "Response Delay", value: "Real-time" },
      { label: "Build Time", value: "24 Hours" },
      { label: "Database Ops", value: "Mongoose" }
    ]
  },
  {
    title: "Roadway Recovery Routing",
    description:
      "Power restoration recovery map leveraging Dijkstra's algorithm to optimize power grid repairs.",
    longDescription:
      "An intelligent disaster recovery system designed to map substation grids and calculate optimized repair routes post-storm. Utilizes Dijkstra's network routing algorithms paired with GIS data visualizations to help utility trucks navigate around blocked pathways and prioritize crucial grid segments.",
    tags: ["Python", "GIS", "Algorithms", "NetworkX"],
    color: "var(--accent-lime)",
    code: "#",
    demo: "",
    featured: false,
    impact: "Calculates optimized pathways in milliseconds",
    metrics: [
      { label: "Calculation Speed", value: "< 12ms" },
      { label: "Algorithm Accuracy", value: "100%" },
      { label: "Language Stack", value: "Python" }
    ]
  },
  {
    title: "Fitness AI Recommendation",
    description:
      "AI recommendation engine for custom workouts and diet planning. Developed for Smart India Hackathon.",
    longDescription:
      "An advanced analytics engine created for the Smart India Hackathon. It processes user metrics (age, heart rate targets, lifestyle, allergies) to compile tailored cardiovascular/strength training agendas and precise nutritional balance suggestions using predictive profiling.",
    tags: ["AI", "Python", "Machine Learning", "Data Analytics"],
    color: "var(--accent-pink)",
    code: "https://github.com/akhilesh-reddy2005/SIH_Hackathon.git",
    demo: "",
    featured: true,
    impact: "Engineered for Smart India Hackathon (SIH)",
    metrics: [
      { label: "Accuracy", value: "92.4%" },
      { label: "Plan Compilation", value: "Instant" },
      { label: "Target Audience", value: "Nationwide" }
    ]
  },
  {
    title: "Desi Etsy Marketplace",
    description:
      "A multi-role e-commerce marketplace connecting local artisans with customers through a seamless online shopping experience.",
    longDescription:
      "Developed a full-featured artisan marketplace inspired by Etsy, enabling local sellers to showcase and sell handmade products. Implemented role-based authentication for customers, artisans, and administrators, along with product management, shopping cart, order tracking, and admin moderation features. Built a responsive and scalable frontend using React, TypeScript, and Tailwind CSS with efficient state management through Context API.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Context API",
      "React Router",
      "Vite"
    ],
    color: "yellow",
    code: "https://github.com/akhilesh-reddy2005/Infotact-Project-",
    demo: "#",
    featured: true,
    impact: "Empowered local artisans through a scalable digital marketplace platform",
    metrics: [
      { label: "User Roles", value: "3" },
      { label: "Core Modules", value: "10+" },
      { label: "Responsive Pages", value: "15+" }
    ]
  },
  {
    title: "Shinex Seeds Portfolio",
    description:
      "Optimized company portfolio and CSR showcase featuring automatic email responders and high SEO rank.",
    longDescription:
      "A fast, responsive corporate website spotlighting seed catalogs, Corporate Social Responsibility initiatives, and farming statistics. Fully optimized for search engine crawl indices (high SEO visibility score) and fitted with background node mail triggers for client inquiries.",
    tags: ["React", "CSS", "SEO", "EmailJS"],
    color: "var(--accent-cyan)",
    code: "#",
    demo: "#",
    featured: false,
    impact: "Improved landing page load speeds and SEO indexing",
    metrics: [
      { label: "Lighthouse Performance", value: "98+" },
      { label: "SEO Score", value: "100/100" },
      { label: "Inquiry Leads", value: "+40%" }
    ]
  },
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  // Lock scroll on overlay open
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  // Focus trap implementation
  useEffect(() => {
    if (!selectedProject || !drawerRef.current) return;

    const focusable = drawerRef.current.querySelectorAll(
      'button, a, input, select, textarea, [tabindex="0"]'
    );
    if (focusable.length === 0) return;

    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);
    setTimeout(() => first.focus(), 80); // shift focus into panel

    return () => {
      window.removeEventListener('keydown', handleTabKey);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 border-t-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-mono-custom font-bold uppercase text-[var(--accent-lime)] text-xs px-3 py-1 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] neo-shadow inline-block mb-4">
            <Star className="w-3.5 h-3.5 inline mr-1 text-black fill-black" />
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-[var(--text-primary)] mb-6">
            Projects & Creations
          </h2>
          <p className="font-mono-custom text-sm text-[var(--text-primary)]/80 max-w-2xl mx-auto uppercase">
            [ Code integrations, algorithms, and real-world deployments. Click a card to read full specification reports. ]
          </p>
        </div>

        {/* Featured Projects - Large Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="neo-card neo-card-hover p-6 md:p-8 flex flex-col justify-between min-h-[320px] cursor-pointer group"
            >
              <div>
                {/* Top color tag */}
                <div
                  className="h-3 w-16 border-[2px] border-[var(--border-primary)] mb-6 neo-shadow transition-all duration-300 group-hover:w-28"
                  style={{ backgroundColor: project.color }}
                />

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-display font-black text-[var(--text-primary)] mb-3 uppercase tracking-tight">
                  {project.title}
                </h3>

                {project.impact && (
                  <div className="flex items-center gap-1.5 mb-4 text-[var(--text-primary)] font-mono-custom text-xs font-bold uppercase">
                    <TrendingUp className="w-4 h-4 text-[var(--text-primary)] stroke-[2.5]" />
                    {project.impact}
                  </div>
                )}

                <p className="text-sm text-[var(--text-primary)]/85 leading-relaxed font-medium mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t-[2px] border-[var(--border-primary)] border-dashed">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] font-mono-custom text-[10px] font-bold uppercase text-[var(--text-primary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects - Smaller Grid */}
        {otherProjects.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h3 className="text-lg font-mono-custom font-black uppercase text-[var(--text-primary)] flex items-center gap-2">
                <span>[ OTHER RELEASES ]</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  className="neo-card neo-card-hover p-6 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Top color tag */}
                    <div
                      className="h-2 w-10 border-[2px] border-[var(--border-primary)] mb-4 neo-shadow transition-all duration-300 group-hover:w-20"
                      style={{ backgroundColor: project.color }}
                    />
                    <h3 className="text-lg font-display font-black text-[var(--text-primary)] mb-2 uppercase">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--text-primary)]/80 leading-relaxed font-semibold mb-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t-[2px] border-[var(--border-primary)] border-dashed">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] font-mono-custom text-[9px] font-bold uppercase text-[var(--text-primary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Slide-in Overlay & Specification Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Panel Drawer Container */}
            <motion.div
              ref={drawerRef}
              initial={prefersReducedMotion ? { x: 0 } : { x: '100%' }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? { x: 0 } : { x: '100%' }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 24, restDelta: 0.5 }}
              className="relative w-full max-w-lg md:max-w-xl h-full border-l-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-text"
              style={{ borderRadius: '0px' }}
            >
              {/* Drawer Content Area */}
              <div>
                {/* Header controls */}
                <div className="flex items-center justify-between border-b-[3px] border-[var(--border-primary)] pb-4 mb-6">
                  <span className="font-mono-custom text-xs font-black uppercase text-[var(--text-primary)]">
                    [ SPECIFICATION REPORT ]
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close panel"
                    className="p-1.5 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] hover:bg-[var(--text-primary)]/10 text-[var(--text-primary)] transition-all duration-75 active:translate-x-0.5 active:translate-y-0.5"
                    style={{ borderRadius: '0px' }}
                  >
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Section tag badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="inline-block w-4 h-4 border-[2px] border-[var(--border-primary)]"
                    style={{ backgroundColor: selectedProject.color }}
                  />
                  <span className="font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)]">
                    Active Catalog
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-display font-black text-[var(--text-primary)] mb-4 uppercase leading-none">
                  {selectedProject.title}
                </h3>

                {/* Impact Statement */}
                {selectedProject.impact && (
                  <div
                    className="border-[2px] border-[var(--border-primary)] p-4 mb-6 neo-shadow font-mono-custom text-xs uppercase font-bold text-black"
                    style={{ backgroundColor: selectedProject.color }}
                  >
                    🚀 IMPACT: {selectedProject.impact}
                  </div>
                )}

                {/* Full Description */}
                <div className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed font-semibold mb-8">
                  <p>{selectedProject.longDescription}</p>
                </div>

                {/* Technical Stack Badges */}
                <div className="mb-8">
                  <h4 className="font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)] mb-3">
                    [ COMPILED LIBRARIES ]
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] text-xs font-mono-custom font-bold uppercase text-[var(--text-primary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Analytical Metrics */}
                {selectedProject.metrics && (
                  <div className="mb-6">
                    <h4 className="font-mono-custom text-xs font-bold uppercase text-[var(--text-primary)] mb-3">
                      [ PERFORMANCE INDEX ]
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProject.metrics.map((m) => (
                        <div key={m.label} className="border-[2px] border-[var(--border-primary)] p-3 bg-[var(--text-primary)]/5">
                          <div className="font-display font-black text-sm md:text-base text-[var(--text-primary)]">{m.value}</div>
                          <div className="font-mono-custom text-[8px] md:text-[9px] uppercase font-bold text-[var(--text-primary)]/75 mt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t-[3px] border-[var(--border-primary)] border-dashed flex gap-4 flex-wrap">
                {selectedProject.code && selectedProject.code !== "#" && (
                  <Magnetic>
                    <a
                      href={selectedProject.code}
                      target="_blank"
                      rel="noreferrer"
                      className="neo-btn px-4 py-3 text-xs bg-[var(--accent-lime)] text-black border-[3px]"
                    >
                      <Github className="mr-1.5 h-4 w-4 stroke-[2.5]" />
                      Repository Code
                    </a>
                  </Magnetic>
                )}

                {selectedProject.demo && selectedProject.demo !== "#" && (
                  <Magnetic>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="neo-btn px-4 py-3 text-xs bg-[var(--accent-orange)] text-black border-[3px]"
                    >
                      <ExternalLink className="mr-1.5 h-4 w-4 stroke-[2.5]" />
                      Live Deployment
                    </a>
                  </Magnetic>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
