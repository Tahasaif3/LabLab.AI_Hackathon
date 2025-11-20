'use client'

import { motion } from 'framer-motion'
import { Calendar, Plus, Clock, User, MapPin, Video } from 'lucide-react'
import { useState } from 'react'
import AppointmentCard from '@/components/AppointmentCard'
import BookingModal from '@/components/BookingModal'

const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'Dec 20, 2024',
    time: '10:00 AM',
    location: 'City Medical Center',
    type: 'in-person',
    status: 'confirmed',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'General Practitioner',
    date: 'Dec 22, 2024',
    time: '02:30 PM',
    location: 'Video Call',
    type: 'video',
    status: 'confirmed',
  },
  {
    id: 3,
    doctor: 'Dr. Emma Wilson',
    specialty: 'Nutritionist',
    date: 'Dec 25, 2024',
    time: '11:00 AM',
    location: 'City Medical Center',
    type: 'in-person',
    status: 'pending',
  },
]

const pastAppointments = [
  {
    id: 4,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: 'Dec 13, 2024',
    time: '10:00 AM',
    location: 'City Medical Center',
    type: 'in-person',
    status: 'completed',
  },
  {
    id: 5,
    doctor: 'Dr. Robert Lee',
    specialty: 'Dermatologist',
    date: 'Dec 6, 2024',
    time: '03:00 PM',
    location: 'Video Call',
    type: 'video',
    status: 'completed',
  },
]

export default function AppointmentsPage() {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="text-text-secondary">Manage and book your healthcare appointments</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBooking(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Book Appointment
        </motion.button>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
          <span className="ml-auto px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
            {upcomingAppointments.length}
          </span>
        </div>

        <div className="space-y-4">
          {upcomingAppointments.map((apt, idx) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <AppointmentCard appointment={apt} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Past Appointments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Past Appointments</h2>
        <div className="space-y-4">
          {pastAppointments.map((apt, idx) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <AppointmentCard appointment={apt} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid sm:grid-cols-3 gap-4"
      >
        <button className="card hover:shadow-lg transition text-center p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <p className="font-semibold text-text-primary">Book New</p>
          <p className="text-xs text-text-secondary mt-1">Schedule a consultation</p>
        </button>

        <button className="card hover:shadow-lg transition text-center p-6">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-secondary" />
          </div>
          <p className="font-semibold text-text-primary">Reschedule</p>
          <p className="text-xs text-text-secondary mt-1">Change appointment time</p>
        </button>

        <button className="card hover:shadow-lg transition text-center p-6">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-accent" />
          </div>
          <p className="font-semibold text-text-primary">View History</p>
          <p className="text-xs text-text-secondary mt-1">Past appointments</p>
        </button>
      </motion.div>
    </div>
  )
}
