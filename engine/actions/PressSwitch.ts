import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function PressSwitch(actor: Actor, switchEl: HTMLElement | null) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  tl.to(actor.getParts(["left-eye", "right-eye"]), { x: 4, duration: 0.12 })
    .to(actor.getPart("head"), { rotate: 7, duration: 0.2 }, "-=0.02")
    .to(actor.getPart("right-upper-arm"), { rotate: -62, duration: 0.3, ease: "back.out(1.6)" })
    .to(actor.getPart("right-lower-arm"), { rotate: -42, duration: 0.24 }, "-=0.18")
    .to(actor.getPart("right-lower-arm"), { rotate: -54, duration: 0.12, ease: "power2.in" }, "+=0.12")
    .to(switchEl, { backgroundColor: "rgba(251, 191, 36, 0.38)", boxShadow: "0 0 40px rgba(251, 191, 36, 0.58)", duration: 0.12 }, "<")
    .to(actor.getPart("right-lower-arm"), { rotate: -30, duration: 0.2, ease: "back.out(1.7)" })
    .to(actor.getParts(["left-eye", "right-eye"]), { x: -2, y: -1, duration: 0.12 });

  return createAction(tl);
}
