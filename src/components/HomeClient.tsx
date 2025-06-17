"use client"

import dynamic from 'next/dynamic'
import GlassContainer from '@/components/GlassContainer'
import Link from 'next/link'

// Dynamically import animations to avoid SSR issues
const HeroAnimation = dynamic(() => import('../components/HeroGenerativeArt'), { ssr: false })
const LogoAnimation = dynamic(() => import('../components/LogoAnimation'), { ssr: false })

export default function HomeClient() {
  return (
    <>
      <HeroAnimation />
      <div className="grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pt-24 pb-20 gap-16 sm:p-20">
        <section className="row-start-1 w-full flex flex-col items-center justify-center">
          <div className="w-[300px] h-[300px] mb-8">
            <LogoAnimation />
          </div>
        </section>
        
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <GlassContainer className="max-w-3xl w-full">
            <div className="flex flex-col gap-6 items-center sm:items-start">
              <h1 className="text-4xl font-bold text-accent text-center sm:text-left">Project Kaze</h1>
              <p className="text-lg text-foreground-subtle text-center sm:text-left">
                A minimalist portfolio showcasing creative and technical skills in data storytelling, frontend development, and design.
              </p>
              
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <Link
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-accent text-background gap-2 hover:bg-accent-dark font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                  href="/projects"
                >
                  View Projects
                </Link>
                <Link
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
                  href="/blog"
                >
                  Read Blog
                </Link>
              </div>
            </div>
          </GlassContainer>
        </main>
        
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <span className="text-sm text-foreground-subtle">© 2025 Project Kaze</span>
        </footer>
      </div>
    </>
  )
} 