"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card"
import { Button } from "@/components/atoms/button"
import { FormField } from "@/components/molecules/form-field"
import { UserInfo } from "@/components/molecules/user-info"
import { StatCard } from "@/components/molecules/stat-card"
import { User, FileText, Download, Star, Camera } from "lucide-react"

interface ProfileSectionProps {
  userData: {
    name: string
    email: string
    school: string
    city: string
    joinDate: string
    totalActivities: number
    totalDownloads: number
    averageRating: number
    profileImage?: string
  }
  onPhotoClick?: () => void
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ userData, onPhotoClick }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(userData.name)
  const [editedEmail, setEditedEmail] = useState(userData.email)

  const handleSaveProfile = () => {
    setIsEditing(false)
    console.log("Profile saved:", { name: editedName, email: editedEmail })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <User className="h-5 w-5" />
            <span>Informações Pessoais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <UserInfo
              name={userData.name}
              email={userData.email}
              profileImage={userData.profileImage}
              isEditing={isEditing}
              onEditClick={() => setIsEditing(true)}
            />
            {onPhotoClick && (
              <Button
                size="sm"
                onClick={onPhotoClick}
                className="absolute top-16 right-1/2 transform translate-x-8 translate-y-8 rounded-full h-8 w-8 p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>

          {isEditing && (
            <div className="space-y-4">
              <FormField label="Nome" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
              <FormField
                label="Email"
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" onClick={handleSaveProfile} className="flex-1 h-9">
                  Salvar
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="flex-1 h-9">
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3 pt-4 border-t">
            {[
              { label: "Escola", value: userData.school },
              { label: "Cidade", value: userData.city },
              { label: "Membro desde", value: userData.joinDate },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-medium text-right max-w-32 sm:max-w-none">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Estatísticas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <StatCard
            icon={FileText}
            label="Atividades enviadas"
            value={userData.totalActivities}
            color="text-blue-600"
          />
          <StatCard icon={Download} label="Total de downloads" value={userData.totalDownloads} color="text-green-600" />
          <StatCard icon={Star} label="Avaliação média" value={`${userData.averageRating}/5`} color="text-yellow-500" />
        </CardContent>
      </Card>
    </div>
  )
}
