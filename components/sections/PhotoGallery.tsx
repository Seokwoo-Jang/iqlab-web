'use client';

// ----------------------------------------------------------------------------
// Community Photos 갤러리
//
// 사용처: components/sections/CommunitySection.tsx
//
// 동작 요약:
//   - GALLERY 배열만 채우면 자동으로 동작합니다.
//   - `kind: 'award'` 항목은 가장 최근 1개가 좌상단 첫 자리에 고정 표시.
//     · event 가 5장 이상이면(= 첫 페이지가 award 포함 6장으로 가득 찰 때)
//       award 는 **2×2 feature 카드**로 강조됩니다.
//     · event 가 5장 미만이면 award 도 1×1 일반 카드로 표시되어 (★ Award 배지 유지)
//       작은 갤러리에서 빈 공간이 생기지 않도록 합니다.
//   - `kind: 'event'`(기본) 항목은 `date` 내림차순(최신 → 과거)으로 정렬되어
//     페이지 단위로 표시됩니다 (페이지당 6 슬롯).
//   - 좌우 화살표 버튼으로 페이지 이동. "◀ 최신" / "과거 ▶".
//   - 카드를 클릭하면 라이트박스(모달) 로 큰 사진과 상세 설명을 표시.
//     ESC / 백드롭 클릭 / 닫기 버튼 / ◀▶ 키 / 좌우 버튼으로 조작.
//
// 새 사진 추가: components/sections/CommunitySection.tsx 의 GALLERY 배열에
// 한 항목만 추가하면 됩니다 (자세한 가이드는 MAINTENANCE.md 참고).
// ----------------------------------------------------------------------------

import { useCallback, useEffect, useMemo, useState } from 'react';
import { asset } from '../../lib/asset';

export type Photo = {
  /** 짧은 제목 — 카드 하단·라이트박스 헤더에 사용 */
  label: string;
  /** `YYYY.MM.DD` 또는 `YYYY.MM`. 최신순 정렬 기준. 비우면 가장 과거로 정렬. */
  date?: string;
  /** 이미지 경로 (`/community/...`). 비우면 placeholder 카드로 표시. */
  src?: string;
  /** 카드 하단·라이트박스 본문 짧은 캡션 */
  caption?: string;
  /** 라이트박스에서만 추가로 보일 상세 설명 (선택, 줄바꿈 보존됨) */
  details?: string;
  /** placeholder 그라데이션 톤 (src 가 없을 때만 사용). 예: 'from-cyan-900/40' */
  tone?: string;
  /**
   * 'award': 항상 2×2 feature 카드 자리에 고정 (가장 최근 award 1개).
   * 'event' (기본): 일반 카드, date 내림차순으로 페이지네이션.
   */
  kind?: 'award' | 'event';
};

// 페이지당 표시 슬롯 수:
//   - award 가 feature(2×2) 일 때: award 1 + event 5 = 6 슬롯 (event 페이지 단위 = 5)
//   - award 가 일반(1×1) 일 때:    모든 카드 1×1, 페이지당 6장
const EVENTS_PER_FEATURE_PAGE = 5;
const PHOTOS_PER_PAGE = 6;
const FEATURE_AWARD_MIN_EVENTS = 5; // event 가 이 만큼 이상이면 award 를 2×2 로
const ACCENT = '#FBBF24';

function dateKey(d?: string): string {
  // 'YYYY.MM.DD' / 'YYYY.MM' / 'YYYY' 모두 자리수 다르므로 8자리로 정규화
  if (!d) return '00000000';
  const digits = d.replace(/[^0-9]/g, '');
  return (digits + '00000000').slice(0, 8);
}

