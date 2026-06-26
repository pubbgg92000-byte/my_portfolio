import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function Think(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("focused");
  tl.to(actor.getParts(["left-eye", "right-eye"]), { x: 1, y: -2, duration: 0.15 })
    .to(actor.getPart("head"), { rotate: -12, y: 2, duration: 0.34, ease: "power2.out" }, "-=0.03")
    .to(actor.getPart("right-upper-arm"), { rotate: -28, duration: 0.28 }, "-=0.18")
    .to(actor.getPart("right-lower-arm"), { rotate: -38, duration: 0.28 }, "<")
    .to(actor.getPart("head"), { rotate: -8, duration: 0.28, ease: "sine.inOut", yoyo: true, repeat: 1 }, "+=0.1");

  return createAction(tl);
}
