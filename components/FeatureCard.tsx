'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="card"
    >
      <div className="text-primary mb-4 p-3 bg-primary/10 rounded-lg w-fit">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </motion.div>
  )
}
