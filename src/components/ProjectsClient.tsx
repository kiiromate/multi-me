'use client'

import dynamic from "next/dynamic";
import { projects } from "@/data/projects";
import { Header } from "./header";
import { SkipNav } from "./skip-nav";
import { Footer } from "./footer";
import ProjectCard from "./project-card";
import { ContentGrid } from "./content-grid";

const SpiralBackgroundAnimation = dynamic(() => import("@/components/SpiralBackgroundAnimation"), { ssr: false });

export default function ProjectsClient() {
  return (
    <>
      <SkipNav />
      <Header />
      <SpiralBackgroundAnimation />
      <main id="main" className="min-h-screen flex flex-col items-center justify-center p-8 pt-24 pb-16">
        <div className="max-w-7xl w-full mx-auto">
          <h1 className="font-inter font-bold text-5xl md:text-6xl text-text-primary mb-6 tracking-tighter">
            Projects <span className="text-accent-honey">Portfolio</span>
          </h1>
          <p className="font-manrope text-xl text-text-secondary max-w-2xl mb-12">
            A collection of my work in data visualization, web development, and creative coding.
          </p>
          
          <ContentGrid>
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                status={project.liveUrl ? "completed" : "in-progress"}
              />
            ))}
          </ContentGrid>
        </div>
      </main>
      <Footer />
    </>
  );
} 