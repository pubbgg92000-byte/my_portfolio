import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function Land(actor: Actor) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const tl = gsap.timeline({ paused: true });

  tl.to(root, { scaleY: 0.9, scaleX: 1.05, duration: 0.12, transformOrigin: "50% 100%" })
    .to(actor.getParts(["left-boot", "right-boot"]), { scaleY: 0.7, y: 4, duration: 0.1 }, "<")
    .to(root, { scaleY: 1.05, scaleX: 0.98, duration: 0.18, ease: "power2.out" })
    .to(root, { scaleY: 1, scaleX: 1, duration: 0.24, ease: "elastic.out(1, 0.5)" })
    .to(actor.getParts(["left-boot", "right-boot", "backpack"]), { scaleY: 1, y: 0, rotate: 0, duration: 0.28, ease: "elastic.out(1, 0.55)" }, "-=0.2");

  return createAction(tl);
}
