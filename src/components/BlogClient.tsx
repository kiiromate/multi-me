'use client'

import dynamic from "next/dynamic";
import { blogPosts } from "@/data/blogPosts";
import { Header } from "./header";
import { SkipNav } from "./skip-nav";
import { Footer } from "./footer";
import BlogPostCard from "./blog-card";
import { ContentGrid } from "./content-grid";
import { ScrollAnimation, StaggeredAnimation } from "./scroll-animations";

// Create a client component wrapper for the animation
const AnimationWrapper = dynamic(() => import("@/components/SpiralBackgroundAnimation"), { ssr: false });

export default function BlogClient() {
  // Find the most recent blog post for the featured spot
  const featuredPost = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )[0];
  
  // Other blog posts
  const otherPosts = blogPosts.filter(post => post.id !== featuredPost.id);

  return (
    <>
      <SkipNav />
      <Header />
      <AnimationWrapper />
      <main id="main" className="min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h1 className="font-inter font-bold text-5xl md:text-6xl text-text-primary mb-6 tracking-tighter">
              My <span className="text-accent-honey">Blog</span>
            </h1>
            <p className="font-manrope text-xl text-text-secondary max-w-2xl mb-12">
              Thoughts on data visualization, creative coding, and the intersection of design and technology.
            </p>
          </ScrollAnimation>
          
          {/* Featured Post */}
          {featuredPost && (
            <ScrollAnimation delay={0.2} className="mb-16">
              <BlogPostCard post={featuredPost} featured={true} />
            </ScrollAnimation>
          )}
          
          {/* Other Posts */}
          <StaggeredAnimation staggerDelay={0.1}>
            <ContentGrid>
              {otherPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </ContentGrid>
          </StaggeredAnimation>
        </div>
      </main>
      <Footer />
    </>
  );
}