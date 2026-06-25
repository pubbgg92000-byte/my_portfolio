import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";

const stack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "R3F", "Zustand"];

export function StackPreviewSection() {
  return (
    <Section className="bg-surface/25">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Stack"
            title="Modern frontend tools with room for motion and selective 3D."
            description="The stack supports polished product UI, fast content iteration, curated imagery, and future interactive guide features."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stack.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-background/68 p-4 text-center text-sm font-semibold text-secondary">
                {item}
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
