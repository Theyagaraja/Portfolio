"use client"

import { useEffect, useState, useRef, type ReactNode } from "react"

interface SectionProps {
  id?: string
  title?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  alternate?: boolean
}

export function Section({ id, title, icon, children, className = "", alternate = false }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`py-20 md:py-28 ${alternate ? "bg-secondary/30" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        {title && (
          <h2 
            className={`flex items-center gap-3 text-3xl md:text-4xl font-bold text-foreground mb-12 tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {icon && <span className="text-primary">{icon}</span>}
            {title}
          </h2>
        )}
        <div
          className={`transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
