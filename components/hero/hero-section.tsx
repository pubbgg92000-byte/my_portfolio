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
    <section ref={rootRef} data-room="home" data-room-state="idle" className="relative isolate h-screen overflow-hidden bg-[#06070B] text-white">
      <HeroBackground />
      <HeroSceneLayer />
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[96rem] flex-col px-5 sm:px-8">
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
            <div className="absolute left-10 top-20 h-16 w-9 rounded-md border border-cyan-200/20 bg-cyan-200/[0.03]" />
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

function HeroSceneLayer() {
  return (
    <div data-hero-scene className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <div
        data-hero-dim
        className="absolute inset-0 bg-[radial-gradient(circle_at_54%_16%,rgb(245_158_11/0.1),transparent_12rem),linear-gradient(180deg,rgb(0_0_0/0.62),rgb(0_0_0/0.34)_42%,rgb(0_0_0/0.18))]"
      />
      <div data-hero-room-light className="absolute inset-0 opacity-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_23%,rgb(251_191_36/0.24),transparent_23rem),radial-gradient(circle_at_50%_92%,rgb(245_158_11/0.16),transparent_32rem)]" />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-amber-200/16 to-transparent" />
      </div>
      <div data-hero-floor className="absolute inset-x-0 bottom-[5.4rem] h-px bg-amber-100/20 shadow-[0_0_22px_rgb(251_191_36/0.3)]" />
      <div data-hero-floor-glow className="absolute left-1/2 bottom-[4.8rem] h-12 w-[36rem] -translate-x-1/2 rounded-full bg-amber-300/10 opacity-0 blur-2xl" />

      <div data-hero-bulb className="absolute left-[52%] top-0 h-36 w-24 -translate-x-1/2">
        <div data-hero-bulb-cord className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-amber-100/35" />
        <div data-hero-bulb-halo className="absolute left-1/2 top-16 h-28 w-28 -translate-x-1/2 rounded-full bg-amber-300/10 opacity-60 blur-2xl" />
        <div data-hero-bulb-glass className="absolute left-1/2 top-16 h-12 w-9 -translate-x-1/2 rounded-b-full rounded-t-lg border border-amber-100/55 bg-black/45 shadow-[0_0_18px_rgb(251_191_36/0.24)]">
          <div data-hero-bulb-filament className="absolute left-1/2 top-5 h-3 w-4 -translate-x-1/2 rounded-full border-b border-amber-100/50 opacity-30" />
        </div>
      </div>

      <div data-hero-rays className="absolute left-[52%] top-20 h-[36rem] w-[42rem] -translate-x-1/2 opacity-0">
        <div className="absolute left-1/2 top-0 h-full w-24 -translate-x-1/2 bg-gradient-to-b from-amber-200/28 to-transparent blur-2xl" />
        <div className="absolute left-1/2 top-0 h-full w-72 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(251_191_36/0.18),transparent_68%)] blur-xl" />
      </div>

      <div data-hero-dust className="absolute inset-0 opacity-0">
        {Array.from({ length: 34 }, (_, index) => (
          <span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-amber-100/70 shadow-[0_0_16px_rgb(251_191_36/0.45)]"
            style={{
              left: `${28 + ((index * 19) % 46)}%`,
              top: `${12 + ((index * 29) % 58)}%`,
            }}
          />
        ))}
      </div>

      <div data-hero-ladder className="absolute left-1/2 top-0 h-80 w-24 opacity-0">
        <div className="absolute bottom-0 left-5 h-full w-1 rounded-full bg-gradient-to-b from-amber-100/80 via-yellow-800/90 to-amber-950" />
        <div className="absolute bottom-0 right-5 h-full w-1 rounded-full bg-gradient-to-b from-amber-100/80 via-yellow-800/90 to-amber-950" />
        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index}
            className="absolute left-6 right-6 h-1 rounded-full bg-gradient-to-r from-yellow-900 via-amber-200/85 to-yellow-900 shadow-[0_0_10px_rgb(251_191_36/0.18)]"
            style={{ bottom: `${index * 9 + 7}%` }}
          />
        ))}
      </div>

      <div data-hero-rope className="absolute left-[52%] top-0 h-screen w-8 -translate-x-1/2 opacity-0">
        <div data-hero-rope-line className="mx-auto h-full w-1 origin-top rounded-full bg-gradient-to-b from-amber-100 via-yellow-800 to-amber-300 shadow-[0_0_16px_rgb(251_191_36/0.32)]" />
        <div data-hero-rope-tip className="absolute bottom-[5.25rem] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-200 shadow-[0_0_18px_rgb(251_191_36/0.5)]" />
      </div>
    </div>
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
