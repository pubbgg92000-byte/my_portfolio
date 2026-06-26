import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function TakeKey(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getPart("keys"), { autoAlpha: 1, rotate: -12, duration: 0.2, ease: "back.out(1.7)" })
    .to(actor.getPart("keys"), { rotate: 9, duration: 0.16, repeat: 2, yoyo: true });

  return createAction(tl);
}
