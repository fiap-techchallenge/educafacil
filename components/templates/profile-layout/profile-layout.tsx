"use client"

import type React from "react"
import { MainLayout } from "@/components/templates/main-layout"
import { Button } from "@/components/atoms/button"
import { Settings } from "lucide-react"
import Link from "next/link"

interface ProfileLayoutProps {
  children: React.ReactNode
  showSettingsButton?: boolean
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, showSettingsButton = true }) => {
  return (
    <MainLayout title="Meu Perfil" description="Gerencie suas informações pessoais e atividades">
      <div className="max-w-6xl mx-auto">
        {showSettingsButton && (
          <div className="flex justify-end mb-6">
            <Link href="/settings">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </Button>
            </Link>
          </div>
        )}
        {children}
      </div>
    </MainLayout>
  )
}
