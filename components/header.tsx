"use client"

import { AlertTriangle, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onSettingsClick: () => void
}

export function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-background/95 to-background/70 backdrop-blur-sm border-b border-border/50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Crisis Locator</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={onSettingsClick} className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
