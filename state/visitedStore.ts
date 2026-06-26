"use client";

import { create } from "zustand";
import type { RoomId } from "@/engine/Room";

type VisitedState = {
  visited: Partial<Record<RoomId, boolean>>;
  hasVisited: (roomId: RoomId) => boolean;
  markVisited: (roomId: RoomId) => void;
  resetVisited: () => void;
};

export const useVisitedStore = create<VisitedState>((set, get) => ({
  visited: {},
  hasVisited: (roomId) => Boolean(get().visited[roomId]),
  markVisited: (roomId) =>
    set((state) => ({
      visited: {
        ...state.visited,
        [roomId]: true,
      },
    })),
  resetVisited: () => set({ visited: {} }),
}));
