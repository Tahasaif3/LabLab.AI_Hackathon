'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Heart, Settings, Bell, Users, BarChart3, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Step1Welcome from '@/components/Step1Welcome'
import Step2Profile from '@/components/Step2Profile'
import Step3Health from '@/components/Step3Health'
import Step4Notifications from '@/components/Step4Notifications'
import Step5Dashboard from '@/components/Step5Dashboard'

const steps = [
  { id: 1, title: 'Welcome', icon: Heart },
  { id: 2, title: 'Profile', icon: Settings },
  { id: 3, title: 'Health', icon: BarChart3 },
  { id: 4, title: 'Notifications', icon: Bell },
  { id: 5, title: 'Dashboard', icon: Users },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    profileData: {},
    healthData: {},
    notificationData: {},
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/dashboard')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onNext={handleNext} />
      case 2:
        return <Step2Profile data={formData.profileData} onChange={(data) => setFormData({...formData, profileData: data})} />
      case 3:
        return <Step3Health data={formData.healthData} onChange={(data) => setFormData({...formData, healthData: data})} />
      case 4:
        return <Step4Notifications data={formData.notificationData} onChange={(data) => setFormData({...formData, notificationData: data})} />
      case 5:
        return <Step5Dashboard />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep

              return (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isActive ? 'bg-primary text-white shadow-lg' : isCompleted ? 'bg-secondary text-white' : 'bg-border text-text-tertiary'
                    }`}
                    whileScale={{ scale: isActive ? 1.1 : 1 }}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </motion.div>
                  <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-text-tertiary'}`}>
                    {step.title}
                  </span>
                </motion.div>
              )
            })}
          </div>
          
          {/* Progress Track */}
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="card min-h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {currentStep !== 1 && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleBack}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {currentStep === steps.length ? 'Get Started' : 'Next'}
              {currentStep !== steps.length && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
