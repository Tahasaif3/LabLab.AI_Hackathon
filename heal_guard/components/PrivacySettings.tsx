'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock } from 'lucide-react'
import { useState } from 'react'

export default function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    shareData: false,
    analytics: true,
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Privacy & Data</h2>
        <p className="text-text-secondary mb-6">Control your data and privacy settings</p>
      </div>

      {/* Privacy Controls */}
      <div className="card space-y-4">
        <div>
          <h3 className="font-bold flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-primary" />
            Profile Visibility
          </h3>
          <div className="space-y-2">
            {['public', 'friends', 'private'].map((option) => (
              <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-alt cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value={option}
                  checked={privacy.profileVisibility === option}
                  onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-semibold text-text-primary capitalize">{option}</p>
                  <p className="text-xs text-text-secondary">
                    {option === 'public' && 'Anyone can see your profile'}
                    {option === 'friends' && 'Only friends can see your profile'}
                    {option === 'private' && 'Only you can see your profile'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="card space-y-4">
        <h3 className="font-bold flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-primary" />
          Data Sharing
        </h3>

        <div className="space-y-3">
          <motion.button
            onClick={() => setPrivacy({ ...privacy, shareData: !privacy.shareData })}
            className={`w-full p-4 rounded-lg border-2 transition text-left ${
              privacy.shareData ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition ${
                privacy.shareData ? 'bg-primary border-primary' : 'border-border'
              }`}>
                {privacy.shareData && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">Share anonymized health data for research</h4>
                <p className="text-sm text-text-secondary">Help improve healthcare by sharing de-identified data</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setPrivacy({ ...privacy, analytics: !privacy.analytics })}
            className={`w-full p-4 rounded-lg border-2 transition text-left ${
              privacy.analytics ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition ${
                privacy.analytics ? 'bg-primary border-primary' : 'border-border'
              }`}>
                {privacy.analytics && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">Allow usage analytics</h4>
                <p className="text-sm text-text-secondary">Help us improve the app by tracking usage patterns</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Data & Privacy Info */}
      <div className="card bg-secondary/5 border-secondary/20">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-text-primary">Your data is protected</h4>
            <p className="text-sm text-text-secondary mt-1">
              All your health data is encrypted with industry-standard encryption and complies with HIPAA and GDPR regulations.
            </p>
            <a href="#" className="text-sm text-primary hover:underline mt-2 inline-block">
              Learn more about our privacy policy
            </a>
          </div>
        </div>
      </div>

      {/* Data Export & Deletion */}
      <div className="card space-y-4">
        <h3 className="font-bold mb-4">Data Management</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-secondary flex-1">
            Download My Data
          </button>
          <button className="btn-secondary flex-1 border-danger/20 text-danger hover:bg-danger/10">
            Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  )
}
