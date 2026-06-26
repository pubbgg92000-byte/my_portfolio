export type ArviExpression = "neutral" | "curious" | "focused" | "happy";

export type ArviProp = "lantern" | "flashlight" | "rope" | "ladder" | "notebook" | "keys";

export const arviPropLabels: Record<ArviProp, string> = {
  lantern: "Lantern",
  flashlight: "Flashlight",
  rope: "Rope",
  ladder: "Ladder",
  notebook: "Notebook",
  keys: "Keys",
};
