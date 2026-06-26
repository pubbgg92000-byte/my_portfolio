import type { Actor } from "@/engine/Actor";
import { SlideRope } from "./SlideRope";

export function ClimbRope(actor: Actor, y: number) {
  return SlideRope(actor, y);
}
