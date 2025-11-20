'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Step3HealthProps {
  data: any
  onChange: (data: any) => void
}

const conditions = ['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 'None']

export default function Step3Health({ data, onChange }: Step3HealthProps) {
  const [formData, setFormData] = useState(data || { conditions: [], allergies: '' })

  const toggleCondition = (condition: string) => {
    const newConditions = formData.conditions.includes(condition)
      ? formData.conditions.filter((c: string) => c !== condition)
      : [...formData.conditions, condition]
    
    const newData = { ...formData, conditions: newConditions }
    setFormData(newData)
    onChange(newData)
  }

  return (
    <motion.div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Health Information</h2>
        <p className="text-text-secondary">Help us understand your health profile</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-4">Do you have any existing conditions?</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {conditions.map((condition) => (
            <motion.button
              key={condition}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleCondition(condition)}
              className={`p-4 rounded-lg border-2 transition font-semibold ${
                formData.conditions.includes(condition)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-surface-alt text-text-secondary hover:border-primary'
              }`}
            >
              {condition}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Allergies or Medications</label>
        <textarea
          placeholder="List any allergies or current medications..."
          value={formData.allergies}
          onChange={(e) => {
            const newData = { ...formData, allergies: e.target.value }
            setFormData(newData)
            onChange(newData)
          }}
          className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary transition resize-none h-32"
        />
      </div>

      <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
        <p className="text-sm text-text-secondary">
          This information helps us provide better health recommendations and alerts tailored to your needs.
        </p>
      </div>
    </motion.div>
  )
}
