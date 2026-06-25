import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects/projects";

export function FeaturedProjectsSection() {
  return (
    <Section id="featured-work">
      <PageContainer>
        <div className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="Selected work"
            title="Three focused case studies across product, business, and creative web."
            description="A curated set of projects that shows Arvind’s range without turning the homepage into a crowded archive."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects
              .filter((project) => project.featured)
              .slice(0, 3)
              .map((project) => (
                <ProjectCard key={project.slug} project={project} featured />
              ))}
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
