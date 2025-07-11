"use client"

import * as React from "react"
import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "")
    const currentValue = value ?? internalValue
    const handleValueChange = onValueChange ?? setInternalValue

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)

Tabs.displayName = "Tabs"

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500", className)}
      {...props}
    >
      {children}
    </div>
  )
})

TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  children: React.ReactNode
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error("TabsTrigger must be used within Tabs")

    const isActive = context.value === value

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => context.onValueChange(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error("TabsContent must be used within Tabs")

    if (context.value !== value) return null

    return (
      <div
        ref={ref}
        className={cn(
          "mt-2 ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

TabsContent.displayName = "TabsContent"
