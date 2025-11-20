'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Cardiologist',
    content: 'HealGuard\'s real-time monitoring capabilities have significantly improved patient outcomes in our practice.',
    rating: 5,
  },
  {
    name: 'Emma Wilson',
    role: 'Patient',
    content: 'The emergency alert system has literally saved my life. The AI guidance during emergencies is incredible.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Healthcare Administrator',
    content: 'Integrating HealGuard into our hospital reduced appointment no-shows by 40% and improved patient satisfaction.',
    rating: 5,
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-balance mb-4">Trusted by Healthcare Professionals</h2>
          <p className="text-lg text-text-secondary">
            Join thousands of patients and medical professionals who rely on HealGuard daily
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-text-secondary mb-4 italic">{testimonial.content}</p>
              <div>
                <p className="font-semibold text-text-primary">{testimonial.name}</p>
                <p className="text-sm text-text-secondary">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
