export type TimelinePhase = "intro" | "active" | "completed" | "visited";

export type SceneTimeline = {
  play: () => void | Promise<void>;
  reset: () => void;
  complete?: () => void;
  destroy: () => void;
};

export type SceneTimelineFactory<TContext> = (context: TContext) => SceneTimeline;
