"use client";

import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { sceneManager } from "@/engine/SceneManager";
import { createHomeTimeline } from "@/engine/timelines/homeTimeline";
import { ScrollTrigger } from "@/lib/animations/gsap";

export function useHomeScene(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeline = createHomeTimeline({ root, actor: sceneManager.getActor() });
    const unregister = sceneManager.registerRoom({ id: "home", ...timeline });
    const playOnce = () => {
      if (sceneManager.getRoomState("home") === "idle") {
        void sceneManager.playRoom("home");
      }
    };
    const trigger = ScrollTrigger.create({
      id: "scene-home",
      trigger: root,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: playOnce,
      onUpdate: (self) => {
        sceneManager.setDebugState({
          currentScene: "home",
          sceneState: sceneManager.getRoomState("home"),
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
