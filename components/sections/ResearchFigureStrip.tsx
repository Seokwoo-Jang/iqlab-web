'use client';

// ----------------------------------------------------------------------------
// Research figure strip
//
// 사용처: components/sections/ResearchSection.tsx
//
// 동작:
//   - 각 챕터의 SVG 일러스트 아래에 원본 figure 이미지들을 가로 일렬로 나열.
//   - 데스크탑에서는 한 줄에 최대 6장까지 일렬, 좁은 화면에서는 자동 줄바꿈.
//   - 카드 클릭 시 라이트박스(모달) 로 큰 사진 표시.
//     ESC / 백드롭 클릭 / 닫기 / ◀▶ 키 / 좌우 버튼으로 조작.
//
// 사진 추가: ResearchSection.tsx 의 PHOTOS_BY_NO 배열에 경로만 추가하면 됩니다.
// ----------------------------------------------------------------------------

import { useCallback, useEffect, useState } from 'react';
import { asset } from '../../lib/asset';

export type ResearchPhoto = {
  /** 이미지 경로. 예: '/research/transformer_1.png' */
  src: string;
  /** 선택: 라이트박스 헤더에 노출할 짧은 라벨 */
  label?: string;
  /** 선택: 라이트박스에 노출할 캡션 */
  caption?: string;
};

export default function ResearchFigureStrip({
  photos,
  accent,
}: {
  photos: ResearchPhoto[];
  accent: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const open = useCallback((i: number) => setOpenIdx(i), []);
  const close = useCallback(() => setOpenIdx(null), []);
  const goPrev = useCallback(() => {
    setOpenIdx((i) => (i === null || i <= 0 ? i : i - 1));
  }, []);
  const goNext = useCallback(() => {
    setOpenIdx((i) => (i === null || i >= photos.length - 1 ? i : i + 1));
  }, [photos.length]);

  useEffect(() => {
    if (openIdx === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    }
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIdx, close, goPrev, goNext]);

  if (photos.length === 0) return null;

  const cols = Math.min(photos.length, 6);
  const openPhoto = openIdx !== null ? photos[openIdx] : null;
  const hasPrev = openIdx !== null && openIdx > 0;
  const hasNext = openIdx !== null && openIdx < photos.length - 1;

  return (
    <div className="mt-4">
      <div
        className="grid gap-2 sm:gap-3"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {photos.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            type="button"
            onClick={() => open(i)}
            aria-label={`${p.label ?? `Figure ${i + 1}`} — 크게 보기`}
            className="group relative aspect-[4/3] overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 transition"
            style={{
              border: `1px solid ${accent}30`,
              background: '#000',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(p.src)}
              alt={p.label ?? `Figure ${i + 1}`}
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <span
              className="absolute top-1 left-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/55 text-white/85 border border-white/10"
              aria-hidden
            >
              {i + 1}
            </span>
            <span
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition"
              style={{
                boxShadow: `inset 0 0 0 1px ${accent}80`,
              }}
            />
          </button>
        ))}
      </div>

      {openPhoto && (
        <Lightbox
          photo={openPhoto}
          index={openIdx as number}
          total={photos.length}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Lightbox
// ────────────────────────────────────────────────────────────────────────────

function Lightbox({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  photo: ResearchPhoto;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.label ?? `Figure ${index + 1}`}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8"
      style={{ animation: 'fadeIn 0.18s ease-out' }}
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition text-xl leading-none flex items-center justify-center"
      >
        ×
      </button>

      {hasPrev && (
        <button
          type="button"
          aria-label="이전 사진"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition flex items-center justify-center"
        >
          ◀
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          aria-label="다음 사진"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition flex items-center justify-center"
        >
          ▶
        </button>
      )}

      <div
        className="relative w-full max-w-5xl max-h-full flex flex-col items-stretch gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(photo.src)}
          alt={photo.label ?? `Figure ${index + 1}`}
          className="block w-full h-auto max-h-[80vh] object-contain rounded-md border border-white/10 bg-black"
        />
        <div className="text-left px-1 flex items-baseline gap-3 flex-wrap">
          <span className="text-[11px] font-mono text-gray-400 tabular-nums">
            {index + 1} / {total}
          </span>
          {photo.label && (
            <h4 className="text-sm md:text-base font-bold text-white leading-snug">
              {photo.label}
            </h4>
          )}
          {photo.caption && (
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed w-full">
              {photo.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
