"use client";

import type { RoomId } from "@/engine/Room";
import { useVisitedStore } from "@/state/visitedStore";

export function useVisitedRoom(roomId: RoomId) {
  const hasVisited = useVisitedStore((state) => state.hasVisited(roomId));
  const markVisited = useVisitedStore((state) => state.markVisited);

  return {
    hasVisited,
    markVisited: () => markVisited(roomId),
  };
}
