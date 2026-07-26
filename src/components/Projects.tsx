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
    title: "RoleLens",
    description:
      "AI-powered resume screening and job role recommendation platform with personalized career insights.",
    longDescription:
      "RoleLens is a full-stack AI application that analyzes resumes and recommends the most suitable job roles using Google's Gemini AI. Users can securely upload PDF or DOCX resumes, receive ATS and resume scores, discover best-fit roles, identify missing skills, and get a personalized career roadmap. The platform includes JWT authentication, analysis history, a modern dashboard, and Supabase-powered data storage, providing an end-to-end experience for job seekers.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "Gemini AI",
      "JWT",
      "Vercel",
      "Render"
    ],
    color: "var(--accent-blue)",
    code: "https://github.com/akhilesh-reddy2005/RoleLens",
    demo: "https://your-vercel-url.vercel.app",
    featured: true,
    impact: "AI-powered career guidance with secure resume analysis and personalized recommendations.",
    metrics: [
      { label: "Authentication", value: "JWT + Bcrypt" },
      { label: "AI Analysis", value: "Gemini AI" },
      { label: "Database", value: "Supabase" },
      { label: "Deployment", value: "Vercel + Render" }
    ]
  },
  {
    title: "Phishing Tracker Chrome Extension",
    description:
      "AI-powered Chrome extension that detects phishing websites in real time using local heuristics and Google Safe Browsing API.",
    longDescription:
      "Phishing Tracker is a browser security extension built to protect users from malicious and phishing websites while browsing. It continuously monitors visited URLs using a combination of custom heuristic analysis and the Google Safe Browsing API to identify potential threats in real time. The extension provides instant visual alerts, a modern popup dashboard with scan results, a searchable threat history, manual website scanning, and threat reporting features, helping users browse the web more securely.",
    tags: [
      "TypeScript",
      "JavaScript",
      "Chrome Extension",
      "Google Safe Browsing API",
      "HTML",
      "CSS",
      "Web Security",
      "Browser APIs"
    ],
    color: "var(--accent-red)",
    code: "https://github.com/akhilesh-reddy2005/phishingtracker_extensionn",
    demo: "",
    featured: true,
    impact: "Enhances web security by detecting phishing websites in real time and alerting users before they interact with malicious content.",
    metrics: [
      { label: "Threat Detection", value: "Real-time" },
      { label: "Security API", value: "Google Safe Browsing" },
      { label: "Platform", value: "Chrome Extension" },
      { label: "Language", value: "TypeScript" }
    ]
  },
  {
    title: "AI Fitness & Nutrition Management",
    description:
      "Full-stack fitness and nutrition management platform with AI-powered coaching, meal tracking, and personalized health insights.",
    longDescription:
      "Developed during the Smart India Hackathon (SIH), this full-stack web application helps users monitor their fitness journey through intelligent nutrition tracking and AI-assisted coaching. The platform features secure Firebase Authentication, personalized dashboards, meal logging, daily macronutrient tracking, nutrition analytics, and an AI fitness chatbot that provides customized workout and dietary recommendations. Built with React.js, Node.js, Express.js, and Firebase, the application delivers a seamless and scalable health management experience.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "Firebase",
      "Firestore",
      "JavaScript",
      "REST API",
      "AI Chatbot",
      "Authentication",
      "CSS3"
    ],
    color: "var(--accent-green)",
    code: "https://github.com/akhilesh-reddy2005/SIH_Hackathon",
    demo: "",
    featured: true,
    impact: "Developed as a Smart India Hackathon project to promote healthier lifestyles through AI-driven fitness coaching and personalized nutrition management.",
    metrics: [
      { label: "Authentication", value: "Firebase Auth" },
      { label: "Database", value: "Firestore" },
      { label: "AI Feature", value: "Fitness Coach" },
      { label: "Platform", value: "Full Stack Web App" }
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
