import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

type LookTarget = "left" | "right" | "up" | "down" | { x?: number; y?: number; head?: number; body?: number };

function resolveLook(target: LookTarget) {
  if (target === "left") return { eyeX: -4, eyeY: 0, head: -9, body: -2 };
  if (target === "right") return { eyeX: 4, eyeY: 0, head: 9, body: 2 };
  if (target === "up") return { eyeX: 0, eyeY: -3, head: -5, body: 0 };
  if (target === "down") return { eyeX: 0, eyeY: 3, head: 6, body: 1 };
  return { eyeX: target.x ?? 0, eyeY: target.y ?? 0, head: target.head ?? 0, body: target.body ?? 0 };
}

export function Look(actor: Actor, target: LookTarget = "right") {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });
  const pose = resolveLook(target);

  actor.setExpression("curious");
  tl.to(actor.getParts(["left-eye", "right-eye"]), { x: pose.eyeX, y: pose.eyeY, duration: 0.11, ease: "power2.out" })
    .to(actor.getPart("head"), { rotate: pose.head, duration: 0.22, ease: "power2.out" }, "+=0.03")
    .to(actor.getPart("body"), { rotate: pose.body, duration: 0.32, ease: "sine.out" }, "-=0.12");

  return createAction(tl);
}
