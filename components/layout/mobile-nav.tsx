"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site/site-config";
import { useUIStore } from "@/store/use-ui-store";

export function MobileNav() {
  const open = useUIStore((state) => state.mobileNavOpen);
  const setOpen = useUIStore((state) => state.setMobileNavOpen);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-primary"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open ? (
        <div className="absolute inset-x-5 top-20 rounded-[2rem] border border-border bg-surface/95 p-4 shadow-card backdrop-blur">
          <nav className="grid gap-1">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-sm font-medium text-secondary transition hover:bg-elevated hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
