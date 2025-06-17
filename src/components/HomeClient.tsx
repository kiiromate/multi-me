"use client"

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Header } from './header'
import { SkipNav } from './skip-nav'
import { Footer } from './footer'
import { GlassCard } from './glass-card'

// Dynamically import animations to avoid SSR issues
const HeroAnimation = dynamic(() => import('../components/HeroGenerativeArt'), { ssr: false })
const LogoAnimation = dynamic(() => import('../components/LogoAnimation'), { ssr: false })

export default function HomeClient() {
  return (
    <>
      <SkipNav />
      <Header />
      <HeroAnimation />
      
      <main id="main" className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <div className="max-w-7xl w-full mx-auto">
          <section className="flex flex-col md:flex-row items-center gap-12 mb-16">
            {/* Logo Animation */}
            <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] flex-shrink-0">
              <LogoAnimation />
            </div>
            
            {/* Hero Content */}
            <div className="space-y-6 text-center md:text-left">
              <h1 className="font-inter font-bold text-5xl md:text-7xl text-text-primary tracking-tighter">
                Project <span className="text-accent-honey">Kaze</span>
              </h1>
              <p className="font-manrope text-xl text-text-secondary max-w-2xl">
                A minimalist portfolio showcasing creative and technical skills in data storytelling, 
                frontend development, and design.
              </p>
              
              <div className="flex gap-4 flex-col sm:flex-row pt-4">
                <Link 
                  href="/projects"
                  className="bg-accent-honey text-bg-primary font-inter font-medium px-8 py-3 rounded-lg hover-accent transition-all duration-200"
                >
                  View Projects
                </Link>
                <Link
                  href="/blog"
                  className="border border-text-secondary text-text-primary hover:border-accent-honey hover:text-accent-honey font-inter font-medium px-8 py-3 rounded-lg transition-all duration-200"
                >
                  Read Blog
                </Link>
              </div>
            </div>
          </section>
          
          {/* Featured Sections */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <GlassCard className="p-8">
              <h2 className="font-inter font-semibold text-2xl text-text-primary mb-4">
                Data Visualization
              </h2>
              <p className="font-manrope text-text-secondary mb-6">
                Explore interactive data stories and visualizations that bring complex information to life.
              </p>
              <Link 
                href="/projects"
                className="text-accent-honey hover:underline font-medium inline-flex items-center"
              >
                See my data projects
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </GlassCard>
            
            <GlassCard className="p-8">
              <h2 className="font-inter font-semibold text-2xl text-text-primary mb-4">
                Creative Coding
              </h2>
              <p className="font-manrope text-text-secondary mb-6">
                Discover the intersection of art and technology through generative art and creative code experiments.
              </p>
              <Link 
                href="/blog"
                className="text-accent-honey hover:underline font-medium inline-flex items-center"
              >
                Read my blog posts
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </GlassCard>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 