import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects/types";
import { ProjectStackChips } from "./project-stack-chips";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid overflow-hidden rounded-[1.75rem] border border-border bg-surface/82 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/55"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
        <Image
          src={project.coverImage}
          alt={`${project.title} cover`}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes={featured ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        />
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{project.category}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-primary">{project.title}</h3>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-secondary transition group-hover:text-accent" />
        </div>
        <p className="text-sm leading-6 text-secondary">{project.shortDescription}</p>
        <div className="mt-5">
          <ProjectStackChips items={project.tags} />
        </div>
      </div>
    </Link>
  );
}
