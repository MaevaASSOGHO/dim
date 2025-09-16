"use client"

import Image from "next/image"

interface CardMediaProps {
  src: string
  alt: string
  heightClass: string
  priority?: boolean
  containerClassName?: string
}

export function CardMedia({ src, alt, heightClass, priority = false, containerClassName = "" }: CardMediaProps) {
  return (
    <div className={`relative w-full ${heightClass} ${containerClassName} overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
        draggable={false}
        priority={priority}
      />
    </div>
  )
}


