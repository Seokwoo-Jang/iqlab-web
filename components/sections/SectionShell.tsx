'use client';

import type { ReactNode } from 'react';
import { useFadeOnScroll } from '../useFadeOnScroll';

export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const hasHeader = Boolean(title) || Boolean(intro);
  const { ref, opacity } = useFadeOnScroll<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className="relative min-h-screen bg-black border-t border-white/5 py-24 px-6"
      style={{ opacity, transition: 'opacity 0.25s linear' }}
    >
      <div className="max-w-6xl mx-auto">
        {hasHeader ? (
          <div className="mb-12 text-center">
            <p
              className="text-[11px] font-mono tracking-[0.35em] uppercase mb-3"
              style={{ color: '#DC2626' }}
            >
              {eyebrow}
            </p>
            {title && (
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                {title}
              </h2>
            )}
            {intro && (
              <div className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                {intro}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-10 text-center">
            <p
              className="text-[11px] font-mono tracking-[0.35em] uppercase"
              style={{ color: '#DC2626' }}
            >
              {eyebrow}
            </p>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Card({
  children,
  className = '',
  accent = 'rgba(255,255,255,0.08)',
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={`rounded-lg p-5 transition-all duration-300 ${className}`}
      style={{
        background: 'rgba(5, 14, 28, 0.55)',
        border: `1px solid ${accent}`,
        backdropFilter: 'blur(6px)',
      }}
    >
      {children}
    </div>
  );
}

export function Tag({ children, color = '#DC2626' }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded font-mono"
      style={{
        color,
        background: `${color}14`,
        border: `1px solid ${color}30`,
      }}
    >
      {children}
    </span>
  );
}
