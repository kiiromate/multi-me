import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { GlassCard } from "./glass-card"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/data/blogPosts"

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const { title, excerpt, mainImage, publishedAt, tags, slug } = post
  
  // Calculate estimated read time (1 min per 200 words)
  const readTime = `${Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read`
  
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <GlassCard interactive className={`group overflow-hidden ${featured ? "md:col-span-2" : ""}`}>
      {/* Featured Image */}
      <div className={`relative overflow-hidden ${featured ? "aspect-[2/1]" : "aspect-video"}`}>
        <Image
          src={mainImage || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent" />

        {/* Category Badge */}
        {tags && tags.length > 0 && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-accent-honey/90 text-bg-primary border-0 font-medium">{tags[0]}</Badge>
          </div>
        )}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-text-primary/80 text-bg-primary border-0 font-medium">Featured</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={publishedAt}>{formattedDate}</time>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`} className="group/title">
          <h3
            className={`font-inter font-semibold text-text-primary group-hover/title:text-accent-honey transition-colors duration-200 line-clamp-2 ${
              featured ? "text-2xl" : "text-xl"
            }`}
          >
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p
          className={`font-system text-text-secondary leading-relaxed ${
            featured ? "line-clamp-4 text-lg" : "line-clamp-3"
          }`}
        >
          {excerpt}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-medium bg-text-primary/5 text-text-secondary hover:bg-accent-honey/10 hover:text-accent-honey transition-colors duration-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  )
}

export default BlogPostCard
