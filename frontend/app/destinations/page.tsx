"use client"

import { Heart, ArrowRight, Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CardMedia } from "@/components/ui/card-media"
import { useState } from "react"
import { useDestinations } from "@/lib/api"

export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { destinations, loading, error } = useDestinations()

  // Données de fallback en cas d'erreur API
  const fallbackDestinations = [
    {
      id: 1,
      name: "Abidjan",
      description: "Métropole moderne, centre économique et culturel ivoirien",
      longDescription:
        "Découvrez la capitale économique avec ses gratte-ciels, ses marchés animés et sa vie nocturne vibrante.",
      price: "120 000 FCFA",
      image: "/1659cc75227694996edfedee430cb4a4_XL.jpg",
      category: "ville",
      duration: "3 jours",
      groupSize: "2-8 personnes",
      rating: 4.8,
      highlights: ["Plateau des affaires", "Marché de Cocody", "Lagune Ébrié"],
    },
    {
      id: 2,
      name: "Yamoussoukro",
      description: "Capitale politique avec la majestueuse Basilique Notre-Dame",
      longDescription: "Visitez la capitale politique et admirez la plus grande basilique du monde.",
      price: "85 000 FCFA",
      image: "/sculpture-koko.jpg",
      category: "culturel",
      duration: "2 jours",
      groupSize: "2-12 personnes",
      rating: 4.6,
      highlights: ["Basilique Notre-Dame", "Palais présidentiel", "Lac aux crocodiles"],
    },
    {
      id: 3,
      name: "Bouaké",
      description: "Ville marchande, carrefour culturel au centre du pays",
      longDescription: "Explorez le cœur commercial de la Côte d'Ivoire et sa riche culture.",
      price: "95 000 FCFA",
      image: "/Bouaké_Collage.jpg",
      category: "culturel",
      duration: "2 jours",
      groupSize: "2-10 personnes",
      rating: 4.4,
      highlights: ["Grand marché", "Centre culturel", "Artisanat local"],
    },
    {
      id: 4,
      name: "San Pedro",
      description: "Port actif et belles plages au sud-ouest ivoirien",
      longDescription: "Détendez-vous sur les plus belles plages de Côte d'Ivoire.",
      price: "110 000 FCFA",
      image: "/San-Pedro-Balmer.jpg",
      category: "plage",
      duration: "4 jours",
      groupSize: "2-6 personnes",
      rating: 4.9,
      highlights: ["Plages de sable fin", "Port de pêche", "Parc national"],
    },
    {
      id: 5,
      name: "Grand-Bassam",
      description: "Ancienne capitale coloniale, patrimoine UNESCO",
      longDescription: "Plongez dans l'histoire coloniale de la Côte d'Ivoire.",
      price: "75 000 FCFA",
      image: "/assinie-6.jpg",
      category: "culturel",
      duration: "1 jour",
      groupSize: "2-15 personnes",
      rating: 4.7,
      highlights: ["Architecture coloniale", "Musée national", "Plage de Grand-Bassam"],
    },
    {
      id: 6,
      name: "Parc de Taï",
      description: "Forêt tropicale primaire, réserve de biosphère UNESCO",
      longDescription: "Aventure dans l'une des dernières forêts primaires d'Afrique de l'Ouest.",
      price: "180 000 FCFA",
      image: "/Massif-de-Denguele.jpg",
      category: "nature",
      duration: "5 jours",
      groupSize: "4-8 personnes",
      rating: 4.5,
      highlights: ["Faune sauvage", "Forêt primaire", "Écotourisme"],
    },
  ]

  // Utiliser les données API ou les données de fallback
  const currentDestinations = destinations.length > 0 ? destinations : fallbackDestinations

  const categories = [
    { id: "all", label: "Toutes", count: currentDestinations.length },
    { id: "ville", label: "Villes", count: currentDestinations.filter((d) => d.category === "ville").length },
    { id: "plage", label: "Plages", count: currentDestinations.filter((d) => d.category === "plage").length },
    { id: "culturel", label: "Culturel", count: currentDestinations.filter((d) => d.category === "culturel").length },
    { id: "nature", label: "Nature", count: currentDestinations.filter((d) => d.category === "nature").length },
  ]

  const filteredDestinations =
    selectedCategory === "all" ? currentDestinations : currentDestinations.filter((d) => d.category === selectedCategory)

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

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Hero Section */}
      <motion.section
        className="relative h-[300px] overflow-hidden bg-gradient-to-r from-[#133e96] to-[#fe6400]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Destinations</h1>
            <p className="text-xl md:text-2xl">Découvrez la beauté de la Côte d'Ivoire</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#133e96]"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-6 my-4">
          <p className="text-red-600">Erreur lors du chargement des destinations: {error}</p>
          <p className="text-sm text-red-500 mt-2">Affichage des données de démonstration</p>
        </div>
      )}

      {/* Filter Categories */}
      <section className="py-8 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#133e96] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {category.label} ({category.count})
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
          >
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Card className="overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 h-full rounded-lg">
                  <div className="relative">
                    <CardMedia src={destination.image} alt={destination.name} heightClass="h-56" containerClassName="rounded-t-lg" />
                    <motion.div
                      className="absolute top-3 right-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <div className="absolute top-3 left-3 bg-[#fe6400] text-white px-2 py-1 rounded-full text-xs font-medium">
                      {destination.category}
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[#133e96] text-xl">{destination.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>

                    <p className="text-[#6b7280] text-sm mb-3 leading-relaxed">{destination.description}</p>
                    <p className="text-[#6b7280] text-xs mb-4 flex-grow">{destination.longDescription}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <Clock className="h-4 w-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <Users className="h-4 w-4" />
                        <span>{destination.groupSize}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-[#133e96] mb-2 text-sm">Points forts :</h4>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.map((highlight, idx) => (
                          <span key={idx} className="bg-[#f1f5f9] text-[#133e96] px-2 py-1 rounded text-xs">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[#fe6400] font-bold text-lg">{destination.price}</span>
                      <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <Button className="bg-[#133e96] hover:bg-[#133e96]/90 text-white">
                          Réserver
                          <ArrowRight className="h-4 w-4 ml-2" />
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

      {/* Call to Action */}
      <motion.section
        className="py-16 px-6 bg-[#133e96] text-white"
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
            Prêt pour votre prochaine aventure ?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Contactez-nous dès aujourd'hui pour planifier votre voyage sur mesure en Côte d'Ivoire
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-[#fe6400] hover:bg-[#fe6400]/90 text-white px-8 py-3 text-lg">Contactez-nous</Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Séparateur dégradé */}
      <div className="h-1 bg-gradient-to-r from-[#133e96] via-[#fe6400] to-[#133e96]"></div>
    </div>
  )
}
