'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Stethoscope, Brain, Heart, Pill, Activity, TrendingUp, MessageCircle, ArrowRight, Search } from 'lucide-react'

const agentsData = [
  {
    id: 'dr-smart',
    name: 'Dr. Smart',
    title: 'General Practitioner',
    speciality: 'General Health & Diagnosis',
    icon: Stethoscope,
    description: 'AI-powered general practitioner specializing in initial diagnosis and health guidance.',
    color: 'from-blue-500 to-cyan-500',
    stats: { patients: '10K+', experience: '15+ years' },
    rating: 4.9,
    availability: 'Always Available',
  },
  {
    id: 'cardio-ai',
    name: 'CardioAI',
    title: 'Cardiologist',
    speciality: 'Heart & Cardiovascular Health',
    icon: Heart,
    description: 'Specialized in cardiovascular health, heart disease prevention, and cardiac monitoring.',
    color: 'from-red-500 to-pink-500',
    stats: { patients: '8.5K+', experience: '12+ years' },
    rating: 4.95,
    availability: 'Always Available',
  },
  {
    id: 'neuro-expert',
    name: 'NeuroExpert',
    title: 'Neurologist',
    speciality: 'Brain & Nervous System',
    icon: Brain,
    description: 'Expert in neurological conditions, mental health, and cognitive wellness.',
    color: 'from-purple-500 to-indigo-500',
    stats: { patients: '7.2K+', experience: '14+ years' },
    rating: 4.88,
    availability: 'Always Available',
  },
  {
    id: 'pharma-guide',
    name: 'PharmaGuide',
    title: 'Pharmacist',
    speciality: 'Medications & Drug Interactions',
    icon: Pill,
    description: 'Provides medication guidance, drug interaction checks, and pharmacy recommendations.',
    color: 'from-green-500 to-emerald-500',
    stats: { patients: '12K+', experience: '10+ years' },
    rating: 4.92,
    availability: 'Always Available',
  },
  {
    id: 'fitness-coach',
    name: 'FitCoach',
    title: 'Fitness Specialist',
    speciality: 'Exercise & Wellness',
    icon: Activity,
    description: 'Personalized fitness plans, workout routines, and health optimization strategies.',
    color: 'from-orange-500 to-amber-500',
    stats: { patients: '9.1K+', experience: '11+ years' },
    rating: 4.87,
    availability: 'Always Available',
  },
  {
    id: 'wellness-ai',
    name: 'WellnessAI',
    title: 'Wellness Advisor',
    speciality: 'Holistic Health & Prevention',
    icon: TrendingUp,
    description: 'Holistic approach to health, preventive care, and sustainable lifestyle changes.',
    color: 'from-teal-500 to-cyan-500',
    stats: { patients: '11K+', experience: '13+ years' },
    rating: 4.90,
    availability: 'Always Available',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')

  const filteredAgents = agentsData.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'all' || agent.speciality === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const specialties = ['all', ...new Set(agentsData.map((a) => a.speciality))]

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-text-primary">AI Health Agents</h1>
            <p className="text-text-secondary mt-1">Connect with specialized AI experts for personalized health guidance</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search agents by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Specialty Filter */}
        <div className="flex gap-2 flex-wrap">
          {specialties.map((specialty) => (
            <motion.button
              key={specialty}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedSpecialty === specialty
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-card border border-border text-text-secondary hover:border-primary'
              }`}
            >
              {specialty === 'all' ? 'All Agents' : specialty}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Agents Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAgents.map((agent) => {
          const Icon = agent.icon
          return (
            <motion.div
              key={agent.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={`/dashboard/agents/${agent.id}`}>
                <div className="relative h-full bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 backdrop-blur-sm bg-opacity-50 hover:shadow-2xl cursor-pointer p-6">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-secondary/5" />

                  {/* Icon and Header */}
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Agent Info */}
                    <h3 className="text-2xl font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-2">{agent.title}</p>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {agent.description}
                    </p>

                    {/* Rating and Stats */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(agent.rating)
                                  ? 'text-yellow-400'
                                  : 'text-text-secondary'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-text-primary ml-1">
                          {agent.rating}
                        </span>
                      </div>
                      <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full font-semibold">
                        {agent.availability}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-primary/10 rounded-lg p-2 text-center">
                        <p className="text-xs text-text-secondary">Patients Served</p>
                        <p className="text-sm font-bold text-primary">{agent.stats.patients}</p>
                      </div>
                      <div className="bg-secondary/10 rounded-lg p-2 text-center">
                        <p className="text-xs text-text-secondary">Experience</p>
                        <p className="text-sm font-bold text-secondary">{agent.stats.experience}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all group-hover:gap-3"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="w-12 h-12 text-text-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">No agents found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </main>
  )
}
