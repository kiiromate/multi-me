"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Navigation } from "./navigation"
import { ThemeToggle } from "./theme-toggle"
import { SocialIcons } from "./social-icons"
import { useRouter } from "next/navigation"

interface MobileMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState(0)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Focus management
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      const focusableElements = overlayRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      firstElement?.focus()
    }
  }, [isOpen])

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      onClose()
    }

    router.events?.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events?.off('routeChangeStart', handleRouteChange)
    }
  }, [router, onClose])

  // Touch handlers for swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY
    const diffY = startY - currentY

    // If swiping up significantly, close menu
    if (diffY > 100) {
      onClose()
    }
  }

  // Animation variants
  const overlayVariants = {
    hidden: { 
      opacity: 0,
      backdropFilter: "blur(0px)"
    },
    visible: { 
      opacity: 1,
      backdropFilter: "blur(20px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const contentVariants = {
    hidden: { 
      y: -20,
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 10,
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const handleNavItemClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 md:hidden"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            backgroundColor: 'var(--bg-primary)',
            backgroundOpacity: 0.95
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <motion.div
            className="flex flex-col h-full px-6 py-8"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with close button */}
            <motion.div 
              className="flex justify-between items-center mb-12"
              variants={itemVariants}
            >
              <h2 className="font-inter font-bold text-2xl text-text-primary">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-text-primary hover:text-accent-honey hover:bg-accent-honey/10 transition-all duration-200"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Navigation */}
            <motion.div 
              className="flex-1 flex flex-col justify-center"
              variants={itemVariants}
            >
              <nav className="space-y-8">
                <Navigation 
                  className="mobile-nav-overlay" 
                  onItemClick={handleNavItemClick}
                />
              </nav>
            </motion.div>

            {/* Footer with theme toggle and social */}
            <motion.div 
              className="space-y-6 pt-8 border-t border-text-secondary/10"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <span className="font-inter font-medium text-text-secondary">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-inter font-medium text-text-secondary">
                  Connect
                </span>
                <SocialIcons size="sm" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Update the mobile navigation styles
const mobileNavStyles = `
.mobile-nav-overlay ul {
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}

.mobile-nav-overlay li {
  width: 100%;
}

.mobile-nav-overlay a {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem 0;
  min-height: 48px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.mobile-nav-overlay a:hover {
  color: var(--accent-honey);
  border-bottom-color: var(--accent-honey);
  transform: translateX(8px);
}

.mobile-nav-overlay a[aria-current="page"] {
  color: var(--accent-honey);
  border-bottom-color: var(--accent-honey);
}
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = mobileNavStyles
  document.head.appendChild(styleSheet)
}