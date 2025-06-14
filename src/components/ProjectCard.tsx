import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-background/80 backdrop-blur rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-0 md:gap-8">
      <div className="relative w-full md:w-64 h-48 md:h-64 flex-shrink-0">
        <Image
          src={project.mainImage}
          alt={project.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 256px"
        />
      </div>
      <div className="flex flex-col justify-between p-6 flex-1">
        <div>
          <h2 className="text-2xl font-bold text-accent mb-2">{project.title}</h2>
          <p className="text-foreground-subtle mb-4">{project.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            Details
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-accent"
            >
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-accent"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 