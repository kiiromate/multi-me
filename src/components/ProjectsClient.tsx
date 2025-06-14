'use client'

import dynamic from "next/dynamic";
import GlassContainer from "@/components/GlassContainer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const SpiralBackgroundAnimation = dynamic(() => import("@/components/SpiralBackgroundAnimation"), { ssr: false });

export default function ProjectsClient() {
  return (
    <>
      <SpiralBackgroundAnimation />
      <main className="min-h-screen flex flex-col items-center justify-center p-8 pt-24">
        <GlassContainer className="max-w-4xl w-full">
          <h1 className="text-4xl font-bold mb-8 text-accent text-center">Projects</h1>
          <div className="flex flex-col gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </GlassContainer>
      </main>
    </>
  );
} 