import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { Grab } from "./Grab";
import { Look } from "./Look";
import { Reach } from "./Reach";
import { neutralPose, setPropVisibility } from "./rig";

export function TakeLantern(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("curious");
  tl.add(Look(actor, "left").timeline, 0);
  tl.add(Reach(actor, { hand: "right", target: "backpack" }).timeline, "+=0.05");
  tl.to(actor.getPart("backpack-flap"), { rotate: -22, duration: 0.16, ease: "back.out(1.6)" }, "-=0.1");
  tl.call(() => setPropVisibility(actor, "lantern", true));
  tl.add(Grab(actor, "lantern", "right").timeline, "+=0.02");
  tl.to(actor.getPart("backpack-flap"), { rotate: 0, duration: 0.24, ease: "elastic.out(1, 0.55)" }, "-=0.08");
  tl.to(actor.getPart("right-arm"), { rotate: -12, duration: 0.24, ease: "power2.out" }, "-=0.02");
  tl.to(actor.getPart("right-hand"), { rotate: 4, duration: 0.24, ease: "power2.out" }, "<");
  tl.to(actor.getPart("lantern"), { rotate: -14, duration: 0.25, repeat: 2, yoyo: true, ease: "sine.inOut" }, "-=0.08");
  tl.add(() => neutralPose(actor, 0.34), "-=0.05");

  return createAction(tl);
}
