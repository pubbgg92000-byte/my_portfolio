import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function LookAround(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });
  const eyes = actor.getParts(["left-eye", "right-eye"]);

  actor.setExpression("curious");
  tl.to(eyes, { x: -3, duration: 0.18, ease: "power2.out" })
    .to(actor.getPart("head"), { rotate: -8, duration: 0.28, ease: "power2.out" }, "-=0.06")
    .to(eyes, { x: 4, duration: 0.16, ease: "power2.out" }, "+=0.1")
    .to(actor.getPart("head"), { rotate: 7, duration: 0.26, ease: "power2.out" }, "-=0.06")
    .to(eyes, { x: 0, duration: 0.14 })
    .to(actor.getPart("head"), { rotate: 0, duration: 0.3, ease: "back.out(1.5)" }, "-=0.04");

  return createAction(tl);
}
