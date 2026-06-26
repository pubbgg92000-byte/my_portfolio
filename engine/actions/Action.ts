import type gsap from "gsap";

export type GsapTimeline = gsap.core.Timeline;

export type ArviAction = {
  duration: number;
  timeline: GsapTimeline;
  play: () => Promise<void>;
  complete: () => void;
  cancel: () => void;
};

export function createAction(timeline: GsapTimeline): ArviAction {
  return {
    duration: timeline.duration(),
    timeline,
    play: () =>
      new Promise((resolve) => {
        timeline.eventCallback("onComplete", resolve);
        timeline.play(0);
      }),
    complete: () => {
      timeline.progress(1).pause();
    },
    cancel: () => {
      timeline.kill();
    },
  };
}
