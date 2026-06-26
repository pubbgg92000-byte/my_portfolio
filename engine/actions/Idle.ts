import type { Actor } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";
import { Blink } from "./Blink";
import { Look } from "./Look";
import { Reach } from "./Reach";
import { neutralPose, prepareRig } from "./rig";

type IdleHandle = {
  cancel: () => void;
};

const choices = ["blink", "shift", "look-left", "look-right", "look-up", "backpack", "scratch", "smile"] as const;

export function Idle(actor: Actor): IdleHandle {
  const gsap = getGsap();
  let cancelled = false;
  let delayed: gsap.core.Tween | null = null;
  const root = actor.requireRoot();
  const breathingTargets = actor.getParts(["body", "torso", "backpack"]);

  prepareRig(actor);
  gsap.to(actor.getPart("body"), { y: -2, duration: 1.35, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(actor.getPart("torso"), { rotate: 1.2, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(actor.getPart("backpack"), { rotate: -2.5, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" });

  const schedule = () => {
    delayed = gsap.delayedCall(1.1 + Math.random() * 2.4, run);
  };

  const run = () => {
    if (cancelled) return;

    const pick = choices[Math.floor(Math.random() * choices.length)];

    if (pick === "blink") {
      void Blink(actor).play();
    } else if (pick === "shift") {
      gsap.timeline()
        .to(actor.getPart("body"), { x: Math.random() > 0.5 ? 4 : -4, rotate: Math.random() > 0.5 ? 2 : -2, duration: 0.32, ease: "sine.inOut" })
        .to(actor.getParts(["left-foot", "right-foot"]), { rotate: (_, target) => (target?.dataset.arviPart === "left-foot" ? -4 : 4), duration: 0.18 }, "<")
        .to(actor.getPart("body"), { x: 0, rotate: 0, duration: 0.45, ease: "elastic.out(1, 0.55)" }, "+=0.25");
    } else if (pick === "look-left") {
      void Look(actor, "left").play().then(() => neutralPose(actor, 0.4));
    } else if (pick === "look-right") {
      void Look(actor, "right").play().then(() => neutralPose(actor, 0.4));
    } else if (pick === "look-up") {
      void Look(actor, "up").play().then(() => neutralPose(actor, 0.4));
    } else if (pick === "backpack") {
      gsap.timeline()
        .to(actor.getPart("left-arm"), { rotate: -32, duration: 0.22, ease: "back.out(1.5)" })
        .to(actor.getPart("left-hand"), { rotate: 46, duration: 0.18 }, "<")
        .to(actor.getPart("backpack"), { rotate: -12, x: -4, duration: 0.18, yoyo: true, repeat: 1 })
        .to(actor.getParts(["left-arm", "left-hand"]), { rotate: 0, duration: 0.3, ease: "elastic.out(1, 0.55)" });
    } else if (pick === "scratch") {
      void Reach(actor, { hand: "right", target: "head" }).play().then(() => {
        gsap.to(actor.getPart("right-hand"), { rotate: 82, duration: 0.08, repeat: 5, yoyo: true, ease: "sine.inOut" });
        delayed = gsap.delayedCall(0.6, () => neutralPose(actor, 0.35));
      });
    } else {
      actor.setExpression("happy");
      gsap.to(actor.getParts(["left-eye", "right-eye"]), { y: -1, duration: 0.16, yoyo: true, repeat: 1 });
      delayed = gsap.delayedCall(0.9, () => actor.setExpression("neutral"));
    }

    schedule();
  };

  schedule();

  return {
    cancel: () => {
      cancelled = true;
      delayed?.kill();
      gsap.killTweensOf([root, breathingTargets, actor.getParts(["left-eye", "right-eye", "head", "left-arm", "left-hand", "right-arm", "right-hand", "backpack"])]);
    },
  };
}
