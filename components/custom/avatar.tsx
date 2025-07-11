"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  children: React.ReactNode
}

export const CustomAvatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const sizes = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-16 w-16",
      xl: "h-24 w-24",
    }

    return (
      <div
        ref={ref}
        className={cn("relative flex shrink-0 overflow-hidden rounded-full", sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

CustomAvatar.displayName = "CustomAvatar"

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const CustomAvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(({ className, ...props }, ref) => {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return null
  }

  return (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover", className)}
      onError={() => setImageError(true)}
      {...props}
    />
  )
})

CustomAvatarImage.displayName = "CustomAvatarImage"

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CustomAvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

CustomAvatarFallback.displayName = "CustomAvatarFallback"
