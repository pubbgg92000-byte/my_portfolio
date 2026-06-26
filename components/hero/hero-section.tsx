"use client";

import { useRef } from "react";
import { useHomeScene } from "@/hooks/useHomeScene";
import { HeroCopy } from "./hero-copy";
import { HeroFeatures } from "./hero-features";
import { HeroNav } from "./hero-nav";
import { HeroStats } from "./hero-stats";

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  useHomeScene(rootRef);

  return (
    <section ref={rootRef} data-room="home" data-room-state="idle" className="relative isolate min-h-screen overflow-hidden bg-[#06070B] text-white">
      <HeroBackground />
      <div data-home-glow className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_58%_42%,rgb(251_191_36/0.2),transparent_28rem),radial-gradient(circle_at_20%_28%,rgb(34_211_238/0.16),transparent_30rem)] opacity-0" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[96rem] flex-col px-5 sm:px-8">
        <HeroNav />
        <div className="grid flex-1 gap-8 py-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center 2xl:gap-10">
          <div data-home-reveal>
            <HeroCopy />
            <HeroStats />
          </div>

          <div data-home-reveal className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/10 bg-black/32 shadow-frame backdrop-blur-xl">
            <div className="absolute inset-6 rounded-[1.5rem] border border-cyan-200/10" />
            <div data-home-electric className="absolute inset-x-8 top-12 h-px bg-amber-200/70 shadow-[0_0_22px_rgb(251_191_36/0.45)]" />
            <div data-home-electric className="absolute inset-y-12 right-12 w-px origin-top bg-amber-200/70 shadow-[0_0_22px_rgb(251_191_36/0.45)]" />
            <div data-home-electric className="absolute bottom-10 left-10 right-10 h-px bg-amber-200/70 shadow-[0_0_22px_rgb(251_191_36/0.45)]" />
            <div data-home-switch className="absolute left-10 top-20 h-16 w-9 rounded-md border border-cyan-200/20 bg-cyan-200/[0.03]" />
            <div className="absolute bottom-16 right-14 grid w-56 gap-3">
              {["Product UI", "Business Sites", "Interactive Work"].map((label) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
                  {label}
                </div>
              ))}
            </div>
            <div className="mx-auto flex w-max items-center gap-3 rounded-full border border-white/10 bg-black/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 shadow-frame backdrop-blur-xl">
              <span className="h-5 w-3 rounded-full border border-white/70 before:mx-auto before:mt-1 before:block before:h-1 before:w-1 before:rounded-full before:bg-white/80" />
              Scroll to explore
            </div>
          </div>
        </div>
        <div data-home-reveal>
          <HeroFeatures />
        </div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgb(139_92_246/0.16),transparent_30rem),radial-gradient(circle_at_55%_34%,rgb(34_211_238/0.11),transparent_28rem),radial-gradient(circle_at_76%_68%,rgb(168_85_247/0.14),transparent_30rem),linear-gradient(135deg,#03040A_0%,#070812_48%,#0B0D19_100%)]" />
      <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgb(255_255_255/0.22)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.18)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-violet-400/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
      {Array.from({ length: 24 }, (_, index) => (
        <span
          key={index}
          data-home-particle
          className="absolute h-1 w-1 rounded-full bg-cyan-100/70 shadow-[0_0_18px_rgb(34_211_238/0.7)]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${8 + ((index * 23) % 82)}%`,
            opacity: 0.35 + (index % 4) * 0.12,
          }}
        />
      ))}
    </div>
  );
}
