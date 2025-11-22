"use client"

import { useEffect, useState } from "react"
import { WifiOff } from "lucide-react"

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true)

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

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive/90 text-destructive-foreground px-4 py-2 flex items-center gap-2 border-b border-destructive animate-slide-down">
      <WifiOff className="h-4 w-4 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">No internet connection. Some features may be limited.</p>
    </div>
  )
}
