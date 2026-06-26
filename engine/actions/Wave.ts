import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { createAction } from "./Action";

export function Wave(actor: Actor) {
  const gsap = getGsap();
  const tl = gsap.timeline({ paused: true });

  actor.setExpression("happy");
  tl.to(actor.getPart("right-upper-arm"), { rotate: -105, duration: 0.22, ease: "back.out(1.5)" })
    .to(actor.getPart("right-lower-arm"), { rotate: -28, repeat: 3, yoyo: true, duration: 0.14, ease: "sine.inOut" }, "-=0.04")
    .to(actor.getParts(["right-upper-arm", "right-lower-arm"]), { rotate: 0, duration: 0.28, ease: "back.out(1.4)" });

  return createAction(tl);
}
