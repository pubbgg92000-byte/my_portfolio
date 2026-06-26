import type { Actor, ArviPart } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { setPropVisibility } from "./rig";

type HeldProp = "lantern" | "ladder" | "notebook" | "keys" | "rope";

export function Grab(actor: Actor, prop?: HeldProp, hand: "left" | "right" = "right") {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });
  const handPart = `${hand}-hand` as ArviPart;

  if (prop) {
    tl.call(() => setPropVisibility(actor, prop, true));
  }

  tl.to(actor.getPart(handPart), { scaleX: 0.86, scaleY: 1.12, duration: 0.08, ease: "power2.in" })
    .to(actor.getPart(handPart), { scaleX: 1, scaleY: 1, duration: 0.18, ease: "elastic.out(1, 0.45)" });

  if (prop) {
    tl.fromTo(actor.getPart(prop), { scale: 0.72, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.22, ease: "back.out(1.7)" }, "<");
  }

  return createAction(tl);
}
