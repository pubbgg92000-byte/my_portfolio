import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { Look } from "./Look";
import { Reach } from "./Reach";
import { Release } from "./Release";

export function PlaceLadder(actor: Actor, placedLadder: HTMLElement | null) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("focused");
  tl.add(Look(actor, "right").timeline, 0);
  tl.add(Reach(actor, { hand: "right", target: "forward" }).timeline, "+=0.05");
  tl.to(actor.getPart("body"), { x: 3, rotate: 4, duration: 0.2, ease: "power2.inOut" }, "-=0.08");
  tl.to(actor.getPart("ladder"), { rotate: 24, x: 8, y: 6, duration: 0.24, ease: "power2.in" }, "<");
  tl.to(placedLadder, { autoAlpha: 1, y: 0, duration: 0.28, ease: "back.out(1.5)" }, "-=0.05");
  tl.add(Release(actor, "ladder").timeline, "-=0.04");
  tl.to(actor.getPart("body"), { x: 0, rotate: 0, duration: 0.34, ease: "elastic.out(1, 0.55)" });

  return createAction(tl);
}
