import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { setPropVisibility } from "./rig";

type HeldProp = "lantern" | "ladder" | "notebook" | "keys" | "rope";

export function Release(actor: Actor, prop?: HeldProp) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getParts(["right-hand", "left-hand"]), { scaleX: 1.1, scaleY: 0.92, duration: 0.08 });

  if (prop) {
    tl.to(actor.getPart(prop), { rotate: 5, duration: 0.1, ease: "sine.out" }, "<")
      .call(() => setPropVisibility(actor, prop, false));
  }

  tl.to(actor.getParts(["right-hand", "left-hand"]), { scaleX: 1, scaleY: 1, duration: 0.18, ease: "elastic.out(1, 0.55)" });

  return createAction(tl);
}
