import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { businessItems } from "@/content/business/business-items";

export function BusinessPreviewSection() {
  const [item] = businessItems;

  return (
    <Section>
      <PageContainer>
        <div className="grid overflow-hidden rounded-[2rem] border border-border bg-elevated/48 shadow-card lg:grid-cols-2">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">Business direction</p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-primary sm:text-5xl">
              Business-facing websites and practical product thinking.
            </h2>
            <p className="mt-6 text-base leading-7 text-secondary">
              The portfolio includes business and ecommerce-adjacent direction: service websites,
              storefront thinking, internal tools, and operational workflow interfaces.
            </p>
            <div className="mt-8">
              <ButtonLink href="/business" variant="secondary">
                View business page
              </ButtonLink>
            </div>
          </div>
          {item.coverImage ? (
            <div className="relative min-h-[22rem] border-t border-border lg:border-l lg:border-t-0">
              <Image src={item.coverImage} alt={item.title} fill className="object-cover" sizes="50vw" />
            </div>
          ) : null}
        </div>
      </PageContainer>
    </Section>
  );
}
