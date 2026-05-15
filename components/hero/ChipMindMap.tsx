'use client';

import { useEffect, useState } from 'react';
import { asset } from '../../lib/asset';

const VB_W = 1400;
const VB_H = 700;

// Center hub area — square-ish region sized to host the IQLAB brain-circuit
// logo (the convergence point where all 4 research traces meet).
const CHIP = { x: 560, y: 230, w: 280, h: 240 };

// Wire-tip coordinates around the brain logo. Anchored slightly inside the
// hub rect so the start dots sit on the brain's outer circuit terminations
// rather than floating in empty space.
const WIRE_TIPS = {
  tl: { cx: CHIP.x + CHIP.w * 0.18, cy: CHIP.y + CHIP.h * 0.18 },
  tr: { cx: CHIP.x + CHIP.w * 0.82, cy: CHIP.y + CHIP.h * 0.18 },
  bl: { cx: CHIP.x + CHIP.w * 0.18, cy: CHIP.y + CHIP.h * 0.82 },
  br: { cx: CHIP.x + CHIP.w * 0.82, cy: CHIP.y + CHIP.h * 0.82 },
};

const RESEARCH = [
  {
    id: 'soc',
    title: 'Intelligent SoC Design',
    tags: ['Digital Circuit', 'PIM', 'Compute-Memory', 'Edge SoC'],
    accent: '#00FF88',
    trace: `M ${WIRE_TIPS.tl.cx},${WIRE_TIPS.tl.cy} L ${WIRE_TIPS.tl.cx},175 L 210,175`,
    dot: { cx: 210, cy: 175 },
    card: { x: 200, y: 95 },
    startDot: WIRE_TIPS.tl,
    delays: { trace: 0.5, dot: 1.5, card: 1.7 },
  },
  {
    id: 'ai',
    title: 'AI Accelerators',
    tags: ['LLM', 'NPU', 'Neuromorphic', 'Edge AI'],
    accent: '#00D4FF',
    trace: `M ${WIRE_TIPS.tr.cx},${WIRE_TIPS.tr.cy} L ${WIRE_TIPS.tr.cx},175 L 1190,175`,
    dot: { cx: 1190, cy: 175 },
    card: { x: 1200, y: 95 },
    startDot: WIRE_TIPS.tr,
    delays: { trace: 0.7, dot: 1.7, card: 1.9 },
  },
  {
    id: 'arch',
    title: 'Computer Architecture',
    tags: ['RISC-V', 'CPU Core', 'Cache', 'Pipeline'],
    accent: '#FF6B35',
    trace: `M ${WIRE_TIPS.bl.cx},${WIRE_TIPS.bl.cy} L ${WIRE_TIPS.bl.cx},525 L 210,525`,
    dot: { cx: 210, cy: 525 },
    card: { x: 200, y: 605 },
    startDot: WIRE_TIPS.bl,
    delays: { trace: 0.9, dot: 1.9, card: 2.1 },
  },
  {
    id: 'quantum',
    title: 'Quantum Computing',
    tags: ['Qubit Control', 'Cryo-CMOS', 'Quantum Algo', 'Hybrid'],
    accent: '#7B61FF',
    trace: `M ${WIRE_TIPS.br.cx},${WIRE_TIPS.br.cy} L ${WIRE_TIPS.br.cx},525 L 1190,525`,
    dot: { cx: 1190, cy: 525 },
    card: { x: 1200, y: 605 },
    startDot: WIRE_TIPS.br,
    delays: { trace: 1.1, dot: 2.1, card: 2.3 },
  },
];

