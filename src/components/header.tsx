"use client"

import { useState, useEffect } from "react"
import { KazeLogo } from "./kaze-logo"
import { Navigation } from "./navigation"
import { MobileMenuTrigger } from "./mobile-menu-trigger"
import { EnhancedMobileMenu } from "./enhanced-mobile-menu"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Enhanced scroll effect with better performance
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 w-full
          transition-all duration-300 ease-out
          ${
            isScrolled
              ? "backdrop-blur-md bg-bg-primary/80 shadow-sm border-b border-text-secondary/10"
              : "backdrop-blur-sm bg-bg-primary/60"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo with better accessibility */}
            <Link
              href="/"
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2 focus:ring-offset-bg-primary rounded-lg p-1 -m-1"
              aria-label="KAZE - Return to homepage"
            >
              <KazeLogo className="w-8 h-8 text-text-primary group-hover:text-accent-honey transition-colors duration-200" />
              <span className="font-inter font-bold text-xl text-text-primary group-hover:text-accent-honey transition-colors duration-200">
                KAZE
              </span>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Navigation />
              <div className="w-px h-6 bg-text-secondary/20" />
              <ThemeToggle />
            </div>

            {/* Enhanced Mobile Menu Trigger */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <MobileMenuTrigger 
                isOpen={isMobileMenuOpen} 
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Navigation Overlay */}
      <EnhancedMobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
    </>
  )
}