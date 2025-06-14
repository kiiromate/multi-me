import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/blogPosts";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-background/80 backdrop-blur rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-0 md:gap-8">
      <div className="relative w-full md:w-64 h-48 md:h-64 flex-shrink-0">
        <Image
          src={post.mainImage}
          alt={post.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 256px"
        />
      </div>
      <div className="flex flex-col justify-between p-6 flex-1">
        <div>
          <h2 className="text-2xl font-bold text-accent mb-2">{post.title}</h2>
          <p className="text-foreground-subtle mb-4">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-2 items-center">
          <span className="text-xs text-foreground-subtle">
            {new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
} 