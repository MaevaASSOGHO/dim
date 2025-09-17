"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function Airplane() {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const state = useFrame((state) => state)

  useFrame(() => {
    if (meshRef.current) {
      // Animation de vol en cercle
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3
      meshRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5

      // Rotation pour suivre la trajectoire
      meshRef.current.rotation.y = -state.clock.elapsedTime * 0.5 + Math.PI / 2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        {/* Corps de l'avion */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 2, 8]} />
          <meshStandardMaterial color="#133e96" />
        </mesh>

        {/* Ailes */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[2, 0.1, 0.5]} />
          <meshStandardMaterial color="#fe6400" />
        </mesh>

        {/* Queue */}
        <mesh position={[0, 0.3, -0.8]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[0.6, 0.1, 0.3]} />
          <meshStandardMaterial color="#fe6400" />
        </mesh>

        {/* Hélice */}
        <mesh position={[0, 0, 1]} rotation={[0, state.clock.elapsedTime * 10, 0]}>
          <boxGeometry args={[0.05, 0.8, 0.05]} />
          <meshStandardMaterial color="#333" />
        </mesh>

        {hovered && (
          <Html position={[0, 1, 0]} center>
            <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-[#133e96] font-medium">
              Explorez avec DIM VOYAGE
            </div>
          </Html>
        )}
      </group>
    </Float>
  )
}

function Clouds() {
  const cloudsRef = useRef<THREE.Group>(null)
  const state = useFrame((state) => state)

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={cloudsRef}>
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh
            position={[(Math.random() - 0.5) * 20, Math.random() * 3 - 1, (Math.random() - 0.5) * 20]}
            scale={0.5 + Math.random() * 0.5}
          >
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color="white" opacity={0.8} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function AirplaneScene() {
  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [5, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#fe6400" intensity={0.5} />

        <Airplane />
        <Clouds />

        <Text3D
          font="/fonts/Geist_Bold.json"
          size={0.5}
          height={0.1}
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          DIM VOYAGE
          <meshStandardMaterial color="#133e96" />
        </Text3D>

        <Environment preset="sunset" />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="text-center text-white z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Tourisme en Côte d'Ivoire
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Votre aventure commence dans les airs
          </motion.p>
        </div>
      </div>
    </div>
  )
}
