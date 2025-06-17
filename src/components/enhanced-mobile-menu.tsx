"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Navigation } from "./navigation"
import { ThemeToggle } from "./theme-toggle"
import { SocialIcons } from "./social-icons"
import { useRouter } from "next/navigation"

interface EnhancedMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function EnhancedMobileMenu({ isOpen, onClose }: EnhancedMobileMenuProps) {
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Enhanced touch handling for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setCurrentY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const newY = e.touches[0].clientY
    setCurrentY(newY)
    
    const diffY = startY - newY
    
    // Provide visual feedback during swipe
    if (overlayRef.current && diffY > 0) {
      const opacity = Math.max(0.3, 1 - (diffY / 200))
      overlayRef.current.style.opacity = opacity.toString()
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const diffY = startY - currentY
    
    // If swiped up significantly, close menu
    if (diffY > 100) {
      onClose()
    } else if (overlayRef.current) {
      // Reset opacity if swipe wasn't enough to close
      overlayRef.current.style.opacity = '1'
    }
    
    setIsDragging(false)
  }

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'Tab':
          // Enhanced tab trapping
          if (overlayRef.current) {
            const focusableElements = overlayRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0] as HTMLElement
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault()
              lastElement?.focus()
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault()
              firstElement?.focus()
            }
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Enhanced body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  // Enhanced focus management
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      const focusableElements = overlayRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      
      // Delay focus to ensure animation has started
      setTimeout(() => {
        firstElement?.focus()
      }, 100)
    }
  }, [isOpen])

  // Enhanced animation variants
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
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
      }
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const contentVariants = {
    hidden: { 
      y: -30,
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    exit: {
      y: -30,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 20,
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
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
          onTouchEnd={handleTouchEnd}
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
            {/* Enhanced header with close button */}
            <motion.div 
              className="flex justify-between items-center mb-12"
              variants={itemVariants}
            >
              <h2 className="font-inter font-bold text-2xl text-text-primary">
                Navigation
              </h2>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-xl text-text-primary hover:text-accent-honey hover:bg-accent-honey/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-honey"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Enhanced navigation with better spacing */}
            <motion.div 
              className="flex-1 flex flex-col justify-center"
              variants={itemVariants}
            >
              <nav className="space-y-2">
                <Navigation 
                  className="enhanced-mobile-nav" 
                  onItemClick={handleNavItemClick}
                />
              </nav>
            </motion.div>

            {/* Enhanced footer with better organization */}
            <motion.div 
              className="space-y-6 pt-8 border-t border-text-secondary/10"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between py-2">
                <span className="font-inter font-medium text-text-secondary">
                  Appearance
                </span>
                <ThemeToggle />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="font-inter font-medium text-text-secondary">
                  Connect
                </span>
                <SocialIcons size="sm" />
              </div>

              {/* Swipe hint */}
              <div className="text-center pt-4">
                <p className="text-xs text-text-secondary">
                  Swipe up to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Enhanced mobile navigation styles
const enhancedMobileNavStyles = `
.enhanced-mobile-nav ul {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.enhanced-mobile-nav li {
  width: 100%;
}

.enhanced-mobile-nav a {
  display: flex;
  align-items: center;
  font-size: 1.75rem;
  font-weight: 600;
  padding: 1.25rem 1.5rem;
  min-height: 56px;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.enhanced-mobile-nav a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--accent-honey), transparent);
  opacity: 0.1;
  transition: left 0.5s ease;
}

.enhanced-mobile-nav a:hover::before {
  left: 100%;
}

.enhanced-mobile-nav a:hover {
  color: var(--accent-honey);
  background-color: var(--accent-honey);
  background-opacity: 0.05;
  border-color: var(--accent-honey);
  transform: translateX(8px) scale(1.02);
}

.enhanced-mobile-nav a[aria-current="page"] {
  color: var(--accent-honey);
  background-color: var(--accent-honey);
  background-opacity: 0.1;
  border-color: var(--accent-honey);
}

.enhanced-mobile-nav a:focus {
  outline: none;
  ring: 2px solid var(--accent-honey);
  ring-offset: 2px;
}
`

// Inject enhanced styles
if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('#enhanced-mobile-nav-styles')
  if (!existingStyle) {
    const styleSheet = document.createElement('style')
    styleSheet.id = 'enhanced-mobile-nav-styles'
    styleSheet.textContent = enhancedMobileNavStyles
    document.head.appendChild(styleSheet)
  }
}