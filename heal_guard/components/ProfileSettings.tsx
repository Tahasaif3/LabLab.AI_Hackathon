'use client'

import { motion } from 'framer-motion'
import { Camera, Save } from 'lucide-react'
import { useState } from 'react'

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1990-01-15',
    gender: 'Male',
    location: 'San Francisco, CA',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert('Profile updated successfully!')
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
        <p className="text-text-secondary mb-6">Update your personal information</p>
      </div>

      {/* Avatar Section */}
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">JD</span>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Profile Picture</h3>
            <p className="text-sm text-text-secondary mb-3">JPG, PNG or GIF (Max 10MB)</p>
            <button className="btn-secondary inline-flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Upload Photo
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="card space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Gender
            </label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
