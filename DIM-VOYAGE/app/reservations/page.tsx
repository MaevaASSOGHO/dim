"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Eye, Download, Filter, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

export default function ReservationsHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReservation, setSelectedReservation] = useState<any>(null)

  const reservations = [
    {
      id: "RES001",
      destination: "Abidjan",
      hotel: "Hôtel Ivoire",
      checkIn: "2024-12-15",
      checkOut: "2024-12-20",
      guests: 2,
      roomType: "Suite",
      status: "Confirmée",
      amount: 120000,
      bookingDate: "2024-11-10",
      specialRequests: "Vue sur la lagune",
      paymentStatus: "Acompte payé",
    },
    {
      id: "RES002",
      destination: "San Pedro",
      hotel: "Resort Plage d'Or",
      checkIn: "2025-01-10",
      checkOut: "2025-01-15",
      guests: 4,
      roomType: "Chambre Deluxe",
      status: "En attente",
      amount: 110000,
      bookingDate: "2024-11-15",
      specialRequests: "Lits jumeaux pour les enfants",
      paymentStatus: "En attente",
    },
    {
      id: "RES003",
      destination: "Yamoussoukro",
      hotel: "Hôtel Président",
      checkIn: "2024-11-05",
      checkOut: "2024-11-08",
      guests: 1,
      roomType: "Chambre Standard",
      status: "Terminée",
      amount: 85000,
      bookingDate: "2024-10-20",
      specialRequests: "",
      paymentStatus: "Payé intégralement",
    },
    {
      id: "RES004",
      destination: "Bouaké",
      hotel: "Hôtel Ran",
      checkIn: "2024-09-12",
      checkOut: "2024-09-15",
      guests: 2,
      roomType: "Chambre Deluxe",
      status: "Terminée",
      amount: 95000,
      bookingDate: "2024-08-25",
      specialRequests: "Arrivée tardive",
      paymentStatus: "Payé intégralement",
    },
    {
      id: "RES005",
      destination: "Abidjan",
      hotel: "Radisson Blu",
      checkIn: "2024-07-20",
      checkOut: "2024-07-25",
      guests: 3,
      roomType: "Suite",
      status: "Annulée",
      amount: 150000,
      bookingDate: "2024-06-15",
      specialRequests: "Chambre non-fumeur",
      paymentStatus: "Remboursé",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmée":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Terminée":
        return "bg-blue-100 text-blue-800"
      case "Annulée":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Payé intégralement":
        return "bg-green-100 text-green-800"
      case "Acompte payé":
        return "bg-yellow-100 text-yellow-800"
      case "En attente":
        return "bg-orange-100 text-orange-800"
      case "Remboursé":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || reservation.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="mb-8">
            <Link href="/profile" className="text-[#133e96] hover:text-[#fe6400] flex items-center gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Retour au profil
            </Link>
            <h1 className="text-3xl font-bold text-[#133e96] mb-2">Historique des Réservations</h1>
            <p className="text-gray-600">Consultez et gérez toutes vos réservations</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher par destination, hôtel ou numéro..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="confirmée">Confirmée</SelectItem>
                      <SelectItem value="en attente">En attente</SelectItem>
                      <SelectItem value="terminée">Terminée</SelectItem>
                      <SelectItem value="annulée">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#133e96]">{reservations.length}</div>
                    <div className="text-sm text-gray-600">Total réservations</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {reservations.filter((r) => r.status === "Confirmée").length}
                    </div>
                    <div className="text-sm text-gray-600">Confirmées</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {reservations.filter((r) => r.status === "Terminée").length}
                    </div>
                    <div className="text-sm text-gray-600">Terminées</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#fe6400]">
                      {reservations.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">FCFA dépensés</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Reservations List */}
          <div className="space-y-4">
            {filteredReservations.map((reservation, index) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-[#133e96]">{reservation.destination}</h3>
                          <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                          <Badge className={getPaymentStatusColor(reservation.paymentStatus)}>
                            {reservation.paymentStatus}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Hôtel</p>
                            <p className="font-medium">{reservation.hotel}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Dates</p>
                            <p className="font-medium">
                              {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                            </p>
                            <p className="text-xs text-gray-400">
                              {calculateNights(reservation.checkIn, reservation.checkOut)} nuits
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Détails</p>
                            <p className="font-medium">{reservation.guests} personnes</p>
                            <p className="text-xs text-gray-400">{reservation.roomType}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Montant</p>
                            <p className="font-bold text-[#fe6400]">{reservation.amount.toLocaleString()} FCFA</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedReservation(reservation)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Détails
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-[#133e96]">
                                Réservation {selectedReservation?.id}
                              </DialogTitle>
                              <DialogDescription>Détails complets de votre réservation</DialogDescription>
                            </DialogHeader>
                            {selectedReservation && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Informations générales</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">Numéro:</span>
                                        <span className="font-medium">{selectedReservation.id}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">Date de réservation:</span>
                                        <span className="font-medium">
                                          {formatDate(selectedReservation.bookingDate)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">Statut:</span>
                                        <Badge className={getStatusColor(selectedReservation.status)}>
                                          {selectedReservation.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Séjour</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">Destination:</span>
                                        <span className="font-medium">{selectedReservation.destination}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">Hôtel:</span>
                                        <span className="font-medium">{selectedReservation.hotel}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">Type de chambre:</span>
                                        <span className="font-medium">{selectedReservation.roomType}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Dates et personnes</h4>
                                  <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-500">Arrivée:</span>
                                      <p className="font-medium">{formatDate(selectedReservation.checkIn)}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-500">Départ:</span>
                                      <p className="font-medium">{formatDate(selectedReservation.checkOut)}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-500">Personnes:</span>
                                      <p className="font-medium">{selectedReservation.guests}</p>
                                    </div>
                                  </div>
                                </div>

                                {selectedReservation.specialRequests && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Demandes spéciales</h4>
                                    <p className="text-sm bg-gray-50 p-3 rounded">
                                      {selectedReservation.specialRequests}
                                    </p>
                                  </div>
                                )}

                                <div className="bg-[#133e96] text-white p-4 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-semibold">Montant total</h4>
                                      <p className="text-sm opacity-90">
                                        {calculateNights(selectedReservation.checkIn, selectedReservation.checkOut)}{" "}
                                        nuits × {selectedReservation.guests} personnes
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-2xl font-bold">
                                        {selectedReservation.amount.toLocaleString()} FCFA
                                      </p>
                                      <Badge className={getPaymentStatusColor(selectedReservation.paymentStatus)}>
                                        {selectedReservation.paymentStatus}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredReservations.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation trouvée</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Essayez de modifier vos critères de recherche"
                  : "Vous n'avez pas encore de réservations"}
              </p>
              <Link href="/reservation">
                <Button className="bg-[#133e96] hover:bg-[#0f2d7a]">Faire une réservation</Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
