"use client"

import { useState } from "react"
import { X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
  onReportClick?: (resource: any) => void
}

export function ChatPanel({ isOpen, onClose, onReportClick }: ChatPanelProps) {
  const [messages, setMessages] = useState<Array<{ type: "user" | "system"; text: string; resource?: any }>>([
    { type: "system", text: "Locating your position..." },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { type: "user", text: userMessage }])
    setIsLoading(true)

    // Simulate AI response with resource data
    setTimeout(() => {
      const resources = [
        { id: 1, name: "City Shelter", distance: "0.5 km", status: "OPEN", lastUpdated: "2 min ago" },
        { id: 2, name: "Community Center", distance: "1.2 km", status: "FULL", lastUpdated: "5 min ago" },
        { id: 3, name: "Hospital", distance: "2.1 km", status: "OPEN", lastUpdated: "1 min ago" },
      ]

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          text: "Found 3 nearby shelters:",
          resource: resources,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center md:justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

      {/* Panel */}
      <div className="relative pointer-events-auto w-full md:w-2/3 md:max-w-2xl md:rounded-2xl bg-card border border-border/50 rounded-t-3xl md:rounded-2xl shadow-2xl max-h-[80vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h2 className="font-semibold text-foreground">Emergency Support</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>

              {message.resource && Array.isArray(message.resource) && (
                <div className="space-y-2 mt-3">
                  {message.resource.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-card border border-border/50 rounded-lg p-3 hover:border-border transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{resource.name}</p>
                          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                            <p>Distance: {resource.distance}</p>
                            <p>Updated: {resource.lastUpdated}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              resource.status === "OPEN"
                                ? "bg-accent/20 text-accent"
                                : "bg-destructive/20 text-destructive"
                            }`}
                          >
                            {resource.status}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onReportClick?.(resource)}
                            className="text-xs h-8"
                          >
                            Report
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
              <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Analyzing your location...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border/50 p-4 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Ask for help or describe your situation..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
              className="rounded-xl"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="px-4 rounded-xl bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Your location is only used during this session and not stored.
          </p>
        </div>
      </div>
    </div>
  )
}
