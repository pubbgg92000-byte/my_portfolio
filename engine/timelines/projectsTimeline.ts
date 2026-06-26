import type { Actor } from "@/engine/Actor";
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

  gsap.set(actorRoot, { autoAlpha: 0, x: startX, y: -150, scale: 1 });
  gsap.set(cards, { borderColor: "rgba(125, 211, 252, 0.16)", backgroundColor: "rgba(8, 11, 18, 0.52)" });
  gsap.set(cardMedia, { autoAlpha: 0, scale: 1.05 });
  gsap.set(cardContent, { autoAlpha: 0.1, y: 16 });
  gsap.set([rope, beam, ...dust], { autoAlpha: 0 });
  gsap.set([lantern, flashlight], { autoAlpha: 0 });

  timeline
    .to(rope, { autoAlpha: 1, height: 220, duration: 0.45 })
    .to(actorRoot, { autoAlpha: 1, duration: 0.1 }, "<")
    .to(actorRoot, { y: floorY, duration: 0.9, ease: "back.out(1.1)" }, "<")
    .to(dust, { autoAlpha: 0.7, scale: 1.4, duration: 0.4, stagger: 0.06 }, "-=0.18")
    .to(dust, { autoAlpha: 0, y: -18, duration: 0.5, stagger: 0.04 }, "-=0.1")
    .to(lantern, { autoAlpha: 1, duration: 0.25 })
    .to(beam, { autoAlpha: 1, duration: 0.2 }, "<");

  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const targetX = rect.left + rect.width * 0.5 - actorRoot.offsetWidth * 0.5;
    const beamX = rect.left + rect.width * 0.5;
    const beamY = rect.top + rect.height * 0.45;

    timeline
      .to(actorRoot, { x: targetX, duration: 0.65 })
      .to(beam, { x: beamX - 160, y: beamY - 120, duration: 0.4 }, "<")
      .to(card, { borderColor: "rgba(251, 191, 36, 0.5)", backgroundColor: "rgba(15, 18, 24, 0.86)", duration: 0.25 }, "-=0.2")
      .to(card.querySelector("[data-project-card-media]"), { autoAlpha: 1, scale: 1, duration: 0.42 }, "<")
      .to(card.querySelector("[data-project-card-content]"), { autoAlpha: 1, y: 0, duration: 0.42 }, "<+0.1");
  }

  timeline
    .to(beam, { autoAlpha: 0, duration: 0.25 })
    .to(actorRoot, { x: window.innerWidth + 120, duration: 0.9 })
    .to(actorRoot, { autoAlpha: 0, duration: 0.2 }, "-=0.15");

  return {
    play: () => {
      timeline.play(0);
    },
    reset: () => timeline.pause(0),
    destroy: () => timeline.kill(),
  };
}
