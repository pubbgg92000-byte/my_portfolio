import Link from "next/link";
import { siteConfig } from "@/content/site/site-config";
import { ButtonLink } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { PageContainer } from "./page-container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/55 bg-background/78 backdrop-blur-xl">
      <PageContainer className="relative flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold text-primary">
          Arvind
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {siteConfig.navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-secondary transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href="/contact" variant="secondary" showIcon={false}>
            Start a project
          </ButtonLink>
        </div>
        <MobileNav />
      </PageContainer>
    </header>
  );
}
