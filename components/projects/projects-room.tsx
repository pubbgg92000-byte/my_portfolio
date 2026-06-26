"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useProjectsScene } from "@/hooks/useProjectsScene";
import { projects } from "@/content/projects/projects";

export function ProjectsRoom() {
  const rootRef = useRef<HTMLElement>(null);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const [activeProject, setActiveProject] = useState<(typeof featuredProjects)[number] | null>(null);

  useProjectsScene(rootRef);

  return (
    <section
      id="projects"
      ref={rootRef}
      data-room="projects"
      data-room-state="idle"
      className="relative isolate h-screen overflow-hidden bg-[#080706] px-5 py-14 text-white sm:px-8 lg:py-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgb(120_92_62/0.2),transparent_34rem),linear-gradient(180deg,#100d0a_0%,#070606_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(90deg,rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:130px_100%]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[5rem] z-10 h-px bg-amber-100/25 shadow-[0_0_18px_rgb(251_191_36/0.22)]" />
      <div data-project-rope className="pointer-events-none absolute left-[18%] top-0 h-0 w-px bg-cyan-100/70 shadow-[0_0_18px_rgb(103_232_249/0.5)]" />
      <div data-project-beam className="pointer-events-none absolute left-0 top-0 h-64 w-96 rounded-full bg-amber-200/20 blur-2xl" />

      {Array.from({ length: 6 }, (_, index) => (
        <span
          key={index}
          data-project-dust
          className="pointer-events-none absolute left-[18%] top-[72%] h-1.5 w-1.5 rounded-full bg-amber-100/60"
          style={{ transform: `translate(${index * 11 - 26}px, ${index % 2 === 0 ? 4 : -3}px)` }}
        />
      ))}

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Selected work</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            An old gallery of projects, revealed by Arvi&apos;s lantern.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            Click a framed project after it lights up to view the full project images.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => setActiveProject(project)}
              data-project-card
              className="group grid overflow-hidden rounded-sm border-[10px] border-[#5a3924] bg-[#130f0b] text-left shadow-[0_24px_70px_rgb(0_0_0/0.45),inset_0_0_0_1px_rgb(251_191_36/0.2)] transition hover:border-amber-200/70"
            >
              <div data-project-card-media className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} cover`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div data-project-card-content className="border-t border-amber-100/15 bg-black/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">{project.category}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm leading-6 text-slate-300">{project.shortDescription}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeProject ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/88 px-5 py-8 backdrop-blur-md" role="dialog" aria-modal="true">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-200">{activeProject.category}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-white">{activeProject.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/18"
                aria-label="Close project gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-5">
              {[activeProject.coverImage, ...activeProject.galleryImages].map((image, index) => (
                <div key={image} className="relative aspect-[16/10] overflow-hidden rounded-lg border border-amber-100/20 bg-black">
                  <Image src={image} alt={`${activeProject.title} full image ${index + 1}`} fill className="object-contain" sizes="100vw" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
