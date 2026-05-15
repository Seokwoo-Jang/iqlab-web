import type { NextConfig } from "next";

// ----------------------------------------------------------------------------
// GitHub Pages 정적 배포용 설정
//
// - `output: "export"` : `npm run build` 시 `out/` 폴더에 정적 사이트 생성
// - `images.unoptimized` : GH Pages 는 이미지 최적화 서버가 없으므로 비활성화
// - `basePath` / `assetPrefix` : 저장소가 `https://<user>.github.io/<repo>/`
//   하위 경로에 배포되므로 빌드 시점에 환경변수로 주입.
//   (사용자 도메인을 연결하면 NEXT_PUBLIC_BASE_PATH 를 비워두면 됨)
//
// 로컬 개발 (`npm run dev`) 시에는 환경변수가 비어 있어 basePath 가 적용되지
// 않으므로 평소처럼 http://localhost:3000 에서 그대로 동작합니다.
// ----------------------------------------------------------------------------

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
