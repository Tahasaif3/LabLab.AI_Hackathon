"use client"

interface MapPreviewProps {
  stepIndex: number
}

export function MapPreview({ stepIndex }: MapPreviewProps) {
  const resources = [
    { id: 1, name: "City Shelter", lat: 40.72, lng: -73.99, status: "open" },
    { id: 2, name: "Medical Center", lat: 40.73, lng: -74.0, status: "open" },
    { id: 3, name: "Food Station", lat: 40.71, lng: -73.98, status: "full" },
  ]

  const userLocation = { lat: 40.715, lng: -73.995 }

  // Scale for SVG map
  const scale = 300
  const centerLat = 40.72
  const centerLng = -74.0

  const latToY = (lat: number) => (centerLat - lat) * scale
  const lngToX = (lng: number) => (lng - centerLng) * scale

  return (
    <div className="relative w-full h-96 bg-card border border-border/40 rounded-2xl overflow-hidden">
      {/* Map Background */}
      <svg className="w-full h-full" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="300" height="300" fill="var(--color-background)" />
        <rect width="300" height="300" fill="url(#grid)" />

        {/* Resources */}
        {resources.map((resource) => {
          const x = 150 + lngToX(resource.lng)
          const y = 150 + latToY(resource.lat)
          const isOpen = resource.status === "open"

          return (
            <g key={resource.id}>
              {/* Pulse animation for open resources */}
              {isOpen && (
                <>
                  <circle cx={x} cy={y} r="12" fill="var(--color-accent)" opacity="0.2" className="animate-pulse" />
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="var(--color-accent)"
                    opacity="0.3"
                    className="animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  />
                </>
              )}

              {/* Pin */}
              <circle
                cx={x}
                cy={y}
                r="6"
                fill={isOpen ? "var(--color-accent)" : "var(--color-destructive)"}
                strokeWidth="2"
                stroke="var(--color-background)"
              />
            </g>
          )
        })}

        {/* User Location */}
        <circle
          cx={150 + lngToX(userLocation.lng)}
          cy={150 + latToY(userLocation.lat)}
          r="5"
          fill="var(--color-primary)"
          strokeWidth="2"
          stroke="var(--color-background)"
        />
        <circle
          cx={150 + lngToX(userLocation.lng)}
          cy={150 + latToY(userLocation.lat)}
          r="10"
          fill="var(--color-primary)"
          opacity="0.2"
          className="animate-pulse"
        />
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur border border-border/40 rounded-lg p-3 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span>Your Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <span>Open Resources</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-destructive"></div>
          <span>Full/Closed</span>
        </div>
      </div>

      {/* Step-specific highlight */}
      {stepIndex === 1 && (
        <div className="absolute inset-0 bg-primary/5 border-2 border-primary/30 rounded-lg animate-pulse" />
      )}
    </div>
  )
}
