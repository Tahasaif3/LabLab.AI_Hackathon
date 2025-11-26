"use client"

import { useState, useEffect } from "react"
import { X, Send, Loader2, Zap, Share2, Copy, MapPin, AlertCircle } from "lucide-react"

interface EnhancedChatPanelProps {
  isOpen: boolean
  onClose: () => void
  onReportClick?: (resource: any) => void
}

export function EnhancedChatPanel({ isOpen, onClose, onReportClick }: EnhancedChatPanelProps) {
  const [messages, setMessages] = useState<
    Array<{ type: "user" | "system" | "action"; text: string; resource?: any; actions?: string[] }>
  >([
    {
      type: "system",
      text: "Welcome to Crisis Support! Detecting your location...",
      actions: ["Get Help", "Report Issue"],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(true)

  // Get user's location on mount
  useEffect(() => {
    if (!isOpen) return

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            // Use your backend's reverse geocode endpoint
            const response = await fetch("https://tahasaif3-crisisagent.hf.space/reverse-geocode", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ lat: latitude, lon: longitude }),
            })
            
            if (response.ok) {
              const data = await response.json()
              const locationString = [data.city, data.state, data.country]
                .filter(Boolean)
                .join(", ")
              
              setUserLocation(locationString || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
              setIsDetectingLocation(false)
              
              // Update welcome message with location
              setMessages([
                {
                  type: "system",
                  text: `✅ Location detected: ${locationString || 'Coordinates captured'}. I'm ready to help you find resources nearby.`,
                  actions: ["Find Shelter", "Find Food", "Medical Help"],
                },
              ])
            } else {
              throw new Error("Reverse geocoding failed")
            }
          } catch (error) {
            console.error("Reverse geocode error:", error)
            setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
            setIsDetectingLocation(false)
            
            setMessages([
              {
                type: "system",
                text: `📍 Location detected (coordinates). I'm ready to help you find resources nearby.`,
                actions: ["Find Shelter", "Find Food", "Medical Help"],
              },
            ])
          }
        },
        (error) => {
          console.error("Location error:", error)
          setLocationError(
            error.code === 1 
              ? "Location access denied. Please enter your location manually." 
              : "Unable to detect location. Please enter your location manually."
          )
          setIsDetectingLocation(false)
          
          setMessages([
            {
              type: "system",
              text: "⚠️ I couldn't detect your location. Please share your location (e.g., 'I'm in New York' or 'I need help in Los Angeles') so I can find resources near you.",
            },
          ])
        }
      )
    } else {
      setLocationError("Geolocation not supported by your browser")
      setIsDetectingLocation(false)
      
      setMessages([
        {
          type: "system",
          text: "⚠️ Your browser doesn't support location detection. Please share your location (e.g., 'I'm in Chicago' or 'I need help in Boston') so I can find resources near you.",
        },
      ])
    }
  }, [isOpen])

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      "Get Help": "I need help",
      "Report Issue": "I want to report an issue",
      "Find Shelter": "I need shelter",
      "Find Food": "I need food",
      "Medical Help": "I need medical help",
    }
    
    const message = actionMessages[action] || action
    setInput(message)
    handleSendMessage(message)
  }

  const handleSendMessage = async (messageOverride?: string) => {
    const userMessage = messageOverride || input.trim()
    if (!userMessage) return

    setInput("")
    setMessages((prev) => [...prev, { type: "user", text: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("https://tahasaif3-crisisagent.hf.space/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: userMessage,
          location: userLocation || "Please provide your location",
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // SYSTEM RESPONSE TEXT
      if (data.response_text) {
        setMessages((prev) => [
          ...prev,
          {
            type: "system",
            text: data.response_text,
          },
        ])
      }

      // RESOURCE CARDS
      if (data.resources && Array.isArray(data.resources) && data.resources.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            type: "action",
            text: `Found ${data.resources.length} resource${data.resources.length > 1 ? 's' : ''} near you:`,
            resource: data.resources,
          },
        ])
      }
    } catch (error) {
      console.error("API Error:", error)

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          text: "⚠️ Unable to reach the Crisis Support server. Please try again or call emergency services if urgent.",
        },
      ])
    }

    setIsLoading(false)
  }

  const copyResourceDetails = (resource: any) => {
    const details = `
${resource.name}
Distance: ${resource.distance}
Status: ${resource.status}
${resource.address ? `Address: ${resource.address}` : ''}
${resource.phone ? `Phone: ${resource.phone}` : ''}
Amenities: ${resource.amenities?.join(', ') || 'N/A'}
    `.trim()
    
    navigator.clipboard.writeText(details)
  }

  const shareResource = (resource: any) => {
    if (navigator.share) {
      navigator.share({
        title: resource.name,
        text: `${resource.name} - ${resource.distance} away. ${resource.address || ''}`,
      })
    } else {
      copyResourceDetails(resource)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center md:justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto" onClick={onClose} />

      {/* Enhanced Panel */}
      <div className="relative pointer-events-auto w-full md:w-3/4 md:max-w-3xl md:rounded-2xl bg-gradient-to-b from-card to-card/80 border border-border/50 rounded-t-3xl md:rounded-2xl shadow-2xl max-h-[85vh] flex flex-col backdrop-blur-sm overflow-hidden">
        {/* Header with Gradient */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-lg text-foreground">Crisis Support Assistant</h2>
          </div>
          <button onClick={onClose} className="rounded-full hover:bg-muted p-2 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Location Status Bar */}
        {(userLocation || locationError) && (
          <div className={`px-4 py-2 text-xs flex items-center gap-2 ${
            locationError ? 'bg-amber-500/10 text-amber-600' : 'bg-green-500/10 text-green-600'
          }`}>
            {locationError ? (
              <>
                <AlertCircle className="h-3 w-3" />
                <span>{locationError}</span>
              </>
            ) : (
              <>
                <MapPin className="h-3 w-3" />
                <span>Location: {userLocation}</span>
              </>
            )}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-3">
              <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-sm px-4 py-3 rounded-xl ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none shadow-md"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm font-medium whitespace-pre-line">{message.text}</p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              {message.actions && (
                <div className="flex gap-2 justify-start ml-2 flex-wrap">
                  {message.actions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs h-8 px-3 rounded-full border border-primary/30 hover:bg-primary/10 bg-transparent transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {/* Resource Cards */}
              {message.resource && Array.isArray(message.resource) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {message.resource.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-card/50 border border-border/70 rounded-xl p-3 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
                      onClick={() => onReportClick?.(resource)}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                            {resource.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{resource.distance} away</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            resource.status === "OPEN"
                              ? "bg-green-500/20 text-green-600 dark:text-green-400"
                              : resource.status === "CLOSED"
                              ? "bg-red-500/20 text-red-600 dark:text-red-400"
                              : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {resource.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {/* Address */}
                        {resource.address && (
                          <p className="text-xs text-muted-foreground">{resource.address}</p>
                        )}

                        {/* Phone */}
                        {resource.phone && (
                          <a href={`tel:${resource.phone}`} className="text-xs text-primary hover:underline block">
                            📞 {resource.phone}
                          </a>
                        )}

                        {/* Capacity */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Capacity</span>
                          <span className="font-semibold text-foreground">{resource.capacity}</span>
                        </div>

                        {/* Amenities */}
                        {resource.amenities && resource.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1">

                            {resource.amenities.map((amenity) => (
                              <span
                                key={amenity}
                                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-2">
                          <button
                            className="text-xs h-7 flex-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              onReportClick?.(resource)
                            }}
                          >
                            View Details
                          </button>
                          <button
                            className="text-xs h-7 px-2 border border-border rounded-md hover:bg-muted transition-colors"
                            title="Copy details"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyResourceDetails(resource)
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <button
                            className="text-xs h-7 px-2 border border-border rounded-md hover:bg-muted transition-colors"
                            title="Share"
                            onClick={(e) => {
                              e.stopPropagation()
                              shareResource(resource)
                            }}
                          >
                            <Share2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-4 py-3 rounded-xl rounded-bl-none flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Searching for resources...</span>
              </div>
            </div>
          )}

          {isDetectingLocation && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-4 py-3 rounded-xl rounded-bl-none flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Detecting your location...</span>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Input */}
        <div className="border-t border-border/50 p-4 space-y-2 bg-gradient-to-t from-card/50 to-transparent">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Describe your situation or ask for specific resources..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
              className="flex-1 rounded-xl bg-muted/50 border border-border/30 focus:border-primary px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="px-4 rounded-xl bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            🔒 Your location and data are not stored after this session. For emergencies, call 911.
          </p>
        </div>
      </div>
    </div>
  )
}