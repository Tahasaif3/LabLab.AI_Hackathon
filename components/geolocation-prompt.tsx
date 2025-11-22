"use client"

import { useState } from "react"
import { MapPin, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface GeolocationPromptProps {
  isOpen: boolean
  error: string | null
  isLoading: boolean
  onRetry: () => void
  onManualEntry: (city: string) => void
  onClose: () => void
}

export function GeolocationPrompt({
  isOpen,
  error,
  isLoading,
  onRetry,
  onManualEntry,
  onClose,
}: GeolocationPromptProps) {
  const [manualCity, setManualCity] = useState("")
  const [showManualInput, setShowManualInput] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

      {/* Modal */}
      <div className="relative pointer-events-auto bg-card border-2 border-border/50 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-fade-in p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-center text-foreground mb-2">
          {error ? "Location Error" : "Enable Location"}
        </h3>

        {error && (
          <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg mb-4">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mb-6">
          {showManualInput
            ? "Enter your city or zip code to find nearby resources."
            : "We need your location to find emergency resources near you. Your data is secure and only used this session."}
        </p>

        {/* Manual Input */}
        {showManualInput ? (
          <div className="space-y-3 mb-6">
            <Input
              placeholder="e.g., New York or 10001"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && manualCity && onManualEntry(manualCity)}
              className="rounded-xl"
            />
            <Button
              onClick={() => manualCity && onManualEntry(manualCity)}
              disabled={!manualCity || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              Continue
            </Button>
            <Button onClick={() => setShowManualInput(false)} variant="outline" className="w-full rounded-xl">
              Back
            </Button>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            <Button
              onClick={onRetry}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Locating...
                </>
              ) : (
                "Share My Location"
              )}
            </Button>

            <button
              onClick={() => setShowManualInput(true)}
              className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/50 hover:bg-muted text-foreground text-sm font-medium transition-colors"
            >
              Enter City Manually
            </button>
          </div>
        )}

        {/* Privacy note */}
        <p className="text-xs text-muted-foreground text-center">
          Your location data is never stored and is deleted when you close this app.
        </p>
      </div>
    </div>
  )
}
