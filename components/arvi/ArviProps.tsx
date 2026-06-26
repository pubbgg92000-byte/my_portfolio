export type ArviExpression = "neutral" | "curious" | "focused" | "happy";

export type ArviProp = "lantern" | "rope" | "ladder" | "notebook" | "keys";

export const arviMouthPaths: Record<ArviExpression, string> = {
  neutral: "M47 62 Q54 66 61 62",
  curious: "M49 63 Q54 61 59 63",
  focused: "M48 64 L60 64",
  happy: "M46 61 Q54 70 62 61",
};

export const arviPropLabels: Record<ArviProp, string> = {
  lantern: "Lantern",
  rope: "Rope",
  ladder: "Ladder",
  notebook: "Notebook",
  keys: "Keys",
};
