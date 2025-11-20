'use client'

import { motion } from 'framer-motion'

interface PredictionCardProps {
  condition: string
  probability: string
  status: 'low' | 'medium' | 'high'
}

const statusConfig = {
  low: { bg: 'bg-secondary/10', bar: 'bg-secondary', text: 'text-secondary' },
  medium: { bg: 'bg-accent/10', bar: 'bg-accent', text: 'text-accent' },
  high: { bg: 'bg-danger/10', bar: 'bg-danger', text: 'text-danger' },
}

export default function PredictionCard({ condition, probability, status }: PredictionCardProps) {
  const config = statusConfig[status]
  const prob = parseInt(probability)

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className={`p-3 rounded-lg ${config.bg} border border-${status}`}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="font-semibold text-text-primary text-sm">{condition}</p>
        <span className={`text-xs font-bold ${config.text}`}>{probability}</span>
      </div>
      <div className="h-2 bg-white rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${config.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${prob}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </motion.div>
  )
}
