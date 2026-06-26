import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { Look } from "./Look";
import { neutralPose } from "./rig";

export function Climb(actor: Actor, y: number) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("focused");
  tl.add(Look(actor, "up").timeline, 0);
  tl.to(actor.getParts(["left-arm", "right-arm"]), { rotate: -72, duration: 0.2, ease: "back.out(1.4)" }, "+=0.04");
  tl.to(actor.getParts(["left-hand", "right-hand"]), { rotate: -20, duration: 0.16 }, "<");
  tl.to(root, { y, duration: 0.9, ease: "power2.inOut" }, "-=0.08");
  tl.to(actor.getPart("left-leg"), { rotate: -12, duration: 0.18, repeat: 5, yoyo: true, ease: "sine.inOut" }, "-=0.88");
  tl.to(actor.getPart("right-leg"), { rotate: 12, duration: 0.18, repeat: 5, yoyo: true, ease: "sine.inOut" }, "-=0.88");
  tl.to(actor.getPart("backpack"), { rotate: 9, duration: 0.2, repeat: 4, yoyo: true, ease: "sine.inOut" }, "-=0.78");
  tl.add(() => neutralPose(actor, 0.36), "-=0.05");

  return createAction(tl);
}
