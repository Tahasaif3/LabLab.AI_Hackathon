'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, Edit, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

const defaultContacts = [
  { id: 1, name: 'Sarah (Mother)', phone: '+1 (555) 123-4567', email: 'sarah@email.com', relation: 'Family' },
  { id: 2, name: 'John (Brother)', phone: '+1 (555) 987-6543', email: 'john@email.com', relation: 'Family' },
  { id: 3, name: 'Dr. Sarah Johnson', phone: '+1 (555) 111-2222', email: 'dr.johnson@hospital.com', relation: 'Doctor' },
]

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState(defaultContacts)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="card"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Emergency Contacts</h3>
        <button className="btn-primary py-2 px-3 inline-flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      <div className="space-y-3">
        {contacts.map((contact, idx) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-text-primary">{contact.name}</p>
                <p className="text-xs text-text-tertiary">{contact.relation}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-surface-alt rounded transition">
                  <Edit className="w-4 h-4 text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-danger/10 rounded transition">
                  <Trash2 className="w-4 h-4 text-danger" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                <Phone className="w-4 h-4" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="w-4 h-4" />
                {contact.email}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
