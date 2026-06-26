import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function Blink(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getParts(["left-eye", "right-eye"]), { scaleY: 0.08, duration: 0.045, transformOrigin: "50% 50%" })
    .to(actor.getParts(["left-eye", "right-eye"]), { scaleY: 1, duration: 0.08 });

  return createAction(tl);
}
