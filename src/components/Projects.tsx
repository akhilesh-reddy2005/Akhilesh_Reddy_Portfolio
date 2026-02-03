import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Bus Pass Management System",
    description:
      "A digital bus pass generation and verification system for students. Includes admin approval, student ID validation, renewal workflow, and secure backend data storage.",
    tags: ["React", "Firebase"],
    color: "from-blue-500 to-cyan-600",
    code: "#",
    demo: "https://buss-passfinal-chi.vercel.app/",
  },
  {
    title: "Shortest Roadway for Power Restoration",
    description:
      "Web-based disaster recovery solution using Dijkstra’s Algorithm to identify shortest routes for restoring electricity. Integrated substation mapping and optimized repair paths.",
    tags: ["Python", "Dijkstra", "Algorithms", "GIS"],
    color: "from-green-500 to-emerald-600",
    code: "#",
    demo: "",
  },
  {
    title: "Shinex Seeds – Portfolio Website",
    description:
      "Responsive company portfolio website featuring services, CSR activities, and a dynamic contact form with backend integration and auto-email replies.",
    tags: ["React", "CSS", "SEO", "Responsive UI"],
    color: "from-purple-500 to-pink-600",
    code: "#",
    demo: "#",
  },
  {
    title: "Campus Reporting Portal (Buildverse Hackathon)",
    description:
      "A real-time campus and transport complaint reporting portal built during a 24-hour hackathon. Enables students to report, track, and manage issues efficiently.",
    tags: ["React", "Node.js", "MongoDB", "Hackathon"],
    color: "from-orange-500 to-red-600",
    code: "#",
    demo: "",
  },
  {
    title: "Fitness AI (Smart India Hackathon)",
    description:
      "AI-powered fitness application providing personalized workout and nutrition recommendations using intelligent data analytics.",
    tags: ["AI", "Python", "Data Analytics", "Hackathon"],
    color: "from-indigo-500 to-violet-600",
    code: "https://github.com/akhilesh-reddy2005/SIH_Hackathon.git",
    demo: "",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 relative">
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Real-world projects showcasing my skills in full-stack development,
            algorithms, cloud, and AI-based solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
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
              {/* Gradient Accent */}
              <div
                className={`h-1 w-12 rounded-full bg-gradient-to-r ${project.color} mb-4`}
              />

              <h3 className="text-xl font-display font-semibold mb-3 text-white group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-white/60 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      px-3 py-1 text-xs font-medium rounded-full
                      bg-white/10 text-white/70
                      hover:bg-white/20
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-white/70 hover:text-white hover:bg-white/5"
                  asChild
                >
                  <a href={project.code} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>

                {project.demo && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-white/70 hover:text-white hover:bg-white/5"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
