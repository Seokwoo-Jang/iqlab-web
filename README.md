# IQLAB Website

> 🌐 **Live site:** <https://seokwoo-jang.github.io/iqlab-web/>
>
> ⚙️ **`main` 브랜치에 push 하면 GitHub Actions 가 자동으로 빌드·배포** 합니다 (약 2분 소요).
> 별도의 수동 배포 작업은 필요하지 않습니다.

세종대학교 IQLAB (Intelligent SoC & Quantum Computing Lab) 공식 홈페이지.
[Next.js 16](https://nextjs.org) (App Router) + [Tailwind CSS 4](https://tailwindcss.com/) 기반.

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000> 접속.

## 사진 추가하기

모든 이미지는 **`public/` 폴더** 아래에 두며, **용도(=사용 섹션)별 하위 폴더**로 정리합니다.

### 1. 저장 경로 & 코드 참조

| 종류 / 사용 섹션 | 저장 경로 | 코드에서 참조 |
|---|---|---|
| 멤버 사진 (Members) | `public/members/이름-성.jpg` | `asset('/members/이름-성.jpg')` |
| 칩 다이샷 (Projects) | `public/chips/sf028-XXXX-name.jpg` | `asset('/chips/sf028-XXXX-name.jpg')` |
| 연구 figure (Research) | `public/research/내-figure.png` | `asset('/research/내-figure.png')` |
| 갤러리·뉴스 (Community) | `public/community/이벤트-이름.png` | `asset('/community/이벤트-이름.png')` |
| 메인 히어로 (Hero) | `public/hero/이름.png` | `asset('/hero/이름.png')` |
| 로고·학교 브랜드 | `public/brand/이름.png` | `asset('/brand/이름.png')` |

**파일명 규칙**: 영문 소문자 + 하이픈(`-`) 권장. 한글·공백·대문자는 피하세요.

코드에서는 반드시 **`asset()` 헬퍼로 감싸서** 사용합니다 (GitHub Pages 의 basePath 자동 처리).

```tsx
import { asset } from './lib/asset';
<img src={asset('/members/dongsun.jpg')} />
```

### 2. 추가 절차 (3단계)

1. 위 표를 보고 **어느 섹션에서 쓰이는지** 정한 뒤, 해당 `public/<섹션>/` 폴더에 이미지 업로드
2. 해당 섹션의 `.tsx` 파일 (아래 표 참고) 안의 **데이터 배열에 항목 한 줄 추가**
3. `git push` → 약 2분 후 사이트에 자동 반영

> 각 섹션별 배열 형식 / 필드 의미 / 정렬·페이지네이션·라이트박스 등 **자세한 배치 알고리즘과 코드 예시**는 [MAINTENANCE.md](./MAINTENANCE.md#3-사진이미지-추가하는-법) 를 참고하세요.

## 콘텐츠 / 멤버 / 논문 추가하기

각 섹션은 `components/sections/` 안의 `.tsx` 파일 상단의 배열만 수정하면 됩니다.

| 추가할 항목 | 수정할 파일 |
|---|---|
| 멤버 (교수·재학생·졸업생) | `components/sections/MembersSection.tsx` |
| 연구 분야 / 그림 | `components/sections/ResearchSection.tsx`, `ResearchArt.tsx` |
| R&D 과제 / 칩 | `components/sections/ProjectsSection.tsx` |
| 논문 | `components/sections/PublicationsSection.tsx` |
| 갤러리 / 공지 | `components/sections/CommunitySection.tsx` |

**더 자세한 가이드**: **[MAINTENANCE.md](./MAINTENANCE.md)** 참고
(각 섹션별 코드 예시, Git 사용법, 배포 동작 원리, 문제 해결 등)

## 기술 스택

- Next.js 16.2 (App Router, static export)
- React 19
- Tailwind CSS 4
- TypeScript 5
- 호스팅: GitHub Pages (자동 배포)

## 주요 명령어

```bash
npm run dev      # 로컬 개발 서버 (수정 즉시 반영)
npm run build    # 프로덕션 빌드 (배포 전 에러 확인용 — Actions 가 돌리는 것과 동일)
npm run start    # 빌드된 결과를 로컬에서 실행
npm run lint     # 코드 스타일/오류 검사
```
