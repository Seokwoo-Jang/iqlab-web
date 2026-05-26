'use client';

import { useEffect, useState } from 'react';
import { SectionShell, Card } from './SectionShell';
import { asset } from '../../lib/asset';

type CareerEntry = { period: string; role: string; org: string; note?: string };
type EducationEntry = { period: string; degree: string; field: string; org: string };
type Honor = { year: string; title: string; detail?: string };

type Grade = 'Ph.D.' | 'M.S.' | 'Undergraduate Researcher';

type Researcher = {
  id: string;
  name: string;
  grade: Grade;
  photo?: string;
  email?: string;
  education?: AlumniEducation[];
  researchInterests?: string[];
  accent: string;
};

type AlumniEducation = { degree: string; org: string; field?: string; period?: string };
type Alumni = {
  id: string;
  name: string;
  grade: Grade;
  /** Graduation YYYY.MM */
  graduation: string;
  /** Current company / affiliation after graduation */
  company: string;
  photo?: string;
  email?: string;
  education?: AlumniEducation[];
  researchInterests?: string[];
  accent: string;
};

const CAREER: CareerEntry[] = [
  {
    period: '2022.01 – 재직중',
    role: '교수',
    org: '세종대학교 반도체시스템공학과',
    note: 'AI 반도체·NPU 가상화·뉴로모픽·SoC 연구. 지능형 SoC 및 퀀텀 컴퓨팅 연구실 운영. 삼성전자 파운드리 28nm 뉴로모픽 프로세서 실물 제작·검증 주도(2025).',
  },
  {
    period: '1999.01 – 2022.12',
    role: '책임연구원 / 연구본부 운영',
    org: '한국전자기술연구원 (KETI)',
    note: '23년간 SoC 설계 및 시스템 연구 총괄. AI 반도체·임베디드 시스템·센서 융합 분야 국가 R&D 과제 기획·수행, 대형 과제 책임 주도.',
  },
  {
    period: '2018.01 – 2020.12',
    role: '반도체 PD (Program Director)',
    org: '산업통상자원부 R&D 전략기획단 (KEIT)',
    note: '국가 반도체 R&D 정책 기획 총괄. 반도체 분야 국가 로드맵 수립 및 대형 R&D 과제 기획·평가 주도.',
  },
  {
    period: '2006.01 – 2014.12',
    role: '겸임교수',
    org: '인하대학교',
    note: '전자공학 분야 학부·대학원 강의. SoC 설계 및 디지털 회로 관련 교과목 운영. 산학 연계 교육 수행.',
  },
];

const EDUCATION: EducationEntry[] = [
  { period: '~ 2005', degree: 'Ph.D.', field: '전자공학', org: '인하대학교' },
  { period: '~ 1999', degree: 'M.S.', field: '전자공학', org: '인하대학교' },
  { period: '~ 1997', degree: 'B.S.', field: '전자공학', org: '인하대학교' },
];

const TEACHING = {
  undergraduate: ['디지털논리회로', '디지털회로설계', 'AI반도체소자물리'],
  graduate: ['시스템 소프트웨어', '고급 SoC 설계', '뉴로모픽 컴퓨팅 특론'],
};

const HONORS: Honor[] = [
  {
    year: '2025',
    title: "제26회 ‘대한민국 반도체 설계대전’ 기업특별상",
    detail: '엣지 AI용 뉴로모픽 프로세서',
  },
  { year: '2018', title: '국무총리 표창', detail: '반도체 산업 발전 공로' },
  { year: '2015', title: '대통령 표창', detail: "제16회 ‘대한민국 반도체 설계대전’" },
];

const SERVICE: string[] = [
  '온디바이스 AI 반도체 연구센터(ITRC) 센터장 — 과기정통부 (2024 ~ 2031)',
  'IEEE 정회원',
  '대한전자공학회 주요 위원',
  '반도체공학회 주요 위원',
];

const RESEARCHERS_ACCENT = '#007AFF';

