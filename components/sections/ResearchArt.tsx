import type { FC } from 'react';

// Publication-style figure illustrations for each research chapter.
// Designed in 400×220 viewBox so they scale cleanly inside cards / wide containers.

export function SoCDieArt() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <rect width="400" height="220" fill="#020a14" />
      <text x="200" y="14" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
        HETEROGENEOUS SoC · NoC + 3D-STACK + CIM
      </text>

      {/* Die outline */}
      <rect x="20" y="22" width="360" height="172" fill="none" stroke="#00FF88" strokeWidth="0.9" />

      {/* Bond pads */}
      {Array.from({ length: 30 }).map((_, i) => (
        <rect key={`tp-${i}`} x={28 + i * 11.6} y="16" width="6" height="6" fill="#00FF88" opacity="0.55" />
      ))}
      {Array.from({ length: 30 }).map((_, i) => (
        <rect key={`bp-${i}`} x={28 + i * 11.6} y="194" width="6" height="6" fill="#00FF88" opacity="0.55" />
      ))}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={`lp-${i}`} x="14" y={28 + i * 12.8} width="6" height="6" fill="#00FF88" opacity="0.55" />
      ))}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={`rp-${i}`} x="380" y={28 + i * 12.8} width="6" height="6" fill="#00FF88" opacity="0.55" />
      ))}

      {/* Compute Chiplet (left) */}
      <g transform="translate(30, 30)">
        <rect width="110" height="68" fill="#003a22" stroke="#00FF88" strokeWidth="0.7" strokeDasharray="2 1.5" />
        <text x="55" y="13" textAnchor="middle" fontSize="6.5" fill="#00FF88" fontFamily="monospace" fontWeight="bold">COMPUTE CHIPLET</text>
        <rect x="6" y="20" width="46" height="42" fill="#001f12" stroke="#00FF88" strokeWidth="0.5" />
        <text x="29" y="38" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace">CORE 0</text>
        <text x="29" y="48" textAnchor="middle" fontSize="5" fill="#00FF88" fontFamily="monospace" opacity="0.85">RV64GC</text>
        <rect x="58" y="20" width="46" height="42" fill="#001f12" stroke="#00FF88" strokeWidth="0.5" />
        <text x="81" y="38" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace">CORE 1</text>
        <text x="81" y="48" textAnchor="middle" fontSize="5" fill="#00FF88" fontFamily="monospace" opacity="0.85">RV64GC</text>
      </g>

      {/* PIM / CIM macro (highlighted, center) */}
      <g transform="translate(150, 30)">
        <rect width="92" height="68" fill="#00FF8838" stroke="#00FF88" strokeWidth="1" />
        <text x="46" y="14" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace" fontWeight="bold">SRAM-CIM MACRO</text>
        <text x="46" y="25" textAnchor="middle" fontSize="5.5" fill="#bdfdd5" fontFamily="monospace">256 Kb · In-bitline INT8 MAC</text>
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={6 + i * 11} y="32" width="9" height="30" fill="#00FF8845" stroke="#00FF88" strokeWidth="0.3" />
        ))}
      </g>

      {/* 3D-Stacked HBM (right, with stack visual) */}
      <g transform="translate(252, 30)">
        <rect width="120" height="68" fill="#001a10" stroke="#00FF88" strokeWidth="0.6" />
        <text x="60" y="13" textAnchor="middle" fontSize="6.5" fill="#00FF88" fontFamily="monospace" fontWeight="bold">3D-STACK HBM</text>
        {Array.from({ length: 4 }).map((_, i) => (
          <g key={`stack-${i}`}>
            <rect x={10 + i * 2} y={20 + i * 2} width="80" height="36" fill="#003a22" stroke="#00FF88" strokeWidth="0.4" opacity={0.6 + i * 0.1} />
          </g>
        ))}
        <text x="50" y="44" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace" fontWeight="bold">DRAM ×4</text>
        {/* TSV indicators */}
        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={`tsv-${i}`} cx={94 + (i % 2) * 6} cy={26 + Math.floor(i / 2) * 8} r="1.4" fill="#00FF88" />
        ))}
        <text x="100" y="62" textAnchor="middle" fontSize="4.5" fill="#00FF88" fontFamily="monospace" opacity="0.85">TSV</text>
      </g>

      {/* NoC FABRIC (highlighted, central horizontal) */}
      <g transform="translate(30, 104)">
        <rect width="342" height="32" fill="#00FF8825" stroke="#00FF88" strokeWidth="1" />
        <text x="171" y="14" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold">NoC FABRIC · 6×4 MESH · AXI4 / CHI</text>
        <text x="171" y="25" textAnchor="middle" fontSize="5.5" fill="#bdfdd5" fontFamily="monospace">router · arbiter · 256-bit flit</text>
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={`router-${i}`}>
            <rect x={20 + i * 28} y="3" width="3" height="3" fill="#00FF88" />
            <rect x={20 + i * 28} y="26" width="3" height="3" fill="#00FF88" />
          </g>
        ))}
      </g>

      {/* UCIe Chiplet Interconnect */}
      <g transform="translate(30, 144)">
        <rect width="135" height="32" fill="#002818" stroke="#00FF88" strokeWidth="0.6" />
        <text x="67" y="14" textAnchor="middle" fontSize="7" fill="#00FF88" fontFamily="monospace" fontWeight="bold">UCIe D2D · CHIPLET I/F</text>
        <text x="67" y="25" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace">×64 lane · 16 GT/s</text>
      </g>

      {/* Power IP (PMIC / on-chip VR) */}
      <g transform="translate(174, 144)">
        <rect width="100" height="32" fill="#002a18" stroke="#00FF88" strokeWidth="0.6" />
        <text x="50" y="14" textAnchor="middle" fontSize="6.5" fill="#00FF88" fontFamily="monospace" fontWeight="bold">PMIC · ON-CHIP VR</text>
        <text x="50" y="25" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace">multi-rail · LDO + SC</text>
      </g>

      {/* Sensing IF / Always-on */}
      <g transform="translate(283, 144)">
        <rect width="89" height="32" fill="#002a18" stroke="#00FF88" strokeWidth="0.6" />
        <text x="44" y="14" textAnchor="middle" fontSize="6.5" fill="#00FF88" fontFamily="monospace" fontWeight="bold">SENSING IF · AON</text>
        <text x="44" y="25" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace">µW always-on</text>
      </g>

      <text x="200" y="213" textAnchor="middle" fontSize="6" fill="#888" fontFamily="monospace" opacity="0.75">
        Fig. 1 — Heterogeneous SoC: chiplet + 3D-HBM + CIM, integrated through NoC fabric
      </text>
    </svg>
  );
}

