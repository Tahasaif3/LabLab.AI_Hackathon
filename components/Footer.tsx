'use client'

import Link from 'next/link'
import { Heart, Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram, Github, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer className="relative bg-gradient-to-b from-text-primary via-text-primary to-black text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-96 -right-96 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-96 -left-96 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-4 py-16"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-4xl font-bold mb-4">Stay Updated</h3>
              <p className="text-white/70 mb-8">Get the latest health tips, features, and exclusive insights delivered to your inbox.</p>
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:outline-none transition-all duration-300 backdrop-blur-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-5 gap-12 mb-16"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-7 h-7 text-white" />
                </motion.div>
                <span className="font-poppins font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  HealGuard
                </span>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                AI-powered healthcare platform that empowers you to take control of your health with real-time monitoring, expert consultations, and intelligent insights.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:hello@healguard.com" className="hover:text-primary transition-colors">
                    hello@healguard.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Product
              </h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Security', 'Mobile App', 'API'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/70 hover:text-primary transition-colors duration-300 flex items-center gap-1 group">
                      {item}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-secondary to-primary rounded-full" />
                Company
              </h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-300 flex items-center gap-1 group">
                      {item}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Legal
              </h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'HIPAA', 'Compliance', 'Cookies'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/70 hover:text-primary transition-colors duration-300 flex items-center gap-1 group">
                      {item}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-white/10 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-white/60 text-sm text-center md:text-left">
                © {currentYear} HealGuard. All rights reserved. Made with <span className="text-primary">❤</span> for better healthcare.
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="flex items-center gap-6"
              >
                {[
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Facebook, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Github, href: '#' },
                ].map(({ icon: Icon, href }, i) => (
                  <motion.a
                    key={i}
                    variants={itemVariants}
                    href={href}
                    className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </footer>
  )
}
