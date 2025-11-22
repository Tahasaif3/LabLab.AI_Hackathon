"use client"

import { useEffect, useRef } from "react"
import { Navigation2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RealMapProps {
  userLocation: { lat: number; lng: number } | null
  resources: Array<{
    id: number
    name: string
    lat: number
    lng: number
    status: "OPEN" | "FULL" | "CLOSED"
    distance?: string
  }>
  onResourceClick?: (resource: any) => void
}

export function RealMap({ userLocation, resources, onResourceClick }: RealMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || !userLocation) return

    // Create interactive map using HTML/Canvas
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = mapRef.current.offsetWidth
    canvas.height = mapRef.current.offsetHeight

    const drawMap = () => {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgb(15, 23, 42)")
      gradient.addColorStop(1, "rgb(30, 41, 59)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid pattern
      ctx.strokeStyle = "rgba(100, 116, 139, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw user location
      if (userLocation) {
        const userX = canvas.width / 2
        const userY = canvas.height / 2

        // Pulse circle
        ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
        ctx.beginPath()
        ctx.arc(userX, userY, 40, 0, Math.PI * 2)
        ctx.fill()

        // User dot
        ctx.fillStyle = "#3b82f6"
        ctx.beginPath()
        ctx.arc(userX, userY, 10, 0, Math.PI * 2)
        ctx.fill()

        // Direction indicator
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(userX, userY)
        ctx.lineTo(userX, userY - 25)
        ctx.stroke()
      }

      // Draw resources
      resources.forEach((resource, index) => {
        const angle = (index / resources.length) * Math.PI * 2
        const distance = 100
        const x = canvas.width / 2 + Math.cos(angle) * distance
        const y = canvas.height / 2 + Math.sin(angle) * distance

        const color = resource.status === "OPEN" ? "#22c55e" : "#ef4444"

        // Pin shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Pin
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Pin border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.stroke()

        // Resource label
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.font = "11px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(resource.name.substring(0, 10), x, y - 15)
      })
    }

    drawMap()
    mapRef.current.innerHTML = ""
    mapRef.current.appendChild(canvas)

    // Handle resize
    const handleResize = () => {
      canvas.width = mapRef.current?.offsetWidth || 0
      canvas.height = mapRef.current?.offsetHeight || 0
      drawMap()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [userLocation, resources])

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <div ref={mapRef} className="w-full h-full" />

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg" title="Recenter map">
          <Navigation2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 max-w-xs">
        <h3 className="font-semibold text-sm mb-2 text-foreground">Map Legend</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-muted-foreground">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">Resource Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-muted-foreground">Resource Full/Closed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
