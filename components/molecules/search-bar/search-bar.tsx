"use client"

import type React from "react"
import { Input } from "@/components/atoms/input"
import { Button } from "@/components/atoms/button"
import { Search, SlidersHorizontal } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onFilterClick?: () => void
  showFilterButton?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Buscar...",
  onFilterClick,
  showFilterButton = false,
}) => {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 h-11 text-base"
        />
      </div>

      {showFilterButton && onFilterClick && (
        <Button variant="outline" size="lg" onClick={onFilterClick} className="h-11 w-11 p-0 bg-transparent">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
