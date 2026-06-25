import { ButtonLink } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";

export function ContactCTASection() {
  return (
    <Section>
      <PageContainer>
        <div className="rounded-[2rem] border border-border bg-primary p-8 text-background shadow-card sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-background/70">Availability</p>
          <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Have a product UI, business website, or showcase project in mind?
            </h2>
            <ButtonLink href="/contact" variant="secondary" className="border-background/20 bg-background text-primary hover:bg-accent">
              Contact Arvind
            </ButtonLink>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
