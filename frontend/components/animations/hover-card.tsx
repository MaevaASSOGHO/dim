"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface HoverCardProps {
  children: ReactNode
  className?: string
  hoverScale?: number
  hoverY?: number
  tapScale?: number
}

export default function HoverCard({
  children,
  className = "",
  hoverScale = 1.02,
  hoverY = -5,
  tapScale = 0.98,
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{
        scale: tapScale,
        transition: { duration: 0.1 },
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
