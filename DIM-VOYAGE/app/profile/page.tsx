"use client";


import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Settings, LogOut, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import api from "../../src/api"; // ← ton client fetch sans Axios
import Link from "next/link"
import { useRouter } from "next/navigation";

type UserFromApi = {
  id?: number | string;
  name?: string;
  email?: string;
  phone?: string | null;
  address?: string | null;        // si tu l’ajoutes plus tard côté back
  created_at?: string;            // Laravel renvoie ça par défaut
  avatar_url?: string;            // Ajouté pour corriger l'erreur
};

function formatJoinDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(d);
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [user, setUser] = useState<UserFromApi | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    joinDate: "",
    avatarUrl: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          router.replace("/auth/login");
          return;
        }

        // 1) Récupère la réponse brute
        const res = await api.get("/me"); // peut être { user: {...}, token_id, abilities } ou directement { ...user }
        // 2) Déballe proprement
        const u = (res as any)?.user ?? res; // <-- clé: si "user" existe, on prend res.user, sinon on prend res

        setUser(u);

        setUserInfo({
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          address: u.address || "",
          joinDate: u.created_at ? formatJoinDate(u.created_at) : "",
          avatarUrl: u.avatar_url || "",
        });

        localStorage.setItem("user", JSON.stringify(u)); // optionnel: cache

      } catch (e: any) {
        setErr(e?.data?.message || "Session expirée");
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);


  if (loading) return <div className="p-6">Chargement…</div>;

  const recentReservations = [
    {
      id: "RES001",
      destination: "Abidjan",
      hotel: "Hôtel Ivoire",
      dates: "15-20 Déc 2024",
      status: "Confirmée",
      amount: "120 000 FCFA",
    },
    {
      id: "RES002",
      destination: "San Pedro",
      hotel: "Resort Plage d'Or",
      dates: "10-15 Jan 2025",
      status: "En attente",
      amount: "110 000 FCFA",
    },
    {
      id: "RES003",
      destination: "Yamoussoukro",
      hotel: "Hôtel Président",
      dates: "5-8 Nov 2024",
      status: "Terminée",
      amount: "85 000 FCFA",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmée":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Terminée":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }
  
  const triggerFile = () => fileRef.current?.click();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image trop lourde (max 2 Mo)."); e.target.value = ""; return; }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("avatar", file);
      const res = await api.post("/me/avatar", fd);
      const u = (res as any)?.user ?? res;

      // anti-cache (important pour voir l'image tout de suite)
      let url = (res as any)?.avatar_url ?? u?.avatar_url ?? "";
      if (url) url = `${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`;

      // 🔹 on synchronise TOUT : "user" (données brutes) et "userInfo" (UI)
      setUser({ ...u, avatar_url: url });
      setUserInfo(prev => ({ ...prev, avatarUrl: url }));

      localStorage.setItem("user", JSON.stringify({ ...u, avatar_url: url }));
    } catch (err: any) {
      alert(err?.data?.message || "Échec de la mise à jour de l’avatar");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };


  const handleLogout = async () => {
    try { await api.post("/logout"); } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header Profile */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <button onClick={triggerFile} className="inline-flex items-center gap-2">
                      <img
                        src={userInfo.avatarUrl || "/african-man-profile.png"}
                        key={userInfo.avatarUrl || "default-avatar"}   // force un re-render si l’URL change
                        alt="Avatar"
                        className="h-20 w-20 rounded-full object-cover border"
                      />
                      <span className="text-sm">{uploading ? "Import…" : "Changer l’avatar"}</span>
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </motion.div>

                  <div>
                    <h1 className="text-2xl font-bold text-[#133e96]">{userInfo.name}</h1>
                    <p className="text-gray-600">{userInfo.email}</p>
                    <p className="text-sm text-gray-500">Membre depuis {userInfo.joinDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-[#133e96] text-[#133e96] hover:bg-[#133e96] hover:text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isEditing ? "Annuler" : "Modifier"}
                  </Button>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="reservations">Réservations</TabsTrigger>
              <TabsTrigger value="new-reservation">Nouvelle Réservation</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#133e96]">Informations Personnelles</CardTitle>
                  <CardDescription>Gérez vos informations de profil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="name">Nom complet</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="address">Adresse</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end gap-2"
                    >
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button className="bg-[#133e96] hover:bg-[#0f2d7a]" onClick={() => setIsEditing(false)}>
                        Sauvegarder
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reservations Tab */}
            <TabsContent value="reservations">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#133e96]">Historique des Réservations</CardTitle>
                  <CardDescription>Consultez toutes vos réservations passées et actuelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReservations.map((reservation, index) => (
                      <motion.div
                        key={reservation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-[#133e96]">{reservation.destination}</h3>
                              <Badge className={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                            </div>
                            <p className="text-gray-600 mb-1">{reservation.hotel}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {reservation.dates}
                              </span>
                              <span className="flex items-center gap-1">
                                <CreditCard className="h-4 w-4" />
                                {reservation.amount}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Détails
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Reservation Tab */}
            <TabsContent value="new-reservation">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#133e96]">Nouvelle Réservation</CardTitle>
                  <CardDescription>Réservez votre prochain voyage avec DIM VOYAGE</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
                    >
                      <Link href="/destinations">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-[#133e96] rounded-full flex items-center justify-center mx-auto mb-3">
                            <MapPin className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-[#133e96] mb-2">Destinations</h3>
                          <p className="text-sm text-gray-600">Explorez nos destinations</p>
                        </div>
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
                    >
                      <Link href="/hebergements">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-[#fe6400] rounded-full flex items-center justify-center mx-auto mb-3">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-[#133e96] mb-2">Hébergements</h3>
                          <p className="text-sm text-gray-600">Réservez votre hébergement</p>
                        </div>
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
                    >
                      <Link href="/evenements">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-[#133e96] rounded-full flex items-center justify-center mx-auto mb-3">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-[#133e96] mb-2">Événements</h3>
                          <p className="text-sm text-gray-600">Participez aux événements</p>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
