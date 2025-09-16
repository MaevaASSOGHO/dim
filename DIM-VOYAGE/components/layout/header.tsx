"use client"

import { Plane, User, LogOut, Settings, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState, useCallback } from "react"
import api from "../../src/api" //  client fetch qui ajoute le Bearer

type AuthUser = {
  name?: string
  email?: string
  avatar_url?: string | null
}

function initials(name?: string) {
  if (!name) return "??"
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map(p => p[0]?.toUpperCase() ?? "").join("") || "??"
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()

  // 🔹 on remplace isLoggedIn par un vrai état utilisateur
  const [user, setUser] = useState<AuthUser | null>(null)

  // Lit le storage et met à jour l'état
  const readAuth = useCallback(() => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null
      if (token && raw) {
        const u = JSON.parse(raw) as AuthUser
        setUser(u)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    readAuth()

    // se met à jour quand on revient sur l’onglet, quand un autre onglet change le storage,
    // ou si tu dispatches un Event('auth:update') après login/logout
    const onFocus = () => readAuth()
    const onStorage = () => readAuth()
    const onCustom = () => readAuth()

    window.addEventListener("focus", onFocus)
    window.addEventListener("storage", onStorage)
    window.addEventListener("auth:update", onCustom as EventListener)

    return () => {
      window.removeEventListener("focus", onFocus)
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("auth:update", onCustom as EventListener)
    }
  }, [readAuth])

  const handleLogout = async () => {
    try { await api.post("/logout") } catch {}
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    // informe les autres composants/onglets si besoin
    window.dispatchEvent(new Event("auth:update"))
    router.replace("/auth/login")
  }

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/destinations", label: "Destinations" },
    { href: "/tourisme", label: "Tourisme" },
    { href: "/evenements", label: "Événements" },
    { href: "/hebergements", label: "Hébergements" },
  ]

  return (
    <motion.header
      className="bg-[#133e96] text-white px-6 py-4 relative z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Plane className="h-6 w-6" />
          </motion.div>
          <span className="text-xl font-bold">DIM VOYAGE</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`relative transition-colors duration-300 ${
                  pathname === item.href ? "text-[#fe6400] font-medium" : "hover:text-[#fe6400]"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#fe6400]"
                    layoutId="activeTab"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="flex items-center gap-2 hover:bg-white/10 rounded-full p-2 transition-colors"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url || "/african-man-profile.png"} />
                    <AvatarFallback className="bg-[#fe6400] text-white text-sm">
                      {initials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm">{user.name || "Profil"}</span>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/reservations" className="flex items-center gap-2 cursor-pointer">
                    <Calendar className="h-4 w-4" />
                    Mes réservations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/reservation" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Nouvelle réservation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <motion.button
                className="flex items-center gap-2 hover:bg-white/10 rounded-full p-2 transition-colors"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <User className="h-6 w-6" />
                <span className="hidden md:block text-sm">Se connecter</span>
              </motion.button>
            </Link>
          )}
        </motion.div>
      </div>
    </motion.header>
  )
}
