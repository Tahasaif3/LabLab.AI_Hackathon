"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg"
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.div>
          <span className="font-poppins font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HealGuard
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <motion.div whileHover={{ color: "#4F46E5" }} className="text-text-secondary hover:text-primary transition">
            <Link href="#features">Features</Link>
          </motion.div>
          <motion.div whileHover={{ color: "#4F46E5" }} className="text-text-secondary hover:text-primary transition">
            <Link href="#agents">AI Agents</Link>
          </motion.div>
          <motion.div whileHover={{ color: "#4F46E5" }} className="text-text-secondary hover:text-primary transition">
            <Link href="#security">Security</Link>
          </motion.div>
          <motion.div whileHover={{ color: "#4F46E5" }} className="text-text-secondary hover:text-primary transition">
            <Link href="#about">About</Link>
          </motion.div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/auth/login" className="text-primary font-semibold hover:text-primary/80 transition px-4 py-2">
              Sign In
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/onboarding"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-surface rounded-lg transition">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-lg border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              <motion.div whileHover={{ x: 4 }}>
                <Link
                  href="#features"
                  className="block text-text-secondary hover:text-primary transition font-semibold"
                >
                  Features
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }}>
                <Link href="#agents" className="block text-text-secondary hover:text-primary transition font-semibold">
                  AI Agents
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }}>
                <Link
                  href="#security"
                  className="block text-text-secondary hover:text-primary transition font-semibold"
                >
                  Security
                </Link>
              </motion.div>
              <div className="pt-4 border-t border-border space-y-3">
                <Link
                  href="/auth/login"
                  className="block text-center text-primary font-semibold py-2 hover:text-primary/80"
                >
                  Sign In
                </Link>
                <Link
                  href="/onboarding"
                  className="block text-center bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
