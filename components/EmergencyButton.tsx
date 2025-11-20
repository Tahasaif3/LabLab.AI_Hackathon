'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

interface EmergencyButtonProps {
  onActivate: () => void
}

export default function EmergencyButton({ onActivate }: EmergencyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onActivate}
      className="relative h-32 w-32 mx-auto group"
    >
      {/* Pulsing background */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-danger/30 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
        className="absolute inset-0 bg-danger/20 rounded-full"
      />

      {/* Main button */}
      <div className="relative h-full w-full bg-danger rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow">
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle className="w-8 h-8 text-white" />
          <span className="text-white font-bold text-sm">SOS</span>
        </div>
      </div>
    </motion.button>
  )
}
