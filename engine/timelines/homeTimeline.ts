import type { Actor } from "@/engine/Actor";
import type { ArviAction } from "@/engine/actions/Action";
import { Celebrate } from "@/engine/actions/Celebrate";
import { ClimbRope } from "@/engine/actions/ClimbRope";
import { LookAround } from "@/engine/actions/LookAround";
import { Stop } from "@/engine/actions/Stop";
import { Think } from "@/engine/actions/Think";
import { Walk } from "@/engine/actions/Walk";
import type { SceneTimeline } from "@/engine/Timeline";
import { getGsap } from "@/lib/animations/gsap";

type HomeTimelineContext = {
  root: HTMLElement;
  actor: Actor;
};

export function createHomeTimeline({ root, actor }: HomeTimelineContext): SceneTimeline {
  const gsap = getGsap();
  const actorRoot = actor.requireRoot();
  const pullRope = root.querySelector<HTMLElement>("[data-home-pull-rope]");
  const ladder = root.querySelector<HTMLElement>("[data-home-ladder]");
  const roomGlow = root.querySelector<HTMLElement>("[data-home-glow]");
  const electricity = root.querySelectorAll<HTMLElement>("[data-home-electric]");
  const revealItems = root.querySelectorAll<HTMLElement>("[data-home-reveal]");
  const particles = root.querySelectorAll<HTMLElement>("[data-home-particle]");
  const props = actor.getParts(["flashlight", "lantern", "rope", "ladder", "notebook", "keys"]);

  const ropeRect = pullRope?.getBoundingClientRect();
  const floorY = window.innerHeight - actorRoot.offsetHeight - 92;
  const ladderX = ropeRect ? ropeRect.left - 58 : window.innerWidth * 0.75;
  const ropeX = ropeRect ? ropeRect.left - 26 : window.innerWidth * 0.78;
  const ropeY = ropeRect ? ropeRect.bottom - actorRoot.offsetHeight - 40 : floorY - 230;

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
  const addAction = (action: ArviAction, position?: gsap.Position) => {
    action.timeline.paused(false);
    timeline.add(action.timeline, position);
  };

  gsap.set(actorRoot, { autoAlpha: 0, x: -120, y: floorY, scale: 1 });
  gsap.set(revealItems, { autoAlpha: 0.06, y: 18 });
  gsap.set(particles, { autoAlpha: 0, scale: 0.4 });
  gsap.set(electricity, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(roomGlow, { autoAlpha: 0 });
  gsap.set(ladder, { autoAlpha: 0, y: 16 });
  gsap.set(props, { autoAlpha: 0 });
  gsap.set(actor.getParts(["flashlight", "ladder"]), { autoAlpha: 0 });

  addAction(Walk(actor, { x: 72, y: floorY, duration: 1 }));
  addAction(Stop(actor), "-=0.05");
  addAction(LookAround(actor));
  addAction(Walk(actor, { x: ladderX - 120, y: floorY, duration: 1.1 }), "-=0.1");
  addAction(Stop(actor), "-=0.02");
  addAction(Think(actor));
  timeline.to(ladder, { autoAlpha: 1, y: 0, duration: 0.32, ease: "back.out(1.6)" });
  timeline.to(actor.getPart("ladder"), { autoAlpha: 1, duration: 0.16 }, "<");
  addAction(Walk(actor, { x: ladderX, y: floorY, duration: 0.45 }), "-=0.05");
  addAction(ClimbRope(actor, ropeY), "-=0.05");
  addAction(Stop(actor), "-=0.02");
  timeline.to(actor.getParts(["left-eye", "right-eye"]), { x: 1, y: -2, duration: 0.12 });
  timeline.to(actor.getPart("head"), { rotate: -8, duration: 0.18 }, "-=0.04");
  timeline.to(actor.getPart("right-upper-arm"), { rotate: -92, duration: 0.24, ease: "back.out(1.5)" });
  timeline.to(actor.getPart("right-lower-arm"), { rotate: -52, duration: 0.2 }, "-=0.16");
  timeline.to(pullRope, { y: 38, duration: 0.18, ease: "power2.in" }, "+=0.06");
  timeline.to(pullRope, { y: 0, duration: 0.46, ease: "elastic.out(1, 0.45)" });
  timeline.to(electricity, { scaleX: 1, duration: 0.55, stagger: 0.08 }, "-=0.24");
  timeline.to(roomGlow, { autoAlpha: 1, duration: 0.5 }, "-=0.35");
  timeline.to(actor.getPart("head"), { rotate: -18, y: 4, duration: 0.16, ease: "power2.out" }, "-=0.35");
  timeline.to(actor.getParts(["left-upper-arm", "right-upper-arm"]), { rotate: -76, duration: 0.18, ease: "back.out(1.5)" }, "<");
  timeline.to(actor.getParts(["left-eye", "right-eye"]), { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.08 }, "<");
  timeline.to(revealItems, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.04");
  timeline.to(particles, { autoAlpha: 1, scale: 1, duration: 0.65, stagger: 0.025 }, "-=0.45");
  timeline.to(actor.getParts(["left-eye", "right-eye"]), { scaleY: 1, duration: 0.12 }, "-=0.2");
  addAction(LookAround(actor), "-=0.1");
  addAction(Celebrate(actor), "-=0.05");
  addAction(ClimbRope(actor, floorY), "+=0.05");
  addAction(Walk(actor, { x: window.innerWidth + 120, y: floorY, duration: 1.15 }), "+=0.1");
  timeline.to(actorRoot, { autoAlpha: 0, duration: 0.2 }, "-=0.15");

  return {
    play: () => {
      timeline.play(0);
    },
    reset: () => timeline.pause(0),
    destroy: () => timeline.kill(),
  };
}
