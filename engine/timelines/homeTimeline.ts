import type { Actor } from "@/engine/Actor";
import type { ArviAction } from "@/engine/actions/Action";
import { Grab } from "@/engine/actions/Grab";
import { Look } from "@/engine/actions/Look";
import { Reach } from "@/engine/actions/Reach";
import { Release } from "@/engine/actions/Release";
import { Stop } from "@/engine/actions/Stop";
import { Walk } from "@/engine/actions/Walk";
import { sceneManager } from "@/engine/SceneManager";
import type { SceneTimeline } from "@/engine/Timeline";
import { getGsap } from "@/lib/animations/gsap";

type HomeTimelineContext = {
  root: HTMLElement;
  actor: Actor;
};

export function createHomeTimeline({ root, actor }: HomeTimelineContext): SceneTimeline {
  const gsap = getGsap();
  const actorRoot = actor.requireRoot();
  const rope = root.querySelector<HTMLElement>("[data-home-pull-rope]");
  const ladder = root.querySelector<HTMLElement>("[data-home-ladder]");
  const roomGlow = root.querySelector<HTMLElement>("[data-home-glow]");
  const electricity = root.querySelectorAll<HTMLElement>("[data-home-electric]");
  const revealItems = root.querySelectorAll<HTMLElement>("[data-home-reveal]");
  const particles = root.querySelectorAll<HTMLElement>("[data-home-particle]");

  const ropeRect = rope?.getBoundingClientRect();
  const floorLineY = window.innerHeight - 86;
  const actorFloorY = floorLineY - actorRoot.offsetHeight;
  const ladderX = ropeRect ? ropeRect.left - 78 : window.innerWidth * 0.72;
  const ropeX = ropeRect ? ropeRect.left - 72 : window.innerWidth * 0.76;

  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" },
    onStart: () => {
      root.dataset.roomState = "active";
      actor.setExpression("curious");
      sceneManager.setDebugState({ floorY: floorLineY, activeTimeline: "home" });
    },
    onComplete: () => {
      root.dataset.roomState = "complete";
      actor.setExpression("happy");
    },
  });
  const addAction = (label: string, action: ArviAction, position?: gsap.Position) => {
    action.timeline.paused(false);
    timeline.call(() => sceneManager.setDebugState({ currentAction: label, activeTimeline: `home:${label}` }), undefined, position);
    timeline.add(action.timeline, position);
  };

  sceneManager.setDebugState({ floorY: floorLineY });
  gsap.set(revealItems, { autoAlpha: 0.06, y: 18 });
  gsap.set(particles, { autoAlpha: 0, scale: 0.4 });
  gsap.set(electricity, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(roomGlow, { autoAlpha: 0 });
  gsap.set(ladder, { autoAlpha: 0, y: 0 });
  gsap.set(rope, { autoAlpha: 1 });
  timeline.set(actorRoot, { autoAlpha: 0, x: -120, y: actorFloorY, scale: 1 }, 0);
  timeline.set(actor.getParts(["lantern", "rope", "ladder", "notebook", "keys"]), { autoAlpha: 0 }, 0);

  addAction("Walk", Walk(actor, { x: 76, y: actorFloorY, duration: 1 }));
  addAction("Stop", Stop(actor));
  addAction("Look", Look(actor, "right"));
  timeline.call(() => sceneManager.setDebugState({ currentAction: "Ladder ready", activeTimeline: "home:Ladder ready" }));
  timeline.to(ladder, { autoAlpha: 1, duration: 0.32, ease: "power2.out" });
  timeline.to(particles, { autoAlpha: 0.45, scale: 1.2, duration: 0.22, stagger: 0.025 }, "-=0.2");
  timeline.to(particles, { autoAlpha: 0, y: -14, duration: 0.38, stagger: 0.02 }, "-=0.02");
  addAction("Walk to ladder", Walk(actor, { x: ladderX - 38, y: actorFloorY, duration: 1.0 }));
  addAction("Stop", Stop(actor));
  addAction("Look up", Look(actor, "up"));
  addAction("Move to rope", Walk(actor, { x: ropeX, y: actorFloorY, duration: 0.42 }));
  addAction("Stop", Stop(actor));
  addAction("Reach rope", Reach(actor, { hand: "both", target: "rope" }));
  addAction("Light rope", Grab(actor, "rope", "right"));
  timeline.call(() => sceneManager.setDebugState({ currentAction: "Light spread", activeTimeline: "home:Light spread" }));
  timeline.to(rope, { y: 34, duration: 0.14, ease: "power2.in" });
  timeline.to(rope, { y: 0, duration: 0.46, ease: "elastic.out(1, 0.45)" });
  timeline.to(electricity, { scaleX: 1, duration: 0.08, stagger: 0.04, repeat: 3, yoyo: true }, "-=0.34");
  timeline.to(electricity, { scaleX: 1, duration: 0.55, stagger: 0.08 });
  timeline.to(roomGlow, { autoAlpha: 1, duration: 0.5 }, "-=0.35");
  timeline.to(rope, { filter: "drop-shadow(0 0 16px rgba(251, 191, 36, 0.9))", duration: 0.25 }, "-=0.45");
  addAction("Observe", Look(actor, "left"));
  timeline.to(revealItems, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, "-=0.1");
  timeline.to(particles, { autoAlpha: 1, scale: 1, duration: 0.65, stagger: 0.025 }, "-=0.45");
  addAction("Release rope", Release(actor, "rope"));
  timeline.call(() => sceneManager.setDebugState({ currentAction: "Clear ladder", activeTimeline: "home:Clear ladder" }));
  timeline.to(ladder, { autoAlpha: 0, y: 16, duration: 0.28, ease: "power2.in" });
  addAction("Exit", Walk(actor, { x: window.innerWidth + 120, y: actorFloorY, duration: 1.0 }), "+=0.08");
  timeline.to(actorRoot, { autoAlpha: 0, duration: 0.18 }, "-=0.14");

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
      gsap.killTweensOf([actorRoot, revealItems, particles, electricity, roomGlow, ladder, rope]);
      timeline.kill();
    },
  };
}
