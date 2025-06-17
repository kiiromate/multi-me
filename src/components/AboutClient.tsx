'use client'

import dynamic from "next/dynamic";
import { aboutMe } from "@/data/about";
import { Header } from "./header";
import { SkipNav } from "./skip-nav";
import { Footer } from "./footer";
import { GlassCard } from "./glass-card";
import { MarkdownWrapper } from "./MarkdownWrapper";
import { ScrollAnimation } from "./scroll-animations";

// Create a client component wrapper for the animation
const AnimationWrapper = dynamic(() => import("@/components/SpiralBackgroundAnimation"), { ssr: false });

export default function AboutClient() {
  return (
    <>
      <SkipNav />
      <Header />
      <AnimationWrapper />
      <main id="main" className="min-h-screen py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <h1 className="font-inter font-bold text-5xl md:text-6xl text-text-primary mb-6 tracking-tighter">
              About <span className="text-accent-honey">Me</span>
            </h1>
            <p className="font-manrope text-xl text-text-secondary max-w-2xl mb-12">
              Learn more about my background, skills, and approach to creative technology.
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation delay={0.3}>
            <GlassCard className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MarkdownWrapper content={aboutMe.bio} />
              </div>
            </GlassCard>
          </ScrollAnimation>
        </div>
      </main>
      <Footer />
    </>
  );
}