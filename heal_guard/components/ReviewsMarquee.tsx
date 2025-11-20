"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    content: "HealGuard's real-time monitoring capabilities have significantly improved patient outcomes.",
    avatar: "👩‍⚕️",
    rating: 5,
  },
  {
    name: "Emma Wilson",
    role: "Patient",
    content: "The emergency alert system has literally saved my life. The AI guidance is incredible.",
    avatar: "👩‍🦰",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Healthcare Admin",
    content: "Integrating HealGuard reduced appointment no-shows by 40% and improved satisfaction.",
    avatar: "👨‍💼",
    rating: 5,
  },
  {
    name: "Dr. James Smith",
    role: "General Practitioner",
    content: "The AI agents provide accurate consultations and significantly reduce wait times.",
    avatar: "👨‍⚕️",
    rating: 5,
  },
  {
    name: "Lisa Anderson",
    role: "Patient",
    content: "Best health monitoring app I've used. The interface is intuitive and the insights are valuable.",
    avatar: "👩‍🦱",
    rating: 5,
  },
  {
    name: "Dr. Priya Patel",
    role: "Neurologist",
    content: "Accurate health predictions and seamless integration with our practice management system.",
    avatar: "👩‍⚕️",
    rating: 5,
  },
]

export default function ReviewsMarquee() {
  const allReviews = [...reviews, ...reviews]

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Loved by Users</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 text-balance">
            Customer Success Stories
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Join thousands of satisfied users who've transformed their health with HealGuard
          </p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: [-100, -100 - 1920] }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="flex gap-6 min-w-max"
        >
          {allReviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="group flex-shrink-0 w-96 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border p-8 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-text-primary mb-6 text-lg leading-relaxed italic">"{review.content}"</p>

              <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                <div className="text-4xl">{review.avatar}</div>
                <div>
                  <p className="font-bold text-text-primary text-base">{review.name}</p>
                  <p className="text-sm text-text-secondary">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/50 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
