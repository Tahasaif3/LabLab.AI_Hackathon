'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="font-poppins font-bold text-xl text-primary">HealGuard</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-text-secondary hover:text-primary transition">
            Features
          </Link>
          <Link href="#about" className="text-text-secondary hover:text-primary transition">
            About
          </Link>
          <Link href="#contact" className="text-text-secondary hover:text-primary transition">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login" className="text-primary font-semibold hover:text-primary-dark transition">
            Sign In
          </Link>
          <Link href="/auth/signup" className="btn-primary">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-surface-alt rounded-lg transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-border"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="#features" className="block text-text-secondary hover:text-primary">
                Features
              </Link>
              <Link href="#about" className="block text-text-secondary hover:text-primary">
                About
              </Link>
              <Link href="#contact" className="block text-text-secondary hover:text-primary">
                Contact
              </Link>
              <div className="pt-4 border-t border-border space-y-2">
                <Link href="/auth/login" className="block text-center text-primary font-semibold py-2">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="block text-center btn-primary">
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
