'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Phone, MapPin, Users, Clock, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import EmergencyButton from '@/components/EmergencyButton'
import EmergencyContacts from '@/components/EmergencyContacts'
import IncidentHistory from '@/components/IncidentHistory'

export default function EmergencyPage() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Emergency Response</h1>
        <p className="text-text-secondary">One-click emergency alert system with real-time response</p>
      </motion.div>

      {/* Emergency Alert Section */}
      {!isActive ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-danger/10 to-accent/10 rounded-2xl border-2 border-danger/20 p-8 text-center"
        >
          <div className="mb-6">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-danger" />
              </div>
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">Emergency Detected?</h2>
          <p className="text-text-secondary mb-8">
            Press the button below to immediately alert emergency services and your emergency contacts.
          </p>

          <EmergencyButton onActivate={() => setIsActive(true)} />

          <p className="text-xs text-text-tertiary mt-4">
            Response time: {'<'} 30 seconds | Your location will be shared with responders
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl border-2 border-secondary/20 p-8"
        >
          <div className="space-y-6">
            {/* Status */}
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Emergency Alert Sent</h2>
              <p className="text-text-secondary">Emergency services and contacts are being notified</p>
            </div>

            {/* Live Updates */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <p className="text-sm text-text-secondary">Alert Sent At</p>
                </div>
                <p className="text-lg font-bold text-text-primary">14:32:45</p>
              </div>

              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <p className="text-sm text-text-secondary">Contacts Notified</p>
                </div>
                <p className="text-lg font-bold text-text-primary">3 of 3</p>
              </div>

              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <p className="text-sm text-text-secondary">Services Contacted</p>
                </div>
                <p className="text-lg font-bold text-secondary">Emergency Services</p>
              </div>

              <div className="p-4 bg-surface rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <p className="text-sm text-text-secondary">Location Shared</p>
                </div>
                <p className="text-lg font-bold text-text-primary">Active</p>
              </div>
            </div>

            {/* Cancel Button */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsActive(false)}
                className="flex-1 btn-secondary"
              >
                Dismiss Alert
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Emergency Contacts */}
        <div className="lg:col-span-2">
          <EmergencyContacts />
        </div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="font-bold mb-4">Response Guidelines</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Our AI analyzes your vitals in real-time</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Emergency services are alerted immediately</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>Your location is shared for faster response</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">4.</span>
                <span>Family is notified through multiple channels</span>
              </li>
            </ul>
          </div>

          <div className="card bg-accent/5 border-accent/20">
            <h3 className="font-bold mb-2 text-accent">Emergency Tips</h3>
            <p className="text-xs text-text-secondary">
              Keep your emergency contacts updated and ensure location permissions are enabled for faster emergency response.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Incident History */}
      <IncidentHistory />
    </div>
  )
}
