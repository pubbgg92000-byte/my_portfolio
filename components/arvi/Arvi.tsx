"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { sceneManager } from "@/engine/SceneManager";
import { ArviRig } from "./ArviRig";
import type { ArviExpression } from "./ArviProps";

export function Arvi() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [expression] = useState<ArviExpression>("neutral");

  useLayoutEffect(() => {
    sceneManager.registerActor(rootRef.current);

    return () => sceneManager.registerActor(null);
  }, []);

  return (
    <div
      ref={rootRef}
      data-arvi-actor
      data-expression={expression}
      className="pointer-events-none fixed left-0 top-0 z-40 h-28 w-20 opacity-0 will-change-transform sm:h-36 sm:w-24"
      aria-hidden="true"
    >
      <ArviRig expression={expression} />
    </div>
  );
}
