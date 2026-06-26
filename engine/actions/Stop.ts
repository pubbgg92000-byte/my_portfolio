import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { neutralPose } from "./rig";

export function Stop(actor: Actor) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const tl = gsap.timeline({ paused: true });

  tl.to(root, { x: "+=8", duration: 0.14, ease: "power2.out" }, 0);
  tl.to(actor.getPart("body"), { rotate: -4, y: 2, scaleY: 0.97, duration: 0.16, ease: "power2.out" }, 0);
  tl.to(actor.getParts(["left-foot", "right-foot"]), { y: 2, scaleY: 0.86, duration: 0.12, ease: "power2.out" }, 0);
  tl.to(actor.getPart("backpack"), { rotate: 16, x: 5, duration: 0.24, ease: "power2.out" }, 0.05);
  tl.to(actor.getPart("lantern"), { rotate: -18, x: -2, duration: 0.26, ease: "sine.out" }, 0.08);
  tl.to(root, { x: "-=8", duration: 0.32, ease: "back.out(1.8)" }, 0.14);
  tl.add(() => neutralPose(actor, 0.5), 0.22);
  tl.to(actor.getPart("lantern"), { rotate: 8, duration: 0.28, repeat: 2, yoyo: true, ease: "sine.inOut" }, 0.26);

  return createAction(tl);
}