export default function ChipMindMap() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {/* Mobile (< md): stacked card layout — the SVG mind map overlaps badly
          on narrow screens, so we swap to a simple vertical stack of the same
          4 research cards (reusing CardArt + MindmapTags below). */}
      <MobileResearchStack mounted={mounted} />

      {/* Desktop (md+): full SVG chip mind map */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: `${VB_W}/${VB_H}` }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="redGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="redLineGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id="chipBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#262a32" />
            <stop offset="55%" stopColor="#0e1117" />
            <stop offset="100%" stopColor="#04060a" />
          </linearGradient>
          <linearGradient id="chipHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="heatSpreader" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a414c" />
            <stop offset="35%" stopColor="#1c2028" />
            <stop offset="65%" stopColor="#0e1218" />
            <stop offset="100%" stopColor="#2a3038" />
          </linearGradient>
          <linearGradient id="pinMetal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dde1e8" />
            <stop offset="45%" stopColor="#7c828c" />
            <stop offset="100%" stopColor="#3c4048" />
          </linearGradient>
          <linearGradient id="substrate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a3344" />
            <stop offset="100%" stopColor="#031826" />
          </linearGradient>
          <radialGradient id="liCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6060" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#5a0a0a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="chipHaloRG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(220,38,38,0.30)" />
            <stop offset="50%" stopColor="rgba(220,38,38,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="chipBlueHalo" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(0,180,255,0.25)" />
            <stop offset="55%" stopColor="rgba(0,140,220,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Outer blue ambient halo (matches the photo's blue PCB lighting) */}
        <ellipse
          cx={CHIP.x + CHIP.w / 2}
          cy={CHIP.y + CHIP.h / 2}
          rx={CHIP.w * 1.15}
          ry={CHIP.h * 1.25}
          fill="url(#chipBlueHalo)"
        />
        {/* Inner red halo (IQLAB warm accent) */}
        <ellipse
          cx={CHIP.x + CHIP.w / 2}
          cy={CHIP.y + CHIP.h / 2}
          rx={CHIP.w * 0.85}
          ry={CHIP.h * 0.95}
          fill="url(#chipHaloRG)"
          style={mounted ? { animation: 'ringPulse 3.5s ease-in-out infinite', transformOrigin: `${CHIP.x + CHIP.w / 2}px ${CHIP.y + CHIP.h / 2}px` } : {}}
        />

        {/* Center IQLAB brain logo — the convergence point all four research
            traces meet at. Aspect ratio is preserved (xMidYMid meet) so the
            brain stays naturally proportioned regardless of the hub rect. */}
        <image
          href={asset('/iqlab-logo-only.png')}
          x={CHIP.x}
          y={CHIP.y}
          width={CHIP.w}
          height={CHIP.h}
          preserveAspectRatio="xMidYMid meet"
          opacity={mounted ? 1 : 0}
          style={{
            transition: 'opacity 0.6s ease-out 0.25s',
            filter: 'drop-shadow(0 0 18px rgba(220,38,38,0.45)) drop-shadow(0 0 36px rgba(220,38,38,0.25))',
          }}
        />

        {/* Base traces */}
        {mounted && RESEARCH.map((r) => (
          <path
            key={`trace-${r.id}`}
            d={r.trace}
            fill="none"
            stroke="rgba(255,255,255,0.32)"
            strokeWidth="1.3"
            style={{
              strokeDasharray: 620,
              strokeDashoffset: 620,
              animation: `drawTrace 1.2s ease-out ${r.delays.trace}s forwards`,
            }}
          />
        ))}

        {/* Hover red overlay */}
        {mounted && RESEARCH.map((r) => (
          <path
            key={`hover-${r.id}`}
            d={r.trace}
            fill="none"
            stroke="#FF1F2D"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={hovered === r.id ? 0 : 1}
            filter="url(#redLineGlow)"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: hovered === r.id ? 1 : 0,
            }}
          />
        ))}

        {/* Continuous electron flow */}
        {mounted && RESEARCH.map((r) => (
          <circle
            key={`electron-${r.id}`}
            r="3"
            fill="#FF3838"
            filter="url(#redGlow)"
            opacity="0"
          >
            <animateMotion
              dur="3.4s"
              begin={`${r.delays.dot + 0.4}s`}
              repeatCount="indefinite"
              path={r.trace}
              rotate="auto"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.9;1"
              dur="3.4s"
              begin={`${r.delays.dot + 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2;3.4;3.4;2"
              keyTimes="0;0.15;0.85;1"
              dur="3.4s"
              begin={`${r.delays.dot + 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Start dots */}
        {mounted && RESEARCH.map((r) => (
          <circle
            key={`startdot-${r.id}`}
            cx={r.startDot.cx}
            cy={r.startDot.cy}
            r="3.5"
            fill="#DC2626"
            filter="url(#redGlow)"
            style={{
              transformOrigin: `${r.startDot.cx}px ${r.startDot.cy}px`,
              opacity: 0,
              animation: `dotPop 0.35s ease-out ${r.delays.trace}s forwards`,
            }}
          />
        ))}

        {/* Endpoint dots */}
        {mounted && RESEARCH.map((r) => (
          <circle
            key={`dot-${r.id}`}
            cx={r.dot.cx}
            cy={r.dot.cy}
            r={hovered === r.id ? 7 : 5}
            fill="#DC2626"
            filter="url(#redGlow)"
            style={{
              transformOrigin: `${r.dot.cx}px ${r.dot.cy}px`,
              opacity: 0,
              animation: `dotPop 0.35s ease-out ${r.delays.dot}s forwards`,
              transition: 'r 0.3s ease-out',
            }}
          />
        ))}

        {/* Center chip photo intentionally removed — only the soft halos
            (rendered earlier) remain at the trace convergence point. */}
      </svg>

      {RESEARCH.map((r) => (
        <ResearchCard key={r.id} data={r} mounted={mounted} onHover={setHovered} />
      ))}
      </div>
    </>
  );
}

/* ───────────────────────────── Mobile fallback ─────────────────────────────
 * Renders the same 4 research topics as a clean vertical stack on phones,
 * where the absolute-positioned SVG mind map would overlap. Visible only on
 * screens narrower than Tailwind's md breakpoint (768px).
 * --------------------------------------------------------------------------*/
function MobileResearchStack({ mounted }: { mounted: boolean }) {
  return (
    <div className="md:hidden flex flex-col gap-4 w-full max-w-md mx-auto px-2">
      {RESEARCH.map((r, i) => (
        <div
          key={r.id}
          className="relative rounded-2xl px-4 pt-4 pb-3"
          style={{
            background: 'rgba(5,10,18,0.6)',
            backdropFilter: 'blur(10px) saturate(1.1)',
            WebkitBackdropFilter: 'blur(10px) saturate(1.1)',
            boxShadow: `inset 0 0 0 1px ${r.accent}30, 0 10px 30px rgba(0,0,0,0.5)`,
            opacity: 0,
            animation: mounted
              ? `fadeIn 0.5s ease-out ${0.15 + i * 0.1}s forwards`
              : 'none',
          }}
        >
          {/* Topic illustration */}
          <div className="mx-auto mb-3" style={{ width: '220px', height: '125px' }}>
            <CardArt id={r.id} accent={r.accent} />
          </div>

          {/* Title */}
          <h3
            className="text-center text-[15px] font-bold text-white leading-snug mb-2"
            style={{
              textShadow: `0 0 14px ${r.accent}70, 0 1px 8px rgba(0,0,0,0.9)`,
            }}
          >
            {r.title}
          </h3>

          <MindmapTags tags={r.tags} accent={r.accent} />
        </div>
      ))}
    </div>
  );
}

function ResearchCard({
  data,
  mounted,
  onHover,
}: {
  data: typeof RESEARCH[0];
  mounted: boolean;
  onHover: (id: string | null) => void;
}) {
  const pctX = (data.card.x / VB_W) * 100;
  const pctY = (data.card.y / VB_H) * 100;

  return (
    <div
      className="absolute group"
      style={{
        left: `${pctX}%`,
        top: `${pctY}%`,
        transform: 'translate(-50%, -50%)',
        width: '250px',
        opacity: 0,
        animation: mounted ? `fadeIn 0.6s ease-out ${data.delays.card}s forwards` : 'none',
      }}
      onMouseEnter={() => onHover(data.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Soft hover backdrop */}
      <div
        className="absolute -inset-3 rounded-2xl pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at center, ${data.accent}30, transparent 70%)`,
        }}
      />

      {/* Frosted glass panel — keeps the chip photo legible behind the cards */}
      <div
        className="relative rounded-2xl px-3.5 pt-3.5 pb-3"
        style={{
          background: 'rgba(5,10,18,0.55)',
          backdropFilter: 'blur(10px) saturate(1.1)',
          WebkitBackdropFilter: 'blur(10px) saturate(1.1)',
          boxShadow: `inset 0 0 0 1px ${data.accent}30, 0 10px 30px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Topic illustration */}
        <div
          className="mx-auto mb-3 transition-all duration-300"
          style={{ width: '220px', height: '125px' }}
        >
          <CardArt id={data.id} accent={data.accent} />
        </div>

        {/* Title node */}
        <h3
          className="text-center text-[15px] font-bold text-white leading-snug mb-2 transition-all duration-300 group-hover:scale-[1.03]"
          style={{
            textShadow: `0 0 14px ${data.accent}70, 0 1px 8px rgba(0,0,0,0.9)`,
          }}
        >
          {data.title}
        </h3>

        <MindmapTags tags={data.tags} accent={data.accent} />
      </div>
    </div>
  );
}

function MindmapTags({ tags, accent }: { tags: string[]; accent: string }) {
  const visible = tags.slice(0, 4);
  const W = 230;
  const H = 78;
  const hubX = W / 2;
  const hubY = 6;

  const positions = visible.map((_, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    return { x: col === 0 ? 60 : W - 60, y: 32 + row * 28 };
  });

  return (
    <div className="relative" style={{ width: `${W}px`, height: `${H}px`, marginLeft: 'auto', marginRight: 'auto' }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} ${H}`}>
        <circle cx={hubX} cy={hubY} r="1.6" fill={accent} />
        {positions.map((p, i) => (
          <path
            key={i}
            d={`M ${hubX},${hubY} Q ${hubX},${(hubY + p.y) / 2} ${p.x},${p.y}`}
            fill="none"
            stroke={`${accent}70`}
            strokeWidth="0.8"
            strokeDasharray="2 3"
            style={{ animation: `dashShift ${4 + i * 0.4}s linear infinite` }}
          />
        ))}
      </svg>
      {visible.map((tag, i) => {
        const p = positions[i];
        return (
          <span
            key={tag}
            className="absolute text-[10px] px-2.5 py-1 rounded-full font-mono whitespace-nowrap transition-all duration-300 hover:scale-110"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: 'translate(-50%, -50%)',
              color: accent,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(6px)',
              boxShadow: `0 0 0 1px ${accent}45, 0 0 12px ${accent}25`,
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

/* NOTE: An earlier version of this file included a hand-drawn SVG die
 * package (substrate + heat spreader + silicon + reticle rings + IQLAB mark)
 * as the convergence centerpiece. It was superseded by the chip-stock photo
 * rendered via <image> above. See git history if you want to recover it.
 */
function __unused_legacyCenterHub({ mounted }: { mounted: boolean }) {
  const cx = CHIP.x + CHIP.w / 2;
  const cy = CHIP.y + CHIP.h / 2;

  // Die geometry — substrate matches CHIP exactly so the trace start dots
  // (at the corners of a 100×210 box centered on cx/cy) sit on its top/bottom
  // edges as if they were bond pads. Inner layers are inset for that classic
  // "package on package" silhouette.
  const subW = CHIP.w;          // 300
  const subH = CHIP.h;          // 210
  const spreaderW = 240;
  const spreaderH = 150;
  const dieW = 184;
  const dieH = 112;

  const reticleR1 = 198;
  const reticleR2 = 168;

  // 24 tick marks around the outer reticle ring (every 15°)
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return {
      x1: cx + reticleR1 * cos,
      y1: cy + reticleR1 * sin,
      x2: cx + (reticleR1 - (i % 6 === 0 ? 14 : 7)) * cos,
      y2: cy + (reticleR1 - (i % 6 === 0 ? 14 : 7)) * sin,
      major: i % 6 === 0,
    };
  });

  // Inner die lithography hatch lines
  const dieX = cx - dieW / 2;
  const dieY = cy - dieH / 2;
  const hLines = Array.from({ length: 5 }, (_, i) => dieY + 16 + i * 20);
  const vLines = Array.from({ length: 8 }, (_, i) => dieX + 18 + i * 21);

  // Corner alignment marks on the silicon die
  const corners = [
    { x: dieX + 10, y: dieY + 10 },
    { x: dieX + dieW - 10, y: dieY + 10 },
    { x: dieX + 10, y: dieY + dieH - 10 },
    { x: dieX + dieW - 10, y: dieY + dieH - 10 },
  ];

  const fadeIn = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transition: `opacity 0.6s ease-out ${delay}s`,
  });

  return (
    <g>
      {/* Outer rotating reticle: dashed circle + 24 ticks (major every 90°) */}
      <g
        style={
          mounted
            ? {
                transformOrigin: `${cx}px ${cy}px`,
                animation: 'spinSlow 60s linear infinite',
                opacity: 0.9,
              }
            : { opacity: 0 }
        }
      >
        <circle
          cx={cx}
          cy={cy}
          r={reticleR1}
          fill="none"
          stroke="rgba(0,200,255,0.22)"
          strokeWidth="0.7"
          strokeDasharray="2 6"
        />
        {ticks.map((t, i) => (
          <line
            key={`tick-${i}`}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.major ? 'rgba(0,212,255,0.7)' : 'rgba(0,212,255,0.35)'}
            strokeWidth={t.major ? 1.1 : 0.7}
          />
        ))}
      </g>

      {/* Counter-rotating thin red reticle */}
      <g
        style={
          mounted
            ? {
                transformOrigin: `${cx}px ${cy}px`,
                animation: 'spinSlowR 45s linear infinite',
                opacity: 0.85,
              }
            : { opacity: 0 }
        }
      >
        <circle
          cx={cx}
          cy={cy}
          r={reticleR2}
          fill="none"
          stroke="rgba(220,38,38,0.32)"
          strokeWidth="0.7"
          strokeDasharray="5 9"
        />
      </g>

      {/* Substrate — the PCB-coloured carrier the die sits on */}
      <rect
        x={cx - subW / 2}
        y={cy - subH / 2}
        width={subW}
        height={subH}
        rx="10"
        fill="url(#substrate)"
        stroke="rgba(0,140,200,0.55)"
        strokeWidth="1.2"
        style={fadeIn(0.15)}
      />

      {/* Substrate trace hints — short horizontal pads near each bond point */}
      {[
        { x: cx - 50, y: cy - subH / 2, dir: -1 },
        { x: cx + 50, y: cy - subH / 2, dir: -1 },
        { x: cx - 50, y: cy + subH / 2, dir: 1 },
        { x: cx + 50, y: cy + subH / 2, dir: 1 },
      ].map((p, i) => (
        <line
          key={`pad-${i}`}
          x1={p.x}
          y1={p.y}
          x2={p.x}
          y2={p.y + p.dir * 14}
          stroke="rgba(0,212,255,0.55)"
          strokeWidth="2"
          strokeLinecap="round"
          style={fadeIn(0.2)}
        />
      ))}

      {/* Heat spreader — brushed-metal lid that covers most of the die */}
      <rect
        x={cx - spreaderW / 2}
        y={cy - spreaderH / 2}
        width={spreaderW}
        height={spreaderH}
        rx="4"
        fill="url(#heatSpreader)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.7"
        style={fadeIn(0.25)}
      />
      {/* Spreader screw / mount notches at the 4 corners */}
      {[
        { x: cx - spreaderW / 2 + 8, y: cy - spreaderH / 2 + 8 },
        { x: cx + spreaderW / 2 - 8, y: cy - spreaderH / 2 + 8 },
        { x: cx - spreaderW / 2 + 8, y: cy + spreaderH / 2 - 8 },
        { x: cx + spreaderW / 2 - 8, y: cy + spreaderH / 2 - 8 },
      ].map((p, i) => (
        <circle
          key={`screw-${i}`}
          cx={p.x}
          cy={p.y}
          r="2"
          fill="rgba(20,24,32,0.95)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.5"
          style={fadeIn(0.3)}
        />
      ))}

      {/* Silicon die — where the actual circuitry lives */}
      <rect
        x={dieX}
        y={dieY}
        width={dieW}
        height={dieH}
        rx="2"
        fill="url(#chipBody)"
        stroke="rgba(0,212,255,0.55)"
        strokeWidth="0.9"
        style={fadeIn(0.35)}
      />

      {/* Lithography hatch — very faint horizontal & vertical lines */}
      {mounted && (
        <g style={fadeIn(0.45)}>
          {hLines.map((y, i) => (
            <line
              key={`hl-${i}`}
              x1={dieX + 6}
              y1={y}
              x2={dieX + dieW - 6}
              y2={y}
              stroke="rgba(0,212,255,0.10)"
              strokeWidth="0.4"
            />
          ))}
          {vLines.map((x, i) => (
            <line
              key={`vl-${i}`}
              x1={x}
              y1={dieY + 6}
              x2={x}
              y2={dieY + dieH - 6}
              stroke="rgba(0,212,255,0.10)"
              strokeWidth="0.4"
            />
          ))}
        </g>
      )}

      {/* Die corner alignment crosshairs */}
      {mounted &&
        corners.map((p, i) => (
          <g key={`corner-${i}`} style={fadeIn(0.5)}>
            <circle
              cx={p.x}
              cy={p.y}
              r="3.2"
              fill="none"
              stroke="rgba(0,212,255,0.7)"
              strokeWidth="0.7"
            />
            <line
              x1={p.x - 5}
              y1={p.y}
              x2={p.x + 5}
              y2={p.y}
              stroke="rgba(0,212,255,0.7)"
              strokeWidth="0.6"
            />
            <line
              x1={p.x}
              y1={p.y - 5}
              x2={p.x}
              y2={p.y + 5}
              stroke="rgba(0,212,255,0.7)"
              strokeWidth="0.6"
            />
          </g>
        ))}

      {/* Scan line sweeping vertically across the silicon die (loops forever) */}
      {mounted && (
        <g clipPath="url(#dieClip)">
          <defs>
            <clipPath id="dieClip">
              <rect x={dieX} y={dieY} width={dieW} height={dieH} rx="2" />
            </clipPath>
            <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,212,255,0)" />
              <stop offset="50%" stopColor="rgba(0,212,255,0.55)" />
              <stop offset="100%" stopColor="rgba(0,212,255,0)" />
            </linearGradient>
          </defs>
          <rect
            x={dieX}
            y={cy - 6}
            width={dieW}
            height="12"
            fill="url(#scanGrad)"
            style={{
              animation: 'scanSweep 5.5s ease-in-out 1.8s infinite',
            }}
          />
        </g>
      )}

      {/* Subtle red pulse ring just outside the IQLAB mark */}
      <circle
        cx={cx}
        cy={cy}
        r="34"
        fill="none"
        stroke="rgba(220,38,38,0.45)"
        strokeWidth="1.1"
        style={
          mounted
            ? {
                transformOrigin: `${cx}px ${cy}px`,
                animation: 'ringPulse 2.8s ease-in-out infinite',
              }
            : { opacity: 0 }
        }
      />

      {/* IQLAB mark at the dead center — the "core" of the die */}
      <g
        transform={`translate(${cx - 30}, ${cy - 30}) scale(1.25)`}
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease-out 0.6s',
        }}
      >
        <circle
          cx="24"
          cy="24"
          r="20.5"
          fill="rgba(0,0,0,0.55)"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2.2"
        />
        <line
          x1="16.5"
          y1="19"
          x2="31.5"
          y2="19"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="16.5"
          y1="19"
          x2="24"
          y2="32"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="31.5"
          y1="19"
          x2="24"
          y2="32"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="16.5" cy="19" r="2.6" fill="#ffffff" />
        <circle cx="31.5" cy="19" r="2.6" fill="#ffffff" />
        <circle cx="24" cy="32" r="2.8" fill="#DC2626">
          <animate
            attributeName="r"
            values="2.6;3.4;2.6"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </g>
  );
}

