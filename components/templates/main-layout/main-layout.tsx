"use client"

import type React from "react"
import { TopNavigation } from "@/components/organisms/top-navigation"

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {(title || description) && (
          <div className="mb-6 sm:mb-8">
            {title && <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h1>}
            {description && <p className="text-sm sm:text-base text-gray-600">{description}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
