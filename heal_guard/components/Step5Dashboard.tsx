'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Step5Dashboard() {
  return (
    <motion.div className="space-y-6 text-center py-8">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block"
      >
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
      </motion.div>

      <div>
        <h2 className="text-3xl font-bold mb-2">Setup Complete!</h2>
        <p className="text-lg text-text-secondary max-w-xl mx-auto">
          Your HealGuard profile is all set. You're ready to start monitoring your health with AI-powered insights.
        </p>
      </div>

      <div className="space-y-3 text-left max-w-md mx-auto">
        <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
          <span className="text-text-primary font-semibold">Profile completed</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
          <span className="text-text-primary font-semibold">Health data configured</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
          <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
          <span className="text-text-primary font-semibold">Notifications enabled</span>
        </div>
      </div>

      <p className="text-sm text-text-tertiary">
        You'll be redirected to your dashboard in a moment...
      </p>
    </motion.div>
  )
}
