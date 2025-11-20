'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Stethoscope, Brain, Heart, Pill, Activity, TrendingUp, Send, ArrowLeft, Phone, Video, Info, MoreVertical } from 'lucide-react'

const agentsData = {
  'dr-smart': {
    name: 'Dr. Smart',
    title: 'General Practitioner',
    icon: Stethoscope,
    color: 'from-blue-500 to-cyan-500',
    status: 'Online',
    rating: 4.9,
    bio: 'AI-powered general practitioner with expertise in initial diagnosis, health assessment, and preventive care. Available 24/7 for your health queries.',
  },
  'cardio-ai': {
    name: 'CardioAI',
    title: 'Cardiologist',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    status: 'Online',
    rating: 4.95,
    bio: 'Specialized cardiologist AI focusing on heart health, cardiovascular prevention, and cardiac condition management.',
  },
  'neuro-expert': {
    name: 'NeuroExpert',
    title: 'Neurologist',
    icon: Brain,
    color: 'from-purple-500 to-indigo-500',
    status: 'Online',
    rating: 4.88,
    bio: 'Expert neurologist AI specializing in brain health, neurological conditions, and cognitive wellness.',
  },
  'pharma-guide': {
    name: 'PharmaGuide',
    title: 'Pharmacist',
    icon: Pill,
    color: 'from-green-500 to-emerald-500',
    status: 'Online',
    rating: 4.92,
    bio: 'Professional pharmacist AI providing medication guidance, drug interaction analysis, and pharmacy support.',
  },
  'fitness-coach': {
    name: 'FitCoach',
    title: 'Fitness Specialist',
    icon: Activity,
    color: 'from-orange-500 to-amber-500',
    status: 'Online',
    rating: 4.87,
    bio: 'Personalized fitness AI coach creating customized workout plans and wellness strategies.',
  },
  'wellness-ai': {
    name: 'WellnessAI',
    title: 'Wellness Advisor',
    icon: TrendingUp,
    color: 'from-teal-500 to-cyan-500',
    status: 'Online',
    rating: 4.90,
    bio: 'Holistic wellness AI focused on preventive health, lifestyle optimization, and sustainable wellness.',
  },
}

interface Message {
  id: string
  sender: 'user' | 'agent'
  content: string
  timestamp: Date
}

export default function AgentChatPage({ params }: { params: { id: string } }) {
  const agentId = params.id as keyof typeof agentsData
  const agent = agentsData[agentId]
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      content: `Hello! I'm ${agent.name}, your ${agent.title}. How can I help you with your health today?`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        content: `Thank you for your question about "${inputValue}". Based on my expertise as a ${agent.title}, I would recommend... [Your comprehensive response will appear here]`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsLoading(false)
    }, 1500)
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Agent not found</h1>
          <Link href="/dashboard/agents" className="text-primary hover:underline">
            Back to agents
          </Link>
        </div>
      </div>
    )
  }

  const Icon = agent.icon

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen flex flex-col bg-background"
    >
      {/* Header */}
      <div className="bg-card border-b border-border p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/dashboard/agents"
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Back to Agents</span>
          </Link>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 text-text-secondary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <Video className="w-5 h-5 text-text-secondary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-text-secondary" />
            </motion.button>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-text-primary">{agent.name}</h2>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
            </div>
            <p className="text-primary font-semibold">{agent.title}</p>
            <p className="text-sm text-text-secondary">★ {agent.rating} | {agent.status}</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        <AnimatePresence mode="wait">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-none'
                    : 'bg-card border border-border text-text-primary rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className={`text-xs mt-1 block ${
                  message.sender === 'user' ? 'text-white/70' : 'text-text-secondary'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-card border border-border text-text-primary px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-2">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <div className="bg-card border-t border-border p-4 md:p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your health question..."
            className="flex-1 bg-surface border border-border rounded-full px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        <p className="text-xs text-text-secondary mt-3 text-center">
          This is an AI assistant. For emergencies, please contact emergency services.
        </p>
      </div>
    </motion.main>
  )
}
