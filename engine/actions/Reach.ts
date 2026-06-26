import type { Actor, ArviPart } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

type ReachOptions = {
  hand?: "left" | "right" | "both";
  target?: "backpack" | "forward" | "up" | "rope" | "head";
};

const poses = {
  backpack: { arm: -36, hand: 54, body: -3, head: -10, eyeX: -3, eyeY: 1 },
  forward: { arm: -42, hand: -34, body: 2, head: 7, eyeX: 4, eyeY: 0 },
  up: { arm: -92, hand: -28, body: -2, head: -9, eyeX: 1, eyeY: -3 },
  rope: { arm: -86, hand: -18, body: 0, head: -5, eyeX: 0, eyeY: -3 },
  head: { arm: -68, hand: 64, body: -2, head: -7, eyeX: -2, eyeY: -1 },
};

export function Reach(actor: Actor, options: ReachOptions = {}) {
  const gsap = getGsap();
  const target = poses[options.target ?? "forward"];
  const hand = options.hand ?? "right";
  const arms: ArviPart[] = hand === "both" ? ["left-arm", "right-arm"] : [`${hand}-arm` as ArviPart];
  const hands: ArviPart[] = hand === "both" ? ["left-hand", "right-hand"] : [`${hand}-hand` as ArviPart];
  const direction = hand === "left" ? -1 : 1;
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getParts(["left-eye", "right-eye"]), { x: target.eyeX * direction, y: target.eyeY, duration: 0.1 })
    .to(actor.getPart("head"), { rotate: target.head * direction, duration: 0.2 }, "+=0.03")
    .to(actor.getPart("body"), { rotate: target.body * direction, x: direction * 1.5, duration: 0.24, ease: "sine.out" }, "-=0.12")
    .to(actor.getParts(arms), { rotate: target.arm * direction, duration: 0.28, ease: "back.out(1.45)" }, "-=0.08")
    .to(actor.getParts(hands), { rotate: target.hand * direction, duration: 0.24, ease: "power2.out" }, "-=0.2");

  return createAction(tl);
}
