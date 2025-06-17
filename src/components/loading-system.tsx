"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import the loader animation
const LoaderAnimation = dynamic(() => import("./LoaderAnimation"), { ssr: false })

interface LoadingSystemProps {
  children: React.ReactNode
}

export function LoadingSystem({ children }: LoadingSystemProps) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isRouteChanging, setIsRouteChanging] = useState(false)
  const [loadStartTime] = useState(Date.now())
  const router = useRouter()
  const minimumLoadTime = 1800 // 1.8 seconds

  // Handle initial page load
  useEffect(() => {
    const handleInitialLoad = () => {
      const elapsedTime = Date.now() - loadStartTime
      const remainingTime = Math.max(0, minimumLoadTime - elapsedTime)

      setTimeout(() => {
        setIsInitialLoading(false)
      }, remainingTime)
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleInitialLoad()
    } else {
      window.addEventListener('load', handleInitialLoad)
      return () => window.removeEventListener('load', handleInitialLoad)
    }
  }, [loadStartTime, minimumLoadTime])

  // Handle route changes
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsRouteChanging(true)
    }

    const handleRouteChangeComplete = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setIsRouteChanging(false)
      }, 300)
    }

    const handleRouteChangeError = () => {
      setIsRouteChanging(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router])

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

  // Show initial loader
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
      {/* Route change loader */}
      <AnimatePresence>
        {isRouteChanging && (
          <motion.div
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-accent-honey via-accent-honey/60 to-accent-honey"
            style={{
              background: 'linear-gradient(90deg, var(--accent-honey) 0%, var(--accent-honey) 50%, transparent 100%)',
              animation: 'loading-bar 1s ease-in-out infinite'
            }}
          />
        )}
      </AnimatePresence>

      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
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

// Loading progress hook for components
export function useLoadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => {
    setIsLoading(true)
    setProgress(0)
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

  return {
    progress,
    isLoading,
    startLoading,
    updateProgress,
    finishLoading
  }
}

// Loading indicator component
interface LoadingIndicatorProps {
  progress?: number
  className?: string
}

export function LoadingIndicator({ progress = 0, className = "" }: LoadingIndicatorProps) {
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

// Error boundary for loading states
interface LoadingErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LoadingErrorBoundary({ children, fallback }: LoadingErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = () => setHasError(true)
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="font-inter font-semibold text-2xl text-text-primary">
            Something went wrong
          </h2>
          <p className="text-text-secondary">
            Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent-honey text-bg-primary px-6 py-3 rounded-lg font-medium hover:bg-accent-honey/90 transition-colors duration-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// CSS for loading bar animation
const loadingBarStyles = `
@keyframes loading-bar {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = loadingBarStyles
  document.head.appendChild(styleSheet)
}