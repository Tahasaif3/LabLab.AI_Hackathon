'use client'

import { motion } from 'framer-motion'
import { Send, Paperclip, Smile } from 'lucide-react'
import { useState } from 'react'

interface Message {
  id: number
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

interface ChatWindowProps {
  messages: Message[]
  loading: boolean
  inputMessage: string
  onInputChange: (value: string) => void
  onSendMessage: (e: React.FormEvent) => void
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export default function ChatWindow({
  messages,
  loading,
  inputMessage,
  onInputChange,
  onSendMessage,
  messagesEndRef,
}: ChatWindowProps) {
  return (
    <div className="flex-1 flex flex-col bg-surface">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">General Health Checkup</h2>
          <p className="text-sm text-text-tertiary">AI Health Assistant</p>
        </div>
        <button className="p-2 hover:bg-surface-alt rounded-lg transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, idx) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-surface-alt border border-border text-text-primary rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-white/70' : 'text-text-tertiary'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-surface-alt border border-border px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 bg-surface">
        <form onSubmit={onSendMessage} className="flex gap-3">
          <button
            type="button"
            className="p-2 hover:bg-surface-alt rounded-lg transition text-text-secondary hover:text-primary"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="button"
            className="p-2 hover:bg-surface-alt rounded-lg transition text-text-secondary hover:text-primary"
          >
            <Smile className="w-5 h-5" />
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  )
}
