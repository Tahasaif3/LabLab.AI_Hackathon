'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'General Practitioner' },
  { id: 3, name: 'Dr. Emma Wilson', specialty: 'Nutritionist' },
]

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState({
    doctor: null as number | null,
    date: '',
    time: '',
    type: 'in-person' as 'in-person' | 'video',
  })

  const handleBooking = () => {
    // Handle booking logic
    alert('Appointment booked successfully!')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-surface rounded-2xl z-50 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface border-b border-border p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Book Appointment</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-alt rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Progress */}
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      s <= step ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>

              {/* Step 1: Select Doctor */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Select a Doctor</h3>
                  {doctors.map((doctor) => (
                    <motion.button
                      key={doctor.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelected({ ...selected, doctor: doctor.id })}
                      className={`w-full p-4 rounded-lg border-2 text-left transition ${
                        selected.doctor === doctor.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{doctor.name}</p>
                          <p className="text-sm text-text-secondary">{doctor.specialty}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 2: Select Date & Time */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">Date</label>
                    <input
                      type="date"
                      value={selected.date}
                      onChange={(e) => setSelected({ ...selected, date: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-3">Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setSelected({ ...selected, time: slot })}
                          className={`p-2 rounded-lg border-2 transition font-semibold ${
                            selected.time === slot
                              ? 'border-primary bg-primary text-white'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Appointment Type */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Appointment Type</h3>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelected({ ...selected, type: 'in-person' })}
                    className={`w-full p-4 rounded-lg border-2 text-left transition ${
                      selected.type === 'in-person'
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold">In-Person</p>
                        <p className="text-sm text-text-secondary">City Medical Center</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelected({ ...selected, type: 'video' })}
                    className={`w-full p-4 rounded-lg border-2 text-left transition ${
                      selected.type === 'video'
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold">Video Call</p>
                        <p className="text-sm text-text-secondary">Consultation via video</p>
                      </div>
                    </div>
                  </motion.button>

                  {/* Review */}
                  <div className="mt-6 p-4 bg-surface-alt rounded-lg border border-border">
                    <h4 className="font-semibold mb-3">Appointment Summary</h4>
                    <div className="space-y-2 text-sm text-text-secondary">
                      <p>Doctor: <span className="text-text-primary font-semibold">{doctors.find(d => d.id === selected.doctor)?.name}</span></p>
                      <p>Date: <span className="text-text-primary font-semibold">{selected.date}</span></p>
                      <p>Time: <span className="text-text-primary font-semibold">{selected.time}</span></p>
                      <p>Type: <span className="text-text-primary font-semibold">{selected.type}</span></p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="btn-secondary flex-1">
                    Back
                  </button>
                )}
                <button
                  onClick={() => step === 3 ? handleBooking() : setStep(step + 1)}
                  disabled={
                    (step === 1 && !selected.doctor) ||
                    (step === 2 && (!selected.date || !selected.time)) ||
                    (step === 3 && !selected.type)
                  }
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {step === 3 ? 'Confirm Booking' : 'Next'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
