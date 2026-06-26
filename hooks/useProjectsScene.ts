"use client";

import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { sceneManager } from "@/engine/SceneManager";
import { createProjectsTimeline } from "@/engine/timelines/projectsTimeline";
import { ScrollTrigger } from "@/lib/animations/gsap";

export function useProjectsScene(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeline = createProjectsTimeline({ root, actor: sceneManager.getActor() });
    const unregister = sceneManager.registerRoom({ id: "projects", ...timeline });
    const playOnce = () => {
      if (sceneManager.getRoomState("projects") === "idle") {
        void sceneManager.playRoom("projects");
      }
    };
    const trigger = ScrollTrigger.create({
      id: "scene-projects",
      trigger: root,
      start: "top top",
      end: "+=100%",
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: playOnce,
      onUpdate: (self) => {
        sceneManager.setDebugState({
          currentScene: "projects",
          sceneState: sceneManager.getRoomState("projects"),
          scrollProgress: self.progress,
          isPinned: self.isActive,
        });
      },
      onToggle: (self) => sceneManager.setDebugState({ isPinned: self.isActive }),
    });

    if (trigger.isActive) {
      playOnce();
    }

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      unregister();
    };
  }, [rootRef]);
}
