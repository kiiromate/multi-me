import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Clock } from "lucide-react"
import { GlassCard } from "./glass-card"
import { Badge } from "@/components/ui/badge"
import { Project } from "@/data/projects"

// Status configuration for different project states
const statusConfig = {
  completed: { label: "Live", color: "bg-green-500/20 text-green-700 dark:text-green-300" },
  "in-progress": { label: "In Progress", color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300" },
  planned: { label: "Planned", color: "bg-blue-500/20 text-blue-700 dark:text-blue-300" },
}

interface ProjectCardProps {
  project: Project;
  status?: "completed" | "in-progress" | "planned";
}

export function ProjectCard({ project, status = "completed" }: ProjectCardProps) {
  const statusInfo = statusConfig[status]
  const { title, summary, mainImage, technologies, liveUrl, repoUrl, slug } = project

  return (
    <GlassCard interactive className="group overflow-hidden">
      {/* Hero Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent" />

        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <Badge className={`${statusInfo.color} border-0 font-medium`}>
            <Clock className="w-3 h-3 mr-1" />
            {statusInfo.label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Link href={`/projects/${slug}`} className="group/title">
          <h3 className="font-inter font-semibold text-xl text-text-primary group-hover/title:text-accent-honey transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="font-system text-text-secondary leading-relaxed line-clamp-3">{summary}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs font-medium bg-text-primary/5 text-text-secondary hover:bg-accent-honey/10 hover:text-accent-honey transition-colors duration-200"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2">
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent-honey transition-colors duration-200 group/link"
            >
              <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-200" />
              Live Demo
            </Link>
          )}

          {repoUrl && (
            <Link
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent-honey transition-colors duration-200 group/link"
            >
              <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-200" />
              Source
            </Link>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

export default ProjectCard
