import { heroStats } from "@/content/site/hero-content";

export function HeroStats() {
  return (
    <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-black/28 backdrop-blur-xl sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      {heroStats.map((stat) => (
        <div key={stat.label} className="border-white/10 p-4 odd:border-r sm:border-r sm:last:border-r-0 lg:odd:border-r xl:border-r xl:last:border-r-0">
          <p className="font-display text-2xl font-semibold text-violet-300">{stat.value}</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