export function AIAttentionArt() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <rect width="400" height="220" fill="#020514" />
      <text x="200" y="14" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
        TRANSFORMER ATTENTION + SYSTOLIC ARRAY
      </text>

      {/* Embedding */}
      <g transform="translate(15, 30)">
        <rect width="38" height="150" fill="#00D4FF15" stroke="#00D4FF" strokeWidth="0.5" />
        <text x="19" y="80" textAnchor="middle" fontSize="7.5" fill="#00D4FF" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 19 80)">
          EMBEDDING
        </text>
      </g>

      {/* Q, K, V projection */}
      <g transform="translate(64, 30)">
        {(['Q', 'K', 'V'] as const).map((label, i) => (
          <g key={label} transform={`translate(0, ${i * 52})`}>
            <rect width="42" height="46" fill="#00D4FF22" stroke="#00D4FF" strokeWidth="0.6" />
            <text x="21" y="20" textAnchor="middle" fontSize="11" fill="white" fontFamily="monospace" fontWeight="bold">{label}</text>
            <text x="21" y="34" textAnchor="middle" fontSize="6" fill="#00D4FF" fontFamily="monospace">PROJ · INT4</text>
          </g>
        ))}
      </g>

      {/* MatMul QK^T */}
      <g transform="translate(120, 60)">
        <rect width="48" height="40" fill="#00D4FF35" stroke="#00D4FF" strokeWidth="0.7" />
        <text x="24" y="18" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace" fontWeight="bold">MatMul</text>
        <text x="24" y="29" textAnchor="middle" fontSize="6.5" fill="#00D4FF" fontFamily="monospace">QKᵀ / √d</text>
      </g>

      {/* Softmax */}
      <g transform="translate(180, 60)">
        <rect width="48" height="40" fill="#00D4FF22" stroke="#00D4FF" strokeWidth="0.6" />
        <text x="24" y="18" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace" fontWeight="bold">Softmax</text>
        <text x="24" y="29" textAnchor="middle" fontSize="6" fill="#00D4FF" fontFamily="monospace">FP8</text>
      </g>

      {/* MatMul · V */}
      <g transform="translate(240, 60)">
        <rect width="48" height="40" fill="#00D4FF35" stroke="#00D4FF" strokeWidth="0.7" />
        <text x="24" y="18" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace" fontWeight="bold">MatMul</text>
        <text x="24" y="29" textAnchor="middle" fontSize="6.5" fill="#00D4FF" fontFamily="monospace">Score · V</text>
      </g>

      {/* Output proj */}
      <g transform="translate(300, 60)">
        <rect width="40" height="40" fill="#00D4FF22" stroke="#00D4FF" strokeWidth="0.6" />
        <text x="20" y="20" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace" fontWeight="bold">OUTPUT</text>
        <text x="20" y="31" textAnchor="middle" fontSize="6" fill="#00D4FF" fontFamily="monospace">PROJ</text>
      </g>

      {/* PE Array (systolic) */}
      <g transform="translate(348, 30)">
        <text x="22" y="-3" textAnchor="middle" fontSize="6" fill="#00D4FF" fontFamily="monospace" fontWeight="bold">PE ARRAY</text>
        <rect width="46" height="150" fill="none" stroke="#00D4FF" strokeWidth="0.6" />
        {Array.from({ length: 64 }).map((_, i) => (
          <rect
            key={i}
            x={2 + (i % 8) * 5.5}
            y={2 + Math.floor(i / 8) * 18.4}
            width="4.5"
            height="17"
            fill={`rgba(0,212,255,${0.15 + ((i * 13) % 7) * 0.07})`}
          />
        ))}
        <text x="23" y="166" textAnchor="middle" fontSize="5.5" fill="#00D4FF" fontFamily="monospace" opacity="0.85">8×8 · INT4</text>
      </g>

      {/* Connections */}
      <g stroke="rgba(0,212,255,0.55)" strokeWidth="0.6" fill="none">
        <line x1="53" y1="50" x2="64" y2="50" />
        <line x1="53" y1="105" x2="64" y2="105" />
        <line x1="53" y1="158" x2="64" y2="158" />
        <line x1="106" y1="50" x2="120" y2="75" />
        <line x1="106" y1="105" x2="120" y2="80" />
        <line x1="168" y1="80" x2="180" y2="80" />
        <line x1="228" y1="80" x2="240" y2="80" />
        <line x1="106" y1="158" x2="240" y2="92" />
        <line x1="288" y1="80" x2="300" y2="80" />
        <line x1="340" y1="80" x2="348" y2="105" />
      </g>

      {/* Bottom labels */}
      <g transform="translate(15, 188)">
        <rect width="92" height="14" rx="2" fill="#00D4FF40" stroke="#00D4FF" strokeWidth="0.5" />
        <text x="46" y="10" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace" fontWeight="bold">INT4 / FP8 Quant.</text>
      </g>
      <g transform="translate(115, 188)">
        <rect width="86" height="14" rx="2" fill="#00D4FF22" stroke="#00D4FF" strokeWidth="0.5" />
        <text x="43" y="10" textAnchor="middle" fontSize="6.5" fill="#00D4FF" fontFamily="monospace">KV-Cache · Compress</text>
      </g>
      <g transform="translate(209, 188)">
        <rect width="100" height="14" rx="2" fill="#00D4FF22" stroke="#00D4FF" strokeWidth="0.5" />
        <text x="50" y="10" textAnchor="middle" fontSize="6.5" fill="#00D4FF" fontFamily="monospace">Sparse Attention · 90%</text>
      </g>

      <text x="200" y="215" textAnchor="middle" fontSize="6" fill="#888" fontFamily="monospace" opacity="0.75">
        Fig. 2 — Sparse attention engine + 8×8 INT4 systolic array (schematic)
      </text>
    </svg>
  );
}

