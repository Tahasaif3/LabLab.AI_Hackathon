'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Heart, CheckCircle, Shield, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false
  })

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (step === 1) {
      if (!formData.fullName || !formData.email) {
        setError('Please fill in all fields')
        return
      }
      setStep(2)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setTimeout(() => {
      router.push('/auth/otp')
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFocus = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field: string) => {
    setIsFocused(prev => ({ ...prev, [field]: false }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Background Shapes */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Panel - Brand & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center space-y-10"
          >
            {/* Brand Section */}
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Heart className="w-7 h-7 text-white" fill="currentColor" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
                    HealGuard
                  </h1>
                  <p className="text-lg text-slate-600 mt-2 font-light">
                    Join Our Healthcare Community
                  </p>
                </div>
              </motion.div>

              <p className="text-xl text-slate-700 leading-relaxed font-light max-w-lg">
                Start your journey to better health with AI-powered monitoring and expert care.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { 
                  icon: CheckCircle, 
                  title: 'Instant Setup', 
                  desc: 'Ready in 2 minutes',
                  color: 'text-green-500',
                  bgColor: 'bg-green-50'
                },
                { 
                  icon: Shield, 
                  title: 'Secure Data', 
                  desc: 'End-to-end encryption',
                  color: 'text-blue-500',
                  bgColor: 'bg-blue-50'
                },
                { 
                  icon: Heart, 
                  title: 'AI Health Agents', 
                  desc: '24/7 expert support',
                  color: 'text-pink-500',
                  bgColor: 'bg-pink-50'
                },
                { 
                  icon: Star, 
                  title: 'Premium Features', 
                  desc: 'Advanced analytics',
                  color: 'text-amber-500',
                  bgColor: 'bg-amber-50'
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                      <p className="text-sm text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-4 leading-relaxed">
                    "HealGuard has completely transformed how I monitor my health. The AI insights caught issues I didn't even know I had."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      SM
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Sarah Mitchell</div>
                      <div className="text-sm text-slate-600">Patient for 2 years</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Panel - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 lg:p-10">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20"
                  >
                    <Heart className="w-8 h-8 text-white" fill="currentColor" />
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3"
                  >
                    Create Account
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-600 mb-6"
                  >
                    Join thousands of health-conscious individuals
                  </motion.p>

                  {/* Progress Steps */}
                  <div className="flex gap-3 justify-center mb-2">
                    {[1, 2].map((s) => (
                      <div key={s} className="flex items-center gap-3">
                        <motion.div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            s === step 
                              ? 'bg-gradient-to-r from-blue-500 to-emerald-500 w-8' 
                              : s < step 
                                ? 'bg-green-500 w-2' 
                                : 'bg-slate-300 w-2'
                          }`}
                          layoutId="step"
                        />
                        {s < 2 && (
                          <motion.div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                              s < step 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : s === step
                                  ? 'border-blue-500 text-blue-500'
                                  : 'border-slate-300 text-slate-400'
                            }`}
                          >
                            {s < step ? '✓' : s}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center gap-8 text-xs text-slate-500">
                    <span className={step === 1 ? 'text-blue-600 font-semibold' : ''}>Personal Info</span>
                    <span className={step === 2 ? 'text-blue-600 font-semibold' : ''}>Security</span>
                  </div>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: step === 1 ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: step === 1 ? -20 : 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step === 1 ? (
                        <div className="space-y-5">
                          {/* Full Name */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              Full Name
                            </label>
                            <div className="relative group">
                              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                isFocused.fullName ? 'text-blue-500' : 'text-slate-400'
                              }`} />
                              <input
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                onFocus={() => handleFocus('fullName')}
                                onBlur={() => handleBlur('fullName')}
                                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder:text-slate-500 hover:border-slate-400"
                              />
                            </div>
                          </motion.div>

                          {/* Email */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              Email Address
                            </label>
                            <div className="relative group">
                              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                isFocused.email ? 'text-blue-500' : 'text-slate-400'
                              }`} />
                              <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder:text-slate-500 hover:border-slate-400"
                              />
                            </div>
                          </motion.div>

                          {/* Terms */}
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xs text-slate-600 text-center pt-2"
                          >
                            By continuing, you agree to our{' '}
                            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                              Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                              Privacy Policy
                            </Link>
                          </motion.p>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          {/* Password */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              Password
                            </label>
                            <div className="relative group">
                              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                isFocused.password ? 'text-blue-500' : 'text-slate-400'
                              }`} />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                className="w-full pl-12 pr-12 py-4 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder:text-slate-500 hover:border-slate-400"
                              />
                              <motion.button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </motion.button>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                              Must be at least 6 characters
                            </p>
                          </motion.div>

                          {/* Confirm Password */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              Confirm Password
                            </label>
                            <div className="relative group">
                              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                isFocused.confirmPassword ? 'text-blue-500' : 'text-slate-400'
                              }`} />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onFocus={() => handleFocus('confirmPassword')}
                                onBlur={() => handleBlur('confirmPassword')}
                                className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-900 placeholder:text-slate-500 hover:border-slate-400"
                              />
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className={`flex gap-3 pt-4 ${step === 2 ? 'flex-row' : 'flex-col'}`}>
                    {step === 2 && (
                      <motion.button
                        type="button"
                        onClick={() => setStep(1)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-4 border border-slate-300 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all font-semibold text-slate-700"
                      >
                        Back
                      </motion.button>
                    )}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: loading ? 1 : 1.01 }}
                      whileTap={{ scale: loading ? 1 : 0.99 }}
                      className={`py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                        step === 2 ? 'flex-1' : 'w-full'
                      }`}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, linear: true }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          {step === 1 ? 'Continuing...' : 'Creating Account...'}
                        </>
                      ) : (
                        <>
                          {step === 1 ? 'Continue' : 'Create Account'}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                {/* Sign In Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center text-slate-600"
                >
                  Already have an account?{' '}
                  <Link 
                    href="/auth/login" 
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Sign in here
                  </Link>
                </motion.div>
              </div>

              {/* Security Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <Shield className="w-4 h-4" />
                  <span>Your personal health data is protected with bank-level security</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}