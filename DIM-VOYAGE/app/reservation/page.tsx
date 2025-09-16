"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, CreditCard, Check, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ReservationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [reservationData, setReservationData] = useState({
    destination: "",
    hotel: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    specialRequests: "",
    totalAmount: 0,
  })

  const destinations = [
    { id: "abidjan", name: "Abidjan", hotels: ["Hôtel Ivoire", "Radisson Blu", "Pullman Abidjan"] },
    { id: "yamoussoukro", name: "Yamoussoukro", hotels: ["Hôtel Président", "Lac Hôtel", "Résidence Hôtel"] },
    { id: "san-pedro", name: "San Pedro", hotels: ["Resort Plage d'Or", "Hôtel Balmer Lawson", "Villa Marina"] },
    { id: "bouake", name: "Bouaké", hotels: ["Hôtel Ran", "Hôtel Central", "Auberge de la Paix"] },
  ]

  const roomTypes = [
    { id: "standard", name: "Chambre Standard", price: 25000 },
    { id: "deluxe", name: "Chambre Deluxe", price: 40000 },
    { id: "suite", name: "Suite", price: 65000 },
    { id: "presidential", name: "Suite Présidentielle", price: 120000 },
  ]

  const steps = [
    { id: 1, title: "Destination", description: "Choisissez votre destination" },
    { id: 2, title: "Dates", description: "Sélectionnez vos dates" },
    { id: 3, title: "Hébergement", description: "Choisissez votre hébergement" },
    { id: 4, title: "Confirmation", description: "Confirmez votre réservation" },
  ]

  const selectedDestination = destinations.find((d) => d.id === reservationData.destination)
  const selectedRoomType = roomTypes.find((r) => r.id === reservationData.roomType)

  const calculateTotal = () => {
    if (!selectedRoomType || !reservationData.checkIn || !reservationData.checkOut) return 0

    const checkIn = new Date(reservationData.checkIn)
    const checkOut = new Date(reservationData.checkOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

    return nights * selectedRoomType.price * reservationData.guests
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    // Simulate reservation submission
    alert("Réservation confirmée ! Vous recevrez un email de confirmation.")
    window.location.href = "/profile"
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-8">
            <Link href="/profile" className="text-[#133e96] hover:text-[#fe6400] flex items-center gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Retour au profil
            </Link>
            <h1 className="text-3xl font-bold text-[#133e96] mb-2">Nouvelle Réservation</h1>
            <p className="text-gray-600">Réservez votre séjour en quelques étapes simples</p>
          </div>

          {/* Progress Steps */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentStep >= step.id ? "bg-[#133e96] text-white" : "bg-gray-200 text-gray-500"
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                      </motion.div>
                      <div className="text-center mt-2">
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-xs text-gray-500">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-0.5 mx-4 ${currentStep > step.id ? "bg-[#133e96]" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card>
            <CardContent className="pt-6">
              {/* Step 1: Destination */}
              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#133e96] mb-4">Choisissez votre destination</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destinations.map((destination) => (
                        <motion.div
                          key={destination.id}
                          whileHover={{ scale: 1.02 }}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            reservationData.destination === destination.id
                              ? "border-[#133e96] bg-blue-50"
                              : "border-gray-200 hover:border-[#133e96]"
                          }`}
                          onClick={() =>
                            setReservationData({ ...reservationData, destination: destination.id, hotel: "" })
                          }
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-[#133e96]" />
                            <div>
                              <h3 className="font-semibold">{destination.name}</h3>
                              <p className="text-sm text-gray-600">{destination.hotels.length} hôtels disponibles</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Dates */}
              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#133e96] mb-4">Sélectionnez vos dates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="checkIn">Date d'arrivée</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="checkIn"
                            type="date"
                            value={reservationData.checkIn}
                            onChange={(e) => setReservationData({ ...reservationData, checkIn: e.target.value })}
                            className="pl-10"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="checkOut">Date de départ</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="checkOut"
                            type="date"
                            value={reservationData.checkOut}
                            onChange={(e) => setReservationData({ ...reservationData, checkOut: e.target.value })}
                            className="pl-10"
                            min={reservationData.checkIn || new Date().toISOString().split("T")[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="guests">Nombre de personnes</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Select
                            value={reservationData.guests.toString()}
                            onValueChange={(value) =>
                              setReservationData({ ...reservationData, guests: Number.parseInt(value) })
                            }
                          >
                            <SelectTrigger className="pl-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? "personne" : "personnes"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Hotel & Room */}
              {currentStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#133e96] mb-4">Choisissez votre hébergement</h2>

                    {selectedDestination && (
                      <div className="space-y-4 mb-6">
                        <Label>Hôtel</Label>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedDestination.hotels.map((hotel) => (
                            <motion.div
                              key={hotel}
                              whileHover={{ scale: 1.01 }}
                              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                reservationData.hotel === hotel
                                  ? "border-[#133e96] bg-blue-50"
                                  : "border-gray-200 hover:border-[#133e96]"
                              }`}
                              onClick={() => setReservationData({ ...reservationData, hotel })}
                            >
                              <h3 className="font-medium">{hotel}</h3>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <Label>Type de chambre</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {roomTypes.map((room) => (
                          <motion.div
                            key={room.id}
                            whileHover={{ scale: 1.02 }}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              reservationData.roomType === room.id
                                ? "border-[#133e96] bg-blue-50"
                                : "border-gray-200 hover:border-[#133e96]"
                            }`}
                            onClick={() => setReservationData({ ...reservationData, roomType: room.id })}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{room.name}</h3>
                                <p className="text-sm text-gray-600">Par nuit</p>
                              </div>
                              <Badge variant="secondary">{room.price.toLocaleString()} FCFA</Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requests">Demandes spéciales (optionnel)</Label>
                      <Textarea
                        id="requests"
                        placeholder="Lit supplémentaire, vue sur mer, etc."
                        value={reservationData.specialRequests}
                        onChange={(e) => setReservationData({ ...reservationData, specialRequests: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#133e96] mb-4">Confirmez votre réservation</h2>

                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Destination:</span>
                        <span>{selectedDestination?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Hôtel:</span>
                        <span>{reservationData.hotel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Dates:</span>
                        <span>
                          {reservationData.checkIn} au {reservationData.checkOut}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Personnes:</span>
                        <span>{reservationData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Type de chambre:</span>
                        <span>{selectedRoomType?.name}</span>
                      </div>
                      {reservationData.specialRequests && (
                        <div className="flex justify-between">
                          <span className="font-medium">Demandes spéciales:</span>
                          <span className="text-right max-w-xs">{reservationData.specialRequests}</span>
                        </div>
                      )}
                      <hr />
                      <div className="flex justify-between text-lg font-bold text-[#133e96]">
                        <span>Total:</span>
                        <span>{calculateTotal().toLocaleString()} FCFA</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-5 w-5 text-[#133e96]" />
                        <h3 className="font-medium text-[#133e96]">Paiement</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Un acompte de 30% sera requis pour confirmer votre réservation. Le solde sera payable à
                        l'arrivée.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Précédent
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !reservationData.destination) ||
                      (currentStep === 2 && (!reservationData.checkIn || !reservationData.checkOut)) ||
                      (currentStep === 3 && (!reservationData.hotel || !reservationData.roomType))
                    }
                    className="bg-[#133e96] hover:bg-[#0f2d7a] flex items-center gap-2"
                  >
                    Suivant
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-[#fe6400] hover:bg-[#e55a00] flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Confirmer la réservation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
