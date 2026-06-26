import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function OpenBackpack(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getPart("head"), { rotate: -9, duration: 0.22 })
    .to(actor.getPart("left-upper-arm"), { rotate: 34, duration: 0.24 }, "-=0.1")
    .to(actor.getPart("left-lower-arm"), { rotate: 46, duration: 0.22 }, "<")
    .to(actor.getPart("backpack"), { rotate: -13, x: -4, duration: 0.22, ease: "back.out(1.7)" })
    .to(actor.getPart("backpack"), { rotate: 0, x: 0, duration: 0.35, ease: "elastic.out(1, 0.55)" });

  return createAction(tl);
}
