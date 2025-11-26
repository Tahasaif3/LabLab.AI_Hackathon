"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReportStatusModalProps {
  isOpen: boolean
  resource: any
  onClose: () => void
  onSubmit: (status: string) => void
  userLocation?: string  // Add user location
}

export function ReportStatusModal({
  isOpen,
  resource,
  onClose,
  onSubmit,
  userLocation = ""
}: ReportStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen || !resource) return null

  const statusOptions = [
    {
      id: "open",
      label: "Still Open",
      description: "This resource is accepting people",
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-500/10 border-green-500/20",
      glow: "shadow-[0_0_20px_-4px_rgba(34,197,94,0.5)]",
    },
    {
      id: "full",
      label: "Full / At Capacity",
      description: "Resource is currently full",
      icon: AlertCircle,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10 border-yellow-500/20",
      glow: "shadow-[0_0_20px_-4px_rgba(234,179,8,0.5)]",
    },
    {
      id: "closed",
      label: "Closed",
      description: "This resource is no longer operating",
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10 border-red-500/20",
      glow: "shadow-[0_0_20px_-4px_rgba(239,68,68,0.5)]",
    },
  ]

  const handleSubmit = async () => {
    if (!selectedStatus) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Send report to backend
      const response = await fetch('https://tahasaif3-crisisagent.hf.space/report-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resource_id: resource.id,
          resource_name: resource.name,
          status: selectedStatus,
          user_location: userLocation
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit report')
      }

      const result = await response.json()
      
      // Call the parent onSubmit callback
      onSubmit(selectedStatus)
      setSubmitted(true)

      // Close modal after success
      setTimeout(() => {
        setSubmitted(false)
        setSelectedStatus(null)
        onClose()
      }, 2000)

    } catch (err) {
      console.error('Error submitting status report:', err)
      setError('Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 220,
                damping: 20,
              },
            }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="
              relative pointer-events-auto max-w-md w-full mx-4 rounded-3xl p-0
              backdrop-blur-2xl border border-white/20 shadow-2xl
              bg-white/80 dark:bg-neutral-900/80
              transition-all duration-300
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/10">
              <div>
                <h3 className="font-semibold text-xl text-foreground">Report Status</h3>
                <p className="text-sm text-muted-foreground mt-1">{resource.name}</p>
              </div>

              <Button variant="ghost" size="icon" onClick={onClose} disabled={isSubmitting}
                className="rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <p className="text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </p>
                </motion.div>
              )}

              {submitted ? (
                <motion.div
                  className="text-center py-10 space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-green-500/20">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground text-lg">Thank You!</h4>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Your report helps keep information accurate for others.
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    What's the current status of this resource?
                  </p>

                  <div className="space-y-3">
                    {statusOptions.map((option) => {
                      const Icon = option.icon
                      const isSelected = selectedStatus === option.id

                      return (
                        <motion.button
                          key={option.id}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedStatus(option.id)}
                          disabled={isSubmitting}
                          className={`
                            w-full p-4 rounded-2xl border flex items-start gap-3 transition-all
                            backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed
                            ${
                              isSelected
                                ? `${option.bg} ${option.glow} border-transparent`
                                : "bg-muted/40 border-border/40 hover:bg-muted/60"
                            }
                          `}
                        >
                          <Icon className={`h-5 w-5 mt-0.5 ${option.color}`} />
                          <div className="text-left">
                            <p className="font-medium text-foreground">{option.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Note */}
                  <div className="mt-6 bg-muted/40 border border-border/30 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your report is anonymous and helps the community stay informed.
                      {userLocation && ` Reporting from: ${userLocation}`}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* FOOTER */}
            {!submitted && (
              <div className="p-6 border-t border-black/5 dark:border-white/10 flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedStatus || isSubmitting}
                  className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}