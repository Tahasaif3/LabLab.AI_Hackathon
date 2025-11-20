"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  AlertCircle,
  Calendar,
  MessageSquare,
  TrendingUp,
  Shield,
  ArrowRight,
  Zap,
  Users,
  Activity,
  CheckCircle,
  Star,
  Clock,
  Lock,
  Stethoscope,
} from "lucide-react"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import TestimonialSection from "@/components/TestimonialSection"
import ReviewsMarquee from "@/components/ReviewsMarquee"
import FeaturesMarquee from "@/components/FeaturesMarquee"
import EnhancedFooter from "@/components/EnhancedFooter"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const aiAgents = [
    {
      name: "Dr. Smart",
      role: "General Practitioner",
      avatar: "👨‍⚕️",
      bgColor: "from-blue-500 to-cyan-500",
      rating: 4.9,
      consultations: "2.3K+",
    },
    {
      name: "CardioAI",
      role: "Cardiologist",
      avatar: "❤️",
      bgColor: "from-red-500 to-pink-500",
      rating: 4.95,
      consultations: "1.8K+",
    },
    {
      name: "NeuroExpert",
      role: "Neurologist",
      avatar: "🧠",
      bgColor: "from-purple-500 to-indigo-500",
      rating: 4.92,
      consultations: "1.5K+",
    },
    {
      name: "PharmaGuide",
      role: "Pharmacist",
      avatar: "💊",
      bgColor: "from-green-500 to-emerald-500",
      rating: 4.88,
      consultations: "1.2K+",
    },
  ]

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <HeroSection />

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div
            style={{ y: scrollY * 0.5 }}
            className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: scrollY * -0.3 }}
            className="absolute bottom-0 -left-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "50K+", label: "Active Users", icon: Users },
              { number: "99.9%", label: "Uptime", icon: Shield },
              { number: "10M+", label: "Data Points Daily", icon: Activity },
              { number: "24/7", label: "AI Support", icon: Zap },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.1)" }}
                  className="group relative bg-card rounded-2xl border border-border p-6 cursor-pointer hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <p className="text-sm text-text-secondary mt-2">{stat.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-32 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ y: scrollY * 0.8 }}
            className="absolute -top-40 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: scrollY * -0.5 }}
            className="absolute -bottom-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Designed to Make a Difference</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 text-balance leading-tight">
              Complete Health Management at Your Fingertips
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto text-balance">
              AI-powered monitoring, emergency response, and healthcare consultations in one unified platform
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Health Monitoring - Large Card with Gradient */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -12 }}
              className="lg:col-span-2 group relative bg-gradient-to-br from-rose-400 via-pink-300 to-red-300 rounded-3xl border-2 border-rose-200 p-8 md:p-10 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Health Monitoring</h3>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  Real-time tracking of vital signs with AI-powered disease prediction
                </p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Emergency Response - Orange/Red Gradient */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -12 }}
              className="group relative bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-300 rounded-3xl border-2 border-orange-200 p-8 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Emergency Response</h3>
                <p className="text-white/90 text-sm mb-4 leading-relaxed">
                  Instant alerts with instant contact notification
                </p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all text-sm">
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Appointments - Blue/Cyan Gradient */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -12 }}
              className="group relative bg-gradient-to-br from-cyan-400 via-blue-300 to-blue-400 rounded-3xl border-2 border-cyan-200 p-8 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Smart Appointments</h3>
                <p className="text-white/90 text-sm mb-4 leading-relaxed">Book with auto-confirmation and reminders</p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all text-sm">
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Chat/Consultation - Purple/Violet Gradient */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -12 }}
              className="group relative bg-gradient-to-br from-purple-400 via-purple-300 to-violet-400 rounded-3xl border-2 border-purple-200 p-8 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI Consultations</h3>
                <p className="text-white/90 text-sm mb-4 leading-relaxed">Chat with healthcare providers instantly</p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all text-sm">
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Analytics - Green/Emerald Gradient */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -12 }}
              className="group relative bg-gradient-to-br from-green-400 via-emerald-300 to-teal-400 rounded-3xl border-2 border-green-200 p-8 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Health Analytics</h3>
                <p className="text-white/90 text-sm mb-4 leading-relaxed">Track trends and long-term progress</p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all text-sm">
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -12 }}
className="lg:col-span-2 group relative bg-gradient-to-br from-sky-400 via-cyan-300 to-blue-500 rounded-3xl border-2 border-sky-200 p-8 md:p-10 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">AI Agents Hub</h3>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                Explore how HealGuard’s intelligent agents work together — diagnosis, summarization, orchestration, routing, and more                </p>
                <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-surface to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ y: scrollY * 0.6 }}
            className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6"
            >
              <Users className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">Meet Your AI Agents</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 text-balance leading-tight">
              Chat with Specialized AI Healthcare Agents
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto text-balance">
              Get instant consultations from our highly-rated AI specialists available 24/7
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {aiAgents.map((agent, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -12 }}
                className="group relative bg-card rounded-3xl border-2 border-border p-8 overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${agent.bgColor} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Avatar */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className={`w-20 h-20 bg-gradient-to-br ${agent.bgColor} rounded-3xl flex items-center justify-center mb-6 shadow-lg text-4xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {agent.avatar}
                  </motion.div>

                  {/* Name and Role */}
                  <h3 className="text-xl font-bold text-text-primary mb-2">{agent.name}</h3>
                  <p className="text-text-secondary text-sm mb-6">{agent.role}</p>

                  {/* Rating and Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-text-primary">{agent.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{agent.consultations} consultations</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 px-4 bg-gradient-to-r ${agent.bgColor} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105 transform`}
                  >
                    Chat Now
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

   <section className="py-28 px-4 bg-gradient-to-b from-surface to-background  relative">
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      className="absolute -top-72 -right-72 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-40"
    />
  </div>

  <div className="max-w-6xl mx-auto relative z-10">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-300"
      >
        <Lock className="w-4 h-4 text-gray-700" />
        <span className="text-sm font-semibold text-gray-700">Enterprise Security</span>
      </motion.div>

      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Trusted & Certified for Your Safety
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        HealGuard is certified to international healthcare, medical device and data security standards
      </p>
    </motion.div>

    {/* Certifications Grid */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
    >
      {[
        { icon: Shield, label: "HIPAA Compliant", desc: "Healthcare privacy" },
        { icon: Lock, label: "End-to-End Encryption", desc: "Data protection" },
        { icon: Stethoscope, label: "FDA Certified", desc: "Medical device" },
        { icon: CheckCircle, label: "SOC 2 Certified", desc: "Security standards" },
      ].map((cert, i) => {
        const Icon = cert.icon
        return (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-gray-200 p-6 text-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 text-gray-700" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{cert.label}</h4>
            <p className="text-gray-600 text-sm">{cert.desc}</p>
          </motion.div>
        )
      })}
    </motion.div>

    {/* Featured In Logos */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <p className="text-gray-500 text-sm font-semibold mb-8">As featured in</p>
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
        {["TechCrunch", "Forbes", "Medical Today", "Health Magazine"].map((publication, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600 font-semibold hover:text-gray-900 cursor-pointer"
          >
            {publication}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
</section>


      <section className="py-28 px-4 bg-gradient-to-b from-surface to-background  relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <motion.div
            style={{ y: scrollY * -1 }}
            className="absolute -top-96 -right-96 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: scrollY * 0.5 }}
            className="absolute -bottom-96 -left-96 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-900 text-balance mb-8 text-5xl md:text-6xl font-bold leading-tight"
          >
            Your Health, Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Join thousands of users who've transformed their health journey with AI-powered monitoring, instant
            consultations, and 24/7 support.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-2xl shadow-lg hover:scale-105 text-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-900 font-bold rounded-full border-2 border-white/40 hover:bg-white/25 hover:border-white/60 transition-all duration-300 backdrop-blur-sm text-lg"
            >
              Explore Features
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <ReviewsMarquee />
      <FeaturesMarquee />

      <TestimonialSection />
      <EnhancedFooter />
    </main>
  )
}
