"use client";

import { useEffect } from "react";
import type { DependencyList } from "react";
import type { RoomRegistration } from "@/engine/Room";
import { sceneManager } from "@/engine/SceneManager";

export function useScene(room: RoomRegistration, deps: DependencyList) {
  useEffect(() => sceneManager.registerRoom(room), deps);
}
