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
    color: "from-blue-500 to-cyan-500",
    skills: [
      {
        name: "HTML",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "PHP",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
      {
  name: "Java",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
}

    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    skills: [
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "Firebase",
        logo: "https://images.seeklogo.com/logo-png/61/3/firebase-icon-logo-png_seeklogo-615938.png",
      },
    ],
  },
  {
    title: "Cloud & Tools",
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    skills: [
      {
        name: "Google Cloud",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
      },
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
    ],
  },
  {
  title: "Tools & Platforms",
  icon: Brain,
  color: "from-cyan-500 to-blue-500",
  skills: [
    {
      name: "Visual Studio Code",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "GitHub",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "Postman",
      logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
    },
    {
      name: "Firebase",
      logo: "https://images.seeklogo.com/logo-png/61/3/firebase-icon-logo-png_seeklogo-615938.png",
    },
  ],
}

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
            Tools and technologies I use to build scalable, modern, and
            intelligent applications.
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
                rounded-2xl border border-white/10
                bg-white/5 backdrop-blur-md
                p-6 hover:bg-white/10 transition-all
              "
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}
                >
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skill Logos */}
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.15 }}
                    className="relative group"
                  >
                    {/* Logo */}
                    <div
                      className="
                        h-12 w-12 rounded-xl
                        bg-white/10 backdrop-blur
                        border border-white/10
                        flex items-center justify-center
                      "
                    >
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="h-7 w-7"
                        loading="lazy"
                      />
                    </div>

                    {/* Tooltip */}
                    <div
                      className="
                        absolute -bottom-9 left-1/2 -translate-x-1/2
                        whitespace-nowrap rounded-md
                        bg-black/80 px-3 py-1 text-xs text-white
                        opacity-0 group-hover:opacity-100
                        transition-opacity pointer-events-none
                      "
                    >
                      {skill.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-white/60 text-lg">
            Always learning, experimenting, and pushing my technical limits 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
};
