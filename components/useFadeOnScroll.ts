'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 섹션 단위 페이드 인/아웃 훅.
 *
 * 스크롤하면서 섹션이 뷰포트에 들어오면 opacity 0 → 1 로 페이드 인하고,
 * 뷰포트에서 빠져나가면 1 → 0 으로 페이드 아웃합니다. 인접한 두 섹션이
 * 동시에 보이는 구간(overlap zone)에서는 들어오는 쪽과 나가는 쪽이 자연스럽게
 * 교차되어 부드러운 "section transition" 효과를 만듭니다.
 *
 * - `initial` 을 1 로 두면 첫 페인트 직후 깜빡임을 줄일 수 있습니다(예: 히어로).
 * - 페이드 구간(window 비율)은 `fadeRatio` 로 조절합니다(0.4 = 뷰포트 높이의 40%).
 */
export function useFadeOnScroll<T extends HTMLElement = HTMLElement>(
  options?: { initial?: number; fadeRatio?: number },
) {
  const { initial = 0, fadeRatio = 0.45 } = options ?? {};
  const ref = useRef<T | null>(null);
  const [opacity, setOpacity] = useState<number>(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const fadeWindow = vh * fadeRatio;

      // 들어올 때(top 이 vh 근처 → 0 으로 갈수록 1)
      const enter = clamp01((vh - rect.top) / fadeWindow);
      // 나갈 때(bottom 이 0 으로 갈수록 0)
      const exit = clamp01(rect.bottom / fadeWindow);
      // 섹션이 뷰포트와 전혀 겹치지 않으면 0
      const visible = rect.bottom > 0 && rect.top < vh ? 1 : 0;

      setOpacity(visible === 0 ? 0 : Math.min(enter, exit));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [fadeRatio]);

  return { ref, opacity };
}

function clamp01(v: number): number {
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}
