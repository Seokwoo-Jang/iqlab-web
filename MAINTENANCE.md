# IQLAB 웹사이트 유지보수 가이드

> 🌐 **Live site:** <https://seokwoo-jang.github.io/iqlab-web/>
>
> ⚙️ `main` 브랜치에 push 하면 GitHub Actions 가 자동으로 빌드·배포 (약 2분).

세종대학교 IQLAB 홈페이지(Next.js 16 + Tailwind CSS 4) 의 콘텐츠 추가·수정·배포 방법을 정리한 문서입니다.
**랩 멤버 누구나 이 문서만 보고 내용을 갱신할 수 있도록** 작성되었습니다.

---

## 1. 사전 준비 (최초 1회만)

### 1-1. 필요한 프로그램 설치
- [Node.js](https://nodejs.org/) **20 이상**
- [Git](https://git-scm.com/)
- (선택) [Visual Studio Code](https://code.visualstudio.com/) 또는 Cursor

### 1-2. 저장소 받아오기
```bash
git clone https://github.com/Seokwoo-Jang/iqlab-web.git
cd iqlab-web
npm install
```

### 1-3. 로컬에서 실행해 보기
```bash
npm run dev
```
브라우저에서 <http://localhost:3000> 으로 접속하면 수정 사항이 실시간으로 반영됩니다.

---

## 2. 폴더 구조 한눈에 보기

```
iqlab-web/                    ← git 저장소 루트
├── .github/workflows/        ← GitHub Actions 자동 배포 설정
│   └── deploy.yml
├── app/                      ← Next.js 라우팅 (page.tsx, layout.tsx, globals.css)
├── components/               ← UI 컴포넌트
│   ├── IqlabLogo.tsx         ← 로고 컴포넌트
│   ├── Navbar.tsx            ← 상단 네비게이션
│   ├── hero/                 ← 메인(Hero) 영역
│   └── sections/             ← 각 섹션 (Members, Research, Projects ...)
├── lib/
│   └── asset.ts              ← 이미지 경로 헬퍼 (basePath 자동 처리)
├── public/                   ← 이미지·SVG·파비콘 등 정적 파일 (용도별 하위 폴더)
│   ├── brand/                ← 로고·학교 브랜드 (IQLAB / Sejong)
│   ├── hero/                 ← 메인 히어로 영역 이미지
│   ├── members/              ← 멤버 인물 사진
│   ├── community/            ← 갤러리·뉴스·이벤트 사진
│   ├── chips/                ← 칩 다이샷 사진 (Projects 섹션)
│   └── research/             ← 연구 figure 이미지 (Research 섹션)
├── package.json
├── next.config.ts
└── README.md
```

---

## 3. 사진(이미지) 추가하는 법

> **요약 흐름 (3단계)**
>
> 1. `public/<섹션 폴더>/` 에 이미지 업로드 → [§3-1](#3-1-어디에-두면-되나)
> 2. 해당 섹션의 `.tsx` 파일 **데이터 배열에 항목 한 줄 추가** → [§4](#4-콘텐츠별-수정-위치)
> 3. `git push` → 약 2분 뒤 사이트에 자동 반영 → [§5](#5-git-으로-변경-사항-올리기)
>
> **각 섹션별 배열 형식 / 필드 의미 / 정렬·페이지네이션·라이트박스 등 배치 알고리즘** 은
> §4 의 해당 섹션 (4-1 멤버, 4-2 연구, 4-3 칩, 4-4 논문, 4-5 갤러리) 항목을 참고하세요.

### 3-1. 어디에 두면 되나?
모든 이미지는 **`public/`** 아래에 두되, **사용되는 섹션(Chapter)에 맞춰 하위 폴더**로 분류합니다.

| 사용 섹션 / 용도 | 저장 폴더 | 사용 컴포넌트 |
|---|---|---|
| 멤버 사진 (교수·졸업생) | `public/members/` | `components/sections/MembersSection.tsx` |
| 칩 다이샷 | `public/chips/` | `components/sections/ProjectsSection.tsx` |
| 연구 figure | `public/research/` | `components/sections/ResearchSection.tsx`, `ResearchArt.tsx` |
| 갤러리·뉴스·이벤트 | `public/community/` | `components/sections/CommunitySection.tsx` |
| 메인 히어로 / 마인드맵 | `public/hero/` | `components/hero/HeroSection.tsx`, `ChipMindMap.tsx` |
| 로고 (IQLAB / 세종대) | `public/brand/` | `components/IqlabLogo.tsx`, `HeroSection.tsx`, `CommunitySection.tsx` |

> 어느 폴더로 갈지 헷갈리면 **"어느 섹션에서 보일 사진인가?"** 를 기준으로 정하세요. Next.js 기본 SVG(`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) 는 사용하지 않으며 루트에 그대로 두어도 무방합니다.

### 3-2. 코드에서 어떻게 참조하나?
`public/` 안의 파일은 **앞의 `public/` 을 빼고** 절대경로 `/` 로 시작합니다. 그리고 반드시 **`asset()` 헬퍼로 감싸서** 사용하세요 (GitHub Pages 의 basePath 자동 처리).

```tsx
import { asset } from '../lib/asset';   // (경로는 파일 위치에 따라 ../../lib/asset 등)

<img src={asset('/members/dongsun.jpg')} alt="..." />
<img src={asset(member.photo)} alt="..." />
```

| 실제 파일 위치 | 코드에서 쓰는 경로 |
|---|---|
| `public/members/dongsun.jpg` | `asset('/members/dongsun.jpg')` |
| `public/members/seokwoo-chang.jpg` | `asset('/members/seokwoo-chang.jpg')` |
| `public/chips/sf028-2401-neuromorphic.jpg` | `asset('/chips/sf028-2401-neuromorphic.jpg')` |
| `public/research/merged_transformer.png` | `asset('/research/merged_transformer.png')` |
| `public/community/award-2025-semiconductor-design.png` | `asset('/community/award-2025-semiconductor-design.png')` |
| `public/hero/hero-template-remove.png` | `asset('/hero/hero-template-remove.png')` |
| `public/brand/iqlab-logo-remove.png` | `asset('/brand/iqlab-logo-remove.png')` |

### 3-3. 파일명 규칙 (권장)
- 영문 소문자 + 하이픈(`-`) 만 사용. 예: `seokwoo-chang.jpg`
- 한글·공백·대문자는 피할 것 (URL 깨짐, 일부 호스팅에서 404 발생)
- 인물 사진은 `이름-성.jpg`, 칩은 `프로젝트코드-용도.jpg`, 이벤트는 `이벤트-연도.png`

### 3-4. 현재 저장된 이미지 목록
```
public/
├── brand/                                       ← 로고·학교 브랜드
│   ├── iqlab-logo.png                           IQLAB 풀 로고 (원본, 보관용)
│   ├── iqlab-logo-only.png                      IQLAB 심볼만 (마인드맵 중앙)
│   ├── iqlab-logo-remove.png                    IQLAB 풀 로고 (배경 제거, 네비바)
│   ├── sejong-logo.png                          세종대학교 로고 (히어로)
│   └── sejong-clocktower.png                    세종대 시계탑 (Community 컨택트)
│
├── hero/                                        ← 메인 히어로 영역
│   ├── hero-chip.png                            (원본 보관, 현재 미사용)
│   ├── hero-template-remove.png                 히어로 배경 칩 사진
│   └── chip-stock.png                           칩 마인드맵용 스톡 칩 (보관)
│
├── members/                                     ← 멤버 사진
│   ├── dongsun.jpg                              김동순 교수
│   └── seokwoo-chang.jpg                        장석우 졸업생
│
├── community/                                   ← 갤러리·뉴스
│   └── award-2025-semiconductor-design.png      2025 반도체 설계대전 수상
│
├── chips/                                       ← 칩 다이샷 (Projects)
│   ├── sf028-2301-vehicle-camera.jpg            1st chip (차량용 카메라 SoC)
│   ├── sf028-2401-neuromorphic.jpg              2nd chip (뉴로모픽 프로세서)
│   └── sf028-2402-smart-meter.jpg               3rd chip (스마트미터 SoC)
│
├── research/                                    ← 연구 figure (Research)
│   ├── merged_transformer.png                   Research 01 figure (Transformer/STAU)
│   ├── merged_cal.png                           Research 02 figure (Polynomial Cal.)
│   ├── merged_neuromorphic.png                  Research 03 figure (Neuromorphic SNN)
│   ├── transformer_1..6.png                     Research 01 원본 소스
│   ├── cal_1..3.gif                             Research 02 원본 소스
│   └── neuromorphic_1..6.png                    Research 03 원본 소스
│
└── *.svg                                        Next.js 기본 (사용 안 함)
```

### 3-5. 새 폴더가 필요할 때
새로운 섹션·카테고리 사진이 늘어나면 `public/` 아래에 폴더를 하나 더 만들어도 됩니다.
이 경우 위 표와 "3-4 이미지 목록"에 한 줄 추가해 두면 다음 사람이 헷갈리지 않습니다.

---

## 4. 콘텐츠별 수정 위치

각 섹션은 `components/sections/` 또는 `components/hero/` 안의 `.tsx` 파일을 수정합니다.
대부분 **파일 상단의 배열(`const XXX = [...]`)에 항목을 추가/수정** 하는 단순 작업입니다.

### 4-1. 멤버 (교수 / 재학생 / 졸업생)
**파일**: `components/sections/MembersSection.tsx`

- **재학생 추가**: `RESEARCHERS` 배열에 한 줄 추가
  ```ts
  const RESEARCHERS: Researcher[] = [
    { name: 'Hong Gil Dong', grade: 'M.S.' },   // ← 새 학생
    ...
  ];
  ```

- **졸업생 추가**: `ALUMNI` 배열에 항목 추가. 사진은 `public/members/이름-성.jpg` 로 두고 `photo: '/members/이름-성.jpg'` 로 참조.
  ```ts
  {
    id: 'hong-gil-dong',
    name: 'Hong Gil Dong',
    grade: 'M.S.',
    graduation: '2027.02',
    company: 'Samsung Electronics',
    photo: '/members/hong-gil-dong.jpg',  // 선택
    email: 'example@gmail.com',           // 선택
    accent: ALUMNI_ACCENT,
  },
  ```

- **교수 경력/수상 갱신**: `CAREER`, `EDUCATION`, `HONORS`, `SERVICE` 배열 수정.

### 4-2. 연구 (Research)
**파일**: `components/sections/ResearchSection.tsx`, `ResearchArt.tsx`

- **연구 분야 글 수정**: `ResearchSection.tsx` 의 `SECTIONS` 배열 안 `summary`, `subs` 등을 고침.
- **연구 그림(figure) 교체**:
  1. 이미지를 `public/research/내-figure.png` 에 업로드
  2. `ResearchArt.tsx` 의 `FIGURE_BY_NO` 객체에 `src: '/research/내-figure.png'` 추가
  ```ts
  '01': {
    src: '/research/edge-ai-block.png',
    caption: '...',
    source: '...',
  },
  ```

### 4-3. R&D 과제 / 칩 (Projects)
**파일**: `components/sections/ProjectsSection.tsx`

- **새 R&D 과제** → `PROJECTS` 배열에 추가
- **새 칩 추가**:
  1. 다이샷을 `public/chips/sf028-XXXX-name.jpg` 에 업로드
  2. `CHIPS` 배열에 항목 추가
  ```ts
  {
    no: '05',
    ordinal: '5th chip',
    code: 'SF028-2503',
    process: 'Samsung 28nm FD-SOI',
    title: 'Your chip title',
    photo: '/chips/sf028-2503-yourname.jpg',
    // 또는 아직 미제작이면 status: 'In Fabrication',
  },
  ```

### 4-4. 논문 (Publications)
**파일**: `components/sections/PublicationsSection.tsx`

- `PUBLICATIONS` 배열에 새 논문 객체 추가. **`date: 'YYYY-MM'` 기준으로 정렬되므로** 시간순으로 자동 정렬됩니다.
- 주요 논문(상단 강조)으로 표시하려면 `featured: true`.

### 4-5. 갤러리·공지 (Community)
**파일**: `components/sections/CommunitySection.tsx`
**갤러리 UI 컴포넌트**: `components/sections/PhotoGallery.tsx` (수정할 일 거의 없음)

Community Photos 갤러리는 다음과 같이 자동 동작합니다.

- `GALLERY` 배열에 항목만 추가하면 됩니다.
- `kind: 'award'` 항목 중 **가장 최근 1개가 좌상단 첫 자리에 고정** 표시됩니다.
  - **event 가 5장 이상**(= 첫 페이지가 award 포함 6장으로 가득 찰 때) → award 카드를 **2×2 feature** 로 강조
  - event 가 5장 미만 → award 도 **1×1 일반 카드**(★ Award 배지는 유지) 로 표시되어 빈 공간이 생기지 않음
  - award 가 여러 개면 가장 최근 1개만 위 규칙으로, 나머지는 일반 카드로 표시
- `kind: 'event'` 항목은 `date` 내림차순(최신 → 과거) 으로 자동 정렬되어 **페이지당 6 슬롯** 으로 표시됩니다.
- 사진이 한 페이지(6 슬롯)을 넘으면 갤러리 상단에 자동으로 **`◀ 최신` / `과거 ▶` 페이지 네비** 가 나타납니다.
- 사진을 클릭하면 **라이트박스(모달)** 로 큰 사진 + 자세한 설명을 표시. ESC / 백드롭 클릭 / ◀▶ 키로도 조작 가능합니다.

#### 사진 추가하는 법
1. 이미지를 `public/community/YYYY-MM-DD.jpg` (또는 `이벤트-이름.png`) 에 업로드
2. `GALLERY` 배열에 항목 추가

  ```ts
  {
    kind: 'event',                              // 'award' | 'event'
    label: '2026 신입생 환영회',
    date: '2026.03.02',                          // YYYY.MM.DD (정렬 기준)
    src: '/community/2026-03-02.jpg',
    caption: '카드와 라이트박스 상단에 보이는 짧은 설명.',
    details:
      '라이트박스에서만 보이는 더 자세한 내용.\n' +
      '여러 줄로 작성해도 줄바꿈이 보존됩니다.',
  },
  ```

#### 필드 설명
| 필드 | 필수 | 설명 |
|---|---|---|
| `kind` | 권장 | `'award'` 면 항상 2×2 feature, 생략/`'event'` 면 일반 카드 |
| `label` | ✅ | 카드 하단·라이트박스 헤더 제목 |
| `date` | 권장 | `'YYYY.MM.DD'` 또는 `'YYYY.MM'`. 비우면 가장 과거로 정렬 |
| `src` | — | `/community/...` 경로. 없으면 placeholder 카드 |
| `caption` | — | 카드 하단·라이트박스 상단 한두 줄 설명 |
| `details` | — | 라이트박스에서만 보이는 상세 본문 (줄바꿈 `\n` 보존) |
| `tone` | — | `src` 없을 때 placeholder 그라데이션 색 (예: `'from-cyan-900/40'`) |

> **수상(award) 항목**은 라이트박스/카드에 자동으로 ★ Award 배지가 붙습니다.
> **placeholder**(`src` 없음) 는 클릭해도 라이트박스가 열리지 않습니다 — 사진이 준비되면 `src` 만 채우면 됩니다.

### 4-6. 메인 히어로 / 로고 / 네비게이션
| 파일 | 용도 |
|---|---|
| `components/hero/HeroSection.tsx` | 첫 화면 카피·CTA |
| `components/hero/ChipMindMap.tsx` | 히어로 영역의 인터랙티브 도식 |
| `components/IqlabLogo.tsx` | 로고 컴포넌트 |
| `components/Navbar.tsx` | 상단 네비 메뉴 |
| `app/layout.tsx` | 사이트 전체 메타 (title, description, favicon) |
| `app/globals.css` | 전역 색·폰트 |

---

## 5. Git 으로 변경 사항 올리기

```bash
# 1) 변경 사항 확인
git status

# 2) 변경한 파일 스테이징
git add components/sections/MembersSection.tsx
git add public/members/hong-gil-dong.jpg

# 3) 커밋 (메시지는 한글 OK)
git commit -m "Members: 새 졸업생 홍길동 추가"

# 4) 원격 저장소에 푸시
git push origin main
```

푸시 후 약 2분 뒤 사이트(<https://seokwoo-jang.github.io/iqlab-web/>) 에 자동 반영됩니다.
**Actions** 탭에서 진행 상황을 볼 수 있습니다.

> **팁**: 큰 변경(새 섹션 추가 등) 은 별도 브랜치에서 작업한 뒤 Pull Request 로 리뷰받는 것을 권장합니다.

---

## 6. 배포 시스템 동작 원리

이 저장소는 다음 흐름으로 자동 배포됩니다 (별도 작업 불필요).

```
[로컬 PC]                          [GitHub 서버]                 [GitHub Pages]
─────────                          ─────────────                 ──────────────
1. 코드/사진 수정                    
2. git push origin main      ───→  3. Actions 가 자동 실행
                                   4. npm ci → npm run build
                                   5. 정적 사이트 (out/) 생성
                                   6. Pages 환경에 업로드  ───→  7. 사이트 갱신
                                                                    (~2분 후)
```

설정 파일:
- **`.github/workflows/deploy.yml`** — Actions 워크플로우 (자동 빌드·배포)
- **`next.config.ts`** — `output: "export"` 정적 export, `basePath` 자동 주입
- **`lib/asset.ts`** — 이미지 경로에 basePath 를 자동으로 붙이는 헬퍼

기본 설정으로 GitHub 저장소 이름이 그대로 URL 의 서브경로가 됩니다 (`https://<user>.github.io/<repo>/`).
사용자 도메인(예: `iqlab.sejong.ac.kr`) 을 연결하려면 별도 설정이 필요합니다.

---

## 7. 자주 쓰는 명령어

```bash
npm run dev      # 로컬 개발 서버 (수정 즉시 반영, http://localhost:3000)
npm run build    # 프로덕션 빌드 (배포 전 에러 확인용 — Actions 가 돌리는 것과 동일)
npm run start    # 빌드된 결과를 로컬에서 실행
npm run lint     # 코드 스타일/오류 검사
```

**push 하기 전에 `npm run build` 한 번 돌려보면** GitHub Actions 가 빌드 실패할 일을 미리 잡을 수 있습니다.

---

## 8. 문제 해결 체크리스트

| 증상 | 점검 |
|---|---|
| 이미지가 안 보임 | 파일이 `public/` 안에 있는지, 경로의 대소문자/하이픈이 정확한지, 코드에서 `asset('/...')` 로 감쌌는지 |
| 한글 파일명이 깨짐 | 영문 소문자 + 하이픈으로 파일명을 바꾸기 |
| `npm run dev` 가 안 켜짐 | 저장소 루트에서 `npm install` 다시 실행 |
| GitHub Pages 에서 CSS 깨짐 | basePath 누락 — Actions 워크플로우의 `NEXT_PUBLIC_BASE_PATH` 환경변수 확인 |
| Actions 빌드 실패 | 먼저 로컬에서 `npm run build` 실행해 어느 파일에서 오류인지 확인. TypeScript 오류는 dev 에서는 통과해도 build 에서 막힘 |
| 배포는 됐는데 사이트 갱신 안 됨 | 브라우저 캐시 — Ctrl+Shift+R 강제 새로고침 |

---

문의: 김동순 교수 <dongsun.kim07@sejong.ac.kr>
