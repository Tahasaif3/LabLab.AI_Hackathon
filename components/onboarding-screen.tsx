"use client"

import { useState } from "react"
import { ChevronRight, AlertTriangle, MapPin, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GoogleMapsEmbed } from "@/components/google-maps-embed"

interface OnboardingScreenProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: AlertTriangle,
      title: "Crisis Resource Locator",
      description: "Get emergency help instantly. Find shelters, resources, and support in your area in seconds.",
      color: "text-primary",
      bgGradient: "from-primary/15 to-primary/5",
      mapLat: 40.7128,
      mapLng: -74.006,
    },
    {
      icon: MapPin,
      title: "Share Your Location",
      description:
        "One tap to share your location and find nearby resources. Your privacy is protected—no data stored after your session.",
      color: "text-secondary",
      bgGradient: "from-secondary/15 to-secondary/5",
      mapLat: 40.758,
      mapLng: -73.9855,
    },
    {
      icon: Zap,
      title: "Get Real Help Fast",
      description:
        "Chat with our intelligent assistant to get personalized help and detailed information about available resources.",
      color: "text-primary",
      bgGradient: "from-primary/15 to-primary/5",
      mapLat: 40.7614,
      mapLng: -73.9776,
    },
    {
      icon: Shield,
      title: "Help Others",
      description:
        "Report resource status to keep information accurate. Your updates help other people find assistance faster.",
      color: "text-accent",
      bgGradient: "from-accent/15 to-accent/5",
      mapLat: 40.6892,
      mapLng: -74.0445,
    },
  ]

  const step = steps[currentStep]
  const Icon = step.icon

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/6 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-32 left-10 w-96 h-96 bg-secondary/6 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Left: Google Maps Embed */}
        <div className="hidden lg:flex flex-1 animate-float">
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20">
            <GoogleMapsEmbed lat={step.mapLat} lng={step.mapLng} zoom={18} />
          </div>
        </div>

        {/* Right: Onboarding Content */}
        <div className="w-full lg:max-w-md flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in">
          {/* Icon with glow */}
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-40"></div>
            <div
              className={`relative bg-gradient-to-br ${step.bgGradient} p-10 rounded-3xl border border-primary/20 shadow-2xl`}
            >
              <Icon className={`h-20 w-20 ${step.color} animate-pulse-scale`} />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{step.title}</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{step.description}</p>

          {/* Progress indicators */}
          <div className="flex gap-2 mb-12">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ${
                  index === currentStep
                    ? "w-10 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
                    : "w-3 h-3 bg-muted rounded-full"
                }`}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="w-full space-y-4">
            <Button
              onClick={handleNext}
              className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-xl text-white shadow-lg transition-all active:scale-95"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Enter Emergency Mode <ChevronRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Next <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            {currentStep > 0 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="w-full h-12 rounded-xl font-semibold"
              >
                Back
              </Button>
            )}
          </div>

          {/* Step indicator */}
          <p className="mt-8 text-sm text-muted-foreground font-medium">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  )
}
