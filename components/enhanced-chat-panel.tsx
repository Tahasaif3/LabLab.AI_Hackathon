"use client"

import { useState } from "react"
import { X, Send, Loader2, Zap, Share2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
      text: "Welcome to Crisis Support! I'm analyzing resources near you...",
      actions: ["Get Help", "Report Issue"],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { type: "user", text: userMessage }])
    setIsLoading(true)

    setTimeout(() => {
      const resources = [
        {
          id: 1,
          name: "Downtown Shelter",
          distance: "0.5 km",
          status: "OPEN",
          lastUpdated: "2 min ago",
          capacity: "45/100",
          amenities: ["Food", "Water", "Beds"],
        },
        {
          id: 2,
          name: "Community Center",
          distance: "1.2 km",
          status: "FULL",
          lastUpdated: "5 min ago",
          capacity: "100/100",
          amenities: ["Medical", "Water"],
        },
        {
          id: 3,
          name: "Central Hospital",
          distance: "2.1 km",
          status: "OPEN",
          lastUpdated: "1 min ago",
          capacity: "80/150",
          amenities: ["Medical", "Emergency", "Food"],
        },
      ]

      setMessages((prev) => [
        ...prev,
        {
          type: "action",
          text: "Found 3 resources matching your criteria:",
          resource: resources,
        },
      ])
      setIsLoading(false)
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center md:justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto" onClick={onClose} />

      {/* Enhanced Panel */}
      <div className="relative pointer-events-auto w-full md:w-3/4 md:max-w-3xl md:rounded-2xl bg-gradient-to-b from-card to-card/80 border border-border/50 rounded-t-3xl md:rounded-2xl shadow-2xl max-h-[85vh] flex flex-col backdrop-blur-sm animate-slide-up overflow-hidden">
        {/* Header with Gradient */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-lg text-foreground">Crisis Support Assistant</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
            <X className="h-5 w-5" />
          </Button>
        </div>

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
                  <p className="text-sm font-medium">{message.text}</p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              {message.actions && (
                <div className="flex gap-2 justify-start ml-2">
                  {message.actions.map((action) => (
                    <Button
                      key={action}
                      size="sm"
                      variant="outline"
                      className="text-xs h-8 rounded-full border-primary/30 hover:bg-primary/10 bg-transparent"
                    >
                      {action}
                    </Button>
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
                              : "bg-red-500/20 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {resource.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Capacity</span>
                          <span className="font-semibold text-foreground">{resource.capacity}</span>
                        </div>

                        {/* Capacity Bar */}
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              resource.status === "OPEN" ? "bg-green-500" : "bg-red-500"
                            }`}
                            style={{ width: resource.capacity.split("/")[0].trim() + "%" }}
                          ></div>
                        </div>

                        {/* Amenities */}
                        {resource.amenities && (
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
                          <Button
                            size="sm"
                            variant="default"
                            className="text-xs h-7 flex-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              onReportClick?.(resource)
                            }}
                          >
                            Report
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 px-2 bg-transparent"
                            title="Copy details"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-7 px-2 bg-transparent" title="Share">
                            <Share2 className="h-3 w-3" />
                          </Button>
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
                <span className="text-sm font-medium">Analyzing resources...</span>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Input */}
        <div className="border-t border-border/50 p-4 space-y-2 bg-gradient-to-t from-card/50 to-transparent">
          <div className="flex gap-2">
            <Input
              placeholder="Describe your situation or ask for specific resources..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
              className="rounded-xl bg-muted/50 border-border/30 focus:border-primary"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="px-4 rounded-xl bg-primary hover:bg-primary/90 transition-colors"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Your location and data are not stored after this session.
          </p>
        </div>
      </div>
    </div>
  )
}
