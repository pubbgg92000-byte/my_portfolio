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
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "+=1150",
      pin: true,
      anticipatePin: 1,
      onEnter: () => void sceneManager.playRoom("home"),
      onToggle: (self) => {
        if (self.isActive) {
          void sceneManager.playRoom("home");
        }
      },
      once: true,
    });

    if (trigger.isActive) {
      void sceneManager.playRoom("home");
    }

    return () => {
      trigger.kill();
      unregister();
    };
  }, [rootRef]);
}
