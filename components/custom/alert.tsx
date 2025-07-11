"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error"
  children: React.ReactNode
}

export const CustomAlert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "border-gray-200 bg-gray-50 text-gray-900",
      success: "border-green-200 bg-green-50 text-green-900",
      warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
      error: "border-red-200 bg-red-50 text-red-900",
    }

    return (
      <div ref={ref} className={cn("relative w-full rounded-lg border p-4", variants[variant], className)} {...props}>
        {children}
      </div>
    )
  },
)

CustomAlert.displayName = "CustomAlert"

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const CustomAlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm leading-relaxed", className)} {...props}>
        {children}
      </p>
    )
  },
)

CustomAlertDescription.displayName = "CustomAlertDescription"
