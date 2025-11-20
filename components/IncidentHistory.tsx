'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle } from 'lucide-react'

const incidents = [
  {
    id: 1,
    date: 'Dec 15, 2024',
    time: '14:32',
    type: 'Alert',
    reason: 'Abnormal heart rate detected',
    status: 'resolved',
    duration: '8 minutes',
  },
  {
    id: 2,
    date: 'Dec 10, 2024',
    time: '09:15',
    type: 'Alert',
    reason: 'Low oxygen level',
    status: 'resolved',
    duration: '3 minutes',
  },
]

export default function IncidentHistory() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="card"
    >
      <h2 className="text-xl font-bold mb-6">Recent Alerts</h2>

      <div className="space-y-3">
        {incidents.map((incident, idx) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition"
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${incident.status === 'resolved' ? 'bg-secondary/10' : 'bg-accent/10'}`}>
                {incident.status === 'resolved' ? (
                  <CheckCircle className="w-6 h-6 text-secondary" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-accent" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-text-primary">{incident.reason}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    incident.status === 'resolved'
                      ? 'bg-secondary/10 text-secondary'
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {incident.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-text-tertiary mb-2">
                  {incident.date} at {incident.time}
                </p>
                <p className="text-xs text-text-secondary">Duration: {incident.duration}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
