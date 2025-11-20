'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

interface VitalsCardProps {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

export default function VitalsCard({ label, value, icon: Icon, color }: VitalsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg bg-surface-alt border border-border text-center"
    >
      <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
      <p className="text-xs text-text-secondary mb-1">{label}</p>
      <p className="text-lg font-bold text-text-primary">{value}</p>
    </motion.div>
  )
}
