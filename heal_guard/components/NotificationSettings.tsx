'use client'

import { motion } from 'framer-motion'
import { Bell, Mail, Smartphone } from 'lucide-react'
import { useState } from 'react'

const notificationOptions = [
  {
    id: 'healthAlerts',
    icon: Bell,
    title: 'Health Alerts',
    description: 'Critical health notifications and warnings',
  },
  {
    id: 'appointments',
    icon: Smartphone,
    title: 'Appointment Reminders',
    description: 'Reminders for upcoming appointments',
  },
  {
    id: 'messages',
    icon: Mail,
    title: 'Message Notifications',
    description: 'New messages from healthcare providers',
  },
  {
    id: 'updates',
    icon: Bell,
    title: 'Feature Updates',
    description: 'Updates about new HealGuard features',
  },
]

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    healthAlerts: true,
    appointments: true,
    messages: true,
    updates: false,
    email: true,
    push: true,
    sms: false,
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <p className="text-text-secondary mb-6">Choose what notifications you want to receive</p>
      </div>

      {/* Notification Types */}
      <div className="card space-y-3">
        {notificationOptions.map((option) => {
          const Icon = option.icon

          return (
            <motion.button
              key={option.id}
              onClick={() => setNotifications({ ...notifications, [option.id]: !notifications[option.id as keyof typeof notifications] })}
              className={`w-full p-4 rounded-lg border-2 transition text-left ${
                notifications[option.id as keyof typeof notifications]
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition ${
                  notifications[option.id as keyof typeof notifications]
                    ? 'bg-primary border-primary'
                    : 'border-border'
                }`}>
                  {notifications[option.id as keyof typeof notifications] && (
                    <div className="w-2 h-2 bg-white rounded-sm" />
                  )}
                </div>
                <div className="flex-1">
                  <Icon className="w-5 h-5 text-primary mb-1" />
                  <h3 className="font-semibold text-text-primary">{option.title}</h3>
                  <p className="text-sm text-text-secondary">{option.description}</p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Delivery Methods */}
      <div className="card">
        <h3 className="font-bold mb-4">Delivery Methods</h3>
        <div className="space-y-3">
          {[
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'push', label: 'Push Notifications', icon: Smartphone },
            { id: 'sms', label: 'SMS', icon: Bell },
          ].map((method) => (
            <motion.button
              key={method.id}
              onClick={() => setNotifications({ ...notifications, [method.id]: !notifications[method.id as keyof typeof notifications] })}
              className="w-full p-4 rounded-lg border border-border hover:border-primary transition flex items-center gap-3"
              whileHover={{ scale: 1.01 }}
            >
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition ${
                notifications[method.id as keyof typeof notifications]
                  ? 'bg-primary border-primary'
                  : 'border-border'
              }`}>
                {notifications[method.id as keyof typeof notifications] && (
                  <div className="w-2 h-2 bg-white rounded-sm" />
                )}
              </div>
              <span className="font-semibold text-text-primary">{method.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="card">
        <h3 className="font-bold mb-4">Quiet Hours</h3>
        <p className="text-sm text-text-secondary mb-4">
          Choose when you don't want to receive notifications
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">From</label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">To</label>
            <input
              type="time"
              defaultValue="07:00"
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
