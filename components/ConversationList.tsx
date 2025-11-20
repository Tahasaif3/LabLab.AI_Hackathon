'use client'

import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

interface Conversation {
  id: number
  title: string
  provider?: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

interface ConversationListProps {
  conversations: Conversation[]
  activeId: number
  onSelect: (id: number) => void
}

export default function ConversationList({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conv, idx) => (
        <motion.button
          key={conv.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => onSelect(conv.id)}
          className={`w-full text-left p-4 border-b border-border transition hover:bg-surface-alt ${
            activeId === conv.id ? 'bg-primary/10 border-primary' : ''
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              conv.unread ? 'bg-primary' : 'bg-text-tertiary/20'
            }`}>
              <span className="text-xs font-bold text-white">{conv.title.charAt(0)}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`text-sm font-semibold ${conv.unread ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {conv.title}
                </h3>
                <span className="text-xs text-text-tertiary ml-2">{conv.timestamp}</span>
              </div>

              {conv.provider && (
                <p className="text-xs text-text-tertiary mb-1">{conv.provider}</p>
              )}

              <p className="text-xs text-text-tertiary truncate">{conv.lastMessage}</p>
            </div>

            {/* Unread Indicator */}
            {conv.unread && (
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  )
}
