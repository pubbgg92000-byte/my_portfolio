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
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "+=1450",
      pin: true,
      anticipatePin: 1,
      onEnter: () => void sceneManager.playRoom("projects"),
      onToggle: (self) => {
        if (self.isActive) {
          void sceneManager.playRoom("projects");
        }
      },
      once: true,
    });

    if (trigger.isActive) {
      void sceneManager.playRoom("projects");
    }

    return () => {
      trigger.kill();
      unregister();
    };
  }, [rootRef]);
}
