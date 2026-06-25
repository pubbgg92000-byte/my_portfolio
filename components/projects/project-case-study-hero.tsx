import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import type { Project } from "@/content/projects/types";
import { ProjectStackChips } from "./project-stack-chips";

export function ProjectCaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{project.category}</p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-none text-primary sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary">{project.longDescription}</p>
          <div className="mt-7">
            <ProjectStackChips items={project.stack.slice(0, 5)} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <ButtonLink href={project.liveUrl} target="_blank" rel="noreferrer">
                Live preview
              </ButtonLink>
            ) : null}
            {project.githubUrl ? (
              <ButtonLink href={project.githubUrl} variant="secondary" target="_blank" rel="noreferrer">
                GitHub
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-border bg-surface shadow-card">
          <Image src={project.coverImage} alt={`${project.title} cover`} fill className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}