const RESEARCHERS: Researcher[] = [
  { 
    id : 'ui-seok-jeong',
    name: 'Ui Seok Jeong',
    grade: 'M.S.',
    photo: '/members/ui-seok-jeong.jpg',
    email: 'sgjms2017@gmail.com', 
    researchInterests: ['Functional Safety for Automotive Semiconductor Systems'],
    accent: RESEARCHERS_ACCENT,
   education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2026.03 – ',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2025' },
    ],
 },
 { 
    id: 'ji-hoon-yang',
    name: 'Ji Hoon Yang', 
    grade: 'M.S.',
    photo: '/members/ji-hoon-yang.jpg',
    email: 'didwlgns010502@naver.com',
    researchInterests: ['AI Accelerator', 'Hardware architecture'],
    accent: RESEARCHERS_ACCENT,
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2026.03 – ',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2026' },
    ],
  },
  { 
    id: 'sung-kyun-sin',
    name: 'Sung Kyun Sin', 
    grade: 'M.S.',
    photo: '/members/sung-kyun-sin.jpg',
    email: 'skshin99.iq@gmail.com',
    researchInterests: ['AI Accelerator', 'Hardware architecture', 'SoC Design'],
    accent: RESEARCHERS_ACCENT,
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2025.09 – ',
      },
      { degree: 'B.S.', org: 'Chungnam National University', period: '2023' },
    ],
  },
  { 
    id: 'min-jae-kwak',
    name: 'Min Jae Kwak', 
    grade: 'M.S.',
    photo: '/members/min-jae-kwak.jpg',
    email: 'ns2024@sju.ac.kr',
    researchInterests: ['AI-based ECG classification'],
    accent: RESEARCHERS_ACCENT,
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2025.07 – ',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2025' },
    ],
  },
  { 
    id: 'lee-han',
    name: 'Lee Han', 
    grade: 'M.S.',
    photo: '/members/lee-han.jpg',
    email: 'leehan@sju.ac.kr',
    researchInterests: ['NPU Virtualization'],
    accent: RESEARCHERS_ACCENT,
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2026.03 – ',
      },
      { degree: 'B.S.', org: 'Hankuk University of Foreign Studies', period: '2026' },
    ],
  },
  { 
    id: 'sung-jin-hong',
    name: 'Sung Jin Hong', 
    grade: 'M.S.',
    photo: '/members/sung-jin-hong.jpg',
    email: 'ns2024@sju.ac.kr',
    researchInterests: ['Transformer AI Accelerator'],
    accent: RESEARCHERS_ACCENT,
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2026.03 – ',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2026' },
    ],
  },
  { 
    id: 'in-seung-ryu',
    name: 'In Seung Ryu', 
    grade: 'M.S.',
    photo: '/members/in-seung-ryu.jpg',
    email: 'inseung.ryu26@gmail.com',
    researchInterests: ['NPU'],
    accent: RESEARCHERS_ACCENT,
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2026.03 – ',
      },
      { degree: 'B.S.', org: 'Tech University of Korea', period: '2025' },
    ],
  },
];

const ALUMNI_ACCENT = '#FF9500';

