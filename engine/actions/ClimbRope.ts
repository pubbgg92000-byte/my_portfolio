import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function ClimbRope(actor: Actor, y: number) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const tl = gsap.timeline({ paused: true });

  tl.to(root, { autoAlpha: 1, y, duration: 0.95, ease: "power2.in" })
    .to(actor.getParts(["left-upper-arm", "right-upper-arm"]), { rotate: -80, repeat: 4, yoyo: true, duration: 0.12 }, 0)
    .to(actor.getParts(["left-upper-leg", "right-upper-leg"]), { rotate: 20, repeat: 4, yoyo: true, duration: 0.12 }, 0.04)
    .to(actor.getPart("backpack"), { rotate: 12, repeat: 3, yoyo: true, duration: 0.16, ease: "sine.inOut" }, 0.1);

  return createAction(tl);
}
