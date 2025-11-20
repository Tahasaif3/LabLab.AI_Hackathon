'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Bell, Mail, Smartphone } from 'lucide-react'

interface Step4NotificationsProps {
  data: any
  onChange: (data: any) => void
}

export default function Step4Notifications({ data, onChange }: Step4NotificationsProps) {
  const [formData, setFormData] = useState(data || { 
    emailAlerts: true, 
    pushAlerts: true, 
    smsAlerts: false,
    emergencyContact: ''
  })

  const toggleNotification = (type: string) => {
    const newData = { ...formData, [type]: !formData[type] }
    setFormData(newData)
    onChange(newData)
  }

  return (
    <motion.div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Notification Preferences</h2>
        <p className="text-text-secondary">Choose how you want to receive health alerts</p>
      </div>

      <div className="space-y-4">
        {[
          { key: 'emailAlerts', icon: Mail, label: 'Email Alerts', description: 'Receive health updates via email' },
          { key: 'pushAlerts', icon: Smartphone, label: 'Push Notifications', description: 'Get instant alerts on your device' },
          { key: 'smsAlerts', icon: Bell, label: 'SMS Alerts', description: 'Emergency alerts via text message' },
        ].map(({ key, icon: Icon, label, description }) => (
          <motion.button
            key={key}
            onClick={() => toggleNotification(key)}
            className={`w-full p-4 rounded-lg border-2 transition flex items-start gap-4 text-left ${
              formData[key as keyof typeof formData]
                ? 'border-primary bg-primary/5'
                : 'border-border bg-surface-alt'
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition ${
              formData[key as keyof typeof formData]
                ? 'bg-primary border-primary'
                : 'border-border'
            }`}>
              {formData[key as keyof typeof formData] && <div className="w-2 h-2 bg-white rounded-sm" />}
            </div>
            <div>
              <Icon className="w-5 h-5 mb-1 text-primary" />
              <h3 className="font-semibold text-text-primary">{label}</h3>
              <p className="text-sm text-text-secondary">{description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Emergency Contact Email</label>
        <input
          type="email"
          placeholder="emergency@example.com"
          value={formData.emergencyContact}
          onChange={(e) => {
            const newData = { ...formData, emergencyContact: e.target.value }
            setFormData(newData)
            onChange(newData)
          }}
          className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        <p className="text-xs text-text-tertiary mt-2">We'll notify this contact during emergencies</p>
      </div>
    </motion.div>
  )
}
