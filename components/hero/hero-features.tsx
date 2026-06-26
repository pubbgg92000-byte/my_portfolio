import { Code2, Gauge, Layers3, Sparkles } from "lucide-react";
import { heroFeatures } from "@/content/site/hero-content";
import { cn } from "@/lib/utils/cn";

const icons = [Code2, Layers3, Gauge, Sparkles];

export function HeroFeatures() {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-4">
      {heroFeatures.map((feature, index) => {
        const Icon = icons[index];

        return (
          <article
            key={feature.title}
            className={cn(
              "border-white/10 p-5 xl:border-r xl:last:border-r-0",
              index % 2 === 0 ? "sm:border-r" : "",
              index < 2 ? "max-xl:border-b" : "",
            )}
          >
            <div className="mb-4 inline-flex rounded-xl border border-violet-300/35 bg-violet-300/10 p-2 text-violet-200">
              <Icon className="h-4 w-4" />
            </div>
            <h2 className="font-display text-base font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
          </article>
        );
      })}
    </div>
  );
}
