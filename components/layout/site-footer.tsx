import Link from "next/link";
import { siteConfig } from "@/content/site/site-config";
import { socialLinks } from "@/content/site/social-links";
import { PageContainer } from "./page-container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <PageContainer className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-primary">Arvind</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{siteConfig.availability}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-secondary transition hover:border-accent hover:text-primary"
              aria-label={link.label}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <link.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </PageContainer>
    </footer>
  );
}
