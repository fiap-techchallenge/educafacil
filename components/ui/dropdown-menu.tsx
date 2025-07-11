"use client"

import * as React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined)

interface DropdownMenuProps {
  children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children: React.ReactNode
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const context = useContext(DropdownMenuContext)
    if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")

    const { open, setOpen } = context

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: () => setOpen(!open),
        ref,
        ...props,
      })
    }

    return (
      <button ref={ref} onClick={() => setOpen(!open)} className={cn("outline-none", className)} {...props}>
        {children}
      </button>
    )
  },
)

DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  children: React.ReactNode
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = "center", children, ...props }, ref) => {
    const context = useContext(DropdownMenuContext)
    if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu")

    const { open, setOpen } = context
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [open, setOpen])

    if (!open) return null

    const alignmentClasses = {
      start: "left-0",
      center: "left-1/2 transform -translate-x-1/2",
      end: "right-0",
    }

    return (
      <div
        ref={contentRef}
        className={cn(
          "absolute top-full mt-1 z-50 min-w-32 overflow-hidden rounded-md border bg-white p-1 shadow-md",
          alignmentClasses[align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

DropdownMenuContent.displayName = "DropdownMenuContent"

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  children: React.ReactNode
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const context = useContext(DropdownMenuContext)
    if (!context) throw new Error("DropdownMenuItem must be used within DropdownMenu")

    const { setOpen } = context

    const handleClick = (event: React.MouseEvent) => {
      setOpen(false)
      props.onClick?.(event)
    }

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: (event: React.MouseEvent) => {
          handleClick(event)
          // Call the original onClick if it exists
          const originalOnClick = (children as React.ReactElement).props.onClick
          if (originalOnClick) {
            originalOnClick(event)
          }
        },
        className: cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 w-full",
          className,
        ),
        ref,
      })
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    )
  },
)

DropdownMenuItem.displayName = "DropdownMenuItem"

export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("-mx-1 my-1 h-px bg-gray-200", className)} {...props} />
  ),
)

DropdownMenuSeparator.displayName = "DropdownMenuSeparator"
