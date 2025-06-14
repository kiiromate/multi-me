'use client'

import dynamic from "next/dynamic";
import GlassContainer from "@/components/GlassContainer";
import BlogPostCard from "@/components/BlogPostCard";
import { blogPosts } from "@/data/blogPosts";

// Create a client component wrapper for the animation
const AnimationWrapper = dynamic(() => import("@/components/SpiralBackgroundAnimation"), { ssr: false });

export default function BlogClient() {
  return (
    <main className="min-h-screen">
      <AnimationWrapper />
      <div className="container mx-auto px-4 py-16">
        <GlassContainer>
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </GlassContainer>
      </div>
    </main>
  );
} 