import { Actor } from "./Actor";
import type { RoomId, RoomRegistration, RoomState } from "./Room";
import { useVisitedStore } from "@/state/visitedStore";

type SceneDebugState = {
  currentScene: RoomId | "none";
  sceneState: "idle" | "playing" | "completed";
  currentAction: string;
  animationPlaying: boolean;
  scrollProgress: number;
  isPinned: boolean;
  floorY: number;
  arviPosition: { x: number; y: number };
  activeTimeline: string;
};

class SceneManager {
  private actor = new Actor();
  private rooms = new Map<RoomId, RoomRegistration>();
  private states = new Map<RoomId, RoomState>();
  private debugState: SceneDebugState = {
    currentScene: "none",
    sceneState: "idle",
    currentAction: "idle",
    animationPlaying: false,
    scrollProgress: 0,
    isPinned: false,
    floorY: 0,
    arviPosition: { x: 0, y: 0 },
    activeTimeline: "none",
  };

  registerActor(root: HTMLElement | null) {
    this.actor.setRoot(root);
  }

  getActor() {
    return this.actor;
  }

  registerRoom(room: RoomRegistration) {
    this.rooms.set(room.id, room);
    const isCompleted = useVisitedStore.getState().hasVisited(room.id);

    this.states.set(room.id, isCompleted ? "completed" : "idle");

    if (isCompleted) {
      room.complete?.();
    }

    return () => {
      room.destroy();
      this.rooms.delete(room.id);
      this.states.delete(room.id);
    };
  }

  getRoomState(roomId: RoomId) {
    return this.states.get(roomId) ?? "idle";
  }

  setDebugState(state: Partial<SceneDebugState>) {
    this.debugState = { ...this.debugState, ...state };
  }

  getDebugState() {
    return this.debugState;
  }

  async playRoom(roomId: RoomId) {
    const room = this.rooms.get(roomId);
    const state = this.getRoomState(roomId);

    if (!room) {
      return;
    }

    if (state === "playing" || state === "completed" || useVisitedStore.getState().hasVisited(roomId)) {
      this.states.set(roomId, "completed");
      room.complete?.();
      this.setDebugState({ currentScene: roomId, sceneState: "completed", currentAction: "complete", animationPlaying: false, activeTimeline: "none" });
      return;
    }

    this.states.set(roomId, "playing");
    this.setDebugState({ currentScene: roomId, sceneState: "playing", currentAction: "scene start", animationPlaying: true, activeTimeline: roomId });
    await room.play();
    useVisitedStore.getState().markVisited(roomId);
    this.states.set(roomId, "completed");
    this.setDebugState({ currentScene: roomId, sceneState: "completed", currentAction: "complete", animationPlaying: false, activeTimeline: "none" });
  }

  resetRoom(roomId: RoomId) {
    const room = this.rooms.get(roomId);

    room?.reset();
    this.states.set(roomId, "idle");
    this.setDebugState({ currentScene: roomId, sceneState: "idle", currentAction: "idle", animationPlaying: false, activeTimeline: "none" });
  }
}

export const sceneManager = new SceneManager();
