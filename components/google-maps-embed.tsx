"use client"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

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
  const mapContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

const map = new maplibregl.Map({
  container: mapContainer.current,
  style: "https://tiles.stadiamaps.com/styles/osm_bright.json", // REAL MAP
  center: [lng, lat],
  zoom,
})


    // Add controls
    map.addControl(new maplibregl.NavigationControl(), "top-right")

    // Try to get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const userLat = pos.coords.latitude
        const userLng = pos.coords.longitude

        // Center map on user
        map.flyTo({ center: [userLng, userLat], zoom: 15 })

        // Add blue dot marker
        const el = document.createElement("div")
        el.style.width = "18px"
        el.style.height = "18px"
        el.style.background = "#3b82f6"
        el.style.border = "3px solid white"
        el.style.borderRadius = "50%"
        el.style.boxShadow = "0 0 10px #3b82f6"

        new maplibregl.Marker(el).setLngLat([userLng, userLat]).addTo(map)
      })
    }

    return () => map.remove()
  }, [lat, lng, zoom])

  return (
    <div
      ref={mapContainer}
      className="rounded-2xl overflow-hidden"
      style={{ width: "100%", height }}
    />
  )
}
