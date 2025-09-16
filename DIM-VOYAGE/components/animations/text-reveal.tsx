"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down"
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
}: TextRevealProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
