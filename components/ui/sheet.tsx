"use client"

import * as React from "react"
import { createContext, useContext, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface SheetContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = createContext<SheetContextType | undefined>(undefined)

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Sheet({ open = false, onOpenChange, children }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>{children}</SheetContext.Provider>
  )
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: React.ReactNode
}

export const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const context = useContext(SheetContext)
    if (!context) throw new Error("SheetTrigger must be used within Sheet")

    const { onOpenChange } = context

    const handleClick = () => {
      onOpenChange(true)
    }

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: (event: React.MouseEvent) => {
          handleClick()
          // Call the original onClick if it exists
          const originalOnClick = (children as React.ReactElement).props.onClick
          if (originalOnClick) {
            originalOnClick(event)
          }
        },
        ref,
        ...props,
      })
    }

    return (
      <button ref={ref} onClick={handleClick} className={className} {...props}>
        {children}
      </button>
    )
  },
)

SheetTrigger.displayName = "SheetTrigger"

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right" | "top" | "bottom"
  children: React.ReactNode
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side = "right", children, ...props }, ref) => {
    const context = useContext(SheetContext)
    if (!context) throw new Error("SheetContent must be used within Sheet")

    const { open, onOpenChange } = context

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

    const sideClasses = {
      left: "left-0 top-0 h-full w-3/4 max-w-sm",
      right: "right-0 top-0 h-full w-3/4 max-w-sm",
      top: "top-0 left-0 w-full h-3/4 max-h-sm",
      bottom: "bottom-0 left-0 w-full h-3/4 max-h-sm",
    }

    return (
      <div className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
        <div
          ref={ref}
          className={cn("fixed bg-white p-6 shadow-lg transition-transform", sideClasses[side], className)}
          {...props}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
          {children}
        </div>
      </div>
    )
  },
)

SheetContent.displayName = "SheetContent"

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props}>
      {children}
    </div>
  ),
)

SheetHeader.displayName = "SheetHeader"

interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-gray-900", className)} {...props}>
      {children}
    </h2>
  ),
)

SheetTitle.displayName = "SheetTitle"
