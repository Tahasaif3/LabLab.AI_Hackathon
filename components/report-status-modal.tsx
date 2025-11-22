"use client"

import { useState } from "react"
import { X, AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReportStatusModalProps {
  isOpen: boolean
  resource: any
  onClose: () => void
  onSubmit: (status: string) => void
}

export function ReportStatusModal({ isOpen, resource, onClose, onSubmit }: ReportStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen || !resource) return null

  const statusOptions = [
    {
      id: "open",
      label: "Still Open",
      description: "Resource is accepting people",
      icon: CheckCircle,
      color: "border-accent bg-accent/5 hover:bg-accent/10",
      iconColor: "text-accent",
    },
    {
      id: "full",
      label: "Full / At Capacity",
      description: "Resource is at maximum capacity",
      icon: AlertCircle,
      color: "border-secondary bg-secondary/5 hover:bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      id: "closed",
      label: "Closed",
      description: "Resource is no longer operating",
      icon: XCircle,
      color: "border-destructive bg-destructive/5 hover:bg-destructive/10",
      iconColor: "text-destructive",
    },
  ]

  const handleSubmit = async () => {
    if (!selectedStatus) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      onSubmit(selectedStatus)
      setSubmitted(true)
      setIsSubmitting(false)

      // Auto close after success message
      setTimeout(() => {
        setSubmitted(false)
        setSelectedStatus(null)
        onClose()
      }, 2000)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

      {/* Modal */}
      <div className="relative pointer-events-auto bg-card border-2 border-border/50 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h3 className="font-bold text-lg text-foreground">Report Status</h3>
            <p className="text-sm text-muted-foreground mt-1">{resource.name}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isSubmitting} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="flex justify-center">
                <div className="p-3 bg-accent/10 rounded-full">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h4 className="font-semibold text-foreground">Thank You!</h4>
              <p className="text-sm text-muted-foreground">
                Your report helps keep information accurate for others in crisis.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">What's the current status of this resource?</p>

              <div className="space-y-3">
                {statusOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = selectedStatus === option.id

                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedStatus(option.id)}
                      disabled={isSubmitting}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? `${option.color} border-2 border-current ring-2 ring-current/30`
                          : `${option.color} border-border/50`
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${option.iconColor}`} />
                        <div>
                          <p className="font-semibold text-foreground text-sm">{option.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Note */}
              <div className="bg-muted/50 border border-border/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  Your report is anonymous and helps the community stay informed. Thank you for contributing!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="flex gap-3 p-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-transparent"
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
                  Submitting
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
