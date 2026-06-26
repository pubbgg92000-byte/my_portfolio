import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { hangingProps, prepareRig } from "./rig";

type WalkOptions = {
  x: number;
  y?: number;
  duration?: number;
};

export function Walk(actor: Actor, options: WalkOptions) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const duration = options.duration ?? 1;
  const tl = gsap.timeline({ paused: true });

  prepareRig(actor);
  tl.to(root, { autoAlpha: 1, x: options.x, y: options.y, duration, ease: "power2.inOut" }, 0);
  tl.to(actor.getPart("head"), { y: -4, rotate: 2, repeat: Math.max(1, Math.floor(duration / 0.18)), yoyo: true, duration: 0.18, ease: "sine.inOut" }, 0);
  tl.to(actor.getPart("torso"), { rotate: 2.5, repeat: Math.max(1, Math.floor(duration / 0.24)), yoyo: true, duration: 0.24, ease: "sine.inOut" }, 0);
  tl.to(actor.getParts(["left-upper-arm", "right-upper-leg"]), { rotate: 24, repeat: Math.max(1, Math.floor(duration / 0.28)), yoyo: true, duration: 0.28, ease: "sine.inOut" }, 0);
  tl.to(actor.getParts(["right-upper-arm", "left-upper-leg"]), { rotate: -24, repeat: Math.max(1, Math.floor(duration / 0.28)), yoyo: true, duration: 0.28, ease: "sine.inOut" }, 0);
  tl.to(actor.getParts(["left-lower-arm", "right-lower-leg"]), { rotate: -18, repeat: Math.max(1, Math.floor(duration / 0.28)), yoyo: true, duration: 0.28, ease: "sine.inOut" }, 0.06);
  tl.to(actor.getParts(["right-lower-arm", "left-lower-leg"]), { rotate: 18, repeat: Math.max(1, Math.floor(duration / 0.28)), yoyo: true, duration: 0.28, ease: "sine.inOut" }, 0.06);
  tl.to(actor.getParts(["left-boot", "right-boot"]), { scaleY: 0.84, y: 3, repeat: Math.max(1, Math.floor(duration / 0.22)), yoyo: true, duration: 0.11, ease: "sine.inOut" }, 0.04);
  tl.to(actor.getParts(hangingProps), { rotate: -9, x: -3, repeat: Math.max(1, Math.floor(duration / 0.34)), yoyo: true, duration: 0.34, ease: "sine.inOut", stagger: 0.03 }, 0.12);

  return createAction(tl);
}
