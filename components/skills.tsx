"use client"

import { Section } from "./section"
import { Code2, Globe, Database, Cpu, Wrench, Users, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["C", "Python", "C++", "JavaScript"],
  },
  {
    title: "Web",
    icon: Globe,
    skills: ["HTML", "CSS"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    title: "Domains",
    icon: Cpu,
    skills: ["Artificial Intelligence", "IoT"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["GitHub", "VS Code", "DBeaver"],
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: ["Problem Solving", "Teamwork"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export function Skills() {
  return (
    <Section id="skills" title="Skills" icon={<Sparkles className="w-8 h-8" />} alternate>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((category) => (
          <motion.div
            variants={itemVariants}
            key={category.title}
            className="group p-6 rounded-2xl bg-card border border-border/40 hover:border-border shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <category.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-lg tracking-tight">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 text-xs font-medium bg-secondary/60 rounded-full text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
