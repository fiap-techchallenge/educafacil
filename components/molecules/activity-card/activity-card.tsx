"use client"

import type React from "react"
import { Badge } from "@/components/atoms/badge"
import { Button } from "@/components/atoms/button"
import { Card, CardContent } from "@/components/atoms/card"
import { Calendar, Download, Star, Edit3 } from "lucide-react"
import Link from "next/link"

interface ActivityCardProps {
  id: number
  title: string
  subject: string
  gradeLevel: string
  type: string
  uploadDate: string
  downloads: number
  rating: number
  status: string
  onEdit?: () => void
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  title,
  subject,
  gradeLevel,
  type,
  uploadDate,
  downloads,
  rating,
  status,
  onEdit,
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Aprovada":
        return "success"
      case "Em Análise":
        return "warning"
      case "Rejeitada":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">{title}</h4>
              <Badge variant={getStatusVariant(status)} className="text-xs w-fit">
                {status}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {subject}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {gradeLevel}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {type}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{uploadDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{downloads} downloads</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="flex-1 sm:flex-none h-9 text-xs bg-transparent"
              >
                <Edit3 className="h-3 w-3 mr-1" />
                Editar
              </Button>
            )}
            <Link href={`/activity/${id}`} className="flex-1 sm:flex-none">
              <Button variant="outline" size="sm" className="w-full h-9 text-xs bg-transparent">
                Ver
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
