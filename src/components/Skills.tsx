import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Brain,
  GitBranch,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "PHP", "Python", "REST APIs"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MongoDB", "MySQL", "Firebase", "SQL"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Cloud & Tools",
    icon: Cloud,
    skills: ["Google Cloud", "Git", "Version Control"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "AI & Algorithms",
    icon: Brain,
    skills: ["AI-Based Applications", "Dijkstra’s Algorithm", "Problem Solving"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Core CS",
    icon: GitBranch,
    skills: ["Data Structures", "Algorithms", "C", "C++"],
    color: "from-pink-500 to-purple-500",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 relative">
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
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Technologies and tools I use to design, develop, and deploy modern
            web applications and intelligent systems.
          </p>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
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
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}
                >
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      px-3 py-1.5 text-sm font-medium rounded-full
                      bg-white/10 text-white/70
                      hover:bg-white/20
                      transition-all cursor-default
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-white/60 text-lg">
            Continuously learning and upgrading my skillset to stay aligned with
            evolving technologies 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
};
