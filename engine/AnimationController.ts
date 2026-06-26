import type { SceneTimeline } from "./Timeline";

export class AnimationController {
  private timelines = new Set<SceneTimeline>();

  add(timeline: SceneTimeline) {
    this.timelines.add(timeline);

    return () => {
      timeline.destroy();
      this.timelines.delete(timeline);
    };
  }

  destroyAll() {
    for (const timeline of this.timelines) {
      timeline.destroy();
    }

    this.timelines.clear();
  }
}
