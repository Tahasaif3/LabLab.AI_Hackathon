'use client'

import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function SecuritySettings() {
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false })
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Security</h2>
        <p className="text-text-secondary mb-6">Manage your account security and password</p>
      </div>

      {/* Password Section */}
      <div className="card space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Change Password
        </h3>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
            >
              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
            >
              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-text-tertiary mt-1">Min 8 characters, include numbers and symbols</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
            >
              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <button className="btn-primary">Update Password</button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Two-Factor Authentication</h3>
          <label className="relative inline-block w-12 h-7 cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-full h-full bg-border rounded-full peer-checked:bg-primary transition" />
            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:left-6" />
          </label>
        </div>
        <p className="text-sm text-text-secondary">
          Add an extra layer of security by requiring a code in addition to your password
        </p>
      </div>

      {/* Login Activity */}
      <div className="card">
        <h3 className="font-bold mb-4">Recent Login Activity</h3>
        <div className="space-y-3">
          {[
            { device: 'Chrome on MacOS', location: 'San Francisco, CA', time: '2 hours ago' },
            { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '1 day ago' },
          ].map((activity, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-surface-alt border border-border">
              <div className="flex justify-between items-start mb-1">
                <p className="font-semibold text-text-primary">{activity.device}</p>
                <span className="text-xs text-text-tertiary">{activity.time}</span>
              </div>
              <p className="text-sm text-text-secondary">{activity.location}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
