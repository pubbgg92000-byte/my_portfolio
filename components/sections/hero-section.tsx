import { ButtonLink } from "@/components/ui/button";
import { HeroOrbitClient } from "@/components/three/hero-orbit-client";
import { siteConfig } from "@/content/site/site-config";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pt-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-radial-soft" />
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Frontend developer and freelance web builder
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-semibold leading-[0.98] text-primary sm:text-6xl lg:text-7xl">
            Frontend developer building polished web apps and business websites.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-secondary">
            I design and build modern product interfaces, internal tools, portfolio websites, and
            business-facing web experiences, combining frontend engineering, motion, and AI workflow
            thinking.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/projects">View selected work</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Start a project
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">{siteConfig.availability}</p>
        </div>
        <div className="relative">
          <HeroOrbitClient />
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-muted">
            {["Product UI", "Business Sites", "Interactive Work"].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-surface/76 p-3 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
