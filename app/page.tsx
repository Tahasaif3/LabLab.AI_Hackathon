"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { EmergencyApp } from "@/components/emergency-app"

export default function Home() {
  const [stage, setStage] = useState<"landing" | "onboarding" | "app">("landing")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleGetStarted = () => {
    setStage("onboarding")
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboarding-completed", "true")
    setStage("app")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-background to-card">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-primary rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {stage === "landing" && <LandingPage onGetStarted={handleGetStarted} />}
      {stage === "onboarding" && <OnboardingScreen onComplete={handleOnboardingComplete} />}
      {stage === "app" && <EmergencyApp />}
    </>
  )
}
