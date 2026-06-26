import type { Actor, ArviPart } from "@/engine/Actor";
import { getGsap } from "@/lib/animations/gsap";

export const limbs: ArviPart[] = [
  "left-upper-arm",
  "left-lower-arm",
  "right-upper-arm",
  "right-lower-arm",
  "left-upper-leg",
  "left-lower-leg",
  "right-upper-leg",
  "right-lower-leg",
];

export const hangingProps: ArviPart[] = ["backpack", "lantern", "keys", "notebook", "rope"];

export function prepareRig(actor: Actor) {
  const gsap = getGsap();
  const origins: Partial<Record<ArviPart, string>> = {
    body: "50% 62%",
    head: "50% 100%",
    torso: "50% 15%",
    "left-upper-arm": "95% 5%",
    "left-lower-arm": "85% 5%",
    "right-upper-arm": "5% 5%",
    "right-lower-arm": "15% 5%",
    "left-upper-leg": "85% 5%",
    "left-lower-leg": "70% 5%",
    "right-upper-leg": "15% 5%",
    "right-lower-leg": "30% 5%",
    "left-boot": "50% 50%",
    "right-boot": "50% 50%",
    backpack: "80% 20%",
    lantern: "50% 0%",
    flashlight: "100% 50%",
    keys: "50% 0%",
    notebook: "50% 50%",
    rope: "50% 0%",
  };

  for (const [part, origin] of Object.entries(origins)) {
    gsap.set(actor.getPart(part as ArviPart), { transformOrigin: origin });
  }
}

export function settlePose(actor: Actor) {
  const gsap = getGsap();

  gsap.to(actor.getParts(["head", "torso", ...limbs, "left-boot", "right-boot"]), {
    rotate: 0,
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    duration: 0.35,
    ease: "elastic.out(1, 0.7)",
  });
}
