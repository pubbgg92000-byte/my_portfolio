import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { Look } from "./Look";
import { Reach } from "./Reach";
import { neutralPose } from "./rig";

export function PressSwitch(actor: Actor, switchEl: HTMLElement | null) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("curious");
  tl.add(Look(actor, "right").timeline, 0);
  tl.to(actor.getPart("head"), { rotate: 12, y: 2, duration: 0.24, ease: "sine.out" }, "+=0.12");
  tl.to(actor.getParts(["left-eye", "right-eye"]), { x: 4, y: 1, duration: 0.1 }, "-=0.2");
  tl.add(Reach(actor, { hand: "right", target: "forward" }).timeline, "+=0.08");
  tl.to(actor.getPart("right-hand"), { x: 2, duration: 0.16, ease: "sine.inOut", yoyo: true, repeat: 1 }, "+=0.08");
  tl.to(actor.getPart("body"), { x: 3, rotate: 3, duration: 0.12, ease: "power2.in" });
  tl.to(actor.getPart("right-hand"), { x: 6, scaleX: 0.84, duration: 0.1, ease: "power2.in" }, "<");
  tl.to(switchEl, { backgroundColor: "rgba(251, 191, 36, 0.38)", boxShadow: "0 0 40px rgba(251, 191, 36, 0.58)", duration: 0.12 }, "<");
  tl.to(actor.getPart("right-hand"), { x: 0, scaleX: 1, duration: 0.22, ease: "back.out(1.8)" });
  tl.to(actor.getPart("head"), { rotate: -7, duration: 0.2, ease: "sine.out" }, "+=0.12");
  tl.to(actor.getParts(["left-eye", "right-eye"]), { x: -2, y: -1, duration: 0.1 }, "-=0.15");
  tl.call(() => actor.setExpression("happy"));
  tl.to(actor.getPart("body"), { y: -3, duration: 0.14, yoyo: true, repeat: 1, ease: "sine.inOut" });
  tl.add(() => neutralPose(actor, 0.4), "-=0.02");

  return createAction(tl);
}
