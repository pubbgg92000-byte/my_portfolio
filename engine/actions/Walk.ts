import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";
import { prepareRig } from "./rig";

type WalkOptions = {
  x: number;
  y?: number;
  duration?: number;
};

export function Walk(actor: Actor, options: WalkOptions) {
  const gsap = getGsap();
  const root = actor.requireRoot();
  const duration = options.duration ?? 1;
  const step = 0.24;
  const repeats = Math.max(2, Math.ceil(duration / step));
  const tl = gsap.timeline({ paused: true });

  prepareRig(actor);
  tl.to(root, { autoAlpha: 1, x: options.x, y: options.y, duration, ease: "power2.inOut" }, 0);
  tl.fromTo(actor.getPart("body"), { y: 0, rotate: -1.5 }, { y: -3, rotate: 1.5, duration: step * 0.5, repeat: repeats * 2 - 1, yoyo: true, ease: "sine.inOut" }, 0);
  tl.to(actor.getPart("torso"), { rotate: 2.8, duration: step, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0);
  tl.to(actor.getPart("head"), { y: -3, rotate: -2, duration: step * 0.75, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0.04);
  tl.to(actor.getParts(["left-eye", "right-eye"]), { x: 2, y: -0.5, duration: 0.16, ease: "power2.out" }, 0);

  tl.to(actor.getPart("left-leg"), { rotate: -16, duration: step, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0);
  tl.to(actor.getPart("left-foot"), { rotate: 12, y: -2, duration: step * 0.5, repeat: repeats * 2 - 1, yoyo: true, ease: "sine.inOut" }, 0.02);
  tl.to(actor.getPart("right-leg"), { rotate: 16, duration: step, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0);
  tl.to(actor.getPart("right-foot"), { rotate: -12, y: -2, duration: step * 0.5, repeat: repeats * 2 - 1, yoyo: true, ease: "sine.inOut" }, step * 0.5);

  tl.to(actor.getPart("left-arm"), { rotate: 18, duration: step, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0);
  tl.to(actor.getPart("left-hand"), { rotate: -11, duration: step, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0.03);
  tl.to(actor.getPart("right-arm"), { rotate: -18, duration: step, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0);
  tl.to(actor.getPart("right-hand"), { rotate: 11, duration: step, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0.03);

  tl.to(actor.getPart("backpack"), { rotate: -8, x: -2, duration: step * 1.25, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0.08);
  tl.to(actor.getPart("lantern"), { rotate: 10, x: 1, duration: step * 1.4, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0.13);
  tl.to(actor.getPart("ladder"), { rotate: -6, x: -1, duration: step * 1.5, repeat: repeats, yoyo: true, ease: "sine.inOut" }, 0.1);
  tl.to(actor.getPart("shadow"), { scaleX: 0.9, duration: step * 0.5, repeat: repeats * 2 - 1, yoyo: true, ease: "sine.inOut" }, 0);

  return createAction(tl);
}
