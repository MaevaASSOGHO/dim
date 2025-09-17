"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  fallback?: string
  whileHover?: any
  transition?: any
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  fallback = "/la-baie-des-sirenes.jpg",
  whileHover,
  transition 
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Chargement...</div>
        </div>
      )}
      <motion.img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        whileHover={whileHover}
        transition={transition}
      />
    </div>
  )
}
