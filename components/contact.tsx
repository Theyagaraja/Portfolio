"use client"

import { Section } from "./section"
import { Mail, Phone, Linkedin, Github, ArrowUpRight, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "soundartheyagaraja@gmail.com",
    href: "mailto:soundartheyagaraja@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9597845336",
    href: "tel:+919597845336",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/theyagaraja-s",
    href: "https://www.linkedin.com/in/theyagaraja-s",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com",
    href: "https://github.com/",
  },
]

export function Contact() {
  return (
    <Section id="contact" title="Get in Touch" icon={<MessageSquare className="w-8 h-8" />} alternate>
      <div className="max-w-2xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted-foreground mb-12 text-center font-light leading-relaxed"
        >
          I&apos;m always open to discussing new opportunities, interesting projects, 
          or potential collaborations. Feel free to reach out!
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-5">
          {contactLinks.map((contact, index) => (
            <motion.a
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-5 p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="p-3.5 rounded-xl bg-primary/5 group-hover:bg-primary/20 transition-colors z-10">
                <contact.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0 z-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{contact.label}</p>
                <p className="text-foreground font-medium truncate mt-1 tracking-tight group-hover:text-primary transition-colors">
                  {contact.value}
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all z-10" />
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  )
}
