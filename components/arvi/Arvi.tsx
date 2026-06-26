"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { sceneManager } from "@/engine/SceneManager";
import { Idle } from "@/engine/actions/Idle";
import { getGsap } from "@/lib/animations/gsap";
import { ArviRig } from "./ArviRig";
import type { ArviExpression } from "./ArviProps";

export function Arvi() {
  const rootRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef<{ cancel: () => void } | null>(null);
  const [expression] = useState<ArviExpression>("neutral");

  useLayoutEffect(() => {
    const gsap = getGsap();
    sceneManager.registerActor(rootRef.current);
    const actor = sceneManager.getActor();
    const root = actor.requireRoot();

    gsap.set(root, {
      autoAlpha: 0,
      x: -140,
      y: window.innerHeight - root.offsetHeight - 34,
      scale: 1,
    });

    const idle = Idle(actor);
    idleRef.current = idle;

    function handlePointerMove(event: PointerEvent) {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const rect = root.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

      if (distance > 180) {
        return;
      }

      const eyeX = Math.max(-4, Math.min(4, (event.clientX - centerX) / 22));
      const eyeY = Math.max(-3, Math.min(3, (event.clientY - centerY) / 28));
      const headRotate = Math.max(-7, Math.min(7, (event.clientX - centerX) / 28));

      gsap.to(actor.getParts(["left-eye", "right-eye"]), { x: eyeX, y: eyeY, duration: 0.12, overwrite: "auto" });
      gsap.to(actor.getPart("head"), { rotate: headRotate, duration: 0.24, delay: 0.04, overwrite: "auto" });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      idle.cancel();
      idleRef.current = null;
      window.removeEventListener("pointermove", handlePointerMove);
      sceneManager.registerActor(null);
    };
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        data-arvi-actor
        data-expression={expression}
        className="pointer-events-none fixed left-0 top-0 z-40 h-28 w-20 opacity-0 will-change-transform sm:h-36 sm:w-24"
        aria-hidden="true"
      >
        <ArviRig expression={expression} />
      </div>
    </>
  );
}
