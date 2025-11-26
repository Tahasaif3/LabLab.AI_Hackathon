"use client"

import { useEffect, useRef } from "react"

interface GoogleMapsEmbedProps {
  lat?: number
  lng?: number
  zoom?: number
  height?: string
}

export function GoogleMapsEmbed({
  lat = 40.7128,
  lng = -74.006,
  zoom = 14,
  height = "100%",
}: GoogleMapsEmbedProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const markerInstance = useRef<google.maps.Marker | null>(null)

  // Load Google Maps Script (once)
  useEffect(() => {
    if (typeof window === "undefined") return

    if ((window as any).google) {
      initMap()
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    script.async = true
    script.onload = initMap
    document.body.appendChild(script)
  }, [])

  // Initialize map once
  const initMap = () => {
    if (!mapRef.current || !(window as any).google) return

    mapInstance.current = new google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "greedy",
      mapId: "DEMO_MAP",
    })

    markerInstance.current = new google.maps.Marker({
      position: { lat, lng },
      map: mapInstance.current,
    })
  }

  // Update map center & marker when lat/lng change
  useEffect(() => {
    if (!mapInstance.current || !markerInstance.current) return

    const newPos = { lat, lng }

    mapInstance.current.panTo(newPos)
    markerInstance.current.setPosition(newPos)
  }, [lat, lng])

  return (
    <div
      ref={mapRef}
      className="rounded-2xl"
      style={{ width: "100%", height }}
    />
  )
}
