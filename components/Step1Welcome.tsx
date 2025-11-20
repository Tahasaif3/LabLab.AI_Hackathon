'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Step1WelcomeProps {
  onNext: () => void
}

export default function Step1Welcome({ onNext }: Step1WelcomeProps) {
  return (
    <motion.div className="space-y-8 text-center">
      <div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-white/20 rounded-full" />
          </div>
        </motion.div>

        <h2 className="text-3xl font-bold mb-4">Welcome to HealGuard</h2>
        <p className="text-lg text-text-secondary mb-6 max-w-xl mx-auto">
          We're excited to help you take control of your health with AI-powered monitoring, emergency alerts, and instant medical consultations.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
            1
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary">Complete Your Profile</h3>
            <p className="text-sm text-text-secondary mt-1">Set up your basic information and preferences</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
          <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
            2
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary">Configure Health Settings</h3>
            <p className="text-sm text-text-secondary mt-1">Tell us about your health conditions and goals</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
            3
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary">Enable Notifications</h3>
            <p className="text-sm text-text-secondary mt-1">Never miss important health alerts and reminders</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="btn-primary w-full flex items-center justify-center gap-2 mx-auto mt-8"
      >
        Let's Get Started
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  )
}
