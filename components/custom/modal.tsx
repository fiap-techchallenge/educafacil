"use client"

import type React from "react"

import { forwardRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { CustomButton } from "./button"

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export const CustomModal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, open, onOpenChange, children, ...props }, ref) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "unset"
      }

      return () => {
        document.body.style.overflow = "unset"
      }
    }, [open])

    if (!open) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
        <div
          ref={ref}
          className={cn("relative z-50 w-full max-w-lg mx-4 bg-white rounded-lg shadow-lg", className)}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  },
)

CustomModal.displayName = "CustomModal"

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onClose?: () => void
}

export const CustomModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, onClose, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center justify-between p-6 pb-4", className)} {...props}>
        <div className="flex-1">{children}</div>
        {onClose && (
          <CustomButton variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0 ml-4">
            <X className="h-4 w-4" />
          </CustomButton>
        )}
      </div>
    )
  },
)

CustomModalHeader.displayName = "CustomModalHeader"

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CustomModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
        {children}
      </div>
    )
  },
)

CustomModalContent.displayName = "CustomModalContent"

interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const CustomModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2 ref={ref} className={cn("text-lg font-semibold text-gray-900", className)} {...props}>
        {children}
      </h2>
    )
  },
)

CustomModalTitle.displayName = "CustomModalTitle"

interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const CustomModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm text-gray-600 mt-1", className)} {...props}>
        {children}
      </p>
    )
  },
)

CustomModalDescription.displayName = "CustomModalDescription"
