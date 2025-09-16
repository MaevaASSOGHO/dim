"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  duration?: number
  delay?: number
  intensity?: number
  className?: string
}

export default function FloatingElement({
  children,
  duration = 3,
  delay = 0,
  intensity = 10,
  className = "",
}: FloatingElementProps) {
  const floatingVariants = {
    animate: {
      y: [0, -intensity, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div variants={floatingVariants} animate="animate" className={className}>
      {children}
    </motion.div>
  )
}
