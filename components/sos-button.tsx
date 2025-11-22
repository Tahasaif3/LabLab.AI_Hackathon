"use client"

import { Loader2 } from "lucide-react"

interface SosButtonProps {
  onActivate: () => void
  isLoading?: boolean
}

export function SosButton({ onActivate, isLoading = false }: SosButtonProps) {
  return (
    <button
      onClick={onActivate}
      disabled={isLoading}
      className="pointer-events-auto relative group disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="SOS Emergency Button"
    >
      {/* Pulsing outer ring */}
      <div className={`absolute inset-0 ${isLoading ? "" : "animate-pulse-scale"}`}>
        <div className="w-32 h-32 rounded-full border-4 border-primary/40"></div>
      </div>

      {/* Main button */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer border border-primary/50 disabled:hover:scale-100">
        <div className="text-center">
          {isLoading ? (
            <>
              <Loader2 className="h-8 w-8 text-primary-foreground animate-spin mx-auto mb-1" />
              <div className="text-xs font-bold text-primary-foreground">LOCATING</div>
            </>
          ) : (
            <>
              <div className="text-sm font-bold text-primary-foreground tracking-wider mb-1">TAP</div>
              <div className="text-3xl font-black text-primary-foreground">SOS</div>
            </>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </button>
  )
}
