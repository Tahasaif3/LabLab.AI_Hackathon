'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Info, CheckCircle } from 'lucide-react'

const alerts = [
  {
    type: 'warning',
    title: 'Irregular Sleep Pattern',
    message: 'You slept 2 hours less than usual',
    icon: AlertCircle,
  },
  {
    type: 'info',
    title: 'Medication Reminder',
    message: 'Time to take your daily medication',
    icon: Info,
  },
  {
    type: 'success',
    title: 'Great Progress!',
    message: 'You reached your daily step goal',
    icon: CheckCircle,
  },
]

export default function AlertsWidget() {
  return (
    <div className="card">
      <h2 className="text-lg font-bold mb-4">Health Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert, idx) => {
          const Icon = alert.icon
          const colorClass = {
            warning: 'bg-accent/10 border-accent/30 text-accent',
            info: 'bg-primary/10 border-primary/30 text-primary',
            success: 'bg-secondary/10 border-secondary/30 text-secondary',
          }[alert.type]

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-3 rounded-lg border-l-4 ${colorClass}`}
            >
              <div className="flex gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{alert.title}</p>
                  <p className="text-xs opacity-80 mt-0.5">{alert.message}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
