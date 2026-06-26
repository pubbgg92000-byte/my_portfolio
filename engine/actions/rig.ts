import type { Actor, ArviPart } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";

export const limbs: ArviPart[] = ["left-arm", "left-hand", "right-arm", "right-hand", "left-leg", "left-foot", "right-leg", "right-foot"];
export const coreParts: ArviPart[] = ["body", "torso", "head"];
export const hangingProps: ArviPart[] = ["backpack", "lantern", "keys", "notebook", "rope", "ladder"];

export function prepareRig(actor: Actor) {
  const gsap = getGsap();
  const origins: Partial<Record<ArviPart, string>> = {
    "arvi-root": "50% 100%",
    body: "50% 82%",
    shadow: "50% 50%",
    torso: "50% 18%",
    head: "50% 100%",
    "left-arm": "52px 84px",
    "left-hand": "36px 101px",
    "right-arm": "58px 84px",
    "right-hand": "76px 101px",
    "left-leg": "52px 112px",
    "left-foot": "42px 138px",
    "right-leg": "58px 113px",
    "right-foot": "70px 138px",
    backpack: "43px 80px",
    "backpack-flap": "34px 88px",
    lantern: "0px 0px",
    "lantern-glow": "0px 13px",
    "lantern-flame": "0px 16px",
    ladder: "0px 0px",
    notebook: "0px 0px",
    keys: "0px 0px",
    rope: "0px -88px",
    "rope-anchor": "60px -40px",
  };

  for (const [part, origin] of Object.entries(origins)) {
    gsap.set(actor.getPart(part as ArviPart), { svgOrigin: origin });
  }
}

export function neutralPose(actor: Actor, duration = 0.32) {
  const gsap = getGsap();

  return gsap.to(actor.getParts([...coreParts, ...limbs, "backpack", "lantern", "ladder", "notebook", "keys", "rope"]), {
    rotate: 0,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    duration,
    ease: "elastic.out(1, 0.65)",
  });
}

export function setPropVisibility(actor: Actor, prop: "lantern" | "ladder" | "notebook" | "keys" | "rope", visible: boolean) {
  const gsap = getGsap();
  gsap.set(actor.getPart(prop), { autoAlpha: visible ? 1 : 0 });
  actor.setProp(prop, visible);
}
