'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, User, Video, Phone, Edit, X } from 'lucide-react'

interface Appointment {
  id: number
  doctor: string
  specialty: string
  date: string
  time: string
  location: string
  type: 'in-person' | 'video'
  status: 'confirmed' | 'pending' | 'completed'
}

interface AppointmentCardProps {
  appointment: Appointment
}

const statusConfig = {
  confirmed: { bg: 'bg-secondary/10', text: 'text-secondary', label: 'Confirmed' },
  pending: { bg: 'bg-accent/10', text: 'text-accent', label: 'Pending' },
  completed: { bg: 'bg-text-tertiary/10', text: 'text-text-secondary', label: 'Completed' },
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const config = statusConfig[appointment.status]
  const isCompleted = appointment.status === 'completed'

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`card p-6 ${isCompleted ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-white" />
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary text-lg">{appointment.doctor}</h3>
            <p className="text-sm text-text-secondary">{appointment.specialty}</p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} whitespace-nowrap ml-2`}>
          {config.label}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{appointment.date} at {appointment.time}</span>
        </div>

        <div className="flex items-center gap-2 text-text-secondary">
          {appointment.type === 'video' ? (
            <>
              <Video className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Video Call</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{appointment.location}</span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      {!isCompleted && (
        <div className="flex gap-2 pt-4 border-t border-border">
          {appointment.type === 'video' && appointment.status === 'confirmed' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex-1 py-2 flex items-center justify-center gap-2 text-sm"
            >
              <Video className="w-4 h-4" />
              Join Call
            </motion.button>
          )}

          <button className="btn-secondary py-2 px-4 flex items-center gap-2 text-sm">
            <Edit className="w-4 h-4" />
          </button>

          <button className="btn-secondary py-2 px-4 flex items-center gap-2 text-sm hover:text-danger">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="pt-4 border-t border-border">
          <button className="btn-secondary w-full py-2 text-sm">View Report</button>
        </div>
      )}
    </motion.div>
  )
}
