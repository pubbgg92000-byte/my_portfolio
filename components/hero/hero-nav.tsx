"use client";

import { Sparkles } from "lucide-react";
import { heroCopy } from "@/content/site/hero-content";

export function HeroNav() {
  return (
    <header className="relative z-20 flex items-center justify-between gap-5 py-5">
      <div>
        <p className="font-display text-xl font-semibold tracking-wide text-white">
          {heroCopy.identity} <span className="text-violet-400">M</span>
        </p>
        <p className="mt-1 text-sm text-slate-400">{heroCopy.role}</p>
      </div>
      <nav className="hidden items-center gap-8 text-sm font-medium text-white lg:flex">
        {heroCopy.navItems.map((item) => (
          <a
            key={item}
            href={item === "Home" ? "#" : `#${item.toLowerCase()}`}
            className="relative rounded-full px-3 py-2 transition hover:text-violet-200 data-[active=true]:bg-violet-500/10 data-[active=true]:text-violet-300 data-[active=true]:after:absolute data-[active=true]:after:inset-x-3 data-[active=true]:after:-bottom-1 data-[active=true]:after:h-px data-[active=true]:after:bg-violet-400"
            data-active={item === "Home"}
          >
            {item}
          </a>
        ))}
      </nav>
      <a
        href="#projects"
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-violet-400/70 bg-violet-400/10 px-4 text-sm font-semibold text-violet-100 transition hover:border-violet-200 hover:bg-violet-400/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
        title="Follow Arvi through the portfolio"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">{heroCopy.tourCta}</span>
      </a>
    </header>
  );
}
