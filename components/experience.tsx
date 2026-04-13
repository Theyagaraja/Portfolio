"use client"

import { Section } from "./section"
import { Briefcase, MapPin, Calendar, History } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const experiences = [
  {
    title: "Full Stack Intern",
    company: "Paragon Dynamics Info Systems Pvt. Ltd",
    location: "Chennai",
    period: "Dec 2025 - Jan 2026",
    description:
      "Working on full-stack web applications using HTML, CSS, JavaScript, PostgreSQL, and DBeaver with Real-Time Cloud integration and gaining exposure to production-level workflows.",
  },
  {
    title: "Online Web Developer Intern",
    company: "Skill Academia",
    location: "Kolkata",
    period: "Feb 2024 - Apr 2024",
    description:
      "Trained in web design, UI/UX, graphic design, digital marketing, public speaking, and usage of AI tools.",
  },
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Fills from 0 to 100% height based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="experience" title="My Experience" icon={<History className="w-8 h-8" />}>
      <div className="relative" ref={containerRef}>
        {/* Static background Timeline line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
        
        {/* Animated fill Timeline line */}
        <motion.div 
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute left-0 md:left-[31px] top-0 bottom-0 w-[3px] bg-primary hidden md:block rounded-full z-10" 
        />

        <div className="space-y-12 relative z-20">
          {experiences.map((exp, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              key={exp.title}
              className="relative pl-0 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block shadow-[0_0_10px_rgba(var(--color-primary),0.5)] z-20" />

              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-card border border-border/40 hover:border-border transition-colors w-full relative h-full shadow-sm hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-3 tracking-tight">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium mt-3">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full font-medium">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full font-medium">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed font-light">{exp.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
