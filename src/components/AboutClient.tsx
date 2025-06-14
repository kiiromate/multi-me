'use client'

import dynamic from "next/dynamic";
import GlassContainer from "@/components/GlassContainer";
import { aboutMe } from "@/data/about";

// Create a client component wrapper for the animation
const AnimationWrapper = dynamic(() => import("@/components/SpiralBackgroundAnimation"), { ssr: false });

export default function AboutClient() {
  return (
    <main className="min-h-screen">
      <AnimationWrapper />
      <div className="container mx-auto px-4 py-16">
        <GlassContainer>
          <h1 className="text-4xl font-bold mb-8">About Me</h1>
          <div className="prose prose-lg max-w-none">
            {aboutMe}
          </div>
        </GlassContainer>
      </div>
    </main>
  );
} 