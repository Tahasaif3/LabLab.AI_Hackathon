"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Shield, Zap, MapPin, Users, Phone, CheckCircle, AlertTriangle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)

  /* Added scroll event listener for parallax and reveal animations */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Zap,
      title: "One-Tap SOS",
      description: "Emergency help in seconds. Your lifeline when it matters most.",
      color: "from-primary/20 to-primary/5",
      border: "border-primary/30",
    },
    {
      icon: MapPin,
      title: "Find Resources",
      description: "Real-time map shows shelters, medical aid, and safe zones nearby.",
      color: "from-secondary/20 to-secondary/5",
      border: "border-secondary/30",
    },
    {
      icon: Users,
      title: "Community Powered",
      description: "Real-time updates from volunteers keep information accurate.",
      color: "from-accent/20 to-accent/5",
      border: "border-accent/30",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "No data storage after session ends. Your privacy is protected.",
      color: "from-blue-500/20 to-blue-500/5",
      border: "border-blue-500/30",
    },
  ]

  const stats = [
    { number: "<2s", label: "Response Time", icon: Zap },
    { number: "500+", label: "Resource Listings", icon: MapPin },
    { number: "10K+", label: "Users Helped", icon: Users },
    { number: "24/7", label: "Available Always", icon: Phone },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"
          style={{ transform: `translate(calc(33% + ${scrollY * 0.5}px), calc(-25% + ${scrollY * 0.3}px))` }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/8 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"
          style={{ transform: `translate(calc(-33% - ${scrollY * 0.3}px), calc(25% - ${scrollY * 0.5}px))` }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50 animate-fade-in">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 backdrop-blur-md bg-background/80 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg group-hover:shadow-2xl group-hover:animate-glow-pulse transition-all">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:animate-gradient-shift transition-all">
              Crisis Locator
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="text-center mb-24 animate-slide-up">
          <div className="mb-6 inline-block animate-bounce-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold text-primary hover:bg-primary/20 transition-colors cursor-pointer group">
              <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              <span>Help When You Need It Most</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-balance leading-tight">
            Emergency Help at Your{" "}
            <span className="text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text animate-gradient-shift">
              Fingertips
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 text-balance leading-relaxed font-light animate-slide-up opacity-0"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Find shelters, resources, and support in seconds. One tap. Real help. When it matters most.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <Button
              onClick={onGetStarted}
              className="h-16 px-10 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-2xl text-white shadow-lg transition-all transform hover:scale-110 hover:animate-glow-pulse active:scale-95"
            >
              Get Started <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="h-16 px-10 text-lg font-semibold rounded-xl backdrop-blur bg-transparent hover:bg-primary/10 transition-all transform hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats Grid - Staggered animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="bg-card border border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 hover:shadow-xl transition-all group animate-bounce-in"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transform: `translateY(${Math.max(0, 50 - scrollY / 10)}px)`,
                }}
              >
                <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 group-hover:animate-glow-pulse transition-all">
                  <Icon className="w-6 h-6 text-primary group-hover:animate-float" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2 group-hover:animate-pulse">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Features Grid - Staggered with alternating slide animations */}
        <div className="grid md:grid-cols-2 gap-6 mb-32">
          {features.map((feature, i) => {
            const Icon = feature.icon
            const isEven = i % 2 === 0
            return (
              <div
                key={i}
                className={`group cursor-pointer ${isEven ? "animate-slide-in-left" : "animate-slide-in-right"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  className={`relative bg-gradient-to-br ${feature.color} border ${feature.border} rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-3 hover:border-primary/50 backdrop-blur-sm overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity group-hover:animate-text-shimmer"></div>

                  <div className="relative z-10">
                    <div className="inline-flex p-4 bg-white dark:bg-card rounded-lg mb-6 shadow-lg group-hover:shadow-xl group-hover:animate-glow-pulse transition-all">
                      <Icon className="w-8 h-8 text-primary group-hover:animate-float-rotate" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Learn more</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-border/40 py-24 backdrop-blur animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-slide-up">Every Second Counts</h2>
          <p
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up opacity-0"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Designed specifically for emergency situations where every moment matters. Fast, intuitive, and always
            available.
          </p>
          <Button
            onClick={onGetStarted}
            className="h-16 px-12 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-2xl text-white shadow-lg transition-all transform hover:scale-110 hover:animate-glow-pulse animate-bounce-in"
          >
            Start Now <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-card border-t border-border/40 py-16 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="animate-slide-in-left" style={{ animationDelay: "0s" }}>
              <h4 className="font-semibold text-lg mb-4">About</h4>
              <p className="text-muted-foreground">
                Crisis Resource Locator helps people find emergency resources when they need them most.
              </p>
            </div>
            <div className="animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                    Help & Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="animate-slide-in-right" style={{ animationDelay: "0s" }}>
              <h4 className="font-semibold text-lg mb-4">Emergency</h4>
              <p className="text-muted-foreground">
                For life-threatening emergencies, call 911 or your local emergency number immediately.
              </p>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Crisis Resource Locator. Built for humanity in crisis.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
