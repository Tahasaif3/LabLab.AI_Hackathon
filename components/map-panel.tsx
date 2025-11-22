"use client"

import { useEffect, useRef } from "react"

interface MapPanelProps {
  userLocation: { lat: number; lng: number } | null
  resources: any[]
}

export function MapPanel({ userLocation, resources }: MapPanelProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize map when component mounts
    if (!mapRef.current) return

    // Create a simple SVG-based map placeholder
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("viewBox", "0 0 1000 1000")
    svg.setAttribute("class", "w-full h-full")
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice")

    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    bg.setAttribute("width", "1000")
    bg.setAttribute("height", "1000")
    bg.setAttribute("fill", "currentColor")
    bg.setAttribute("opacity", "0.05")
    svg.appendChild(bg)

    // Grid pattern
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
    const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern")
    pattern.setAttribute("id", "grid")
    pattern.setAttribute("width", "50")
    pattern.setAttribute("height", "50")
    pattern.setAttribute("patternUnits", "userSpaceOnUse")

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", "M 50 0 L 0 0 0 50")
    path.setAttribute("fill", "none")
    path.setAttribute("stroke", "currentColor")
    path.setAttribute("stroke-width", "0.5")
    path.setAttribute("opacity", "0.1")
    pattern.appendChild(path)
    defs.appendChild(pattern)
    svg.appendChild(defs)

    // Add pattern rectangle
    const patternRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    patternRect.setAttribute("width", "1000")
    patternRect.setAttribute("height", "1000")
    patternRect.setAttribute("fill", "url(#grid)")
    svg.appendChild(patternRect)

    // User location (blue dot)
    if (userLocation) {
      const userDot = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      userDot.setAttribute("cx", "500")
      userDot.setAttribute("cy", "500")
      userDot.setAttribute("r", "15")
      userDot.setAttribute("fill", "#3b82f6")
      userDot.setAttribute("opacity", "0.8")
      svg.appendChild(userDot)

      // Pulse effect circle
      const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      pulse.setAttribute("cx", "500")
      pulse.setAttribute("cy", "500")
      pulse.setAttribute("r", "15")
      pulse.setAttribute("fill", "none")
      pulse.setAttribute("stroke", "#3b82f6")
      pulse.setAttribute("stroke-width", "2")
      pulse.setAttribute("opacity", "0.3")
      pulse.setAttribute("class", "animate-pulse")
      svg.appendChild(pulse)
    }

    // Sample resource pins (green for open, red for closed)
    const samplePins = [
      { x: 300, y: 250, name: "City Shelter", status: "open" },
      { x: 700, y: 350, name: "Hospital", status: "open" },
      { x: 450, y: 700, name: "Community Center", status: "full" },
    ]

    samplePins.forEach((pin) => {
      const color = pin.status === "open" ? "#22c55e" : "#ef4444"
      const pinGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")

      // Pin marker
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", String(pin.x))
      circle.setAttribute("cy", String(pin.y))
      circle.setAttribute("r", "12")
      circle.setAttribute("fill", color)
      circle.setAttribute("opacity", "0.7")
      pinGroup.appendChild(circle)

      // Pin border
      const border = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      border.setAttribute("cx", String(pin.x))
      border.setAttribute("cy", String(pin.y))
      border.setAttribute("r", "12")
      border.setAttribute("fill", "none")
      border.setAttribute("stroke", color)
      border.setAttribute("stroke-width", "2")
      border.setAttribute("opacity", "0.9")
      pinGroup.appendChild(border)

      svg.appendChild(pinGroup)
    })

    mapRef.current.innerHTML = ""
    mapRef.current.appendChild(svg)
  }, [userLocation])

  return <div ref={mapRef} className="w-full h-full bg-gradient-to-b from-background to-card" />
}
