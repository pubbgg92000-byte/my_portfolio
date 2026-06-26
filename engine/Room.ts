export type RoomId = "home" | "projects" | "about" | "skills" | "gallery" | "experience" | "contact";

export type RoomState = "idle" | "playing" | "complete" | "visited";

export type RoomRegistration = {
  id: RoomId;
  play: () => void | Promise<void>;
  reset: () => void;
  destroy: () => void;
};
