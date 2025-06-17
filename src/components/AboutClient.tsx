'use client'

import dynamic from "next/dynamic";
import { aboutMe } from "@/data/about";
import { Header } from "./header";
import { SkipNav } from "./skip-nav";
import { Footer } from "./footer";
import { GlassCard } from "./glass-card";
import MarkdownWrapper from "./MarkdownWrapper";
import { ScrollAnimation } from "./scroll-animations";

// Create a client component wrapper for the animation
const AnimationWrapper = dynamic(() => import("@/components/SpiralBackgroundAnimation"), { ssr: false });

export default function AboutClient() {
  return (
    <>
      <SkipNav />
      <Header />
      <main className="min-h-screen bg-bg-primary text-text-primary">
        <AnimationWrapper />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
          <div className="space-y-12">
            <ScrollAnimation delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-inter font-bold text-text-primary">
                About
              </h1>
            </ScrollAnimation>

            <ScrollAnimation delay={0.3}>
              <GlassCard className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <MarkdownWrapper content={aboutMe.bio} />
                </div>
              </GlassCard>
            </ScrollAnimation>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}