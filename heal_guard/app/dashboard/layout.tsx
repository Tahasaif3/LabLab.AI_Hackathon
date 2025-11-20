'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import TopNav from '@/components/TopNav'
import MobileMenu from '@/components/MobileMenu'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </div>
  )
}
