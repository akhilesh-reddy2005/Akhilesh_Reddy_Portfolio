import { motion } from 'framer-motion';
import {
  Code2,
  Cloud,
  Brain,
  GraduationCap,
} from 'lucide-react';

export const About = () => {
  const interests = [
    {
      icon: Code2,
      title: 'Full-Stack Web Development',
      description:
        'Hands-on experience building real-world web applications using the MERN stack (MongoDB, Express.js, React, Node.js) with a focus on scalability and user experience.',
    },
    {
      icon: Cloud,
      title: 'Cloud & Deployment',
      description:
        'Exploring cloud platforms like Google Cloud and Firebase for application deployment, authentication, and backend services.',
    },
    {
      icon: Brain,
      title: 'AI-Based Applications',
      description:
        'Working on AI-powered solutions and intelligent systems through hackathons and academic projects.',
    },
    {
      icon: GraduationCap,
      title: 'Continuous Learning',
      description:
        'Actively upskilling through projects, internships, hackathons, and certifications to stay aligned with emerging technologies.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            I am a 3rd-year B.Tech Computer Science Engineering student at Jain
            Deemed-to-be University with a strong interest in full-stack
            development, cloud technologies, and AI-based applications.
          </p>
        </motion.div>

        {/* Interests */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="
                group rounded-2xl
                border border-white/10
                bg-white/5 backdrop-blur-md
                p-6 transition-all
                hover:bg-white/10
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    p-3 rounded-xl
                    bg-gradient-to-br from-primary to-secondary
                    group-hover:scale-110 transition-transform
                  "
                >
                  <interest.icon className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-display font-semibold mb-2 text-white">
                    {interest.title}
                  </h3>
                  <p className="text-white/60">
                    {interest.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            max-w-5xl mx-auto
            rounded-2xl border border-white/10
            bg-white/5 backdrop-blur-md
            p-8
          "
        >
          <h3 className="text-2xl font-display font-semibold mb-4 text-white">
            Background & Career Goals
          </h3>
          <p className="text-lg text-white/60 leading-relaxed">
            I'm Akhilesh Reddy, a Computer Science Engineering undergraduate at
            Jain Deemed-to-be University. I have hands-on experience in building
            full-stack web applications and working extensively with the MERN
            stack through academic projects, internships, and hackathons.
            <br /><br />
            Alongside web development, I am actively gaining exposure to
            cloud-based solutions and AI-powered applications. I enjoy solving
            real-world problems, collaborating in team environments, and
            continuously improving my technical and problem-solving skills.
            <br /><br />
            My career goal is to start as a Software Development Engineer (SDE)
            where I can contribute to scalable, user-friendly products while
            continuously learning and growing as a developer.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
