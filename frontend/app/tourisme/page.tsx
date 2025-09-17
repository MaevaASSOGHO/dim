"use client"

import { Camera, MapPin, Clock, Users, Star, Compass, Mountain, Waves, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CardMedia } from "@/components/ui/card-media"

export default function TourismePage() {
  const tourPackages = [
    {
      id: 1,
      name: "Circuit Découverte",
      description: "Tour complet des principales attractions de Côte d'Ivoire",
      duration: "7 jours",
      price: "450 000 FCFA",
      image: "/gagnoa-danse-traditionnelle.jpg",
      category: "Culturel",
      highlights: ["Abidjan", "Yamoussoukro", "Grand-Bassam", "Bouaké"],
      rating: 4.8,
      groupSize: "4-12 personnes",
    },
    {
      id: 2,
      name: "Aventure Nature",
      description: "Exploration des parcs nationaux et réserves naturelles",
      duration: "5 jours",
      price: "380 000 FCFA",
      image: "/Massif-de-Denguele.jpg",
      category: "Nature",
      highlights: ["Parc de Taï", "Parc de la Comoé", "Réserve d'Azagny"],
      rating: 4.6,
      groupSize: "2-8 personnes",
    },
    {
      id: 3,
      name: "Détente Côtière",
      description: "Séjour relaxant sur les plus belles plages du pays",
      duration: "4 jours",
      price: "320 000 FCFA",
      image: "/la-baie-des-sirenes.jpg",
      category: "Plage",
      highlights: ["San Pedro", "Sassandra", "Grand-Béréby"],
      rating: 4.9,
      groupSize: "2-6 personnes",
    },
    {
      id: 4,
      name: "Patrimoine Historique",
      description: "Voyage à travers l'histoire et la culture ivoirienne",
      duration: "3 jours",
      price: "250 000 FCFA",
      image: "/assinie-6.jpg",
      category: "Historique",
      highlights: ["Grand-Bassam", "Kong", "Bondoukou"],
      rating: 4.5,
      groupSize: "2-15 personnes",
    },
  ]

  const activities = [
    {
      icon: Camera,
      title: "Safari Photo",
      description: "Capturez la faune sauvage dans son habitat naturel",
    },
    {
      icon: Waves,
      title: "Sports Nautiques",
      description: "Surf, plongée et pêche en haute mer",
    },
    {
      icon: Mountain,
      title: "Randonnée",
      description: "Trekking dans les montagnes et forêts tropicales",
    },
    {
      icon: TreePine,
      title: "Écotourisme",
      description: "Découverte responsable de la biodiversité",
    },
  ]

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
        className="relative h-[500px] overflow-hidden bg-gradient-to-br from-[#133e96] via-[#fe6400] to-[#133e96]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
              Tourisme en Côte d'Ivoire
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Découvrez la beauté de notre pays
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Tour Packages Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#133e96] mb-4">Nos Circuits Touristiques</h2>
            <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
              Découvrez la richesse culturelle, naturelle et historique de la Côte d'Ivoire à travers nos circuits
              soigneusement conçus
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tourPackages.map((tour, index) => (
              <motion.div
                key={tour.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 h-full rounded-lg">
                  <div className="relative">
                    <CardMedia src={tour.image} alt={tour.name} heightClass="h-64" containerClassName="rounded-t-lg" />
                    <div className="absolute top-4 left-4 bg-[#fe6400] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {tour.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-[#133e96] text-xl mb-2">{tour.name}</h3>
                    <p className="text-[#6b7280] text-sm mb-4 leading-relaxed">{tour.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <Clock className="h-4 w-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <Users className="h-4 w-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <MapPin className="h-4 w-4" />
                        <span>{tour.highlights.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#fe6400] font-bold text-xl">{tour.price}</span>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-[#133e96] hover:bg-[#133e96]/90 text-white">Réserver</Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#133e96] mb-4">Activités Touristiques</h2>
            <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
              Une variété d'activités pour tous les goûts et tous les âges
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-[#f1f5f9] rounded-xl"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-[#fe6400] rounded-full mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <activity.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="font-bold text-[#133e96] text-lg mb-2">{activity.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{activity.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#133e96] to-[#fe6400]">
        <div className="max-w-7xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Explorez la Côte d'Ivoire</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              De la modernité d'Abidjan aux plages de San Pedro, en passant par les parcs nationaux, chaque région offre
              des expériences uniques
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: Compass, title: "20+ Destinations", desc: "Villes et sites naturels" },
                { icon: Camera, title: "100+ Activités", desc: "Expériences authentiques" },
                { icon: Users, title: "5000+ Voyageurs", desc: "Satisfaits chaque année" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                  <p className="text-lg opacity-90">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-16 px-6 bg-[#f1f5f9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#133e96] mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Créons ensemble votre voyage de rêve
          </motion.h2>
          <motion.p
            className="text-xl text-[#6b7280] mb-8 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Nos experts locaux vous accompagnent pour créer un itinéraire personnalisé selon vos envies et votre budget
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#133e96] hover:bg-[#133e96]/90 text-white px-8 py-3 text-lg">
                Demander un devis
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-[#133e96] text-[#133e96] hover:bg-[#133e96] hover:text-white px-8 py-3 text-lg bg-transparent"
              >
                Voir nos circuits
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
