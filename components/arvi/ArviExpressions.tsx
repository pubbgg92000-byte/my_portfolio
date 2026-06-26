import type { ArviExpression } from "./ArviProps";
import { arviMouthPaths } from "./ArviProps";

export function ArviExpressions({ expression }: { expression: ArviExpression }) {
  return (
    <g data-arvi-expression={expression}>
      <circle cx="47" cy="52" r="2.4" fill="currentColor" />
      <circle cx="61" cy="52" r="2.4" fill="currentColor" />
      <path data-arvi-mouth d={arviMouthPaths[expression]} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </g>
  );
}
