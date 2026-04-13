"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

// ─────────────────────────────────────────────────────────────
//  MINIMAL PREMIUM BACKGROUND
//  Design principles:
//   • One soft gradient orb that follows the cursor (spring physics)
//   • Ultra-faint dot grid — breathes, no noise
//   • Zero per-frame DOM writes; everything is Canvas
//   • Theme-aware (dark space / light airy)
//   • Mobile: static gradient, no JS canvas
// ─────────────────────────────────────────────────────────────

function initMinimalCanvas(
  canvas: HTMLCanvasElement,
  isDark: boolean,
  onCleanup: (fn: () => void) => void
) {
  const ctx = canvas.getContext("2d", { alpha: true })
  if (!ctx) return

  const isMobile = window.matchMedia("(max-width: 768px)").matches
  if (isMobile) return // CSS-only on mobile

  let W = (canvas.width  = window.innerWidth)
  let H = (canvas.height = window.innerHeight)

  // ── Spring-physics cursor orb ────────────────────────────────
  let targetX = W * 0.5, targetY = H * 0.4
  let orbX    = targetX,  orbY    = targetY
  let velX = 0, velY = 0
  const STIFFNESS = 0.055  // spring strength (lower = slower / dreamier)
  const DAMPING   = 0.78   // friction  (lower = more bounce)

  // ── Secondary subtle orb (slow drift, no mouse) ─────────────
  let orb2Phase = 0

  // ── Dot grid ─────────────────────────────────────────────────
  const GRID_SPACING = 36
  const DOT_R        = 1.0   // base radius

  // ── Colour config ─────────────────────────────────────────────
  const cfg = isDark
    ? {
        orb1: { r: 99,  g: 102, b: 241 },   // indigo
        orb2: { r: 139, g: 92,  b: 246 },   // violet
        dot:  { r: 255, g: 255, b: 255 },   // white dots
        dotAlpha: 0.07,
        orbAlpha: 0.22,
        orb2Alpha: 0.13,
      }
    : {
        orb1: { r: 99,  g: 102, b: 241 },   // indigo
        orb2: { r: 59,  g: 130, b: 246 },   // blue
        dot:  { r: 79,  g: 70,  b: 229 },   // indigo dots
        dotAlpha: 0.08,
        orbAlpha: 0.18,
        orb2Alpha: 0.11,
      }

  // ── Event listeners ──────────────────────────────────────────
  const onMouseMove = (e: MouseEvent) => {
    targetX = e.clientX
    targetY = e.clientY
  }

  const onResize = () => {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }

  window.addEventListener("mousemove", onMouseMove)
  window.addEventListener("resize",    onResize)

  // ── Render loop ───────────────────────────────────────────────
  let raf: number

  const render = (ts: number) => {
    const t = ts * 0.001

    ctx.clearRect(0, 0, W, H)

    // ─ Spring physics for orb ─────────────────────────────────
    const ax = (targetX - orbX) * STIFFNESS
    const ay = (targetY - orbY) * STIFFNESS
    velX = velX * DAMPING + ax
    velY = velY * DAMPING + ay
    orbX += velX
    orbY += velY

    // ─ Secondary orb slow drift ───────────────────────────────
    orb2Phase += 0.0004
    const ox2 = W * 0.75 + Math.sin(orb2Phase * 1.3) * W * 0.12
    const oy2 = H * 0.25 + Math.cos(orb2Phase)        * H * 0.10

    // ─ Draw primary gradient orb ─────────────────────────────
    const { r: r1, g: g1, b: b1 } = cfg.orb1
    const orbRadius = Math.max(W, H) * 0.55
    const grd1 = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbRadius)
    grd1.addColorStop(0,    `rgba(${r1},${g1},${b1},${cfg.orbAlpha})`)
    grd1.addColorStop(0.45, `rgba(${r1},${g1},${b1},${cfg.orbAlpha * 0.4})`)
    grd1.addColorStop(1,    `rgba(${r1},${g1},${b1},0)`)
    ctx.fillStyle = grd1
    ctx.fillRect(0, 0, W, H)

    // ─ Draw secondary drift orb ────────────────────────────────
    const { r: r2, g: g2, b: b2 } = cfg.orb2
    const orb2Radius = Math.max(W, H) * 0.42
    const grd2 = ctx.createRadialGradient(ox2, oy2, 0, ox2, oy2, orb2Radius)
    grd2.addColorStop(0,    `rgba(${r2},${g2},${b2},${cfg.orb2Alpha})`)
    grd2.addColorStop(0.5,  `rgba(${r2},${g2},${b2},${cfg.orb2Alpha * 0.35})`)
    grd2.addColorStop(1,    `rgba(${r2},${g2},${b2},0)`)
    ctx.fillStyle = grd2
    ctx.fillRect(0, 0, W, H)

    // ─ Dot grid with gentle orb-proximity glow ────────────────
    const { r: dr, g: dg, b: db } = cfg.dot
    const INFLUENCE = 180   // px around cursor where dots brighten

    const cols = Math.ceil(W / GRID_SPACING) + 1
    const rows = Math.ceil(H / GRID_SPACING) + 1

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * GRID_SPACING
        const y = row * GRID_SPACING

        // Distance to cursor for local brightening
        const dx = x - orbX, dy = y - orbY
        const distToCursor = Math.sqrt(dx * dx + dy * dy)
        const proximity = Math.max(0, 1 - distToCursor / INFLUENCE)
        const alpha = cfg.dotAlpha + proximity * 0.18

        // Tiny breathe: dots near cursor are slightly larger
        const radius = DOT_R + proximity * 0.9

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dr},${dg},${db},${alpha})`
        ctx.fill()
      }
    }

    raf = requestAnimationFrame(render)
  }

  raf = requestAnimationFrame(render)

  onCleanup(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("resize",    onResize)
  })
}

// ─────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────
export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only read theme after mount — avoids SSR/client hydration mismatch
  useEffect(() => { setMounted(true) }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true  // default dark (matches defaultTheme)

  useEffect(() => {
    if (!mounted) return
    let cleanupFn: (() => void) | null = null
    const register = (fn: () => void) => { cleanupFn = fn }
    if (canvasRef.current) {
      initMinimalCanvas(canvasRef.current, isDark, register)
    }
    return () => { cleanupFn?.() }
  }, [resolvedTheme, mounted])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden"
    >
      {/* ── Solid base — use suppressHydrationWarning to silence mismatch noise ── */}
      <div
        className="absolute inset-0 transition-colors duration-[1000ms]"
        style={{ background: isDark ? "#070711" : "#f8f8ff" }}
        suppressHydrationWarning
      />

      {/* ── Static ambient gradient (visible on mobile too) ─ */}
      <div
        className="absolute inset-0"
        suppressHydrationWarning
        style={{
          background: isDark
            ? `radial-gradient(ellipse 90% 70% at 50% 0%,
                rgba(99,102,241,0.14) 0%,
                transparent 65%),
               radial-gradient(ellipse 60% 50% at 85% 90%,
                rgba(139,92,246,0.10) 0%,
                transparent 60%)`
            : `radial-gradient(ellipse 90% 70% at 50% 0%,
                rgba(99,102,241,0.10) 0%,
                transparent 65%),
               radial-gradient(ellipse 60% 50% at 85% 90%,
                rgba(59,130,246,0.07) 0%,
                transparent 60%)`,
        }}
      />

      {/* ── Canvas (spring-orb + dot grid, desktop only) ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />

      {/* ── Vignette edge fade ──────────────────────────────  */}
      <div
        className="absolute inset-0"
        suppressHydrationWarning
        style={{
          background: isDark
            ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(7,7,17,0.65) 100%)"
            : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(240,240,255,0.5) 100%)",
        }}
      />
    </motion.div>
  )
}
