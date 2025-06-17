import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { EnhancedLoadingSystem } from "@/components/enhanced-loading-system"
import { OfflineIndicator } from "@/components/enhanced-loading-system"

export const metadata: Metadata = {
  title: "Portfolio Design System",
  description: "Clean like code, vibrant like nature, inspired like art",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-system antialiased">
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <EnhancedLoadingSystem>
            <OfflineIndicator />
            {children}
          </EnhancedLoadingSystem>
        </ThemeProvider>
      </body>
    </html>
  )
}