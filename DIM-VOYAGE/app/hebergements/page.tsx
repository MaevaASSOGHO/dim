"use client"

import { Bed, Star, MapPin, Phone, Mail, Users, Waves, Mountain, Building, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { CardMedia } from "@/components/ui/card-media"
import { useState } from "react"

export default function HebergementsPage() {
    const [selectedType, setSelectedType] = useState("all")
    const [selectedAccommodation, setSelectedAccommodation] = useState<number | null>(null)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    const accommodations = [
        {
            id: 1,
            name: "Hôtel Ivoire InterContinental",
            description: "Luxueux hôtel 5 étoiles au cœur du Plateau avec vue panoramique sur la lagune",
            location: "Abidjan, Plateau",
            price: "85 000 FCFA",
            pricePerNight: true,
            image: "/1659cc75227694996edfedee430cb4a4_XL.jpg",
            type: "hotel",
            rating: 4.8,
            reviews: 324,
            amenities: ["Wifi", "Piscine", "Restaurant", "Spa", "Parking", "Climatisation"],
            rooms: "250 chambres",
            featured: true,
            gallery: ["/1659cc75227694996edfedee430cb4a4_XL.jpg", "/assinie-6.jpg", "/la-baie-des-sirenes.jpg"],
        },
        {
            id: 2,
            name: "Résidence Les Cocotiers",
            description: "Appartements meublés dans un cadre tropical avec jardin et piscine",
            location: "Grand-Bassam",
            price: "45 000 FCFA",
            pricePerNight: true,
            image: "/assinie-6.jpg",
            type: "residence",
            rating: 4.6,
            reviews: 156,
            amenities: ["Wifi", "Piscine", "Jardin", "Parking", "Cuisine équipée", "Climatisation"],
            rooms: "24 appartements",
            featured: true,
            gallery: ["/assinie-6.jpg", "/la-baie-des-sirenes.jpg", "/Massif-de-Denguele.jpg"],
        },
        {
            id: 3,
            name: "Auberge du Parc Taï",
            description: "Hébergement écologique au cœur de la forêt primaire",
            location: "Parc National de Taï",
            price: "25 000 FCFA",
            pricePerNight: true,
            image: "/Massif-de-Denguele.jpg",
            type: "auberge",
            rating: 4.4,
            reviews: 89,
            amenities: ["Restaurant", "Guide nature", "Randonnée", "Observation faune", "Parking"],
            rooms: "12 bungalows",
            featured: false,
            gallery: ["/placeholder-e4rd4.png", "/placeholder-8mgyk.png", "/placeholder-t3bjq.png"],
        },
        {
            id: 4,
            name: "Villa Assinie Paradise",
            description: "Villa privée en bord de mer avec accès direct à la plage",
            location: "Assinie-Mafia",
            price: "120 000 FCFA",
            pricePerNight: true,
            image: "/assinie-6.jpg",
            type: "villa",
            rating: 4.9,
            reviews: 67,
            amenities: ["Plage privée", "Piscine", "Wifi", "Cuisine équipée", "Jardin", "Parking"],
            rooms: "4 chambres",
            featured: true,
            gallery: ["/la-baie-des-sirenes.jpg", "/assinie-6.jpg", "/San-Pedro-Balmer.jpg"],
        },
        {
            id: 5,
            name: "Hôtel des Cascades",
            description: "Hôtel boutique près des chutes de la Comoé",
            location: "Man, Région des Montagnes",
            price: "35 000 FCFA",
            pricePerNight: true,
            image: "/CascadeMan.jpg",
            type: "hotel",
            rating: 4.5,
            reviews: 134,
            amenities: ["Restaurant", "Wifi", "Randonnée", "Vue montagne", "Parking", "Climatisation"],
            rooms: "18 chambres",
            featured: false,
            gallery: [
                "/Massif-de-Denguele.jpg",
                "/pont-arcade-de-Tiassale.jpg",
                "/Fleuve traversant le parc National de la comoé.jpg",
            ],
        },
        {
            id: 6,
            name: "Gîte Traditionnel Baoulé",
            description: "Hébergement authentique dans un village traditionnel baoulé",
            location: "Bouaké, Centre",
            price: "20 000 FCFA",
            pricePerNight: true,
            image: "/gagnoa-danse-traditionnelle.jpg",
            type: "gite",
            rating: 4.3,
            reviews: 78,
            amenities: ["Cuisine locale", "Artisanat", "Danse traditionnelle", "Parking", "Jardin"],
            rooms: "8 chambres",
            featured: false,
            gallery: [
                "/Massif-de-Denguele.jpg",
                "/pont-arcade-de-Tiassale.jpg",
                "/Fleuve traversant le parc National de la comoé.jpg",
            ],
        },
    ]

    const types = [
        { id: "all", label: "Tous", icon: Building },
        { id: "hotel", label: "Hôtels", icon: Building },
        { id: "residence", label: "Résidences", icon: Home },
        { id: "villa", label: "Villas", icon: Home },
        { id: "auberge", label: "Auberges", icon: Mountain },
        { id: "gite", label: "Gîtes", icon: Home },
    ]

    const filteredAccommodations =
        selectedType === "all" ? accommodations : accommodations.filter((a) => a.type === selectedType)
    const featuredAccommodations = accommodations.filter((a) => a.featured)

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
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            },
        },
    }

    return (
        <div className="min-h-screen bg-[#f1f5f9]">
            {/* Hero Section with Interactive Elements */}
            <motion.section
                className="relative h-[500px] overflow-hidden bg-gradient-to-br from-[#133e96] via-[#fe6400] to-[#133e96]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Floating decorative elements */}
                <motion.div
                    className="absolute top-16 left-8 w-24 h-24 bg-white/10 rounded-full flex items-center justify-center"
                    variants={floatingVariants}
                    animate="animate"
                >
                    <Bed className="h-8 w-8 text-white" />
                </motion.div>
                <motion.div
                    className="absolute top-24 right-16 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center"
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 1 }}
                >
                    <Building className="h-6 w-6 text-white" />
                </motion.div>
                <motion.div
                    className="absolute bottom-24 left-1/3 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center"
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 2 }}
                >
                    <Home className="h-5 w-5 text-white" />
                </motion.div>

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
                            Hébergements
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            Trouvez le logement parfait pour votre séjour
                        </motion.p>
                        <motion.div
                            className="flex flex-wrap gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                <Building className="h-5 w-5" />
                                <span>Hôtels de luxe</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                <Waves className="h-5 w-5" />
                                <span>Villas en bord de mer</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                                <Mountain className="h-5 w-5" />
                                <span>Éco-lodges</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Featured Accommodations */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#133e96] mb-4">Hébergements Recommandés</h2>
                        <p className="text-xl text-[#6b7280] max-w-3xl mx-auto">
                            Découvrez notre sélection d'hébergements d'exception pour un séjour inoubliable
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {featuredAccommodations.map((accommodation, index) => (
                            <motion.div
                                key={accommodation.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -8 }}
                                transition={{ duration: 0.3 }}
                                onHoverStart={() => setHoveredCard(accommodation.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="relative group"
                            >
                                <Card className="overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 h-full rounded-lg">
                                    <div className="relative overflow-hidden rounded-t-lg">
                                        <CardMedia src={accommodation.image} alt={accommodation.name} heightClass="h-64" />
                                        <div className="absolute top-4 left-4 bg-[#fe6400] text-white px-3 py-1 rounded-full text-sm font-bold">
                                            RECOMMANDÉ
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">{accommodation.rating}</span>
                                        </div>

                                        {/* Interactive overlay on hover */}
                                        <AnimatePresence>
                                            {hoveredCard === accommodation.id && (
                                                <motion.div
                                                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.div
                                                        className="flex gap-2"
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.8, opacity: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        {accommodation.gallery.map((img, idx) => (
                                                            <motion.img
                                                                key={idx}
                                                                src={img}
                                                                alt={`Gallery ${idx + 1}`}
                                                                className="w-16 h-16 object-cover rounded-lg border-2 border-white"
                                                                whileHover={{ scale: 1.1 }}
                                                            />
                                                        ))}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-[#133e96] text-xl mb-2">{accommodation.name}</h3>
                                        <p className="text-[#6b7280] text-sm mb-4 leading-relaxed">{accommodation.description}</p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                                <MapPin className="h-4 w-4" />
                                                <span>{accommodation.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                                <Bed className="h-4 w-4" />
                                                <span>{accommodation.rooms}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                                <Users className="h-4 w-4" />
                                                <span>{accommodation.reviews} avis</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-medium text-[#133e96] mb-2 text-sm">Équipements :</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {accommodation.amenities.slice(0, 4).map((amenity, idx) => (
                                                    <motion.span
                                                        key={idx}
                                                        className="bg-[#f1f5f9] text-[#133e96] px-2 py-1 rounded text-xs"
                                                        whileHover={{ scale: 1.05, backgroundColor: "#133e96", color: "white" }}
                                                    >
                                                        {amenity}
                                                    </motion.span>
                                                ))}
                                                {accommodation.amenities.length > 4 && (
                                                    <span className="bg-[#f1f5f9] text-[#6b7280] px-2 py-1 rounded text-xs">
                                                        +{accommodation.amenities.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-[#fe6400] font-bold text-xl">{accommodation.price}</span>
                                                <span className="text-[#6b7280] text-sm ml-1">/nuit</span>
                                            </div>
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Button className="bg-[#133e96] hover:bg-[#133e96]/90 text-white">
                                                    <Bed className="h-4 w-4 mr-2" />
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

            {/* Type Filter */}
            <section className="py-8 px-6 bg-[#f1f5f9]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex flex-wrap gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {types.map((type, index) => (
                            <motion.button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedType === type.id
                                        ? "bg-[#133e96] text-white shadow-lg"
                                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <type.icon className="h-4 w-4" />
                                {type.label}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* All Accommodations Grid */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        className="text-3xl font-bold text-[#133e96] mb-12 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Tous nos Hébergements
                    </motion.h2>

                    <AnimatePresence mode="wait">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            key={selectedType}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredAccommodations.map((accommodation, index) => (
                                <motion.div
                                    key={accommodation.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    onClick={() =>
                                        setSelectedAccommodation(selectedAccommodation === accommodation.id ? null : accommodation.id)
                                    }
                                    className="cursor-pointer"
                                >
                                    <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-lg">
                                        <div className="relative">
                                            <CardMedia src={accommodation.image} alt={accommodation.name} heightClass="h-48" containerClassName="rounded-t-lg" />
                                            <div className="absolute top-3 left-3 bg-[#fe6400] text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                                                {accommodation.type}
                                            </div>
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-medium">{accommodation.rating}</span>
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            <h3 className="font-bold text-[#133e96] text-lg mb-2">{accommodation.name}</h3>
                                            <p className="text-[#6b7280] text-sm mb-3 leading-relaxed line-clamp-2">
                                                {accommodation.description}
                                            </p>

                                            <div className="space-y-1 mb-3">
                                                <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{accommodation.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                                                    <Bed className="h-3 w-3" />
                                                    <span>{accommodation.rooms}</span>
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {selectedAccommodation === accommodation.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="border-t pt-3 mt-3">
                                                            <div className="mb-3">
                                                                <h4 className="font-medium text-[#133e96] mb-2 text-sm">Équipements :</h4>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {accommodation.amenities.map((amenity, idx) => (
                                                                        <span key={idx} className="bg-[#f1f5f9] text-[#133e96] px-2 py-1 rounded text-xs">
                                                                            {amenity}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-3">
                                                                <Users className="h-3 w-3" />
                                                                <span>{accommodation.reviews} avis clients</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-[#fe6400] font-bold">{accommodation.price}</span>
                                                    <span className="text-[#6b7280] text-xs ml-1">/nuit</span>
                                                </div>
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

            {/* Contact Section */}
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
                        Besoin d'aide pour choisir ?
                    </motion.h2>
                    <motion.p
                        className="text-xl mb-8 leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        Nos conseillers sont là pour vous aider à trouver l'hébergement parfait selon vos besoins et votre budget
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="bg-white text-[#133e96] hover:bg-gray-100 px-6 py-3 flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Nous appeler
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-[#133e96] px-6 py-3 flex items-center gap-2 bg-transparent"
                            >
                                <Mail className="h-4 w-4" />
                                Nous écrire
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    )
}