export function ArchPipelineArt() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <rect width="400" height="220" fill="#0a0512" />
      <text x="200" y="14" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
        RV64GCV · 4-WIDE OUT-OF-ORDER PIPELINE
      </text>

      {/* Frontend column */}
      <g transform="translate(15, 28)">
        <text x="40" y="10" textAnchor="middle" fontSize="7" fill="#FF6B35" fontFamily="monospace" fontWeight="bold">FRONTEND</text>
        {['IF1', 'IF2', 'DEC', 'RENAME'].map((s, i) => (
          <g key={s} transform={`translate(0, ${18 + i * 22})`}>
            <rect width="80" height="18" fill="#FF6B3522" stroke="#FF6B35" strokeWidth="0.5" />
            <text x="40" y="12" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold">{s}</text>
          </g>
        ))}
      </g>

      {/* Branch predictor */}
      <g transform="translate(15, 152)">
        <rect width="80" height="42" fill="#FF6B3528" stroke="#FF6B35" strokeWidth="0.7" />
        <text x="40" y="14" textAnchor="middle" fontSize="6.5" fill="#FF6B35" fontFamily="monospace" fontWeight="bold">TAGE-SC-L</text>
        <text x="40" y="25" textAnchor="middle" fontSize="6" fill="white" fontFamily="monospace">BRANCH PRED.</text>
        <text x="40" y="36" textAnchor="middle" fontSize="6" fill="#FFB089" fontFamily="monospace">98.2% acc.</text>
      </g>

      {/* Dispatch + ROB */}
      <g transform="translate(108, 28)">
        <text x="60" y="10" textAnchor="middle" fontSize="7" fill="#FF6B35" fontFamily="monospace" fontWeight="bold">DISPATCH</text>
        <rect y="18" width="120" height="40" fill="#FF6B3522" stroke="#FF6B35" strokeWidth="0.6" />
        <text x="60" y="34" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace">RES. STATION</text>
        <text x="60" y="48" textAnchor="middle" fontSize="6" fill="#FF6B35" fontFamily="monospace">64 entries</text>

        <rect y="64" width="120" height="42" fill="#FF6B3528" stroke="#FF6B35" strokeWidth="0.8" />
        <text x="60" y="80" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold">ROB · 192 ent.</text>
        <text x="60" y="94" textAnchor="middle" fontSize="6" fill="#FF6B35" fontFamily="monospace">In-order Retire</text>
      </g>

      {/* Execute units */}
      <g transform="translate(244, 28)">
        <text x="50" y="10" textAnchor="middle" fontSize="7" fill="#FF6B35" fontFamily="monospace" fontWeight="bold">EXECUTE</text>
        {['ALU0', 'ALU1', 'MUL/DIV', 'FPU', 'VEC', 'LSU'].map((u, i) => (
          <g key={u} transform={`translate(${(i % 2) * 52}, ${18 + Math.floor(i / 2) * 26})`}>
            <rect width="48" height="22" fill="#FF6B3528" stroke="#FF6B35" strokeWidth="0.5" />
            <text x="24" y="14" textAnchor="middle" fontSize="6.5" fill="white" fontFamily="monospace" fontWeight="bold">{u}</text>
          </g>
        ))}
      </g>

      {/* Commit / WB */}
      <g transform="translate(354, 28)">
        <text x="20" y="10" textAnchor="middle" fontSize="7" fill="#FF6B35" fontFamily="monospace" fontWeight="bold">WB</text>
        <rect y="18" width="40" height="100" fill="#FF6B3522" stroke="#FF6B35" strokeWidth="0.5" />
        <text x="20" y="68" textAnchor="middle" fontSize="7.5" fill="white" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 20 68)">
          COMMIT
        </text>
      </g>

      {/* L1 I-cache */}
      <g transform="translate(108, 152)">
        <rect width="120" height="42" fill="#FF6B3522" stroke="#FF6B35" strokeWidth="0.6" />
        <text x="60" y="16" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace" fontWeight="bold">L1 I$ · 32KB · 4-way</text>
        <text x="60" y="30" textAnchor="middle" fontSize="6.5" fill="#FF6B35" fontFamily="monospace">Stream Prefetcher</text>
      </g>

      {/* L1 D-cache + private L2 (within core) */}
      <g transform="translate(244, 152)">
        <rect width="130" height="42" fill="#FF6B3522" stroke="#FF6B35" strokeWidth="0.6" />
        <text x="65" y="16" textAnchor="middle" fontSize="7" fill="white" fontFamily="monospace" fontWeight="bold">L1 D$ + Private L2</text>
        <text x="65" y="30" textAnchor="middle" fontSize="6.5" fill="#FF6B35" fontFamily="monospace">RRIP · MESI · Stride Pref.</text>
      </g>

      {/* Connections */}
      <g stroke="#FF6B35" strokeWidth="0.55" fill="none" opacity="0.65">
        <line x1="95" y1="50" x2="108" y2="48" />
        <line x1="228" y1="50" x2="244" y2="50" />
        <line x1="344" y1="50" x2="354" y2="50" />
        <line x1="168" y1="106" x2="168" y2="152" />
      </g>

      <text x="200" y="213" textAnchor="middle" fontSize="6" fill="#888" fontFamily="monospace" opacity="0.75">
        Fig. 3 — RV64GCV 4-wide OoO core: pipeline · branch predictor · in-core caches
      </text>
    </svg>
  );
}

