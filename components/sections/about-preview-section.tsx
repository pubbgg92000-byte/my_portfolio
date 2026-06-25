import { ButtonLink } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";

export function AboutPreviewSection() {
  return (
    <Section className="pt-0">
      <PageContainer>
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">About Arvind</p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-primary sm:text-5xl">
            I build at the intersection of frontend systems, product clarity, and visual presentation.
          </h2>
          <p className="mt-6 text-lg leading-8 text-secondary">
            My work moves between dashboard-heavy product interfaces, business and brand websites,
            creative showcase experiences, and AI-assisted workflow ideas. I care about making the
            interface make sense before adding polish.
          </p>
          <div className="mt-8">
            <ButtonLink href="/about" variant="secondary">
              Read about my approach
            </ButtonLink>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
