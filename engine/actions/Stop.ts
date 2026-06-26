import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { hangingProps, limbs } from "./rig";

export function Stop(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getParts(limbs), { rotate: 0, y: 0, scaleY: 1, duration: 0.22, ease: "power2.out" }, 0);
  tl.to(actor.getParts(["head", "torso"]), { rotate: 0, y: 0, duration: 0.28, ease: "back.out(1.5)" }, 0);
  tl.to(actor.getParts(hangingProps), { rotate: 11, x: 3, duration: 0.18, ease: "power2.out" }, 0.04);
  tl.to(actor.getParts(hangingProps), { rotate: 0, x: 0, duration: 0.42, ease: "elastic.out(1, 0.55)" });

  return createAction(tl);
}
