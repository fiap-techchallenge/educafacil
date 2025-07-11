"use client"

import type React from "react"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  color: string
}

export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="font-semibold text-lg">{value}</span>
    </div>
  )
}
