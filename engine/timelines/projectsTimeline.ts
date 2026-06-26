import type { Actor } from "@/engine/Actor";
import type { ArviAction } from "@/engine/actions/Action";
import { Land } from "@/engine/actions/Land";
import { Look } from "@/engine/actions/Look";
import { SlideRope } from "@/engine/actions/SlideRope";
import { Stop } from "@/engine/actions/Stop";
import { TakeLantern } from "@/engine/actions/TakeLantern";
import { Think } from "@/engine/actions/Think";
import { Walk } from "@/engine/actions/Walk";
import { sceneManager } from "@/engine/SceneManager";
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

  const floorLineY = window.innerHeight - 80;
  const actorFloorY = floorLineY - actorRoot.offsetHeight;
  const firstCard = cards[0]?.getBoundingClientRect();
  const startX = firstCard ? firstCard.left + firstCard.width * 0.18 : window.innerWidth * 0.18;

  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" },
    onStart: () => {
      root.dataset.roomState = "active";
      actor.setExpression("focused");
      sceneManager.setDebugState({ floorY: floorLineY, activeTimeline: "projects" });
    },
    onComplete: () => {
      root.dataset.roomState = "complete";
      actor.setExpression("happy");
    },
  });
  const addAction = (label: string, action: ArviAction, position?: gsap.Position) => {
    action.timeline.paused(false);
    timeline.call(() => sceneManager.setDebugState({ currentAction: label, activeTimeline: `projects:${label}` }), undefined, position);
    timeline.add(action.timeline, position);
  };

  sceneManager.setDebugState({ floorY: floorLineY });
  gsap.set(cards, {
    borderColor: "rgba(92, 58, 36, 0.55)",
    backgroundColor: "rgba(8, 7, 6, 0.72)",
    pointerEvents: "none",
  });
  gsap.set(cardMedia, { autoAlpha: 0, scale: 1.05 });
  gsap.set(cardContent, { autoAlpha: 0.1, y: 16 });
  gsap.set([rope, beam, ...dust], { autoAlpha: 0 });
  timeline.set(actorRoot, { autoAlpha: 0, x: startX, y: actorFloorY, scale: 1 }, 0);
  timeline.set(actor.getParts(["lantern", "rope", "ladder", "notebook", "keys"]), { autoAlpha: 0 }, 0);

  timeline.to(rope, { autoAlpha: 1, height: 240, duration: 0.45, ease: "bounce.out" });
  timeline.to(rope, { rotate: 5, transformOrigin: "top center", duration: 0.34, yoyo: true, repeat: 5, ease: "sine.inOut" }, "-=0.18");
  addAction("Slide rope", SlideRope(actor, actorFloorY), "-=0.08");
  addAction("Land", Land(actor), "-=0.02");
  timeline.to(dust, { autoAlpha: 0.7, scale: 1.4, duration: 0.4, stagger: 0.06 }, "-=0.4");
  timeline.to(dust, { autoAlpha: 0, y: -18, duration: 0.5, stagger: 0.04 }, "-=0.18");
  addAction("Stop", Stop(actor), "-=0.1");
  addAction("Look", Look(actor, "right"), "+=0.05");
  addAction("Think", Think(actor), "-=0.05");
  addAction("Take lantern", TakeLantern(actor), "-=0.06");
  timeline.to(beam, { autoAlpha: 1, duration: 0.22 }, "-=0.15");

  for (const card of cards) {
    const rect = card.getBoundingClientRect();
    const targetX = rect.left + rect.width * 0.5 - actorRoot.offsetWidth * 0.5;
    const beamX = rect.left + rect.width * 0.5;
    const beamY = rect.top + rect.height * 0.45;

    addAction("Walk", Walk(actor, { x: targetX, y: actorFloorY, duration: 0.72 }));
    timeline.to(beam, { x: beamX - 160, y: beamY - 120, duration: 0.48, ease: "power2.out" }, "-=0.64");
    addAction("Stop", Stop(actor), "-=0.06");
    addAction("Look", Look(actor, { x: 3, y: -1, head: 7, body: 1 }), "-=0.02");
    addAction("Think", Think(actor), "-=0.04");
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
  addAction("Walk", Walk(actor, { x: window.innerWidth + 120, y: actorFloorY, duration: 1 }));
  timeline.to(actorRoot, { autoAlpha: 0, duration: 0.2 }, "-=0.15");

  return {
    play: () =>
      new Promise<void>((resolve) => {
        const onComplete = timeline.eventCallback("onComplete");
        timeline.eventCallback("onComplete", () => {
          onComplete?.();
          resolve();
        });
        timeline.progress(0).play();
      }),
    reset: () => timeline.pause(0),
    complete: () => timeline.progress(1).pause(),
    destroy: () => {
      gsap.killTweensOf([actorRoot, cards, cardMedia, cardContent, rope, beam, dust]);
      timeline.kill();
    },
  };
}
