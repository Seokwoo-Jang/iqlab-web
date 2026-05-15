// ----------------------------------------------------------------------------
// 정적 자산(`public/` 안의 이미지·SVG 등) 경로 헬퍼
//
// Next.js 의 `basePath` 설정은 `next/image`, `next/link` 같은 빌트인 컴포넌트에는
// 자동 적용되지만, 일반 `<img>`, `<a>`, SVG `<image href>` 등에는 적용되지 않습니다.
// GitHub Pages 처럼 하위 경로(예: `/make_web/`)에 배포될 때 이미지가 404 나는 것을
//방지하기 위해, `public/` 자산을 참조할 때는 항상 이 헬퍼로 감싸세요.
//
// 사용 예:
//   <img src={asset("/dongsun.jpg")} />
//   <img src={asset(member.photo)} />
//
// 로컬 개발(`npm run dev`)에서는 NEXT_PUBLIC_BASE_PATH 가 비어 있으므로
// 평소처럼 `/dongsun.jpg` 그대로 동작합니다.
// ----------------------------------------------------------------------------

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string | undefined): string | undefined {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path; // 외부 URL 은 그대로
  if (!path.startsWith("/")) return path;     // 상대경로/데이터 URI 등은 그대로
  return `${BASE_PATH}${path}`;
}
