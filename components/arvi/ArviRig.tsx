import { ArviExpressions } from "./ArviExpressions";
import type { ArviExpression } from "./ArviProps";

export function ArviRig({ expression = "neutral" }: { expression?: ArviExpression }) {
  return (
    <svg aria-hidden="true" className="h-full w-full overflow-visible" viewBox="0 0 120 180">
      <defs>
        <filter id="arvi-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="lantern-amber" cx="50%" cy="58%" r="64%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.92" />
          <stop offset="48%" stopColor="#f59e0b" stopOpacity="0.46" />
          <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g data-arvi-part="arvi-root" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g data-arvi-part="body" className="text-slate-50" stroke="currentColor">
          <g data-arvi-part="shadow" fill="#020617" stroke="none" opacity="0.25">
            <ellipse cx="59" cy="164" rx="32" ry="6" />
          </g>

          <g data-arvi-part="left-leg" strokeWidth="4">
            <path d="M52 112 C47 121 43 129 42 138" />
            <g data-arvi-part="left-foot">
              <path d="M42 138 C41 145 40 150 39 154" />
              <path d="M31 157 C39 152 46 154 48 160 C42 164 35 164 28 161 Z" fill="#f8fafc" stroke="#f8fafc" strokeWidth="2" />
            </g>
          </g>

          <g data-arvi-part="right-leg" strokeWidth="4">
            <path d="M58 113 C64 121 68 129 70 138" />
            <g data-arvi-part="right-foot">
              <path d="M70 138 C73 145 75 150 76 153" />
              <path d="M69 157 C77 152 84 154 87 160 C80 164 73 164 66 161 Z" fill="#f8fafc" stroke="#f8fafc" strokeWidth="2" />
            </g>
          </g>

          <g data-arvi-part="backpack" fill="#b44b45" stroke="#f5c2b8" strokeWidth="2">
            <path d="M36 75 C24 80 22 110 35 117 L44 113 L44 80 Z" />
            <path data-arvi-part="backpack-flap" d="M34 88 L24 86" />
            <g data-arvi-part="lantern-mount" transform="translate(34 113)" />
            <g data-arvi-part="ladder-mount" transform="translate(32 104)" />
            <g data-arvi-part="rope-mount" transform="translate(31 94)" />
            <g data-arvi-part="journal-mount" transform="translate(34 110)" />
            <g data-arvi-part="key-ring" transform="translate(34 122)" />
          </g>

          <g data-arvi-part="torso" strokeWidth="4">
            <path d="M54 74 L54 114" />
            <path d="M43 86 C49 78 60 78 67 86" stroke="#67e8f9" strokeWidth="2" />
          </g>

          <g data-arvi-part="head" fill="#070812" stroke="#f8fafc" strokeWidth="3">
            <circle cx="55" cy="52" r="21" />
            <ArviExpressions expression={expression} />
          </g>

          <g data-arvi-part="left-arm" strokeWidth="4">
            <path d="M52 84 C45 88 40 94 36 101" />
            <g data-arvi-part="left-hand">
              <path d="M36 101 C33 105 31 109 30 114" />
              <circle cx="30" cy="114" r="2.2" fill="#f8fafc" stroke="none" />
              <g data-arvi-part="notebook" opacity="0" fill="#111827" stroke="#a7f3d0" strokeWidth="2" transform="translate(30 112)">
                <path d="M-9 -4 L9 -9 L14 14 L-4 19 Z" />
                <path d="M0 -2 L5 16" />
              </g>
              <g data-arvi-part="keys" opacity="0" stroke="#fde68a" strokeWidth="2" transform="translate(30 118)">
                <circle cx="0" cy="0" r="4" />
                <path d="M4 0 L15 0 M11 0 L11 5 M15 0 L15 4" />
              </g>
            </g>
          </g>

          <g data-arvi-part="right-arm" strokeWidth="4">
            <path d="M58 84 C67 88 72 94 76 101" />
            <g data-arvi-part="right-hand">
              <path d="M76 101 C80 105 82 109 84 114" />
              <circle cx="84" cy="114" r="2.2" fill="#f8fafc" stroke="none" />
              <g data-arvi-part="lantern" opacity="0" filter="url(#arvi-glow)" transform="translate(84 114)">
                <path d="M-6 0 Q0 -9 6 0" stroke="#f8fafc" strokeWidth="2" />
                <ellipse data-arvi-part="lantern-glow" cx="0" cy="13" rx="18" ry="22" fill="url(#lantern-amber)" stroke="none" opacity="0.55" />
                <rect x="-8" y="0" width="16" height="23" rx="5" fill="#1f1308" fillOpacity="0.72" stroke="#fde68a" strokeWidth="2" />
                <path d="M0 5 L0 20" stroke="#fde68a" strokeWidth="2" />
                <path data-arvi-part="lantern-flame" d="M0 18 C-4 14 -2 9 0 6 C4 10 5 15 0 18 Z" fill="#fbbf24" stroke="#fff7ed" strokeWidth="1" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