export function QuantumStackArt() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <rect width="400" height="220" fill="#08021a" />
      <text x="200" y="14" textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
        CRYO-CMOS QUBIT CONTROL STACK
      </text>

      {(
        [
          { temp: '300 K', label: 'Room Temp · Classical CPU + FPGA', color: '#7B61FF20', emphasis: false },
          { temp: '50 K', label: 'Pulse Tube · Filter Stage', color: '#7B61FF35', emphasis: false },
          { temp: '4 K', label: 'Cryo-CMOS Controller IC', color: '#7B61FF55', emphasis: true },
          { temp: '20 mK', label: 'Mixing Chamber · Qubit Array', color: '#7B61FF82', emphasis: true },
        ] as const
      ).map((stage, i) => (
        <g key={stage.temp} transform={`translate(15, ${28 + i * 38})`}>
          <rect width="370" height="32" rx="2.5" fill={stage.color} stroke="#7B61FF" strokeWidth={stage.emphasis ? '0.9' : '0.5'} />
          <text x="10" y="13" fontSize="8" fill="#C9BAFF" fontFamily="monospace" fontWeight="bold">{stage.temp}</text>
          <text x="10" y="25" fontSize="6.5" fill="white" fontFamily="monospace">{stage.label}</text>

          {stage.temp === '4 K' && (
            <g transform="translate(170, 4)">
              {Array.from({ length: 8 }).map((_, ch) => (
                <g key={ch} transform={`translate(${ch * 24}, 0)`}>
                  <rect width="20" height="24" fill="#7B61FF45" stroke="#7B61FF" strokeWidth="0.4" />
                  <text x="10" y="10" textAnchor="middle" fontSize="5" fill="white" fontFamily="monospace" fontWeight="bold">CH{ch}</text>
                  <text x="10" y="19" textAnchor="middle" fontSize="4.5" fill="#C9BAFF" fontFamily="monospace">1mW</text>
                </g>
              ))}
            </g>
          )}
          {stage.temp === '20 mK' && (
            <g transform="translate(170, 4)">
              {Array.from({ length: 16 }).map((_, q) => (
                <circle
                  key={q}
                  cx={6 + (q % 8) * 24}
                  cy={6 + Math.floor(q / 8) * 14}
                  r="3.2"
                  fill="#C9BAFF"
                  opacity={0.55 + (q % 5) * 0.08}
                />
              ))}
              <text x="96" y="28" textAnchor="middle" fontSize="5.5" fill="#C9BAFF" fontFamily="monospace" opacity="0.9">
                16 Qubits · 2D Lattice
              </text>
            </g>
          )}
        </g>
      ))}

      {/* Inter-stage wires */}
      <g stroke="#7B61FF" strokeWidth="0.55" strokeDasharray="2 2" opacity="0.55">
        <line x1="100" y1="60" x2="100" y2="180" />
        <line x1="115" y1="60" x2="115" y2="180" />
        <line x1="130" y1="60" x2="130" y2="180" />
        <line x1="145" y1="60" x2="145" y2="180" />
      </g>

      <text x="200" y="213" textAnchor="middle" fontSize="6" fill="#888" fontFamily="monospace" opacity="0.75">
        Fig. 4 — Cryo-CMOS qubit controller stack with 8-channel 1 mW driver (schematic)
      </text>
    </svg>
  );
}

