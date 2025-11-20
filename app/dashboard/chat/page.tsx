'use client'

import { motion } from 'framer-motion'
import { Send, Plus, Search, MoreVertical } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import ChatWindow from '@/components/ChatWindow'
import ConversationList from '@/components/ConversationList'

interface Message {
  id: number
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

interface Conversation {
  id: number
  title: string
  provider?: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

const initialConversations: Conversation[] = [
  {
    id: 1,
    title: 'General Health Checkup',
    provider: 'AI Health Assistant',
    lastMessage: 'Your vitals look stable. Continue monitoring...',
    timestamp: 'Today',
    unread: true,
  },
  {
    id: 2,
    title: 'Dr. Sarah Johnson',
    provider: 'Cardiologist',
    lastMessage: 'Please schedule a follow-up appointment',
    timestamp: 'Yesterday',
    unread: false,
  },
]

export default function ChatPage() {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeConversation, setActiveConversation] = useState(1)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m your HealGuard AI Health Assistant. How can I help you today?',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      sender: 'user',
      text: 'I\'ve been experiencing some chest discomfort lately',
      timestamp: '10:31 AM',
    },
    {
      id: 3,
      sender: 'ai',
      text: 'I\'m sorry to hear that. Chest discomfort can have many causes. Can you describe the type of pain? Is it sharp, dull, or pressure-like?',
      timestamp: '10:32 AM',
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, userMessage])
    setInputMessage('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Thank you for sharing that. Based on your description, I recommend monitoring your symptoms closely. If the discomfort persists or worsens, please contact your healthcare provider immediately.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMessage])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-80px)] bg-background">
      {/* Conversation List */}
      <div className="hidden md:flex md:w-80 border-r border-border flex-col bg-surface">
        {/* Header */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Messages</h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-surface-alt rounded-lg transition"
            >
              <Plus className="w-6 h-6 text-primary" />
            </motion.button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </div>

        {/* Conversations */}
        <ConversationList
          conversations={conversations}
          activeId={activeConversation}
          onSelect={setActiveConversation}
        />
      </div>

      {/* Chat Window */}
      <ChatWindow
        messages={messages}
        loading={loading}
        inputMessage={inputMessage}
        onInputChange={setInputMessage}
        onSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  )
}
