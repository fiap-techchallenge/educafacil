"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

export const CustomSeparator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("shrink-0 bg-gray-200", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className)}
        {...props}
      />
    )
  },
)

CustomSeparator.displayName = "CustomSeparator"
