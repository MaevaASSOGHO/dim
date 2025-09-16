"use client"

import { Heart, ArrowRight, MessageCircle, Star, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import ScrollReveal from "@/components/animations/scroll-reveal"
import StaggerContainer from "@/components/animations/stagger-container"
import HoverCard from "@/components/animations/hover-card"
import { CardMedia } from "@/components/ui/card-media"
import TextReveal from "@/components/animations/text-reveal"
import FloatingElement from "@/components/animations/floating-elements"
import CircularGallery from "@/components/3d/circular-gallery"

export default function HomePage() {
  const destinations = [
    {
      name: "Abidjan",
      description: "Métropole moderne, centre économique et culturel ivoirien",
      price: "120 000 FCFA",
      image: "/1659cc75227694996edfedee430cb4a4_XL.jpg",
      rating: 4.8,
      duration: "3 jours"
    },
    {
      name: "Yamoussoukro",
      description: "Capitale politique avec la majestueuse Basilique Notre-Dame",
      price: "85 000 FCFA",
      image: "/sculpture-koko.jpg",
      rating: 4.6,
      duration: "2 jours"
    },
    {
      name: "Bouaké",
      description: "Ville marchande, carrefour culturel au centre du pays",
      price: "95 000 FCFA",
      image: "/Bouaké_Collage.jpg",
      rating: 4.4,
      duration: "2 jours"
    },
    {
      name: "San Pedro",
      description: "Port actif et belles plages au sud-ouest ivoirien",
      price: "110 000 FCFA",
      image: "/San-Pedro-Balmer.jpg",
      rating: 4.7,
      duration: "3 jours"
    },
  ]

  // Préparer les données pour la galerie circulaire
  const galleryItems = destinations.map(dest => ({
    image: dest.image,
    text: dest.name,
    name: dest.name,
    description: dest.description,
    rating: dest.rating,
    duration: dest.duration
  }))

  const features = [
    {
      icon: MessageCircle,
      title: "Écoute",
      description: "Nous sommes à votre écoute pour vous proposer un service de qualité supérieur",
    },
    {
      icon: Star,
      title: "Qualité",
      description: "Nous offrons à nos clients, la meilleure qualité de service, en faisant de vos rêves une réalité.",
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Nous assurons la sûreté et la sécurité de tous nos clients",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Hero Section */}
      <motion.section
        className="relative h-[400px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/la-baie-des-sirenes.jpg"
          alt="Tropical resort with pool and palm trees"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="text-center text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Découvrez la Côte d'Ivoire</h1>
            <p className="text-xl md:text-2xl">Votre voyage de rêve commence ici</p>
          </motion.div>
        </motion.div>

        <FloatingElement duration={4} delay={2} intensity={15} className="absolute top-20 left-10">
          <div className="w-16 h-16 bg-white/10 rounded-full" />
        </FloatingElement>
        <FloatingElement duration={3} delay={1} intensity={12} className="absolute top-32 right-16">
          <div className="w-12 h-12 bg-white/10 rounded-full" />
        </FloatingElement>
        <FloatingElement duration={5} delay={3} intensity={18} className="absolute bottom-24 left-1/3">
          <div className="w-20 h-20 bg-white/10 rounded-full" />
        </FloatingElement>
      </motion.section>

      {/* Les Meilleures Destinations - Galerie 3D */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#f1f5f9] to-white">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl font-bold text-[#133e96] mb-12 text-center">Les Meilleures Destinations</h2>
          </TextReveal>
          
          <div className="relative">
            <div style={{ height: '600px', position: 'relative' }}>
              <CircularGallery 
                items={galleryItems}
                bend={3} 
                textColor="#133e96" 
                borderRadius={0.05} 
                scrollEase={0.02}
                font="bold 24px 'Epunda Slab', sans-serif"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl font-bold text-[#133e96] mb-12">Pourquoi choisir Dim voyages ?</h2>
          </TextReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <HoverCard hoverY={-5} hoverScale={1.02}>
                  <div className="text-center p-6 bg-[#f1f5f9] rounded-lg">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-[#fe6400] rounded-full mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-[#133e96] text-xl mb-3">{feature.title}</h3>
                    <p className="text-[#6b7280] leading-relaxed">{feature.description}</p>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}
