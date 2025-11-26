"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SosButton } from "@/components/sos-button"
import { OfflineBanner } from "@/components/offline-banner"
import { ReportStatusModal } from "@/components/report-status-modal"
import { GeolocationPrompt } from "@/components/geolocation-prompt"
import { EnhancedChatPanel } from "@/components/enhanced-chat-panel"
import { GoogleMapsEmbed } from "@/components/google-maps-embed"
import { SettingsPage } from "@/components/settings-page"
import { TopToast } from "./Top-toast"

export function EmergencyApp() {
  const [chatOpen, setChatOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<any>(null)
  const [toast, setToast] = useState({ show: false, message: "" })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [resources, setResources] = useState<any[]>([
    {
      id: 1,
      name: "Downtown Shelter",
      lat: 40.7128,
      lng: -74.006,
      status: "OPEN",
      distance: "0.5 km",
    },
    {
      id: 2,
      name: "Community Center",
      lat: 40.758,
      lng: -73.9855,
      status: "FULL",
      distance: "1.2 km",
    },
    {
      id: 3,
      name: "Central Hospital",
      lat: 40.7614,
      lng: -73.9776,
      status: "OPEN",
      distance: "2.1 km",
    },
  ])
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)
  const [showGeolocationPrompt, setShowGeolocationPrompt] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const requestGeolocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported. Please enter your location manually.")
      setShowGeolocationPrompt(true)
      return
    }

    setIsLocating(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLocating(false)
        setChatOpen(true)
      },
      (error) => {
        setIsLocating(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location permission denied. Please enable it in settings.")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location unavailable. Please check your GPS.")
            break
          case error.TIMEOUT:
            setLocationError("Location request timed out. Please try again.")
            break
          default:
            setLocationError("Unable to get location. Please try manual entry.")
        }
        setShowGeolocationPrompt(true)
      },
      { timeout: 10000, enableHighAccuracy: true },
    )
  }

  
const showToast = (m: string) => {
  setToast({ show: true, message: m })

  setTimeout(() => {
    setToast({ show: false, message: "" })
  }, 2500)
}

  const handleManualLocation = (city: string) => {
    const locations: Record<string, { lat: number; lng: number }> = {
      "new york": { lat: 40.7128, lng: -74.006 },
      "los angeles": { lat: 34.0522, lng: -118.2437 },
      chicago: { lat: 41.8781, lng: -87.6298 },
      houston: { lat: 29.7604, lng: -95.3698 },
    }

    const location = locations[city.toLowerCase()]
    if (location) {
      setUserLocation(location)
      setShowGeolocationPrompt(false)
      setChatOpen(true)
    } else {
      setLocationError("City not found. Please try a major city.")
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <TopToast show={toast.show} message={toast.message} />
      {!isOnline && <OfflineBanner />}

      <Header onSettingsClick={() => setSettingsOpen(true)} />

      <div className="absolute inset-0 top-16 z-0">
        <GoogleMapsEmbed
          lat={userLocation?.lat || 40.7128}
          lng={userLocation?.lng || -74.006}
          zoom={15}
          title="Crisis Resources Map"
          height="100%"
        />
      </div>

      <div className="absolute inset-0 top-16 z-20 flex items-center justify-center pointer-events-none">
        <SosButton onActivate={requestGeolocation} isLoading={isLocating} />
      </div>

      <GeolocationPrompt
        isOpen={showGeolocationPrompt}
        error={locationError}
        isLoading={isLocating}
        onRetry={requestGeolocation}
        onManualEntry={handleManualLocation}
        onClose={() => {
          setShowGeolocationPrompt(false)
          setLocationError(null)
        }}
      />

      <EnhancedChatPanel
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onReportClick={(resource) => {
          setSelectedResource(resource)
          setReportModalOpen(true)
        }}
      />

      <ReportStatusModal
        isOpen={reportModalOpen}
        resource={selectedResource}
        onClose={() => {
          setReportModalOpen(false)
          setSelectedResource(null)
        }}
        onSubmit={(status) => {
          showToast("Report submitted successfully!")
          console.log("Report submitted:", status)
          setReportModalOpen(false)
        }}
      />

      <SettingsPage isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
