import type { Actor } from "@/engine/Actor";
import type { SceneTimeline } from "@/engine/Timeline";
import { getGsap } from "@/lib/animations/gsap";

type HomeTimelineContext = {
  root: HTMLElement;
  actor: Actor;
};

export function createHomeTimeline({ root, actor }: HomeTimelineContext): SceneTimeline {
  const gsap = getGsap();
  const actorRoot = actor.requireRoot();
  const switchEl = root.querySelector<HTMLElement>("[data-home-switch]");
  const roomGlow = root.querySelector<HTMLElement>("[data-home-glow]");
  const electricity = root.querySelectorAll<HTMLElement>("[data-home-electric]");
  const revealItems = root.querySelectorAll<HTMLElement>("[data-home-reveal]");
  const particles = root.querySelectorAll<HTMLElement>("[data-home-particle]");
  const props = actor.getParts(["flashlight", "lantern", "rope", "ladder", "notebook", "keys"]);

  const switchRect = switchEl?.getBoundingClientRect();
  const startY = window.innerHeight - actorRoot.offsetHeight - 52;
  const switchX = switchRect ? switchRect.left - 34 : window.innerWidth * 0.56;
  const switchY = switchRect ? switchRect.top - 78 : startY - 180;

  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" },
    onStart: () => {
      root.dataset.roomState = "active";
      actor.setExpression("curious");
    },
    onComplete: () => {
      root.dataset.roomState = "complete";
      actor.setExpression("happy");
    },
  });

  gsap.set(actorRoot, { autoAlpha: 0, x: -120, y: startY, scale: 1 });
  gsap.set(revealItems, { autoAlpha: 0.12, y: 18 });
  gsap.set(particles, { autoAlpha: 0, scale: 0.4 });
  gsap.set(electricity, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(roomGlow, { autoAlpha: 0 });
  gsap.set(props, { autoAlpha: 0 });
  gsap.set(actor.getPart("flashlight"), { autoAlpha: 1 });

  timeline
    .to(actorRoot, { autoAlpha: 1, duration: 0.2 })
    .to(actorRoot, { x: 72, duration: 0.9 }, "<")
    .to(actor.getParts(["left-leg", "right-leg", "left-arm", "right-arm"]), { rotate: 8, yoyo: true, repeat: 5, duration: 0.14 }, "<")
    .to(actorRoot, { x: switchX, y: switchY, duration: 1.15 })
    .to(actor.getPart("right-arm"), { rotate: -32, transformOrigin: "top center", duration: 0.22 }, "-=0.15")
    .to(switchEl, { backgroundColor: "rgba(251, 191, 36, 0.38)", boxShadow: "0 0 40px rgba(251, 191, 36, 0.58)", duration: 0.18 })
    .to(roomGlow, { autoAlpha: 1, duration: 0.5 }, "<")
    .to(electricity, { scaleX: 1, duration: 0.55, stagger: 0.08 }, "<")
    .to(revealItems, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.15")
    .to(particles, { autoAlpha: 1, scale: 1, duration: 0.65, stagger: 0.025 }, "-=0.45")
    .call(() => actor.setExpression("happy"))
    .to(actorRoot, { x: window.innerWidth + 120, duration: 1.1, delay: 0.25 })
    .to(actorRoot, { autoAlpha: 0, duration: 0.2 }, "-=0.15");

  return {
    play: () => {
      timeline.play(0);
    },
    reset: () => timeline.pause(0),
    destroy: () => timeline.kill(),
  };
}
