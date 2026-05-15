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
├── public/                   ← 이미지·SVG·파비콘 등 정적 파일
│   ├── chips/                ← 칩 다이샷 사진
│   └── research/             ← 연구 figure 이미지 (필요 시)
├── package.json
├── next.config.ts
└── README.md
```

---

## 3. 사진(이미지) 추가하는 법

### 3-1. 어디에 두면 되나?
모든 이미지는 **`public/`** 아래에 둡니다.
- 일반 이미지 → `public/파일명.jpg`
- 칩 다이샷 → `public/chips/파일명.jpg`
- 연구 figure → `public/research/파일명.png`

### 3-2. 코드에서 어떻게 참조하나?
`public/` 안의 파일은 **앞의 `public/` 을 빼고** 절대경로 `/` 로 시작합니다. 그리고 반드시 **`asset()` 헬퍼로 감싸서** 사용하세요 (GitHub Pages 의 basePath 자동 처리).

```tsx
import { asset } from '../lib/asset';   // (경로는 파일 위치에 따라 ../../lib/asset 등)

<img src={asset('/dongsun.jpg')} alt="..." />
<img src={asset(member.photo)} alt="..." />
```

| 실제 파일 위치 | 코드에서 쓰는 경로 |
|---|---|
| `public/dongsun.jpg` | `asset('/dongsun.jpg')` |
| `public/chips/sf028-2401-neuromorphic.jpg` | `asset('/chips/sf028-2401-neuromorphic.jpg')` |
| `public/research/uren-router.png` | `asset('/research/uren-router.png')` |

### 3-3. 파일명 규칙 (권장)
- 영문 소문자 + 하이픈(`-`) 만 사용. 예: `seokwoo-chang.jpg`
- 한글·공백·대문자는 피할 것 (URL 깨짐, 일부 호스팅에서 404 발생)
- 인물 사진은 `이름-성.jpg`, 칩은 `프로젝트코드-용도.jpg`

### 3-4. 현재 저장된 이미지 목록
```
public/
├── dongsun.jpg                          김동순 교수
├── seokwoo-chang.jpg                    장석우 졸업생
├── iqlab-logo.png / .svg                IQLAB 로고
├── iqlab-logo-remove.png                IQLAB 로고 (배경 제거)
├── iqlab-mark.svg                       IQLAB 심볼
├── sejong-logo.png                      세종대 로고
├── sejong-clocktower.png                세종대 시계탑
├── hero-chip.png                        메인 히어로 칩 사진
├── hero-template-remove.png             히어로 템플릿 (배경 제거)
├── chip-stock.png                       칩 마인드맵용 스톡 칩 이미지
├── award-2025-semiconductor-design.png  2025 반도체 설계대전 수상
└── chips/
    ├── sf028-2301-vehicle-camera.jpg    1st chip (차량용 카메라 SoC)
    ├── sf028-2401-neuromorphic.jpg      2nd chip (뉴로모픽 프로세서)
    └── sf028-2402-smart-meter.jpg       3rd chip (스마트미터 SoC)
```

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

- **졸업생 추가**: `ALUMNI` 배열에 항목 추가. 사진은 `public/이름-성.jpg` 로 두고 `photo: '/이름-성.jpg'` 로 참조.
  ```ts
  {
    id: 'hong-gil-dong',
    name: 'Hong Gil Dong',
    grade: 'M.S.',
    graduation: '2027.02',
    company: 'Samsung Electronics',
    photo: '/hong-gil-dong.jpg',          // 선택
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

- **사진 추가**:
  1. 이미지를 `public/이벤트-이름.png` 에 업로드
  2. `GALLERY` 배열에 항목 추가
  ```ts
  {
    label: '2026 신입생 환영회',
    date: '2026.03.02',
    src: '/welcome-2026.png',
    caption: '설명...',
    feature: false,   // true 면 2칸 차지하는 강조 카드
  },
  ```

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
git add public/hong-gil-dong.jpg

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
