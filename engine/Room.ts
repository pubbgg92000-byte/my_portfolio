export type RoomId = "home" | "projects" | "about" | "skills" | "gallery" | "experience" | "contact";

export type RoomState = "idle" | "playing" | "completed";

export type RoomRegistration = {
  id: RoomId;
  play: () => void | Promise<void>;
  reset: () => void;
  complete?: () => void;
  destroy: () => void;
};