function CardArt({ id, accent }: { id: string; accent: string }) {
  switch (id) {
    case 'soc': return <SocArt accent={accent} />;
    case 'ai': return <AIArt accent={accent} />;
    case 'arch': return <ArchArt accent={accent} />;
    case 'quantum': return <QuantumArt accent={accent} />;
    default: return null;
  }
}

function SocArt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <rect x="30" y="8" width="140" height="94" rx="3" fill="none" stroke={accent} strokeWidth="1.6" />
      <rect x="38" y="16" width="58" height="22" rx="1" fill={`${accent}40`} stroke={accent} strokeWidth="1.2" />
      <rect x="104" y="16" width="58" height="22" rx="1" fill={`${accent}40`} stroke={accent} strokeWidth="1.2" />
      <text x="67" y="31" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">CORE 0</text>
      <text x="133" y="31" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">CORE 1</text>
      <rect x="38" y="44" width="58" height="14" rx="1" fill={`${accent}26`} stroke={accent} strokeWidth="1" />
      <text x="67" y="54.5" textAnchor="middle" fontSize="8" fill={accent} fontFamily="monospace" fontWeight="bold">L2 $</text>
      <rect x="104" y="44" width="58" height="14" rx="1" fill={`${accent}55`} stroke={accent} strokeWidth="1.3" />
      <text x="133" y="54.5" textAnchor="middle" fontSize="8" fill="white" fontFamily="monospace" fontWeight="bold">PIM</text>
      <rect x="38" y="62" width="124" height="32" fill={`${accent}1c`} stroke={accent} strokeWidth="1" />
      {Array.from({ length: 28 }).map((_, i) => (
        <rect key={i} x={40 + i * 4.4} y="65" width="3.4" height="26" fill={`${accent}66`} />
      ))}
      <text x="100" y="80" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold" opacity="0.95">SRAM CIM ARRAY</text>
    </svg>
  );
}

