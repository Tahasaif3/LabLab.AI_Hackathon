'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, Phone, MapPin } from 'lucide-react'

interface Step2ProfileProps {
  data: any
  onChange: (data: any) => void
}

export default function Step2Profile({ data, onChange }: Step2ProfileProps) {
  const [formData, setFormData] = useState(data || { fullName: '', phone: '', location: '', age: '', gender: '' })

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onChange(newData)
  }

  return (
    <motion.div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
        <p className="text-text-secondary">Help us personalize your health experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Age</label>
            <input
              type="number"
              placeholder="25"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary transition"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
