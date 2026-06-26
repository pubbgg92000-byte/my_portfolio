import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { heroCopy } from "@/content/site/hero-content";

export function HeroCopy() {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">{heroCopy.eyebrow}</p>
      <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.04] text-white sm:text-5xl xl:text-[3.4rem] 2xl:text-6xl">
        {heroCopy.headlinePrefix}{" "}
        <span className="text-fuchsia-400 drop-shadow-[0_0_22px_rgb(217_70_239/0.42)]">
          {heroCopy.headlineAccents[0]}
        </span>
        ,{" "}
        <span className="text-blue-500 drop-shadow-[0_0_22px_rgb(59_130_246/0.45)]">
          {heroCopy.headlineAccents[1]}
        </span>{" "}
        and{" "}
        <span className="text-violet-400 drop-shadow-[0_0_22px_rgb(139_92_246/0.45)]">
          {heroCopy.headlineAccents[2]}
        </span>
        .
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">{heroCopy.supportingText}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-600 px-6 text-sm font-semibold text-white shadow-[0_0_38px_rgb(139_92_246/0.36)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
        >
          {heroCopy.primaryCta}
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/resume.pdf"
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/14 bg-black/20 px-6 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-violet-300/60 hover:bg-white/[0.075] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
        >
          {heroCopy.secondaryCta}
          <ArrowDownToLine className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