function AIArt({ accent }: { accent: string }) {
  const layers = [
    { x: 22, n: 3 },
    { x: 75, n: 5 },
    { x: 128, n: 5 },
    { x: 178, n: 2 },
  ];
  const yFor = (i: number, n: number) => 14 + (i + 1) * (78 / (n + 1));
  return (
    <svg viewBox="0 0 200 110" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {layers.slice(0, -1).flatMap((L, li) => {
        const next = layers[li + 1];
        const lines: React.ReactElement[] = [];
        for (let i = 0; i < L.n; i++) {
          for (let j = 0; j < next.n; j++) {
            lines.push(
              <line key={`${li}-${i}-${j}`}
                x1={L.x} y1={yFor(i, L.n)}
                x2={next.x} y2={yFor(j, next.n)}
                stroke={accent} strokeWidth="0.7" opacity="0.6" />
            );
          }
        }
        return lines;
      })}
      {layers.flatMap((L, li) =>
        Array.from({ length: L.n }).map((_, i) => (
          <circle key={`n-${li}-${i}`} cx={L.x} cy={yFor(i, L.n)} r="4.2" fill={accent} />
        ))
      )}
      <text x="100" y="9.5" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">LLM · NEUROMORPHIC</text>
      <text x="22" y="106" textAnchor="middle" fontSize="6.5" fill={accent} fontFamily="monospace" fontWeight="bold" opacity="0.95">embed</text>
      <text x="75" y="106" textAnchor="middle" fontSize="6.5" fill={accent} fontFamily="monospace" fontWeight="bold" opacity="0.95">attn</text>
      <text x="128" y="106" textAnchor="middle" fontSize="6.5" fill={accent} fontFamily="monospace" fontWeight="bold" opacity="0.95">FFN</text>
      <text x="178" y="106" textAnchor="middle" fontSize="6.5" fill={accent} fontFamily="monospace" fontWeight="bold" opacity="0.95">out</text>
    </svg>
  );
}

