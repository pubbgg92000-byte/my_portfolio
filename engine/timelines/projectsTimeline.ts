import type { Actor } from "@/engine/Actor";
import type { ArviAction } from "@/engine/actions/Action";
import { ClimbRope } from "@/engine/actions/ClimbRope";
import { Land } from "@/engine/actions/Land";
import { LookAround } from "@/engine/actions/LookAround";
import { OpenBackpack } from "@/engine/actions/OpenBackpack";
import { Stop } from "@/engine/actions/Stop";
import { TakeLantern } from "@/engine/actions/TakeLantern";
import { Walk } from "@/engine/actions/Walk";
import type { SceneTimeline } from "@/engine/Timeline";
import { getGsap } from "@/lib/animations/gsap";

type ProjectsTimelineContext = {
  root: HTMLElement;
  actor: Actor;
};

export function createProjectsTimeline({ root, actor }: ProjectsTimelineContext): SceneTimeline {
  const gsap = getGsap();
  const actorRoot = actor.requireRoot();
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-project-card]"));
  const cardContent = root.querySelectorAll<HTMLElement>("[data-project-card-content]");
  const cardMedia = root.querySelectorAll<HTMLElement>("[data-project-card-media]");
  const rope = root.querySelector<HTMLElement>("[data-project-rope]");
  const beam = root.querySelector<HTMLElement>("[data-project-beam]");
  const dust = root.querySelectorAll<HTMLElement>("[data-project-dust]");
  const lantern = actor.getPart("lantern");
  const flashlight = actor.getPart("flashlight");

  const floorY = window.innerHeight - actorRoot.offsetHeight - 44;
  const firstCard = cards[0]?.getBoundingClientRect();
  const startX = firstCard ? firstCard.left + firstCard.width * 0.18 : window.innerWidth * 0.18;

  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" },
    onStart: () => {
      root.dataset.roomState = "active";
      actor.setExpression("focused");
    },
    onComplete: () => {
      root.dataset.roomState = "complete";
      actor.setExpression("happy");
    },
  });
  const addAction = (action: ArviAction, position?: string | number) => {
    action.timeline.paused(false);
    timeline.add(action.timeline, position);
  };

  gsap.set(actorRoot, { autoAlpha: 0, x: startX, y: -150, scale: 1 });
  gsap.set(cards, {
    borderColor: "rgba(92, 58, 36, 0.55)",
    backgroundColor: "rgba(8, 7, 6, 0.72)",
    pointerEvents: "none",
  });
  gsap.set(cardMedia, { autoAlpha: 0, scale: 1.05 });
  gsap.set(cardContent, { autoAlpha: 0.1, y: 16 });
  gsap.set([rope, beam, ...dust], { autoAlpha: 0 });
  gsap.set([lantern, flashlight], { autoAlpha: 0 });

  timeline.to(rope, { autoAlpha: 1, height: 240, duration: 0.45, ease: "bounce.out" });
  timeline.to(rope, { rotate: 5, transformOrigin: "top center", duration: 0.34, yoyo: true, repeat: 5, ease: "sine.inOut" }, "-=0.18");
  addAction(ClimbRope(actor, floorY), "-=0.08");
  addAction(Land(actor), "-=0.02");
  timeline.to(dust, { autoAlpha: 0.7, scale: 1.4, duration: 0.4, stagger: 0.06 }, "-=0.4");
  timeline.to(dust, { autoAlpha: 0, y: -18, duration: 0.5, stagger: 0.04 }, "-=0.18");
  addAction(Stop(actor), "-=0.1");
  addAction(LookAround(actor));
  addAction(OpenBackpack(actor), "-=0.08");
  addAction(TakeLantern(actor), "-=0.06");
  timeline.to(beam, { autoAlpha: 1, duration: 0.22 }, "-=0.15");

  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const targetX = rect.left + rect.width * 0.5 - actorRoot.offsetWidth * 0.5;
    const beamX = rect.left + rect.width * 0.5;
    const beamY = rect.top + rect.height * 0.45;

    addAction(Walk(actor, { x: targetX, y: floorY, duration: 0.72 }));
    timeline.to(beam, { x: beamX - 160, y: beamY - 120, duration: 0.48, ease: "power2.out" }, "-=0.64");
    addAction(Stop(actor), "-=0.06");
    timeline.to(card, {
      borderColor: "rgba(251, 191, 36, 0.62)",
      backgroundColor: "rgba(20, 15, 10, 0.9)",
      pointerEvents: "auto",
      duration: 0.25,
    }, "-=0.18");
    timeline.to(card.querySelector("[data-project-card-media]"), { autoAlpha: 1, scale: 1, duration: 0.42 }, "<");
    timeline.to(card.querySelector("[data-project-card-content]"), { autoAlpha: 1, y: 0, duration: 0.42 }, "<+0.1");
  }

  timeline.to(beam, { autoAlpha: 0, duration: 0.25 });
  addAction(Walk(actor, { x: window.innerWidth + 120, y: floorY, duration: 1 }));
  timeline.to(actorRoot, { autoAlpha: 0, duration: 0.2 }, "-=0.15");

  return {
    play: () => {
      timeline.play(0);
    },
    reset: () => timeline.pause(0),
    destroy: () => timeline.kill(),
  };
}
