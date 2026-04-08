'use client'

import { createContext, useContext, useMemo, useState } from 'react'

interface MobileNavContextValue {
  isOpen: boolean
  close: () => void
  toggle: () => void
}

const MobileNavContext = createContext<MobileNavContextValue | null>(null)

export function MobileNavProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const value = useMemo<MobileNavContextValue>(
    () => ({
      isOpen,
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((current) => !current),
    }),
    [isOpen]
  )

  return <MobileNavContext.Provider value={value}>{children}</MobileNavContext.Provider>
}

export function useMobileNav(): MobileNavContextValue {
  const context = useContext(MobileNavContext)

  if (!context) {
    throw new Error('useMobileNav must be used within a MobileNavProvider')
  }

  return context
}
