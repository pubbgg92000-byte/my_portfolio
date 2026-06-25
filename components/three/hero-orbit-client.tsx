"use client";

import dynamic from "next/dynamic";

const HeroOrbit = dynamic(() => import("./hero-orbit").then((mod) => mod.HeroOrbit), {
  ssr: false,
});

export function HeroOrbitClient() {
  return <HeroOrbit />;
}
