import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function Celebrate(actor: Actor) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("happy");
  tl.to(root, { y: "-=12", duration: 0.16, ease: "power2.out" })
    .to(actor.getParts(["left-arm", "right-arm"]), { rotate: -95, duration: 0.2, ease: "back.out(1.8)" }, "<")
    .to(actor.getParts(["left-hand", "right-hand"]), { rotate: -18, duration: 0.16 }, "<")
    .to(root, { y: "+=12", duration: 0.24, ease: "bounce.out" })
    .to(actor.getParts(["left-arm", "right-arm", "left-hand", "right-hand"]), { rotate: 0, duration: 0.36, ease: "elastic.out(1, 0.6)" }, "-=0.05");

  return createAction(tl);
}
