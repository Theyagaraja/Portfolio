"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Wave trail with 4 segments of different stiffness
  const trailX1 = useSpring(mousePosition.x, { stiffness: 400, damping: 28 })
  const trailY1 = useSpring(mousePosition.y, { stiffness: 400, damping: 28 })
  
  const trailX2 = useSpring(mousePosition.x, { stiffness: 300, damping: 28 })
  const trailY2 = useSpring(mousePosition.y, { stiffness: 300, damping: 28 })
  
  const trailX3 = useSpring(mousePosition.x, { stiffness: 200, damping: 28 })
  const trailY3 = useSpring(mousePosition.y, { stiffness: 200, damping: 28 })
  
  const trailX4 = useSpring(mousePosition.x, { stiffness: 100, damping: 28 })
  const trailY4 = useSpring(mousePosition.y, { stiffness: 100, damping: 28 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, input, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  // We do NOT hide the default cursor here, so the native cursor stays visible!

  return (
    <>
      {/* Wave Section 1 */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: trailX1,
          y: trailY1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(var(--color-primary), 0.3)" : "rgba(var(--color-primary), 0.15)",
          border: isHovering ? "1px solid rgba(var(--color-primary), 0.8)" : "1px solid rgba(var(--color-primary), 0.4)"
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Wave Section 2 */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9997] mix-blend-screen"
        style={{
          x: trailX2,
          y: trailY2,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "rgba(var(--color-primary), 0.12)",
        }}
      />

      {/* Wave Section 3 */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9996] mix-blend-screen"
        style={{
          x: trailX3,
          y: trailY3,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "rgba(var(--color-primary), 0.08)",
        }}
      />

      {/* Wave Section 4 */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9995] mix-blend-screen"
        style={{
          x: trailX4,
          y: trailY4,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "rgba(var(--color-primary), 0.05)",
        }}
      />
    </>
  )
}
