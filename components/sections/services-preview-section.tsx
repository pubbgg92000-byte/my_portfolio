import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { services } from "@/content/services/services";

export function ServicesPreviewSection() {
  return (
    <Section className="bg-surface/28">
      <PageContainer>
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Services"
            title="Frontend work for businesses, products, and premium presentation."
            description="Service positioning is kept practical: focused on the kinds of work Arvind can show and support."
          />
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            View services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {services.slice(0, 4).map((service) => (
            <article key={service.slug} className="rounded-[1.5rem] border border-border bg-background/70 p-6">
              <h3 className="font-display text-xl font-semibold text-primary">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{service.summary}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
