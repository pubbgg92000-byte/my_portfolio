import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function Point(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getParts(["left-eye", "right-eye"]), { x: 3, duration: 0.12 })
    .to(actor.getPart("head"), { rotate: 6, duration: 0.22 }, "-=0.03")
    .to(actor.getPart("right-upper-arm"), { rotate: -72, duration: 0.28, ease: "back.out(1.7)" }, "-=0.08")
    .to(actor.getPart("right-lower-arm"), { rotate: -18, duration: 0.24 }, "<");

  return createAction(tl);
}
