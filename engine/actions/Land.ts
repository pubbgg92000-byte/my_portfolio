import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function Land(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getPart("body"), { scaleY: 0.9, scaleX: 1.05, y: 5, duration: 0.12, transformOrigin: "50% 100%" })
    .to(actor.getParts(["left-foot", "right-foot"]), { scaleY: 0.7, y: 4, duration: 0.1 }, "<")
    .to(actor.getPart("body"), { scaleY: 1.05, scaleX: 0.98, y: -3, duration: 0.18, ease: "power2.out" })
    .to(actor.getPart("body"), { scaleY: 1, scaleX: 1, y: 0, duration: 0.24, ease: "elastic.out(1, 0.5)" })
    .to(actor.getParts(["left-foot", "right-foot", "backpack"]), { scaleY: 1, y: 0, rotate: 0, duration: 0.28, ease: "elastic.out(1, 0.55)" }, "-=0.2");

  return createAction(tl);
}
