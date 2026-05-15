'use client';

import ChipMindMap from './ChipMindMap';
import { asset } from '../../lib/asset';
import { useFadeOnScroll } from '../useFadeOnScroll';

export default function HeroSection() {
  const { ref, opacity } = useFadeOnScroll<HTMLElement>({ initial: 1 });

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ opacity, transition: 'opacity 0.25s linear' }}
    >
      {/* Layer 0 — chip template photo as the hero background.
          Initial setup: full-bleed inset-0 cover so the chip image fills the
          entire hero. `filter: brightness` keeps the photo subdued so the
          headline + chip mind-map cards remain the focal point. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${asset('/hero-template-remove.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.4)',
        }}
      />

      {/* Layer 1 — light darkening wash so headline + cards stay legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(2,8,18,0.55) 0%, rgba(2,8,18,0.30) 40%, rgba(2,8,18,0.35) 70%, rgba(2,8,18,0.65) 100%)',
        }}
      />

      {/* Layer 2 — subtle blue ambient wash that complements the chip photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 55%, rgba(8,40,80,0.30) 0%, rgba(5,20,40,0.12) 60%, transparent 90%)',
        }}
      />

      {/* Layer 3 — animated PCB circuit overlay (kept subtle so the bg photo shows through) */}
      <PCBOverlay />

      {/* Layer 4 — top dark fade for legibility (softer) */}
      <div
        className="absolute inset-x-0 top-0 h-72 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(2,8,18,0.55), transparent)' }}
      />
      {/* Layer 5 — bottom dark fade (softer) */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(2,8,18,0.65), transparent)' }}
      />
      {/* Layer 6 — center red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 60%, rgba(220,38,38,0.10), transparent 70%)',
        }}
      />

      {/* Headline — extra bottom padding keeps it well clear of the ChipMindMap cards */}
      <div
        className="relative pt-28 md:pt-24 pb-10 md:pb-14 text-center px-6 z-10"
        style={{ animation: 'fadeUp 0.7s ease-out 0.2s both' }}
      >
        {/* Sejong logo on its own row, centered, filling the width */}
        <div className="flex flex-col items-center gap-3 mb-5 mx-auto w-full max-w-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset('/sejong-logo.png')}
            alt="Sejong University"
            className="w-full h-auto opacity-95"
            style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.6))' }}
          />
          <p
            className="text-[15px] md:text-[12px] font-mono tracking-[0.32em] uppercase"
            style={{ color: '#FF5560', textShadow: '0 0 14px rgba(220,38,38,0.5)' }}
          >
            Semiconductor Systems Engineering
          </p>
        </div>
        <h1
          className="text-[25px] md:text-3xl xl:text-4xl font-bold text-white leading-tight"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.85), 0 0 40px rgba(0,212,255,0.18)' }}
        >
          Intelligent SoC and Quantum Computing Laboratory
        </h1>
      </div>

      {/* ChipMindMap — extra top padding pushes the cards well below the headline */}
      <div className="relative flex-1 w-full max-w-5xl xl:max-w-6xl mx-auto px-4 pt-20 md:pt-28 pb-2 z-10">
        <ChipMindMap />
      </div>

      <div
        className="relative pb-14 flex items-center justify-center gap-4 z-10"
        style={{ animation: 'fadeUp 0.7s ease-out 2.4s both' }}
      >
        <a
          href="#research"
          className="px-7 py-2.5 rounded text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_24px_rgba(220,38,38,0.55)]"
          style={{ background: '#DC2626', color: '#fff' }}
        >
          Explore Research →
        </a>
        <a
          href="#contact"
          className="px-7 py-2.5 rounded text-sm font-semibold border border-white/20 text-gray-200 hover:border-white/50 hover:text-white transition-all duration-200 backdrop-blur-sm bg-white/5"
        >
          Join Our Lab →
        </a>
      </div>
    </section>
  );
}

