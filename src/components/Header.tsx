"use client"
import React, { useState } from "react"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  // { href: "/about", label: "About" }, // Uncomment if About page is added
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full flex items-center justify-between py-4 px-6 sm:px-12 bg-background/80 backdrop-blur z-50 fixed top-0 left-0">
      <Link href="/" className="text-xl font-bold tracking-tight text-accent">
        Kaze
      </Link>
      <nav className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-foreground hover:text-accent transition-colors font-medium"
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Open menu"
        onClick={() => setMenuOpen(true)}
      >
        <span className="block w-6 h-0.5 bg-foreground mb-1"></span>
        <span className="block w-6 h-0.5 bg-foreground mb-1"></span>
        <span className="block w-6 h-0.5 bg-foreground"></span>
      </button>
      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur flex flex-col items-center justify-center z-50 transition-all">
          <button
            className="absolute top-6 right-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <span className="block w-6 h-0.5 bg-foreground rotate-45 translate-y-1.5"></span>
            <span className="block w-6 h-0.5 bg-foreground -rotate-45 -translate-y-1.5"></span>
          </button>
          <nav className="flex flex-col gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-bold text-foreground hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      )}
    </header>
  )
} 