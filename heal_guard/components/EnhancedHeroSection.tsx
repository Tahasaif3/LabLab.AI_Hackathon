"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Activity, Heart, Zap, Play } from "lucide-react"
import Image from "next/image"

export default function EnhancedHeroSection() {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-br from-background via-primary/2 to-secondary/2 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Two column layout: Text left, Image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-8 border border-primary/20"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI-Powered Healthcare Revolution
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight"
            >
              Your{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Personal AI Health
              </span>{" "}
              Guardian
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-text-secondary max-w-xl mb-10 text-balance leading-relaxed"
            >
              Monitor health in real-time, get emergency alerts, book appointments with top doctors, and consult with AI
              healthcare specialists instantly. All in one unified platform.
            </motion.p>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-col gap-3 mb-10"
            >
              {["24/7 AI Health Monitoring", "Emergency Response in Seconds", "Book Doctors & AI Consultations"].map(
                (feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <span className="text-text-primary font-medium">{feature}</span>
                  </div>
                ),
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/onboarding"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border-2 border-primary text-primary font-bold rounded-full hover:bg-primary/5 transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/10">
              {/* Floating gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 z-10" />

              {/* Medical image */}
              <Image
                src="/medical.jpg"
                alt="Healthcare professional with patient"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Floating stats card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-lg border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-secondary uppercase">Heart Rate</p>
                    <p className="text-2xl font-bold text-text-primary">72 BPM</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-gradient-to-br from-secondary to-emerald-500 rounded-2xl shadow-2xl p-4 text-white backdrop-blur-lg"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  <div>
                    <p className="text-xs font-semibold uppercase">Status</p>
                    <p className="font-bold">Healthy</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-16 border-t border-border"
        >
          {[
            { number: "50K+", label: "Active Users" },
            { number: "99.9%", label: "Uptime" },
            { number: "10M+", label: "Daily Data Points" },
            { number: "24/7", label: "AI Support" },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className="text-center">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-sm text-text-secondary mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
