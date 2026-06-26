import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function Jump(actor: Actor) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getParts(["left-leg", "right-leg"]), { rotate: -18, duration: 0.12 })
    .to(root, { y: "-=36", duration: 0.24, ease: "power2.out" })
    .to(root, { y: "+=36", duration: 0.32, ease: "power2.in" });

  return createAction(tl);
}
