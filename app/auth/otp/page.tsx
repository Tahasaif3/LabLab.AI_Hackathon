'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      alert('Please enter all 6 digits')
      return
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      router.push('/onboarding')
      setLoading(false)
    }, 1000)
  }

  const handleResend = () => {
    setTimer(60)
    setOtp(['', '', '', '', '', ''])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="card border-2 border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-text-secondary">We sent a 6-digit code to your email</p>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={el => { inputRefs.current[index] = el }}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-2xl font-bold border-2 border-border rounded-lg bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Resend */}
          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p className="text-text-secondary text-sm">
                Resend code in <span className="font-semibold text-primary">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-primary font-semibold hover:text-primary-dark transition text-sm"
              >
                Resend Code
              </button>
            )}
          </div>

          {/* Help */}
          <p className="mt-4 text-center text-xs text-text-tertiary">
            Didn't receive the code?{' '}
            <button className="text-primary hover:underline font-semibold">
              Request new code
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
