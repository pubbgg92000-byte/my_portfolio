"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useProjectsScene } from "@/hooks/useProjectsScene";
import { projects } from "@/content/projects/projects";

export function ProjectsRoom() {
  const rootRef = useRef<HTMLElement>(null);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  useProjectsScene(rootRef);

  return (
    <section
      id="projects"
      ref={rootRef}
      data-room="projects"
      data-room-state="idle"
      className="relative isolate min-h-screen overflow-hidden bg-[#05070b] px-5 py-20 text-white sm:px-8 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgb(255_255_255/0.2)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.18)_1px,transparent_1px)] [background-size:90px_90px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-cyan-300/10 to-transparent" />
      <div data-project-rope className="pointer-events-none absolute left-[18%] top-0 h-0 w-px bg-cyan-100/70 shadow-[0_0_18px_rgb(103_232_249/0.5)]" />
      <div data-project-beam className="pointer-events-none absolute left-0 top-0 h-56 w-80 rounded-full bg-amber-200/16 blur-2xl" />

      {Array.from({ length: 6 }, (_, index) => (
        <span
          key={index}
          data-project-dust
          className="pointer-events-none absolute left-[18%] top-[72%] h-1.5 w-1.5 rounded-full bg-amber-100/60"
          style={{ transform: `translate(${index * 11 - 26}px, ${index % 2 === 0 ? 4 : -3}px)` }}
        />
      ))}

      <div className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl flex-col justify-center">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Selected work</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Project cards wake up only when Arvi brings the lantern close.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            Three focused case studies across product, business, and creative web.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-project-card
              className="group grid overflow-hidden rounded-[1.75rem] border border-cyan-200/15 bg-black/35 shadow-card transition hover:border-amber-200/70"
            >
              <div data-project-card-media className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} cover`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div data-project-card-content className="p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">{project.category}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-amber-200" />
                </div>
                <p className="text-sm leading-6 text-slate-300">{project.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
