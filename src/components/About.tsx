import { motion } from 'framer-motion';
import {
  Code2,
  Cloud,
  Brain,
  GraduationCap,
  Users,
} from 'lucide-react';
import { Magnetic } from '@/components/ui/Magnetic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const interests = [
  {
    icon: Code2,
    title: 'Full-Stack Web Development',
    description:
      'Building scalable, performant web applications using the MERN stack with a focus on raw, clean code architectures and seamless frontend-backend integrations.',
    color: 'var(--accent-lime)',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Deploying and maintaining architectures on Google Cloud Platform and Firebase. Setting up database pipelines, authentication, and secure servers.',
    color: 'var(--accent-orange)',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Developing intelligent models and AI integration engines for real-world automation, highlighted by active hackathon project builds.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    description:
      'Competing in hackathons, acquiring certifications, and building open-source tools to stay ahead of modern technology developments.',
    color: 'var(--accent-pink)',
  },
];

const stats = [
  { label: 'Projects Completed', value: '15+' },
  { label: 'Hackathons', value: '5+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Years of Code', value: '3+' },
];

export const About = () => {
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
    <section id="about" className="py-24 border-t-[3px] border-[var(--border-primary)] bg-[var(--bg-canvas)] relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="font-mono-custom font-bold uppercase text-[var(--accent-pink)] text-xs px-3 py-1 border-[2px] border-[var(--border-primary)] bg-[var(--bg-canvas)] neo-shadow inline-block mb-4">
            <Users className="w-3.5 h-3.5 inline mr-1 text-black fill-black" />
            Get to Know Me
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-[var(--text-primary)] mb-6">
            About Me
          </h2>
          <p className="font-mono-custom text-sm text-[var(--text-primary)]/80 max-w-2xl mx-auto uppercase">
            [ I am a 3rd-year B.Tech Computer Science student at Jain University, driven to engineer uncompromised, performant web platforms. ]
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="neo-card p-6 text-center flex flex-col justify-center items-center select-none"
              style={{ backgroundColor: 'var(--bg-canvas)' }}
            >
              <div className="text-3xl md:text-4xl font-display font-black text-[var(--text-primary)] mb-1">
                {stat.value}
              </div>
              <p className="font-mono-custom text-[10px] md:text-xs uppercase font-bold text-[var(--text-primary)]/75">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interests Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="neo-card neo-card-hover p-6 md:p-8 relative overflow-hidden"
              >
                <div className="flex gap-5">
                  {/* Icon Frame */}
                  <div
                    className="p-3 border-[3px] border-[var(--border-primary)] flex-shrink-0 flex items-center justify-center neo-shadow text-black"
                    style={{ backgroundColor: interest.color }}
                  >
                    <Icon className="h-6 w-6 stroke-[2.5]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-display font-black text-[var(--text-primary)] mb-2 uppercase">
                      {interest.title}
                    </h3>
                    <p className="text-sm text-[var(--text-primary)]/80 leading-relaxed font-medium">
                      {interest.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8 border-t-[3px] border-[var(--border-primary)] border-dashed max-w-5xl mx-auto">
          <p className="font-mono-custom text-sm text-[var(--text-primary)]/80 mb-6 uppercase">
            [ INTERESTED IN COLLABORATION OR CODE REVIEWS? LET'S GET IN TOUCH. ]
          </p>
          <Magnetic>
            <a
              href="#contact"
              className="neo-btn px-8 py-5 text-sm bg-[var(--accent-orange)] text-black border-[3px] inline-flex"
            >
              Get In Touch
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};
