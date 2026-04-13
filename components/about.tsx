"use client"

import { Section } from "./section"
import { GraduationCap, MapPin, Calendar, UserCircle } from "lucide-react"
import { motion } from "framer-motion"

export function About() {
  return (
    <Section id="about" title="About Me" icon={<UserCircle className="w-8 h-8" />}>
      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center gap-8"
      >
        {/* ABOUT TEXT */}
        <div className="max-w-2xl w-full p-8 rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-md transition-all duration-500">
          <p className="text-muted-foreground leading-relaxed text-lg font-light">
            Aspiring software engineer with hands-on experience in programming, 
            full-stack development fundamentals, databases, and AI-based systems. 
            Actively seeking opportunities to grow in real-world software environments.
          </p>
        </div>

        {/* EDUCATION CARD */}
        <div className="max-w-2xl w-full p-6 rounded-2xl bg-card border border-border/40 hover:border-border transition-colors">
          <div className="flex items-center gap-5 text-left">
            <div className="p-3 rounded-xl bg-primary/10">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg tracking-tight">
                B.Tech Computer Science & Engineering
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                SRM Institute of Science and Technology
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  2023 - 2027
                </span>
                <span className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  Tiruchirappalli, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}