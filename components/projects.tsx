"use client"

import Image from "next/image"
import { Section } from "./section"
import { ExternalLink, BookOpen, ArrowRight, FolderGit2 } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Real-Time Multimodal Emotion Recognition in E-Learning",
    description:
      "Developed a CNN-LSTM based system combining facial and speech emotion recognition using MFCC features, achieving ~94% accuracy.",
    techStack: ["Python", "TensorFlow", "OpenCV", "Keras"],
    image: "/projects/emotion-recognition.jpg",
    link: "#",
  },
  {
    title: "IoT-Based Real-Time Temperature Monitoring System",
    description:
      "Built an Arduino-based IoT system for real-time temperature monitoring and sensor data analysis.",
    techStack: ["Arduino", "C++", "IoT", "Sensors"],
    image: "/projects/iot-temperature.jpg",
    link: "#",
  },
  {
    title: "Interconnected Dam Monitoring and Automated Flood Warning System",
    description:
      "IoT-based system to monitor interconnected dams with hydraulic analysis for discharge, travel time, and flood prediction. Built a cloud dashboard for real-time monitoring, automated gate control, and early warning alerts.",
    techStack: ["IoT", "Cloud", "Python", "Dashboard"],
    image: "/projects/dam-monitoring.jpg",
    link: "#",
  },
  {
    title: "HealthSync: Cloud-Based Smart Hospital Management System",
    description:
      "Developed a robust Hospital Management System with role-based access for admin and users. Integrated cloud database services for secure storage and efficient data retrieval with clean design and scalable backend.",
    techStack: ["React", "Node.js", "PostgreSQL", "Cloud"],
    image: "/projects/healthsync.jpg",
    link: "https://theyagaraja.github.io/Smart-Hospital-Appointment-Management-System_DB/",
  },
]

const research = {
  title: "Smart Health Ledger",
  type: "Research Publication",
  description:
    "Co-authored a Scopus-indexed journal paper proposing a blockchain-based framework for healthcare finance systems.",
  link: "https://www.jneonatalsurg.com/index.php/jns/article/view/6340",
}

export function Projects() {
  return (
    <Section id="projects" title="Projects" icon={<FolderGit2 className="w-8 h-8" />} alternate>
      {/* Projects List */}
      <div className="space-y-32">
        {projects.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            key={project.title}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-12 lg:gap-20`}
          >
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground text-balance tracking-tight">
                {project.title}
              </h3>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg font-light">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="mt-8">
                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 bg-secondary/80 rounded-full text-xs font-medium text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Project Link - Linear sleek style */}
              <div className="mt-10">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-primary font-medium hover:text-foreground transition-colors"
                >
                  <span className="relative">
                    View Project
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary/30 group-hover:bg-foreground transition-colors" />
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Project Image */}
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex-1 w-full max-w-lg lg:max-w-none"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-secondary border border-border/30 shadow-lg hover:shadow-2xl hover:shadow-primary/10 group transition-shadow duration-500">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Research Publication */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ y: -5 }}
        className="mt-32 p-10 rounded-3xl bg-card border border-border/40 hover:border-border transition-colors shadow-sm hover:shadow-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-full bg-primary/10 shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                {research.type}
              </span>
              <h3 className="font-semibold text-foreground text-2xl mt-2 tracking-tight">
                {research.title}
              </h3>
              <p className="text-muted-foreground mt-3 leading-relaxed font-light">{research.description}</p>
            </div>
          </div>
          <a
            href={research.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:shadow-lg transition-all shrink-0"
          >
            Read Paper
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </motion.div>
    </Section>
  )
}