const ALUMNI: Alumni[] = [
  {
    id: 'seok-woo-chang',
    name: 'Seok Woo Chang',
    grade: 'M.S.',
    graduation: '2025.02',
    company: 'FADU',
    photo: '/members/seokwoo-chang.jpg',
    email: 'wkdtjrdn1223@gmail.com',
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2023.03 – 2025.02',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2023' },
    ],
    researchInterests: ['Transformer AI Accelerator'],
    accent: ALUMNI_ACCENT,
  },
  {
    id: 'myeong-geon-yu',
    name: 'Myeong Geon Yu',
    grade: 'M.S.',
    graduation: '2025.08',
    company: 'Synopsys Korea',
    photo: '/members/myeong-geon-yu.jpg',
    email: 'famousgun99@naver.com',
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2023.09 – 2025.08',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2023' },
    ],
    researchInterests: ['Ultrasonic Signal Processing Accelerator'],
    accent: ALUMNI_ACCENT,
  },
  {
    id: 'jae-lim-lee',
    name: 'Jae Lim Lee',
    grade: 'M.S.',
    graduation: '2025.08',
    company: 'Openedge Technology',
    photo: '/members/jae-lim-lee.jpg',
    email: 'yy78462@naver.com',
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2023.09 – 2025.08',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2023' },
    ],
    researchInterests: ['Automotive Sensor Calibration'],
    accent: ALUMNI_ACCENT,
  },
  {
    id: 'jong-hwan-jean',
    name: 'Jong Hwan Jean',
    grade: 'M.S.',
    graduation: '2026.02',
    company: 'Telechips',
    photo: '/members/jong-hwan-jean.jpg',
    email: 'kingdori1@naver.com',
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2024.03 – 2026.02',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2024' },
    ],
    researchInterests: ['NPU Virtualization'],
    accent: ALUMNI_ACCENT,
  },
  {
    id: 'sung-hyun-cha',
    name: 'Sung Hyun Cha',
    grade: 'M.S.',
    graduation: '2026.02',
    company: 'Telechips',
    photo: '/members/sung-hyun-cha.jpg',
    email: 'chadoli5@naver.com',
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2024.03 – 2026.02',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2024' },
    ],
    researchInterests: ['Neuromorphic Ai Accelerator'],
    accent: ALUMNI_ACCENT,
  },
  {
    id: 'seung-chan-kim',
    name: 'Seung Chan Kim',
    grade: 'M.S.',
    graduation: '2026.02',
    company: 'Wipro(formerly HARMAN)',
    photo: '/members/seung-chan-kim.jpg',
    email: 'glennkim98@gmail.com',
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2024.03 – 2026.02',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2024' },
    ],
    researchInterests: ['Homomorphic Encryption Accelerator', 'Post-Quantum Cryptography Accelerator'],
    accent: ALUMNI_ACCENT,
  },
  {
    id: 'jun-min-lee',
    name: 'Jun Min Lee',
    grade: 'M.S.',
    graduation: '2026.02',
    company: 'SNchips',
    photo: '/members/jun-min-lee.jpg',
    email: 'junminy_lee@naver.com',
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2024.03 – 2026.02',
      },
      { degree: 'B.S.', org: 'Induk University', period: '2024' },
    ],
    researchInterests: ['Sensor Digital Design'],
    accent: ALUMNI_ACCENT,
  },
  {
    id: 'su-hwan-na',
    name: 'Su Hwan Na',
    grade: 'M.S.',
    graduation: '2026.08',
    company: 'TBD',
    photo: '/members/su-hwan-na.jpg',
    email: 'ghks5246@naver.com',
    education: [
      {
        degree: 'M.S.',
        org: 'Sejong University',
        field: 'Semiconductor Systems Engineering',
        period: '2024.03 – 2026.08',
      },
      { degree: 'B.S.', org: 'Sejong University', period: '2024' },
    ],
    researchInterests: ['Neuromorphic AI processor Architecture'],
    accent: ALUMNI_ACCENT,
  },
];

function ChapterHeader({
  title,
  accent = '#DC2626',
}: {
  title: string;
  accent?: string;
}) {
  return (
    <div
      className="mb-6 pb-3"
      style={{ borderBottom: `1px solid ${accent}55` }}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-white">{title}</h3>
    </div>
  );
}