export const ART_BY_NO: Partial<Record<string, FC>> = {
  '01': AIAttentionArt,
  '02': ArchPipelineArt,
  '03': SoCDieArt,
};

// ----------------------------------------------------------------------------
// 실제 논문 figure / die photo 인용 슬롯.
//
// `src`에 이미지 경로가 채워지면 ResearchSection의 figure가 SVG fallback 대신
// 그 이미지를 표시합니다. 이미지는 `iqlab/public/research/` 아래에 배치하고
// `/research/<file>` 형태로 참조하세요.
//
// 권장 인용 후보 (모두 학술 인용 / 출처 명시 전제):
//   01 SoC      — IBM Telum II / AMD MI300 die shot, 또는 ISSCC paper Fig.
//   02 AI Acc.  — Google TPU v4 / NVIDIA H100 die photo, MIT Eyeriss Fig.
//   03 Arch.    — Apple M-series / SiFive RISC-V core block diagram
//   04 Quantum  — Google Sycamore / IBM Eagle / Intel Horse Ridge II die
//
// 실제 사용 시 저작권 / 라이선스를 반드시 확인하세요.
// (IEEE / Nature 논문 figure는 학술 인용 목적의 fair use 범위 내에서만 사용)
// ----------------------------------------------------------------------------

export type ResearchFigure = {
  src?: string;
  caption: string;
  source: string;
  url?: string;
};

