"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-border/50 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          TS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/resume.pdf"
            target="_blank"
            className="text-sm px-4 py-2 border border-foreground/20 rounded-lg text-foreground hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-200"
          >
            Resume
          </Link>
          <button
            onClick={() => {
              const newTheme = theme === "dark" ? "light" : "dark"
              console.log("[v0] Switching theme from", theme, "to", newTheme)
              setTheme(newTheme)
            }}
            className="p-2 rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/50">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/resume.pdf"
              target="_blank"
              className="text-sm px-4 py-2 border border-foreground/20 rounded-lg text-foreground text-center hover:bg-foreground/5 transition-all"
            >
              Resume
            </Link>
            <button
              onClick={() => {
                const newTheme = theme === "dark" ? "light" : "dark"
                console.log("[v0] Mobile - Switching theme from", theme, "to", newTheme)
                setTheme(newTheme)
              }}
              className="flex items-center justify-center gap-2 p-2 rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
              <span className="text-sm">{mounted && (theme === "dark" ? "Light Mode" : "Dark Mode")}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