function PCBOverlay() {
  // Dense animated PCB traces — full-screen circuit board feel.
  // Now sitting above the chip photo, opacity is dialed down so the photo
  // still reads through clearly.
  const traces: { d: string; flow: boolean; delay?: number }[] = [
    // Top edge
    { d: 'M 50,80 L 320,80 L 380,140 L 600,140', flow: true, delay: 0 },
    { d: 'M 850,60 L 1100,60', flow: false },
    { d: 'M 1900,120 L 1640,120 L 1580,180 L 1380,180', flow: true, delay: 0.8 },
    { d: 'M 100,200 L 250,200 L 280,240', flow: false },
    { d: 'M 1700,40 L 1500,40 L 1460,90', flow: true, delay: 1.6 },

    // Mid-left
    { d: 'M 0,300 L 200,300 L 240,360 L 380,360', flow: true, delay: 0.4 },
    { d: 'M 0,460 L 180,460', flow: false },
    { d: 'M 0,640 L 200,640 L 250,700 L 410,700', flow: true, delay: 1.2 },
    { d: 'M 0,800 L 230,800', flow: false },
    { d: 'M 50,500 L 130,500 L 170,540', flow: false },
    { d: 'M 0,360 L 60,360 L 90,330', flow: true, delay: 2.2 },
    { d: 'M 0,560 L 130,560 L 170,600 L 320,600', flow: true, delay: 1.8 },

    // Mid-right
    { d: 'M 1920,300 L 1700,300 L 1660,350 L 1500,350', flow: true, delay: 0.2 },
    { d: 'M 1920,450 L 1730,450', flow: false },
    { d: 'M 1920,650 L 1700,650 L 1660,710 L 1480,710', flow: true, delay: 1.0 },
    { d: 'M 1920,800 L 1750,800', flow: false },
    { d: 'M 1850,500 L 1750,500 L 1710,540', flow: false },
    { d: 'M 1920,360 L 1860,360 L 1830,330', flow: true, delay: 2.4 },
    { d: 'M 1920,560 L 1790,560 L 1750,600 L 1600,600', flow: true, delay: 2.0 },

    // Bottom edge
    { d: 'M 50,920 L 250,920 L 310,860 L 480,860', flow: true, delay: 1.4 },
    { d: 'M 600,950 L 800,950', flow: false },
    { d: 'M 1900,930 L 1700,930 L 1640,990 L 1450,990', flow: true, delay: 0.6 },
    { d: 'M 1100,1010 L 1300,1010', flow: false },
    { d: 'M 1500,1040 L 1700,1040', flow: false },
    { d: 'M 200,1020 L 460,1020 L 500,1000', flow: true, delay: 2.6 },
  ];

  // Use trace endpoints as via positions
  const vias: { x: number; y: number }[] = [];
  traces.forEach((t) => {
    const matches = t.d.match(/(\d+),(\d+)/g);
    if (matches) {
      matches.forEach((m) => {
        const [x, y] = m.split(',').map(Number);
        vias.push({ x, y });
      });
    }
  });

  // BGA-style pad clusters (hint at hidden ICs around the canvas)
  const padClusters = [
    { x: 320, y: 250, cols: 6, rows: 4 },
    { x: 1500, y: 280, cols: 6, rows: 4 },
    { x: 250, y: 880, cols: 7, rows: 5 },
    { x: 1600, y: 870, cols: 7, rows: 5 },
    { x: 130, y: 540, cols: 4, rows: 3 },
    { x: 1760, y: 580, cols: 4, rows: 3 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.32 }}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ovFlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,212,255,0)" />
            <stop offset="50%" stopColor="rgba(0,212,255,0.95)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </linearGradient>
          <linearGradient id="ovFlowRed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(220,38,38,0)" />
            <stop offset="50%" stopColor="rgba(255,80,80,0.9)" />
            <stop offset="100%" stopColor="rgba(220,38,38,0)" />
          </linearGradient>
          <filter id="ovGlow">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>

        {/* Static traces */}
        {traces.map((t, i) => (
          <path
            key={`t-${i}`}
            d={t.d}
            fill="none"
            stroke="rgba(0,212,255,0.32)"
            strokeWidth="1.2"
          />
        ))}

        {/* Animated current flow */}
        {traces
          .filter((t) => t.flow)
          .map((t, i) => (
            <path
              key={`f-${i}`}
              d={t.d}
              fill="none"
              stroke={i % 4 === 0 ? 'url(#ovFlowRed)' : 'url(#ovFlow)'}
              strokeWidth="1.9"
              filter="url(#ovGlow)"
              style={{
                strokeDasharray: '60 260',
                animation: `traceFlow ${4 + (i % 3)}s linear ${t.delay ?? 0}s infinite`,
              }}
            />
          ))}

        {/* Vias */}
        {vias.map((v, i) => (
          <circle key={`v-${i}`} cx={v.x} cy={v.y} r="2.2" fill="rgba(0,212,255,0.55)" />
        ))}

        {/* BGA pad clusters (replace single pads — feels more like a real PCB) */}
        {padClusters.map((c, ci) => {
          const dots: React.ReactElement[] = [];
          for (let r = 0; r < c.rows; r++) {
            for (let q = 0; q < c.cols; q++) {
              dots.push(
                <circle
                  key={`bga-${ci}-${r}-${q}`}
                  cx={c.x + q * 8}
                  cy={c.y + r * 8}
                  r="1.6"
                  fill="rgba(0,212,255,0.45)"
                />,
              );
            }
          }
          return <g key={`cluster-${ci}`}>{dots}</g>;
        })}
      </svg>
    </div>
  );
}
