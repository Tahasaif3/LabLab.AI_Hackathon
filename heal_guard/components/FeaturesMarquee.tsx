"use client"

import { motion } from "framer-motion"
import { Heart, AlertCircle, Calendar, MessageSquare, TrendingUp, Zap } from "lucide-react"

const features = [
  {
    title: "Real-time Health Monitoring",
    description: "Track your vitals 24/7 with AI-powered insights and disease prediction",
    icon: Heart,
    gradient: "from-rose-500 to-pink-500",
    color: "#ec4899",
  },
  {
    title: "Emergency Response",
    description: "Instant alerts and one-click SOS with emergency contact notifications",
    icon: AlertCircle,
    gradient: "from-orange-500 to-red-500",
    color: "#f97316",
  },
  {
    title: "Smart Appointments",
    description: "Book appointments with auto-confirmation and smart reminders",
    icon: Calendar,
    gradient: "from-cyan-500 to-blue-500",
    color: "#0ea5e9",
  },
  {
    title: "Live Chat with Doctor",
    description: "Instant consultations with AI agents and licensed healthcare providers",
    icon: MessageSquare,
    gradient: "from-purple-500 to-violet-500",
    color: "#a855f7",
  },
  {
    title: "Health Analytics",
    description: "Comprehensive insights and trends with interactive health reports",
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-500",
    color: "#10b981",
  },
  {
    title: "AI-Powered Health Assistant",
    description: "Get personalized health recommendations powered by advanced AI models",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
    color: "#eab308",
  },
]

export default function FeaturesMarquee() {
  const allFeatures = [...features, ...features]

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-20 left-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">All Features</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 text-balance">
            Everything You Need for Perfect Health
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Comprehensive healthcare features designed to keep you healthy and informed
          </p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: [-100, -100 - 1920] }}
          transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="flex gap-6 min-w-max"
        >
          {allFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                whileHover={{ y: -12 }}
                className="group flex-shrink-0 w-96 bg-gradient-to-br from-card to-card/50 rounded-2xl border-2 border-border p-8 backdrop-blur-sm hover:border-transparent transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "3rem" }}
                    transition={{ duration: 0.3 }}
                    className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-6`}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
