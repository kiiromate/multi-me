"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleThemeToggle = async () => {
    if (isAnimating) return // Prevent multiple rapid clicks

    const button = buttonRef.current
    if (!button) return

    setIsAnimating(true)

    // Get button center coordinates
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate maximum radius to cover entire viewport
    const maxRadius = Math.sqrt(
      Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
      Math.pow(Math.max(centerY, window.innerHeight - centerY), 2)
    )

    // Create circular wipe overlay
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
      background-color: ${theme === 'light' ? '#0A0A0A' : '#F8F7F4'};
      clip-path: circle(0px at ${centerX}px ${centerY}px);
      transition: clip-path 0.7s cubic-bezier(0.83, 0, 0.17, 1);
    `
    
    document.body.appendChild(overlay)

    // Start animation
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(${maxRadius}px at ${centerX}px ${centerY}px)`
    })

    // Update theme at midpoint of animation
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light")
    }, 350)

    // Complete animation and cleanup
    setTimeout(() => {
      document.body.removeChild(overlay)
      setIsAnimating(false)
    }, 700)
  }

  // Handle reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleClick = () => {
    if (prefersReducedMotion) {
      setTheme(theme === "light" ? "dark" : "light")
    } else {
      handleThemeToggle()
    }
  }

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={isAnimating}
      className="border-text-secondary/20 hover:border-accent-honey hover:text-accent-honey transition-all duration-200 relative overflow-hidden"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}