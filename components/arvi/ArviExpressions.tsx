import type { ArviExpression } from "./ArviProps";

export function ArviExpressions({ expression }: { expression: ArviExpression }) {
  const mouthPath = {
    neutral: "M47 62 Q54 66 61 62",
    curious: "M49 63 Q54 61 59 63",
    focused: "M48 64 L60 64",
    happy: "M46 61 Q54 70 62 61",
  }[expression];

  return (
    <g data-arvi-expression={expression}>
      <circle cx="47" cy="52" r="2.4" fill="currentColor" />
      <circle cx="61" cy="52" r="2.4" fill="currentColor" />
      <path d={mouthPath} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </g>
  );
}
