"use client"

import { Phone, Mail, MapPin, Twitter, Linkedin, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const socialIcons = [
    { label: "Twitter", icon: Twitter, href: "#" },
    { label: "LinkedIn", icon: Linkedin, href: "#" },
    { label: "Facebook", icon: Facebook, href: "#" },
    { label: "Instagram", icon: Instagram, href: "#" },
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer
      className="bg-[#133e96] text-white"
      style={{ 
        width: '100%',
        height: '231px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-center">
        {/* Colonne 1: Contact Information */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4" />
              <span>Tel : +225 2722504678 / +225 0700158169</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4" />
              <span>Adresse : info@dimvoyages.net</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4" />
              <span>Abidjan - Cocody 8ème Tranche</span>
            </div>
          </div>
        </div>

        {/* Colonne 2: Liens utiles */}
        <div>
          <h3 className="text-xl font-bold mb-4">Liens utiles</h3>
          <ul className="space-y-1 text-sm">
            {["À Propos", "Tourisme", "Contact", "Nos catalogues"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-[#fe6400] transition-colors">
                  • {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3: Réseaux sociaux + Copyright */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {socialIcons.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className="w-8 h-8 bg-white/20 rounded flex items-center justify-center cursor-pointer hover:bg-[#fe6400] transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-xs">© Copyright 2025, By DIM VOYAGES</p>
        </div>
      </div>
    </footer>
  )
}
