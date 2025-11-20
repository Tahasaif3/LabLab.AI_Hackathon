'use client'

import { motion } from 'framer-motion'
import { Palette, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

const colorThemes = [
  { id: 'blue', label: 'Blue', colors: ['#4F46E5', '#10B981'] },
  { id: 'purple', label: 'Purple', colors: ['#7C3AED', '#06B6D4'] },
  { id: 'green', label: 'Green', colors: ['#059669', '#0891B2'] },
  { id: 'red', label: 'Red', colors: ['#DC2626', '#F59E0B'] },
]

export default function AppearanceSettings() {
  const [appearance, setAppearance] = useState({
    theme: 'light',
    colorTheme: 'blue',
    fontSize: 'medium',
    compactMode: false,
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Appearance</h2>
        <p className="text-text-secondary mb-6">Customize how HealGuard looks</p>
      </div>

      {/* Theme Selection */}
      <div className="card space-y-4">
        <h3 className="font-bold flex items-center gap-2 mb-4">
          <Sun className="w-5 h-5 text-primary" />
          Theme
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
          ].map((theme) => {
            const Icon = theme.icon

            return (
              <motion.button
                key={theme.id}
                onClick={() => setAppearance({ ...appearance, theme: theme.id as any })}
                className={`p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                  appearance.theme === theme.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <Icon className="w-6 h-6 text-primary" />
                <span className="font-semibold text-text-primary">{theme.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Color Theme */}
      <div className="card space-y-4">
        <h3 className="font-bold flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          Color Theme
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {colorThemes.map((theme) => (
            <motion.button
              key={theme.id}
              onClick={() => setAppearance({ ...appearance, colorTheme: theme.id })}
              className={`p-4 rounded-lg border-2 transition ${
                appearance.colorTheme === theme.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {theme.colors.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="font-semibold text-text-primary">{theme.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="card space-y-4">
        <h3 className="font-bold mb-4">Font Size</h3>
        <div className="space-y-2">
          {['small', 'medium', 'large'].map((size) => (
            <label key={size} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-alt cursor-pointer">
              <input
                type="radio"
                name="fontSize"
                value={size}
                checked={appearance.fontSize === size}
                onChange={(e) => setAppearance({ ...appearance, fontSize: e.target.value as any })}
                className="w-4 h-4"
              />
              <span className={`font-semibold text-text-primary capitalize ${
                size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
              }`}>
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Compact Mode */}
      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-text-primary">Compact Mode</h3>
            <p className="text-sm text-text-secondary">Show more content with reduced spacing</p>
          </div>
          <label className="relative inline-block w-12 h-7 cursor-pointer">
            <input
              type="checkbox"
              checked={appearance.compactMode}
              onChange={(e) => setAppearance({ ...appearance, compactMode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-full h-full bg-border rounded-full peer-checked:bg-primary transition" />
            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:left-6" />
          </label>
        </div>
      </div>
    </motion.div>
  )
}
