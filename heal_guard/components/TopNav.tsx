'use client'

import { Menu, Bell, User } from 'lucide-react'
import { motion } from 'framer-motion'

interface TopNavProps {
  onMenuClick: () => void
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border-b border-border px-4 md:px-8 py-4 flex justify-between items-center"
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-surface-alt rounded-lg transition"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Center - Greeting */}
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold text-text-primary">
          Welcome back, John! 👋
        </h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-surface-alt rounded-lg transition"
        >
          <Bell className="w-6 h-6 text-text-secondary" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full" />
        </motion.button>

        {/* User Profile */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-3 py-2 hover:bg-surface-alt rounded-lg transition"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-text-primary">John Doe</p>
            <p className="text-xs text-text-tertiary">Active</p>
          </div>
        </motion.button>
      </div>
    </motion.nav>
  )
}