function ArchArt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* RV badge */}
      <g transform="translate(6, 8)">
        <rect width="24" height="14" rx="1.5" fill={`${accent}55`} stroke={accent} strokeWidth="1.2" />
        <text x="12" y="11" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold">RV</text>
      </g>
      {/* Stack */}
      <g transform="translate(36, 8)">
        <rect x="14" y="0" width="124" height="11" rx="1" fill={`${accent}40`} stroke={accent} strokeWidth="1" />
        <text x="76" y="8.3" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold">L1 I-CACHE / D-CACHE</text>
        <rect x="6" y="14" width="140" height="22" rx="1" fill={`${accent}48`} stroke={accent} strokeWidth="1.4" />
        <text x="76" y="28.5" textAnchor="middle" fontSize="12" fill="white" fontFamily="monospace" fontWeight="bold" letterSpacing="0.6">RV CORE</text>
        {['IF', 'ID', 'EX', 'MEM', 'WB'].map((s, i) => (
          <g key={s}>
            <rect x={12 + i * 26} y="40" width="22" height="11" rx="0.6" fill={`${accent}38`} stroke={accent} strokeWidth="0.9" />
            <text x={23 + i * 26} y="48" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace" fontWeight="bold">{s}</text>
            {i < 4 && <line x1={34 + i * 26} y1="45.5" x2={38 + i * 26} y2="45.5" stroke={accent} strokeWidth="1.2" />}
          </g>
        ))}
        <rect x="0" y="55" width="158" height="13" rx="1" fill={`${accent}28`} stroke={accent} strokeWidth="1" />
        <text x="79" y="64.5" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold" opacity="0.95">L2 CACHE / NoC</text>
        <rect x="-4" y="71" width="166" height="11" rx="1" fill={`${accent}1c`} stroke={accent} strokeWidth="0.8" />
        <text x="79" y="79" textAnchor="middle" fontSize="7" fill={accent} fontFamily="monospace" fontWeight="bold" opacity="0.9">DRAM · Memory</text>
      </g>
    </svg>
  );
}

