'use client'

import { motion } from 'framer-motion'
import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  unit: string
  status: 'normal' | 'good' | 'excellent' | 'warning' | 'critical'
  trend: string
}

const statusColors = {
  normal: 'text-text-secondary',
  good: 'text-secondary',
  excellent: 'text-secondary',
  warning: 'text-accent',
  critical: 'text-danger',
}

const statusBgColors = {
  normal: 'bg-text-secondary/10',
  good: 'bg-secondary/10',
  excellent: 'bg-secondary/10',
  warning: 'bg-accent/10',
  critical: 'bg-danger/10',
}

export default function StatCard({ icon: Icon, label, value, unit, status, trend }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`card ${statusBgColors[status]}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${statusBgColors[status]} border border-${status}`}>
          <Icon className={`w-6 h-6 ${statusColors[status]}`} />
        </div>
        <span className={`text-xs font-semibold ${statusColors[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-text-secondary mb-2">{label}</p>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold text-text-primary">{value}</span>
        <span className="text-sm text-text-tertiary">{unit}</span>
      </div>

      <p className="text-xs text-text-tertiary">{trend}</p>
    </motion.div>
  )
}
