"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

// Base animation variants
const fadeUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 16 
  },
  visible: { 
    opacity: 1, 
    y: 0 
  }
}

// Main scroll animation component
export function ScrollAnimation({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.6 
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0px" 
  })

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered animation for multiple items
interface StaggeredAnimationProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}

export function StaggeredAnimation({ 
  children, 
  className = "", 
  staggerDelay = 0.1 
}: StaggeredAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0px" 
  })

  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// Hook for custom scroll animations
export function useScrollAnimation(delay = 0) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0px" 
  })

  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return {
    ref,
    isInView,
    prefersReducedMotion,
    animationProps: prefersReducedMotion ? {} : {
      initial: "hidden",
      animate: isInView ? "visible" : "hidden",
      variants: fadeUpVariants,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut"
      }
    }
  }
}