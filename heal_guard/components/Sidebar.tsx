'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Activity, AlertCircle, Calendar, MessageSquare, BarChart3, Settings, LogOut, X, Stethoscope } from 'lucide-react'

const menuItems = [
  { href: '/dashboard', icon: Heart, label: 'Dashboard', badge: null },
  { href: '/dashboard/health', icon: Activity, label: 'Health Monitor', badge: null },
  { href: '/dashboard/agents', icon: Stethoscope, label: 'AI Agents', badge: null }, // added AI Agents menu item
  { href: '/dashboard/emergency', icon: AlertCircle, label: 'Emergency', badge: '!' },
  { href: '/dashboard/appointments', icon: Calendar, label: 'Appointments', badge: '2' },
  { href: '/dashboard/chat', icon: MessageSquare, label: 'Consultations', badge: null },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics', badge: null },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-surface border-r border-border flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="font-poppins font-bold text-lg text-primary">HealGuard</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:bg-surface-alt'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-white text-primary' : 'bg-danger text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface-alt transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="font-semibold">Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-danger hover:bg-danger/10 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Mobile Menu */}
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              className="fixed left-0 top-0 w-64 h-screen bg-surface border-r border-border flex flex-col z-40 md:hidden"
            >
              <div className="p-6 border-b border-border flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-poppins font-bold text-lg text-primary">HealGuard</span>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-surface-alt rounded">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-text-secondary hover:bg-surface-alt'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto w-6 h-6 bg-danger text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>

              <div className="p-4 border-t border-border space-y-2">
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface-alt transition-all"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-semibold">Settings</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-danger hover:bg-danger/10 transition-all">
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
