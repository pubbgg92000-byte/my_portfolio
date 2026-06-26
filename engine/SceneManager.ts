import { Actor } from "./Actor";
import type { RoomId, RoomRegistration, RoomState } from "./Room";
import { useVisitedStore } from "@/state/visitedStore";

class SceneManager {
  private actor = new Actor();
  private rooms = new Map<RoomId, RoomRegistration>();
  private states = new Map<RoomId, RoomState>();

  registerActor(root: HTMLElement | null) {
    this.actor.setRoot(root);
  }

  getActor() {
    return this.actor;
  }

  registerRoom(room: RoomRegistration) {
    this.rooms.set(room.id, room);
    this.states.set(room.id, useVisitedStore.getState().hasVisited(room.id) ? "visited" : "idle");

    return () => {
      room.destroy();
      this.rooms.delete(room.id);
      this.states.delete(room.id);
    };
  }

  getRoomState(roomId: RoomId) {
    return this.states.get(roomId) ?? "idle";
  }

  async playRoom(roomId: RoomId) {
    const room = this.rooms.get(roomId);

    if (!room || useVisitedStore.getState().hasVisited(roomId)) {
      this.states.set(roomId, "visited");
      return;
    }

    this.states.set(roomId, "playing");
    await room.play();
    useVisitedStore.getState().markVisited(roomId);
    this.states.set(roomId, "complete");
  }

  resetRoom(roomId: RoomId) {
    const room = this.rooms.get(roomId);

    room?.reset();
    this.states.set(roomId, "idle");
  }
}

export const sceneManager = new SceneManager();