function QuantumArt({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 110" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(100, 56)">
        <circle r="40" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.95" />
        <ellipse rx="40" ry="12" fill="none" stroke={accent} strokeWidth="1" opacity="0.75" />
        <ellipse rx="12" ry="40" fill="none" stroke={accent} strokeWidth="1" opacity="0.75" />
        <line x1="-46" y1="0" x2="46" y2="0" stroke={accent} strokeWidth="0.7" opacity="0.6" strokeDasharray="2 2" />
        <line x1="0" y1="-46" x2="0" y2="46" stroke={accent} strokeWidth="0.7" opacity="0.6" strokeDasharray="2 2" />
        <line x1="0" y1="0" x2="24" y2="-26" stroke={accent} strokeWidth="2.4" />
        <polygon points="24,-26 21,-23 26,-22" fill={accent} />
        <circle r="3.2" fill={accent} />
        <text x="0" y="-46" textAnchor="middle" fontSize="8.5" fill="white" fontFamily="monospace" fontWeight="bold" opacity="0.95">|0&#x27E9;</text>
        <text x="0" y="52" textAnchor="middle" fontSize="8.5" fill="white" fontFamily="monospace" fontWeight="bold" opacity="0.95">|1&#x27E9;</text>
      </g>
      {[
        { cx: 22, cy: 24 },
        { cx: 178, cy: 24 },
        { cx: 22, cy: 88 },
        { cx: 178, cy: 88 },
      ].map((q, i) => (
        <g key={`qb-${i}`} opacity="0.8">
          <circle cx={q.cx} cy={q.cy} r="9" fill="none" stroke={accent} strokeWidth="1" />
          <ellipse cx={q.cx} cy={q.cy} rx="9" ry="2.6" fill="none" stroke={accent} strokeWidth="0.7" />
          <line x1={q.cx} y1={q.cy} x2={q.cx + (i % 2 === 0 ? 5 : -5)} y2={q.cy + (i < 2 ? -6 : 6)} stroke={accent} strokeWidth="1.2" />
          <circle cx={q.cx} cy={q.cy} r="1.8" fill={accent} />
        </g>
      ))}
    </svg>
  );
}
