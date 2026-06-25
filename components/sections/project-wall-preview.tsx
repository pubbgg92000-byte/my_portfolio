import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { galleryItems } from "@/content/gallery/gallery-items";

export function ProjectWallPreview() {
  return (
    <Section className="pt-0">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <SectionHeader
            eyebrow="Project wall"
            title="A gallery-style preview for product screens and visual moments."
            description="One polished wall mode for v1: framed, spacious, and image-led."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {galleryItems.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-border bg-surface shadow-card"
              >
                <Image
                  src={item.image}
                  alt={`${item.title} visual`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 18vw, 45vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                  <p className="text-sm font-semibold text-primary">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
