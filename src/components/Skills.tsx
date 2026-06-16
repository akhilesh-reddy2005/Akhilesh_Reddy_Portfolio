import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Brain,
  Sparkles,
} from "lucide-react";
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    color: "var(--accent-lime)",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 88 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "var(--accent-orange)",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 85 },
      { name: "Python", level: 80 },
      { name: "REST APIs", level: 88 },
      { name: "PHP", level: 75 },
      { name: "Java", level: 75 },
    ],
  },
  {
    title: "Database & Storage",
    icon: Database,
    color: "var(--accent-cyan)",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "Firebase", level: 88 },
      { name: "MySQL", level: 80 },
      { name: "Firestore", level: 85 },
      { name: "Data Design", level: 83 },
    ],
  },
  {
    title: "Cloud & Tools",
    icon: Cloud,
    color: "var(--accent-pink)",
    skills: [
      { name: "Google Cloud", level: 75 },
      { name: "Firebase Hosting", level: 85 },
      { name: "Git/GitHub", level: 90 },
      { name: "Vercel", level: 88 },
      { name: "Docker", level: 70 },
    ],
  },
  {
    title: "AI & Advanced",
    icon: Brain,
    color: "var(--accent-lime)",
    skills: [
      { name: "Machine Learning", level: 75 },
      { name: "Data Analysis", level: 80 },
      { name: "Algorithms", level: 85 },
      { name: "Problem Solving", level: 90 },
    ],
  },
];

const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1 font-mono-custom text-xs font-bold uppercase">
        <span className="text-[var(--text-primary)]">{name}</span>
        <span className="text-[var(--text-primary)]/70">{level}%</span>
      </div>
      {/* Brutalist outline bar */}
      <div className="w-full h-5 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] neo-shadow" style={{ boxShadow: '2px 2px 0px var(--border-primary)', borderRadius: '0px' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
          className="h-full border-r-[2px] border-[var(--border-primary)]"
          style={{ backgroundColor: color, borderRadius: '0px' }}
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: custom * 0.08, ease: 'easeOut' },
    }),
  };

  return (
    <section id="skills" className="py-24 border-t-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-mono-custom font-bold uppercase text-[var(--accent-cyan)] text-xs px-3 py-1 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] neo-shadow inline-block mb-4">
            <Sparkles className="w-3.5 h-3.5 inline mr-1 text-black fill-black" />
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-[var(--text-primary)] mb-6">
            Skills & Tech
          </h2>
          <p className="font-mono-custom text-sm text-[var(--text-primary)]/80 max-w-2xl mx-auto uppercase">
            [ Development stacks, databases, AI configurations, and deploy structures. ]
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="neo-card neo-card-hover p-6 relative flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b-[2px] border-[var(--border-primary)]">
                    <div
                      className="p-2 border-[2px] border-[var(--border-primary)] neo-shadow text-black"
                      style={{ backgroundColor: category.color, boxShadow: '3px 3px 0px var(--border-primary)' }}
                    >
                      <Icon className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <h3 className="text-lg font-display font-black text-[var(--text-primary)] uppercase">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="mt-4">
                    {category.skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={category.color}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-12 border-t-[3px] border-[var(--border-primary)] border-dashed max-w-5xl mx-auto text-center">
          <p className="font-mono-custom text-sm text-[var(--text-primary)]/80 mb-6 uppercase">
            [ ADDITIONAL FOCUS & COMPILATIONS ]
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {["Hackathons", "Open Source", "Software Architecture", "Continuous Learning"].map((badge, idx) => {
              const colors = ["var(--accent-lime)", "var(--accent-orange)", "var(--accent-cyan)", "var(--accent-pink)"];
              return (
                <div
                  key={badge}
                  className="px-4 py-2 border-[2px] border-[var(--border-primary)] font-mono-custom text-xs font-bold uppercase neo-shadow text-black cursor-default select-none"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                >
                  {badge}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
