"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import the loader animation
const LoaderAnimation = dynamic(() => import("./LoaderAnimation"), { ssr: false })

interface EnhancedLoadingSystemProps {
  children: React.ReactNode
}

export function EnhancedLoadingSystem({ children }: EnhancedLoadingSystemProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isRouteChanging, setIsRouteChanging] = useState(false)
  const [loadStartTime] = useState(Date.now())
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast'>('fast')
  const pathname = usePathname()
  
  const minimumLoadTime = 1800 // 1.8 seconds as specified

  // Detect connection speed
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection && connection.effectiveType) {
        setConnectionSpeed(connection.effectiveType.includes('2g') || connection.effectiveType.includes('3g') ? 'slow' : 'fast')
      }
    }
  }, [])

  // Handle initial page load with minimum time enforcement
  useEffect(() => {
    const handleInitialLoad = () => {
      const elapsedTime = Date.now() - loadStartTime
      const remainingTime = Math.max(0, minimumLoadTime - elapsedTime)

      // Adjust timing based on connection speed
      const adjustedTime = connectionSpeed === 'slow' ? remainingTime + 500 : remainingTime

      setTimeout(() => {
        setIsInitialLoading(false)
      }, adjustedTime)
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleInitialLoad()
    } else {
      window.addEventListener('load', handleInitialLoad)
      return () => window.removeEventListener('load', handleInitialLoad)
    }
  }, [loadStartTime, minimumLoadTime, connectionSpeed])

  // Handle route changes
  useEffect(() => {
    setIsRouteChanging(true)
    
    const timer = setTimeout(() => {
      setIsRouteChanging(false)
    }, connectionSpeed === 'slow' ? 800 : 500)

    return () => clearTimeout(timer)
  }, [pathname, connectionSpeed])

  // Animation variants
  const pageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const loaderVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1 
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Show initial loader with minimum time
  if (isInitialLoading) {
    return (
      <motion.div
        variants={loaderVariants}
        initial="visible"
        exit="exit"
        className="fixed inset-0 z-50"
      >
        <LoaderAnimation />
      </motion.div>
    )
  }

  return (
    <>
      {/* Route change progress indicator */}
      <AnimatePresence>
        {isRouteChanging && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 h-1 bg-accent-honey origin-left"
            style={{
              background: 'linear-gradient(90deg, var(--accent-honey) 0%, var(--accent-honey) 100%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

// Enhanced loading progress hook
export function useEnhancedLoadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startLoading = () => {
    setIsLoading(true)
    setProgress(0)
    setError(null)
  }

  const updateProgress = (value: number) => {
    setProgress(Math.min(100, Math.max(0, value)))
  }

  const finishLoading = () => {
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setProgress(0)
    }, 300)
  }

  const setLoadingError = (errorMessage: string) => {
    setError(errorMessage)
    setIsLoading(false)
  }

  return {
    progress,
    isLoading,
    error,
    startLoading,
    updateProgress,
    finishLoading,
    setLoadingError
  }
}

// Enhanced loading indicator with error states
interface EnhancedLoadingIndicatorProps {
  progress?: number
  error?: string | null
  className?: string
}

export function EnhancedLoadingIndicator({ 
  progress = 0, 
  error = null, 
  className = "" 
}: EnhancedLoadingIndicatorProps) {
  if (error) {
    return (
      <div className={`w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg ${className}`}>
        <p className="text-red-700 dark:text-red-300 text-sm">
          Error: {error}
        </p>
      </div>
    )
  }

  return (
    <div className={`w-full h-1 bg-text-secondary/10 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-accent-honey rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  )
}

// Offline detection and handling
export function useOfflineDetection() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check initial state
    setIsOffline(!navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOffline
}

// Offline indicator component
export function OfflineIndicator() {
  const isOffline = useOfflineDetection()

  if (!isOffline) return null

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg shadow-lg"
    >
      <p className="text-sm font-medium">You're currently offline</p>
    </motion.div>
  )
}