export const FIGURE_BY_NO: Partial<Record<string, ResearchFigure>> = {
  '01': {
    caption:
      'Edge AI accelerator block diagram: Variable Systolic Array Transformer engine, hardware-assisted NPU virtualization scheduler, and in-memory matrix multiplication layer.',
    source:
      'Based on the Lab\u2019s work on Variable Systolic Array Transformer (Electronics, MDPI) and Hardware-Assisted NPU Virtualization (Sensors, MDPI).',
  },
  '02': {
    caption:
      'Heterogeneous sensor SoC architecture: AFE \u2192 Decimation Filter \u2192 ToF / envelope detector \u2192 segmented 2D polynomial calibration processor.',
    source:
      'Yu, M.-G. & Kim, D.-S., JSAN 2025; Lee, J.-L. & Kim, D.-S., Sensors 2024; 2D Sensor Calibration Processor, IEEE Access 2025.',
    url: 'https://doi.org/10.3390/jsan14010012',
  },
  '03': {
    caption:
      'Neuromorphic processor with Unified Refractory-control Neuron (UREN) router on a star-topology NoC, supporting nearest-neighbor STDP for on-chip learning. Implemented in Samsung 28 nm full-custom silicon (2025).',
    source:
      'Na, S. & Kim, D.-S., \u201cAn Energy-Efficient Neuromorphic Processor Using Unified Refractory Control-Based NoC for Edge AI,\u201d Electronics, 2025.',
    url: 'https://doi.org/10.3390/electronics14244959',
  },
};
