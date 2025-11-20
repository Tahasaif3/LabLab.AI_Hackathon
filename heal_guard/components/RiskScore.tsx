'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export default function RiskScore() {
  const riskScore = 22
  const risks = [
    { name: 'Cardiovascular', level: 'Low', color: 'text-secondary' },
    { name: 'Metabolic', level: 'Low', color: 'text-secondary' },
    { name: 'Respiratory', level: 'Very Low', color: 'text-secondary' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="card"
    >
      <h2 className="text-lg font-bold mb-6">Health Risk Score</h2>

      {/* Circular Score */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="relative w-32 h-32"
        >
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="8"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#10B981"
              strokeWidth="8"
              strokeDasharray="339.29 339.29"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 339.29 }}
              animate={{ strokeDashoffset: 339.29 * (1 - riskScore / 100) }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">{riskScore}</p>
              <p className="text-xs text-text-tertiary">out of 100</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk Factors */}
      <div className="space-y-3">
        {risks.map((risk, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="flex items-center justify-between p-2 rounded-lg bg-surface-alt"
          >
            <span className="text-sm font-semibold text-text-primary">{risk.name}</span>
            <span className={`text-xs font-bold ${risk.color}`}>{risk.level}</span>
          </motion.div>
        ))}
      </div>

      {/* Status Badge */}
      <div className="mt-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-secondary flex-shrink-0" />
        <p className="text-xs text-text-secondary">Your health metrics are excellent!</p>
      </div>
    </motion.div>
  )
}