function AlumniDetailModal({
  alumni,
  onClose,
}: {
  alumni: Alumni;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: 'rgba(2, 6, 14, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-xl overflow-hidden border border-white/10"
        style={{
          background:
            'linear-gradient(135deg, rgba(20,20,30,0.96) 0%, rgba(10,12,20,0.96) 50%, rgba(30,20,15,0.96) 100%)',
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${alumni.accent}30`,
          animation: 'scaleIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div className="grid md:grid-cols-[280px_1fr] gap-0">
          {/* Left: photo + email */}
          <div className="p-6 md:p-8 flex flex-col items-center md:items-start">
            {alumni.photo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={asset(alumni.photo)}
                alt={alumni.name}
                className="w-full max-w-[220px] h-auto rounded-xl border border-white/10 mb-4 block"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              />
            ) : (
              <div
                className="w-full max-w-[220px] aspect-square rounded-xl border border-white/10 mb-4 flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,149,0,0.15), rgba(20,20,30,0.6))',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                <span
                  className="text-5xl font-mono font-bold"
                  style={{ color: `${alumni.accent}88` }}
                >
                  {alumni.name
                    .split(' ')
                    .map((s) => s[0])
                    .join('')}
                </span>
              </div>
            )}
            {alumni.email && (
              <div className="w-full max-w-[220px]">
                <p className="text-[11px] font-bold text-white mb-1">Email</p>
                <a
                  href={`mailto:${alumni.email}`}
                  className="text-[12px] text-gray-400 hover:text-white transition font-mono break-all"
                >
                  {alumni.email}
                </a>
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="p-6 md:p-8 md:pl-2 md:pr-12">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight"
              style={{ color: alumni.accent }}
            >
              {alumni.name}
            </h2>

            <div className="space-y-4">
              {alumni.education ? (
                alumni.education.map((e, i) => (
                  <div key={i}>
                    <p className="text-sm leading-relaxed">
                      <span className="font-bold text-white">{e.degree}</span>
                      <span className="text-gray-300">
                        {e.field ? `, ${e.field}, ${e.org}` : `, ${e.org}`}
                      </span>
                      {e.period && (
                        <span className="text-gray-300">. ({e.period})</span>
                      )}
                    </p>
                  </div>
                ))
              ) : (
                 <p className="text-sm leading-relaxed">
                  <span className="font-bold text-white">{alumni.grade}</span>
                  <span className="text-gray-300">
                    , Sejong University.
                    {alumni.graduation && ` (Graduated ${alumni.graduation})`}
                  </span>
                </p>
              )}

              {alumni.researchInterests && (
                <div>
                  <p className="text-sm font-bold text-white mb-1">Research Interests</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {alumni.researchInterests.join(', ')}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-bold text-white mb-1">Affiliation</p>
                <p className="text-sm text-gray-300 leading-relaxed">{alumni.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}


function ResearcherDetailModal({
  researcher,
  onClose,
}: {
  researcher: any;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: 'rgba(2, 6, 14, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-xl overflow-hidden border border-white/10"
        style={{
          background:
            'linear-gradient(135deg, rgba(20,20,30,0.96) 0%, rgba(10,12,20,0.96) 50%, rgba(30,20,15,0.96) 100%)',
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${researcher.accent}30`,
          animation: 'scaleIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div className="grid md:grid-cols-[280px_1fr] gap-0">
          <div className="p-6 md:p-8 flex flex-col items-center md:items-start">
            {researcher.photo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={asset(researcher.photo)}
                alt={researcher.name}
                className="w-full h-auto rounded-xl border border-white/10 mb-4 block"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              />
            ) : (
              <div
                className="w-full aspect-square rounded-xl border border-white/10 mb-4 flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(20,20,30,0.6))',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                <span
                  className="text-5xl font-mono font-bold"
                  style={{ color: `${researcher.accent}88` }}
                >
                  {researcher.name
                    .split(' ')
                    .map((s: string) => s[0])
                    .join('')}
                </span>
              </div>
            )}
            {researcher.email && (
              <div className="w-full">
                <p className="text-[11px] font-bold text-white mb-1">Email</p>
                <a
                  href={`mailto:${researcher.email}`}
                  className="text-[12px] text-gray-400 hover:text-white transition font-mono break-all"
                >
                  {researcher.email}
                </a>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 md:pl-2 md:pr-12">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight"
              style={{ color: researcher.accent }}
            >
              {researcher.name}
            </h2>

            <div className="space-y-4">
              {researcher.education && researcher.education.length > 0 ? (
                researcher.education.map((e: any, i: number) => (
                  <div key={i}>
                    <p className="text-sm leading-relaxed">
                      <span className="font-bold text-white">{e.degree}</span>
                      <span className="text-gray-300">
                        {e.field ? `, ${e.field}, ${e.org}` : `, ${e.org}`}
                      </span>
                      {e.period && (
                        <span className="text-gray-300">. ({e.period})</span>
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-relaxed">
                  <span className="font-bold text-white">{researcher.grade}</span>
                  <span className="text-gray-300">, Sejong University.</span>
                </p>
              )}

              {researcher.researchInterests && researcher.researchInterests.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-white mb-1">Research Interests</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {researcher.researchInterests.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}


export default function MembersSection() {
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [selectedResearcher, setSelectedResearcher] = useState<any>(null);

  return (
    <SectionShell id="members" eyebrow="Members">
      <div className="space-y-20">
        {/* ============ 01 PROFESSOR ============ */}
        <div>
          <ChapterHeader title="Professor" />

          {/* PI Card */}
          <Card
            accent="rgba(220,38,38,0.4)"
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset('/members/dongsun.jpg')}
              alt="Prof. Dong Sun Kim"
              className="w-32 h-32 rounded-md shrink-0 object-cover border border-white/10"
              style={{ boxShadow: '0 4px 24px rgba(220,38,38,0.18)' }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-white mb-1">
                김동순 · Dong Sun Kim
              </h3>
              <p className="text-sm text-red-400 font-mono mb-3">
                Professor · 세종대학교 반도체시스템공학과 · 온디바이스 AI 반도체 연구센터(ITRC) 센터장
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Research Interests: VLSI · 28nm 뉴로모픽 칩 · 엣지 AI SoC ·
                SoC 센서 신호처리 · NPU 가상화 · AI 반도체 설계 · ITRC 온디바이스 AI ·
                스파이킹 신경망 저전력 · 뉴로모픽 프로세서 설계 · Transformer 가속기.
              </p>
              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-400">
                  <span>
                    <span className="text-gray-500 mr-1.5">Office</span>충무관 919호
                  </span>
                  <a
                    href="tel:+82234083699"
                    className="hover:text-white transition"
                  >
                    <span className="text-gray-500 mr-1.5">Tel</span>02-3408-3699
                  </a>
                </div>
                <a
                  href="mailto:dongsun.kim07@sejong.ac.kr"
                  className="block text-red-400 hover:text-red-300 transition"
                >
                  dongsun.kim07@sejong.ac.kr
                </a>
              </div>
            </div>
          </Card>

          {/* Career */}
          <div className="mt-4">
            <Card>
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-red-500 mb-3">
                Career
              </p>
              <ul className="space-y-4">
                {CAREER.map((c) => (
                  <li
                    key={`${c.period}-${c.org}`}
                    className="flex flex-col md:flex-row md:gap-4"
                  >
                    <span className="text-[11px] font-mono text-gray-500 md:w-44 shrink-0 pt-0.5">
                      {c.period}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white leading-snug">
                        <span className="font-bold">{c.role}</span>{' '}
                        <span className="text-gray-400">· {c.org}</span>
                      </p>
                      {c.note && (
                        <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
                          {c.note}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Education + Teaching + Honors + Service */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card>
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-red-500 mb-3">
                Education
              </p>
              <ul className="space-y-2.5">
                {EDUCATION.map((e) => (
                  <li key={e.degree} className="flex gap-4">
                    <span className="text-[11px] font-mono text-gray-500 w-16 shrink-0 pt-0.5">
                      {e.period}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        <span className="font-bold">{e.degree}</span>{' '}
                        <span className="text-gray-400">· {e.org}</span>
                      </p>
                      <p className="text-[12px] text-gray-500">{e.field}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-red-500 mb-3">
                Teaching
              </p>
              <div className="mb-3">
                <p className="text-[11px] font-mono text-gray-500 mb-1.5">
                  학부 (Undergraduate)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TEACHING.undergraduate.map((c) => (
                    <span
                      key={c}
                      className="text-[11px] px-2 py-0.5 rounded font-mono text-gray-200 border border-white/10 bg-white/[0.03]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-mono text-gray-500 mb-1.5">
                  대학원 (Graduate)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TEACHING.graduate.map((c) => (
                    <span
                      key={c}
                      className="text-[11px] px-2 py-0.5 rounded font-mono text-gray-200 border border-white/10 bg-white/[0.03]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            <Card accent="rgba(251,191,36,0.30)">
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] mb-3" style={{ color: '#FBBF24' }}>
                Honors &amp; Awards
              </p>
              <ul className="space-y-3">
                {HONORS.map((h) => (
                  <li key={h.title} className="flex gap-3">
                    <span
                      className="text-[11px] font-mono w-10 shrink-0 pt-0.5"
                      style={{ color: '#FBBF24' }}
                    >
                      {h.year}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white leading-snug">{h.title}</p>
                      {h.detail && (
                        <p className="text-[12px] text-gray-500 mt-0.5">{h.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-red-500 mb-3">
                Service &amp; Affiliations
              </p>
              <ul className="space-y-2">
                {SERVICE.map((s) => (
                  <li
                    key={s}
                    className="text-sm text-gray-300 flex items-start gap-2 leading-snug"
                  >
                    <span className="text-red-500 mt-1">▸</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
     {/* ============ 02 RESEARCHERS ============ */} 
      <div>
        <ChapterHeader title="Researchers" accent="#00D4FF" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {RESEARCHERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedResearcher(p)}
              className="text-center group"
            >
              <Card
                accent={`${p.accent}30`}
                className="hover:border-white/30 transition cursor-pointer h-full text-center"
              >
                <div
                  className="w-full aspect-[4/5] rounded-md mb-3 overflow-hidden border border-white/5 flex items-center justify-center"
                  style={{
                    boxShadow: `0 4px 18px ${p.accent}25`,
                    background: p.photo
                      ? '#0a0a12'
                      : `linear-gradient(135deg, rgba(0,122,255,0.18), rgba(20,20,30,0.6))`,
                  }}
                >
                  {p.photo ? (
                    <img
                      src={asset(p.photo)}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span
                      className="text-3xl font-mono font-bold"
                      style={{ color: `${p.accent}88` }}
                    >
                      {p.name
                        .split(' ')
                        .map((s) => s[0])
                        .join('')}
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition leading-tight">
                  {p.name}
                </h4>
                <p className="text-[11px] font-mono mt-1" style={{ color: p.accent }}>
                  {p.grade}
                </p>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {/* ============ 03 ALUMNI ============ */}
      <div>
        <ChapterHeader title="Alumni" accent="#FF9500" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALUMNI.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedAlumni(a)}
              className="text-center group"
            >
              <Card
                accent={`${a.accent}30`}
                className="hover:border-white/30 transition cursor-pointer h-full text-center"
              >
                <div
                  className="w-full aspect-[4/5] rounded-md mb-3 overflow-hidden border border-white/5 flex items-center justify-center"
                  style={{
                    boxShadow: `0 4px 18px ${a.accent}25`,
                    background: a.photo
                      ? '#0a0a12'
                      : 'linear-gradient(135deg, rgba(255,149,0,0.18), rgba(20,20,30,0.6))',
                  }}
                >
                  {a.photo ? (
                    <img
                      src={asset(a.photo)}
                      alt={a.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span
                      className="text-3xl font-mono font-bold"
                      style={{ color: `${a.accent}88` }}
                    >
                      {a.name
                        .split(' ')
                        .map((s) => s[0])
                        .join('')}
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-orange-300 transition leading-tight">
                  {a.name}
                </h4>
                <p className="text-[11px] font-mono mt-1" style={{ color: a.accent }}>
                  {a.grade} · Grad {a.graduation}
                </p>
                <p className="text-[11px] font-mono text-gray-400 mt-0.5">
                  {a.company}
                </p>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </div>

{selectedAlumni && (
      <AlumniDetailModal
        alumni={selectedAlumni}
        onClose={() => setSelectedAlumni(null)}
      />
    )}

{selectedResearcher && (
      <ResearcherDetailModal
        researcher={selectedResearcher}
        onClose={() => setSelectedResearcher(null)}
      />
    )}
  </SectionShell>
  );
}
