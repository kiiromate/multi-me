import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated"
  interactive?: boolean
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", interactive = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glass morphism styles
          "relative overflow-hidden rounded-xl",
          "backdrop-blur-md bg-bg-primary/60",
          "border border-text-secondary/10",
          "shadow-sm",

          // Variant styles
          variant === "elevated" && "shadow-lg",

          // Interactive styles
          interactive && [
            "transition-all duration-300 ease-out cursor-pointer",
            "hover:scale-[1.02] hover:shadow-xl",
            "hover:border-text-primary/20 hover:bg-bg-primary/70",
            "focus-within:scale-[1.02] focus-within:shadow-xl",
            "focus-within:border-accent-honey/50",
            "group",
          ],

          className,
        )}
        {...props}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-text-primary/[0.02] to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Hover glow effect */}
        {interactive && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-honey/5 via-transparent to-accent-honey/5 rounded-xl" />
          </div>
        )}
      </div>
    )
  },
)

GlassCard.displayName = "GlassCard"

export { GlassCard }
