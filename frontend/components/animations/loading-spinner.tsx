"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: number
  color?: string
}

export default function LoadingSpinner({ size = 40, color = "#133e96" }: LoadingSpinnerProps) {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  const dotVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        variants={spinnerVariants}
        animate="animate"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              top: "50%",
              left: "50%",
              transformOrigin: `0 ${size / 2}px`,
              transform: `rotate(${i * 45}deg) translateY(-${size / 2 - 4}px)`,
            }}
            variants={dotVariants}
            animate="animate"
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </motion.div>
    </div>
  )
}
