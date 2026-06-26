import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { Grab } from "./Grab";
import { Look } from "./Look";
import { Reach } from "./Reach";
import { neutralPose, setPropVisibility } from "./rig";

export function SlideRope(actor: Actor, y: number) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("focused");
  tl.call(() => setPropVisibility(actor, "rope", true));
  tl.to(actor.getPart("rope-anchor"), { autoAlpha: 1, duration: 0.12 }, 0);
  tl.add(Look(actor, "up").timeline, 0);
  tl.add(Reach(actor, { hand: "both", target: "rope" }).timeline, "+=0.04");
  tl.add(Grab(actor, "rope", "right").timeline, "-=0.05");
  tl.to(root, { autoAlpha: 1, y, duration: 0.95, ease: "power2.in" }, "+=0.02");
  tl.to(actor.getParts(["left-hand", "right-hand"]), { y: 6, duration: 0.16, repeat: 5, yoyo: true, ease: "sine.inOut" }, "-=0.88");
  tl.to(actor.getParts(["left-leg", "right-leg"]), { rotate: 14, duration: 0.18, repeat: 4, yoyo: true, ease: "sine.inOut" }, "-=0.8");
  tl.to(actor.getPart("backpack"), { rotate: 12, duration: 0.18, repeat: 4, yoyo: true, ease: "sine.inOut" }, "-=0.76");
  tl.to(actor.getParts(["left-foot", "right-foot"]), { y: 4, scaleY: 0.72, duration: 0.1, ease: "power2.out" }, "-=0.06");
  tl.to(actor.getPart("body"), { y: 5, scaleY: 0.92, scaleX: 1.04, duration: 0.12, ease: "power2.out" }, "<");
  tl.to(actor.getPart("body"), { y: -3, scaleY: 1.04, scaleX: 0.98, duration: 0.18, ease: "power2.out" });
  tl.to(actor.getPart("body"), { y: 0, scaleY: 1, scaleX: 1, duration: 0.28, ease: "elastic.out(1, 0.55)" });
  tl.to(actor.getPart("rope"), { autoAlpha: 0, duration: 0.12 }, "-=0.18");
  tl.add(() => neutralPose(actor, 0.35), "-=0.16");

  return createAction(tl);
}
