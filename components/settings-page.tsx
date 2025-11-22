"use client"

import { useState } from "react"
import { X, Bell, Shield, Navigation, Smartphone, HelpCircle, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SettingsPageProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPage({ isOpen, onClose }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [notifications, setNotifications] = useState(true)
  const [shareLocation, setShareLocation] = useState(true)
  const [preferredResources, setPreferredResources] = useState("shelters")

  if (!isOpen) return null

  const tabs = [
    { id: "general", label: "General", icon: Smartphone },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "help", label: "Help & Info", icon: HelpCircle },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

      {/* Settings Panel */}
      <div className="relative pointer-events-auto w-full max-w-2xl max-h-[90vh] mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/50 overflow-x-auto bg-muted/30">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Emergency Contact Name</label>
                <Input placeholder="Your name" className="rounded-lg" defaultValue="John Doe" />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Emergency Contact Number</label>
                <Input placeholder="+1 (555) 000-0000" className="rounded-lg" />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Preferred Resource Type</label>
                <div className="flex gap-2">
                  {["shelters", "hospitals", "food", "water"].map((type) => (
                    <Button
                      key={type}
                      variant={preferredResources === type ? "default" : "outline"}
                      className="capitalize text-sm rounded-lg"
                      onClick={() => setPreferredResources(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Language</label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Mandarin</option>
                </select>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Navigation className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Share Location During Session</p>
                    <p className="text-xs text-muted-foreground">Location is not stored permanently</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={shareLocation}
                  onChange={(e) => setShareLocation(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
              </div>

              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <h3 className="font-semibold text-foreground mb-2">Data Practices</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your location is only used during active sessions</li>
                  <li>• No personal data is stored on our servers</li>
                  <li>• All communication is encrypted</li>
                  <li>• Session data is cleared when you close the app</li>
                </ul>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              {[
                { name: "Emergency Alerts", desc: "Receive alerts for emergencies near you" },
                { name: "Resource Updates", desc: "Get notified when resources open/close" },
                { name: "Status Changes", desc: "Alerts when reported status changes" },
              ].map((notif) => (
                <div key={notif.name} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{notif.name}</p>
                    <p className="text-xs text-muted-foreground">{notif.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Help Tab */}
          {activeTab === "help" && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Frequently Asked Questions
                </h3>
                <div className="text-sm text-muted-foreground space-y-3 mt-3">
                  <div>
                    <p className="font-medium text-foreground">How does location detection work?</p>
                    <p className="text-xs mt-1">
                      The app uses your device's GPS to find nearby resources. Permission is required.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Is my data private?</p>
                    <p className="text-xs mt-1">Yes, all data is session-based and cleared automatically.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Legal
                </h3>
                <div className="flex gap-2 text-sm">
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Terms of Service
                  </Button>
                  <span className="text-muted-foreground">•</span>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Privacy Policy
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 p-6 bg-muted/20 flex gap-2 justify-between">
          <Button variant="outline" className="rounded-lg bg-transparent">
            <LogOut className="h-4 w-4 mr-2" />
            Clear Session
          </Button>
          <Button onClick={onClose} className="rounded-lg bg-primary hover:bg-primary/90">
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