function sortByDateDesc<T extends { date?: string }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => dateKey(b.date).localeCompare(dateKey(a.date)));
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  // Feature 자리에 고정할 award (가장 최근 1개) + 나머지 events
  const { award, events } = useMemo(() => {
    const awards = sortByDateDesc(photos.filter((p) => p.kind === 'award'));
    const featured = awards[0];
    const rest = sortByDateDesc(
      photos.filter((p) => p !== featured && p.kind !== 'award')
        .concat(awards.slice(1)), // award 가 여러 개면 나머지는 event 자리로
    );
    return { award: featured, events: rest };
  }, [photos]);

  // award 를 2×2 feature 로 강조할지 여부 (event 가 충분히 많을 때만)
  const shouldFeatureAward = Boolean(award) && events.length >= FEATURE_AWARD_MIN_EVENTS;

  // 페이지네이션 대상 배열 + 페이지당 항목 수
  const { items, pageStep } = useMemo(() => {
    if (shouldFeatureAward) {
      // award 는 모든 페이지에 feature 자리로 고정, events 만 페이지네이션
      return { items: events, pageStep: EVENTS_PER_FEATURE_PAGE };
    }
    // award 도 일반 1×1 카드로 첫 자리에 배치하여 함께 페이지네이션
    return {
      items: award ? [award, ...events] : events,
      pageStep: PHOTOS_PER_PAGE,
    };
  }, [shouldFeatureAward, award, events]);

  const pageCount = Math.max(1, Math.ceil(items.length / pageStep));
  const [page, setPage] = useState(0);

  // 항목 수가 줄어들어 현재 페이지가 범위를 벗어나면 보정
  useEffect(() => {
    if (page > pageCount - 1) setPage(pageCount - 1);
  }, [pageCount, page]);

  const pageItems = items.slice(page * pageStep, (page + 1) * pageStep);

  // 현재 화면에 보이는 항목들. 라이트박스 좌우 이동 단위.
  const visiblePhotos: Photo[] = useMemo(
    () => (shouldFeatureAward && award ? [award, ...pageItems] : pageItems),
    [shouldFeatureAward, award, pageItems],
  );

  // ───────── Lightbox ─────────
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // 페이지 바뀌면 라이트박스 닫기 (인덱스 의미가 달라지기 때문)
  useEffect(() => {
    setOpenIdx(null);
  }, [page]);

  const findNextWithSrc = useCallback(
    (from: number, dir: 1 | -1) => {
      for (let j = from + dir; j >= 0 && j < visiblePhotos.length; j += dir) {
        if (visiblePhotos[j]?.src) return j;
      }
      return -1;
    },
    [visiblePhotos],
  );

  const openLightbox = useCallback(
    (i: number) => {
      if (visiblePhotos[i]?.src) setOpenIdx(i);
    },
    [visiblePhotos],
  );
  const closeLightbox = useCallback(() => setOpenIdx(null), []);
  const goPrev = useCallback(() => {
    setOpenIdx((i) => {
      if (i === null) return null;
      const n = findNextWithSrc(i, -1);
      return n === -1 ? i : n;
    });
  }, [findNextWithSrc]);
  const goNext = useCallback(() => {
    setOpenIdx((i) => {
      if (i === null) return null;
      const n = findNextWithSrc(i, 1);
      return n === -1 ? i : n;
    });
  }, [findNextWithSrc]);

  // 키보드 (ESC, ←, →) + body scroll lock
  useEffect(() => {
    if (openIdx === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
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
  }, [openIdx, closeLightbox, goPrev, goNext]);

  const hasPrev = openIdx !== null && findNextWithSrc(openIdx, -1) !== -1;
  const hasNext = openIdx !== null && findNextWithSrc(openIdx, 1) !== -1;
  const openPhoto = openIdx !== null ? visiblePhotos[openIdx] : null;

  return (
    <div>
      {/* Header + page nav */}
      <div
        className="mb-6 pb-3 flex items-end justify-between gap-3 flex-wrap"
        style={{ borderBottom: `1px solid ${ACCENT}55` }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white">Photos</h3>

        {pageCount > 1 && (
          <div className="flex items-center gap-2 text-[12px] font-mono text-gray-300">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="더 최신 페이지로 이동"
              className="px-2.5 py-1 rounded border border-white/15 hover:border-amber-400/60 hover:text-amber-300 transition disabled:opacity-30 disabled:hover:border-white/15 disabled:cursor-not-allowed"
            >
              ◀ 최신
            </button>
            <span className="tabular-nums text-gray-400 px-1">
              {page + 1} / {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page === pageCount - 1}
              aria-label="더 과거 페이지로 이동"
              className="px-2.5 py-1 rounded border border-white/15 hover:border-amber-400/60 hover:text-amber-300 transition disabled:opacity-30 disabled:hover:border-white/15 disabled:cursor-not-allowed"
            >
              과거 ▶
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {visiblePhotos.map((p, i) => (
          <PhotoCard
            key={`${page}-${p.label}-${p.date ?? i}`}
            photo={p}
            isAward={p.kind === 'award'}
            isFeature={shouldFeatureAward && p === award}
            onOpen={() => openLightbox(i)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {openPhoto?.src && (
        <Lightbox
          photo={openPhoto}
          onClose={closeLightbox}
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
// Card
// ────────────────────────────────────────────────────────────────────────────

function PhotoCard({
  photo,
  isAward,
  isFeature,
  onOpen,
}: {
  photo: Photo;
  /** ★ Award 배지 표시 여부 (kind === 'award') */
  isAward: boolean;
  /** 2×2 feature 카드 크기 적용 여부 (award + 충분한 event 수) */
  isFeature: boolean;
  onOpen: () => void;
}) {
  const clickable = Boolean(photo.src);
  return (
    <figure
      className={`relative rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition group ${
        isFeature
          ? 'col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto'
          : 'aspect-[4/3]'
      } ${clickable ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70' : ''}`}
      onClick={clickable ? onOpen : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : -1}
      aria-label={clickable ? `${photo.label} — 크게 보기` : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {photo.src ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(photo.src)}
            alt={photo.label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.0) 70%)',
            }}
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-4 z-10">
            <div className="flex items-baseline gap-2 mb-1">
              {isAward && (
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                  style={{
                    color: ACCENT,
                    borderColor: `${ACCENT}55`,
                    background: `${ACCENT}10`,
                  }}
                >
                  ★ Award
                </span>
              )}
              {photo.date && (
                <span className="text-[10px] font-mono text-gray-300">{photo.date}</span>
              )}
            </div>
            <p className="text-sm md:text-base font-bold text-white leading-snug">
              {photo.label}
            </p>
            {photo.caption && (
              <p className="text-[12px] text-gray-300 leading-snug mt-1 hidden md:block">
                {photo.caption}
              </p>
            )}
          </figcaption>
        </>
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${photo.tone ?? 'from-gray-900/40'} to-black flex items-end p-4`}
        >
          <span className="text-xs font-mono text-white/70">{photo.label}</span>
        </div>
      )}
    </figure>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Lightbox
// ────────────────────────────────────────────────────────────────────────────

function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const isAward = photo.kind === 'award';
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.label}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8"
      style={{ animation: 'fadeIn 0.18s ease-out' }}
    >
      {/* Close */}
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

      {/* Prev / Next */}
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

      {/* Content (백드롭 클릭으로 닫히지 않도록 stopPropagation) */}
      <div
        className="relative w-full max-w-5xl max-h-full flex flex-col items-stretch gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(photo.src)}
          alt={photo.label}
          className="block w-full h-auto max-h-[70vh] object-contain rounded-md border border-white/10 bg-black"
        />

        <div className="text-left px-1">
          <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
            {isAward && (
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                style={{
                  color: ACCENT,
                  borderColor: `${ACCENT}55`,
                  background: `${ACCENT}10`,
                }}
              >
                ★ Award
              </span>
            )}
            {photo.date && (
              <span className="text-[11px] font-mono text-gray-300">{photo.date}</span>
            )}
          </div>
          <h4 className="text-lg md:text-xl font-bold text-white leading-snug">
            {photo.label}
          </h4>
          {photo.caption && (
            <p className="text-sm text-gray-300 leading-relaxed mt-2">{photo.caption}</p>
          )}
          {photo.details && (
            <p className="text-sm text-gray-400 leading-relaxed mt-2 whitespace-pre-line">
              {photo.details}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
