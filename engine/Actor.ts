import { arviMouthPaths } from "@/components/arvi/ArviProps";
import type { ArviExpression, ArviProp } from "@/components/arvi/ArviProps";

const ARVI_PARTS = [
  "head",
  "torso",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
  "left-boot",
  "right-boot",
  "backpack",
  "lantern",
  "flashlight",
  "rope",
  "ladder",
  "notebook",
  "keys",
] as const;

export type ArviPart = (typeof ARVI_PARTS)[number];

export class Actor {
  private root: HTMLElement | null = null;

  setRoot(root: HTMLElement | null) {
    this.root = root;
  }

  getRoot() {
    return this.root;
  }

  requireRoot() {
    if (!this.root) {
      throw new Error("Arvi actor is not mounted.");
    }

    return this.root;
  }

  getPart(part: ArviPart) {
    return this.root?.querySelector<SVGElement>(`[data-arvi-part="${part}"]`) ?? null;
  }

  getParts(parts: ArviPart[]) {
    return parts.map((part) => this.getPart(part)).filter((part): part is SVGElement => Boolean(part));
  }

  setExpression(expression: ArviExpression) {
    if (this.root) {
      this.root.dataset.expression = expression;
      this.root.querySelector<SVGPathElement>("[data-arvi-mouth]")?.setAttribute("d", arviMouthPaths[expression]);
    }
  }

  setProp(prop: ArviProp, active: boolean) {
    const element = this.getPart(prop);

    if (element) {
      element.dataset.active = String(active);
    }
  }

  resetProps() {
    for (const part of ARVI_PARTS) {
      const element = this.getPart(part);

      if (element?.dataset.active) {
        element.dataset.active = "false";
      }
    }
  }
}
