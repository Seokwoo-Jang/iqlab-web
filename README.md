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

## 콘텐츠 추가 / 사진 업로드 / 배포 방법

상세 가이드는 **[MAINTENANCE.md](./MAINTENANCE.md)** 를 참고하세요.
- 멤버, 논문, 칩, 갤러리 등 **각 섹션을 어디서 수정하는지**
- **사진을 어디에 두고 어떻게 참조하는지** (`public/`)
- **배포 흐름** (push → GitHub Actions → GitHub Pages)

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
