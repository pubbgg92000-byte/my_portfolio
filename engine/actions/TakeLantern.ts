import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function TakeLantern(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getPart("right-upper-arm"), { rotate: -34, duration: 0.18 })
    .to(actor.getPart("lantern"), { autoAlpha: 1, scale: 0.7, duration: 0.05 }, "<")
    .to(actor.getPart("lantern"), { scale: 1, rotate: -12, duration: 0.28, ease: "back.out(1.7)" })
    .to(actor.getPart("lantern"), { rotate: 8, duration: 0.22, ease: "sine.inOut", yoyo: true, repeat: 2 });

  return createAction(tl);
}
