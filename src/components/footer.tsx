import { SocialIcons } from "./social-icons"

interface FooterProps {
  className?: string
}

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={`
        w-full border-t border-text-secondary/10 bg-bg-primary/80 backdrop-blur-sm
        ${className}
      `}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <span className="font-system text-sm text-text-secondary">© {currentYear} Kaze Keza</span>
          </div>

          {/* Social Icons */}
          <SocialIcons size="sm" className="order-first sm:order-last" />
        </div>
      </div>
    </footer>
  )
}
