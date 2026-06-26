import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { Grab } from "./Grab";
import { Look } from "./Look";
import { Reach } from "./Reach";
import { setPropVisibility } from "./rig";

export function TakeLadder(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("focused");
  tl.add(Look(actor, "left").timeline, 0);
  tl.add(Reach(actor, { hand: "right", target: "backpack" }).timeline, "+=0.06");
  tl.to(actor.getPart("backpack-flap"), { rotate: -25, duration: 0.16, ease: "back.out(1.6)" }, "-=0.1");
  tl.call(() => setPropVisibility(actor, "ladder", true));
  tl.add(Grab(actor, "ladder", "right").timeline, "+=0.02");
  tl.to(actor.getPart("right-arm"), { rotate: -20, duration: 0.24, ease: "power2.out" });
  tl.to(actor.getPart("right-hand"), { rotate: -8, duration: 0.2 }, "<");
  tl.to(actor.getPart("ladder"), { rotate: 7, duration: 0.22, repeat: 1, yoyo: true, ease: "sine.inOut" }, "-=0.1");
  tl.to(actor.getPart("backpack-flap"), { rotate: 0, duration: 0.22, ease: "elastic.out(1, 0.5)" }, "-=0.15");

  return createAction(tl);
}
