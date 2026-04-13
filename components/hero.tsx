"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="relative mx-auto max-w-5xl px-6 w-full text-center z-10 flex flex-col items-center"
      >
        <motion.div
          drag
          dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
          className="cursor-grab inline-block mb-6 relative"
        >
          {/* Subtle floating glow behind the main text */}
          <div className="absolute inset-x-0 -bottom-10 h-32 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
          
          <motion.h1 
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter text-foreground text-balance"
          >
            Theyagaraja S
          </motion.h1>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 text-xl sm:text-2xl lg:text-3xl text-primary font-medium tracking-tight"
        >
          Aspiring Software & AI Engineer
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light"
        >
          Computer Science & Engineering student focused on building scalable 
          software systems and intelligent applications.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap gap-5 justify-center items-center"
        >
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="relative overflow-hidden group px-8 py-4 bg-foreground text-background rounded-full font-medium shadow-sm transition-all"
          >
            <span className="relative z-10">View My Projects</span>
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="px-8 py-4 border border-border rounded-full text-foreground font-medium hover:bg-secondary/50 backdrop-blur-sm transition-colors shadow-sm"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>


    </section>
  )
}
