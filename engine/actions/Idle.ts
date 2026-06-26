import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { Blink } from "./Blink";

type IdleHandle = {
  cancel: () => void;
};

const choices = ["blink", "shift", "look", "backpack", "smile"] as const;

export function Idle(actor: Actor): IdleHandle {
  const gsap = getGsap();
  let cancelled = false;
  let delayed: gsap.core.Tween | null = null;
  const root = actor.requireRoot();

  gsap.to(actor.getPart("torso"), { y: -2, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

  const run = () => {
    if (cancelled) {
      return;
    }

    const pick = choices[Math.floor(Math.random() * choices.length)];

    if (pick === "blink") {
      void Blink(actor).play();
    } else if (pick === "shift") {
      gsap.to(root, { x: "+=3", duration: 0.28, yoyo: true, repeat: 1, ease: "sine.inOut" });
      gsap.to(actor.getPart("head"), { rotate: -4, duration: 0.28, yoyo: true, repeat: 1 });
    } else if (pick === "look") {
      gsap.to(actor.getParts(["left-eye", "right-eye"]), { x: Math.random() > 0.5 ? 3 : -3, duration: 0.18, yoyo: true, repeat: 1 });
    } else if (pick === "backpack") {
      gsap.to(actor.getPart("backpack"), { rotate: -7, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" });
    } else {
      actor.setExpression("happy");
      delayed = gsap.delayedCall(0.8, () => actor.setExpression("neutral"));
    }

    delayed = gsap.delayedCall(1.5 + Math.random() * 2.8, run);
  };

  delayed = gsap.delayedCall(0.9, run);

  return {
    cancel: () => {
      cancelled = true;
      delayed?.kill();
      gsap.killTweensOf([root, actor.getParts(["torso", "head", "backpack", "left-eye", "right-eye"])]);
    },
  };
}
