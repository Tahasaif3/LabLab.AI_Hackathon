'use client'

import { motion } from 'framer-motion'
import { User, Lock, Bell, Shield, Palette, HelpCircle, LogOut, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import ProfileSettings from '@/components/ProfileSettings'
import SecuritySettings from '@/components/SecuritySettings'
import NotificationSettings from '@/components/NotificationSettings'
import PrivacySettings from '@/components/PrivacySettings'
import AppearanceSettings from '@/components/AppearanceSettings'

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy & Data', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />
      case 'security':
        return <SecuritySettings />
      case 'notifications':
        return <NotificationSettings />
      case 'privacy':
        return <PrivacySettings />
      case 'appearance':
        return <AppearanceSettings />
      case 'help':
        return (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
            <div className="space-y-4">
              <p className="text-text-secondary">For assistance, please contact our support team.</p>
              <a href="mailto:support@healguard.com" className="btn-primary inline-block">
                Contact Support
              </a>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your account preferences and settings</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <nav className="space-y-2">
            {settingsSections.map((section) => {
              const Icon = section.icon

              return (
                <motion.button
                  key={section.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-alt'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold flex-1 text-left">{section.label}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </motion.button>
              )
            })}

            {/* Logout Button */}
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-danger hover:bg-danger/10 transition-all font-semibold mt-4 border-t border-border pt-4"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </nav>
        </motion.div>

        {/* Main Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3"
        >
          {renderSection()}
        </motion.div>
      </div>
    </div>
  )
}
