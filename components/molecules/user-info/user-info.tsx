"use client"

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar"
import { Button } from "@/components/atoms/button"
import { Edit3 } from "lucide-react"

interface UserInfoProps {
  name: string
  email: string
  profileImage?: string
  isEditing?: boolean
  onEditClick?: () => void
}

export const UserInfo: React.FC<UserInfoProps> = ({ name, email, profileImage, isEditing, onEditClick }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar size="xl">
        <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
      </Avatar>

      <div className="text-center space-y-2 w-full">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm break-all">{email}</p>
        {!isEditing && onEditClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onEditClick}
            className="flex items-center space-x-2 h-9 bg-transparent"
          >
            <Edit3 className="h-4 w-4" />
            <span>Editar</span>
          </Button>
        )}
      </div>
    </div>
  )
}
