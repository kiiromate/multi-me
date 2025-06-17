import dynamic from "next/dynamic";
import GlassContainer from "@/components/GlassContainer";
import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SkipNav } from "@/components/skip-nav";

// Server-side dynamic import without ssr: false
const MarkdownWrapper = dynamic(() => import("@/components/MarkdownWrapper"));

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Return empty array for now - can be populated with Sanity data later
  return []
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 pt-24">
      <GlassContainer className="max-w-3xl w-full">
        <div className="flex flex-col gap-6 items-center">
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          </div>
          <h1 className="text-3xl font-bold text-accent mb-2 text-center">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-2 justify-center">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-foreground-subtle mb-4">
            {new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <article className="prose prose-invert prose-lg w-full max-w-none">
            <MarkdownWrapper content={post.content} />
          </article>
        </div>
      </GlassContainer>
    </main>
  );
} 