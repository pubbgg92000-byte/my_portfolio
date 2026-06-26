import { ArviExpressions } from "./ArviExpressions";
import type { ArviExpression } from "./ArviProps";

export function ArviRig({ expression = "neutral" }: { expression?: ArviExpression }) {
  return (
    <svg aria-hidden="true" className="h-full w-full overflow-visible" viewBox="0 0 120 180">
      <defs>
        <filter id="arvi-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="text-slate-50" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <g data-arvi-part="rope" opacity="0">
          <path d="M60 -32 C62 4 57 27 59 55" stroke="#f8fafc" strokeDasharray="5 7" strokeWidth="3" />
        </g>

        <g data-arvi-part="backpack" fill="#b44b45" stroke="#f5c2b8" strokeWidth="2">
          <path d="M35 76 C22 79 21 111 34 117 L43 113 L43 80 Z" />
          <path d="M33 88 L23 86" />
        </g>

        <g data-arvi-part="torso" strokeWidth="4">
          <path d="M54 73 L54 113" />
          <path d="M43 86 C49 78 59 78 66 86" stroke="#67e8f9" strokeWidth="2" />
        </g>

        <g data-arvi-part="left-arm" strokeWidth="4">
          <path d="M52 84 C40 91 35 101 31 113" />
        </g>
        <g data-arvi-part="right-arm" strokeWidth="4">
          <path d="M57 84 C72 88 78 98 83 111" />
        </g>

        <g data-arvi-part="left-leg" strokeWidth="4">
          <path d="M54 112 C45 124 43 139 39 153" />
        </g>
        <g data-arvi-part="right-leg" strokeWidth="4">
          <path d="M55 113 C65 125 70 139 76 152" />
        </g>

        <g fill="#f8fafc" stroke="#f8fafc" strokeWidth="2">
          <path data-arvi-part="left-boot" d="M31 156 C39 151 46 153 48 159 C42 163 35 163 28 160 Z" />
          <path data-arvi-part="right-boot" d="M69 156 C77 151 84 153 87 159 C80 163 73 163 66 160 Z" />
        </g>

        <g data-arvi-part="head" fill="#070812" stroke="#f8fafc" strokeWidth="3">
          <circle cx="54" cy="52" r="21" />
          <ArviExpressions expression={expression} />
        </g>

        <g data-arvi-part="flashlight" opacity="0">
          <path d="M25 109 L8 104" stroke="#f8fafc" strokeWidth="5" />
          <path d="M6 104 L-18 96" stroke="#fde68a" strokeOpacity="0.45" strokeWidth="18" />
        </g>

        <g data-arvi-part="lantern" opacity="0" filter="url(#arvi-glow)">
          <path d="M82 111 Q90 102 98 111" stroke="#f8fafc" strokeWidth="2" />
          <rect x="82" y="111" width="16" height="23" rx="5" fill="#f59e0b" fillOpacity="0.35" stroke="#fde68a" strokeWidth="2" />
          <path d="M90 116 L90 131" stroke="#fde68a" strokeWidth="2" />
        </g>

        <g data-arvi-part="notebook" opacity="0" fill="#111827" stroke="#a7f3d0" strokeWidth="2">
          <path d="M20 108 L38 103 L43 126 L25 131 Z" />
          <path d="M29 110 L34 128" />
        </g>

        <g data-arvi-part="keys" opacity="0" stroke="#fde68a" strokeWidth="2">
          <circle cx="31" cy="119" r="4" />
          <path d="M35 119 L46 119 M42 119 L42 124 M46 119 L46 123" />
        </g>

        <g data-arvi-part="ladder" opacity="0" stroke="#f8fafc" strokeWidth="2">
          <path d="M97 62 L83 148 M112 66 L98 152" />
          <path d="M94 82 L108 85 M91 101 L105 104 M88 120 L102 123 M85 139 L99 142" />
        </g>
      </g>
    </svg>
  );
}
