"use client"

import { Calendar, MapPin, Clock, Users, Ticket, Music, Utensils, Camera, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { CardMedia } from "@/components/ui/card-media"
import { useState } from "react"

export default function EvenementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const events = [
    {
      id: 1,
      name: "Festival des Masques de Man",
      description: "Célébration traditionnelle des masques sacrés dans la région montagneuse",
      date: "15-17 Mars 2025",
      location: "Man, Région des Montagnes",
      price: "25 000 FCFA",
      image: "/sculpture-koko.jpg",
      category: "culturel",
      duration: "3 jours",
      capacity: "500 personnes",
      highlights: ["Danses traditionnelles", "Artisanat local", "Gastronomie Dan"],
      rating: 4.9,
      featured: true,
    },
    {
      id: 2,
      name: "Abissa d'Abidjan",
      description: "Grande fête traditionnelle N'Zima marquant la fin de l'année",
      date: "25-31 Octobre 2025",
      location: "Grand-Bassam",
      price: "15 000 FCFA",
      image: "/assinie-6.jpg",
      category: "culturel",
      duration: "7 jours",
      capacity: "2000 personnes",
      highlights: ["Processions", "Musique traditionnelle", "Purification"],
      rating: 4.8,
      featured: true,
    },
    {
      id: 3,
      name: "Festival de Jazz d'Abidjan",
      description: "Rendez-vous incontournable des amateurs de jazz en Afrique de l'Ouest",
      date: "20-25 Avril 2025",
      location: "Abidjan, Plateau",
      price: "35 000 FCFA",
      image: "/1659cc75227694996edfedee430cb4a4_XL.jpg",
      category: "musical",
      duration: "5 jours",
      capacity: "1500 personnes",
      highlights: ["Artistes internationaux", "Concerts nocturnes", "Master classes"],
      rating: 4.7,
      featured: false,
    },
    {
      id: 4,
      name: "Fête du Dipri",
      description: "Rituel de purification et de renouveau du peuple Abidji",
      date: "10-12 Avril 2025",
      location: "Gomon, près d'Abidjan",
      price: "20 000 FCFA",
      image: "/gagnoa-danse-traditionnelle.jpg",
      category: "culturel",
      duration: "3 jours",
      capacity: "800 personnes",
      highlights: ["Cérémonie nocturne", "Danses rituelles", "Tradition ancestrale"],
      rating: 4.6,
      featured: false,
    },
    {
      id: 5,
      name: "Festival Reggae de Bouaké",
      description: "Célébration de la musique reggae et de la culture rastafari",
      date: "5-7 Juin 2025",
      location: "Bouaké, Centre",
      price: "30 000 FCFA",
      image: "/Bouaké_Collage.jpg",
      category: "musical",
      duration: "3 jours",
      capacity: "3000 personnes",
      highlights: ["Concerts live", "Sound systems", "Village rastafari"],
      rating: 4.5,
      featured: false,
    },
    {
      id: 6,
      name: "Salon du Chocolat d'Abidjan",
      description: "Découverte du cacao ivoirien et de ses transformations",
      date: "12-15 Novembre 2025",
      location: "Abidjan, Sofitel",
      price: "10 000 FCFA",
      image: "/image-AM-423-424-page-72-73.jpg",
      category: "gastronomique",
      duration: "4 jours",
      capacity: "1000 personnes",
      highlights: ["Dégustation", "Ateliers", "Rencontres producteurs"],
      rating: 4.4,
      featured: false,
    },
  ]

  const categories = [
    { id: "all", label: "Tous", icon: Calendar },
    { id: "culturel", label: "Culturel", icon: Camera },
    { id: "musical", label: "Musical", icon: Music },
    { id: "gastronomique", label: "Gastronomique", icon: Utensils },
  ]

  const filteredEvents = selectedCategory === "all" ? events : events.filter((e) => e.category === selectedCategory)

  const featuredEvents = events.filter((e) => e.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Hero Section with Floating Elements */}
      <motion.section
        className="relative h-[400px] overflow-hidden bg-gradient-to-br from-[#133e96] via-[#fe6400] to-[#133e96]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Événements Culturels
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Vivez la richesse culturelle ivoirienne
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Events Carousel */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#133e96] mb-4">Événements à la Une</h2>
            <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
              Ne manquez pas ces célébrations exceptionnelles de la culture ivoirienne
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Card className="overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full rounded-lg">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <CardMedia src={event.image} alt={event.name} heightClass="h-64" />
                    <div className="absolute top-4 left-4 bg-[#fe6400] text-white px-3 py-1 rounded-full text-sm font-bold">
                      À LA UNE
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-[#133e96] text-xl mb-2">{event.name}</h3>
                    <p className="text-[#6b7280] text-sm mb-4 leading-relaxed">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <Users className="h-4 w-4" />
                        <span>{event.capacity}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-[#133e96] mb-2 text-sm">Points forts :</h4>
                      <div className="flex flex-wrap gap-1">
                        {event.highlights.map((highlight, idx) => (
                          <motion.span
                            key={idx}
                            className="bg-[#f1f5f9] text-[#133e96] px-2 py-1 rounded text-xs"
                            whileHover={{ scale: 1.05 }}
                          >
                            {highlight}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#fe6400] font-bold text-xl">{event.price}</span>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-[#133e96] hover:bg-[#133e96]/90 text-white">
                          <Ticket className="h-4 w-4 mr-2" />
                          Réserver
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#133e96] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Events Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-[#133e96] mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tous nos Événements
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                  className="cursor-pointer"
                >
                <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-lg">
                  <div className="relative">
                    <CardMedia src={event.image} alt={event.name} heightClass="h-48" containerClassName="rounded-t-lg" />
                      <div className="absolute top-3 left-3 bg-[#fe6400] text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                        {event.category}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold text-[#133e96] text-lg mb-2">{event.name}</h3>
                      <p className="text-[#6b7280] text-sm mb-3 leading-relaxed line-clamp-2">{event.description}</p>

                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedEvent === event.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t pt-3 mt-3">
                              <div className="space-y-1 mb-3">
                                <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                                  <Clock className="h-3 w-3" />
                                  <span>{event.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                                  <Users className="h-3 w-3" />
                                  <span>{event.capacity}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {event.highlights.map((highlight, idx) => (
                                  <span key={idx} className="bg-[#f1f5f9] text-[#133e96] px-2 py-1 rounded text-xs">
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center justify-between">
                        <span className="text-[#fe6400] font-bold">{event.price}</span>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button size="sm" className="bg-[#133e96] hover:bg-[#133e96]/90 text-white">
                            Réserver
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter Section */}
      <motion.section
        className="py-16 px-6 bg-gradient-to-r from-[#133e96] to-[#fe6400] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ne manquez aucun événement
          </motion.h2>
          <motion.p
            className="text-xl mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Inscrivez-vous à notre newsletter pour être informé en avant-première de tous nos événements culturels
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-white text-[#133e96] hover:bg-gray-100 px-6 py-3">S'inscrire</Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
