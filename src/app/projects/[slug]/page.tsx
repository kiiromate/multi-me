import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import GlassContainer from "@/components/GlassContainer";
import Image from "next/image";

interface ProjectDetailPageProps {
  params: { slug: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 pt-24">
      <GlassContainer className="max-w-3xl w-full">
        <div className="flex flex-col gap-6 items-center">
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4">
            <Image
              src={project.mainImage}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 512px"
            />
          </div>
          <h1 className="text-3xl font-bold text-accent mb-2 text-center">{project.title}</h1>
          <p className="text-lg text-foreground-subtle text-center mb-4">{project.summary}</p>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:text-accent font-semibold"
              >
                Live Site
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:text-accent font-semibold"
              >
                Code
              </a>
            )}
          </div>
        </div>
      </GlassContainer>
    </main>
  );
} 