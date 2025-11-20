'use client'

import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, Target, AlertCircle } from 'lucide-react'

const insights = [
  {
    icon: TrendingUp,
    title: 'Improved Sleep Quality',
    description: 'Your sleep duration has increased by 0.5 hours compared to last month',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Target,
    title: 'Step Goal Achieved',
    description: 'You\'ve exceeded your daily step goal 22 times this month',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: AlertCircle,
    title: 'Caffeine Intake Alert',
    description: 'Consider reducing caffeine intake for better sleep at night',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
]

export default function HealthInsights() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6">AI-Powered Insights</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => {
          const Icon = insight.icon

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className={`card ${insight.bg} border-2 border-${insight.color}`}
            >
              <div className={`w-12 h-12 rounded-lg ${insight.bg} p-3 mb-4`}>
                <Icon className={`w-6 h-6 ${insight.color}`} />
              </div>

              <h3 className="font-bold text-text-primary mb-2">{insight.title}</h3>
              <p className="text-sm text-text-secondary">{insight.description}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
