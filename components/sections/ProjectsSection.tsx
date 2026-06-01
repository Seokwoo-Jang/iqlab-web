"use client";

import { useState, useEffect } from 'react';
import { SectionShell, Card } from './SectionShell';
import { asset } from '../../lib/asset';

type Project = {
  no: string;
  title: string;
  period: string;
  agency: string;
  program: string;
  description?: string;
  image?: string;
};

type Chip = {
  no: string;
  ordinal: string;
  code: string;
  process: string;
  title: string;
  photo?: string;
  status?: string;
};

const RND_ACCENT = '#DC2626';
const CHIP_ACCENT = '#00D4FF';

const PROJECTS: Project[] = [
  {
    no: '01',
    title: '초연결 센서 융합 온디바이스 AI반도체 원천기술개발',
    period: '2024.07 – 2031.12',
    agency: 'IITP',
    program: '정보통신방송혁신인재양성사업',
    description : `자동차, 스마트기기, 휴머노이드 등 독립된 환경 또는 네트워크로 연결된 센서 융합 스마트디바이스의 인공지능 추론과 부분 학습이 가능한 온디바이스 AI 반도체 핵심 설계 기술 및 플랫폼 개발
• 온디바이스 센싱/연결/추론/학습 (SCIL:Sensing/Connecting/Inferencing/Learning) 통합 인공지능 반도체 설계 및 플랫폼 원천기술 개발
• (1세부) 온디바이스 AI 반도체용 핵심 IP 및 온디바이스 AI 융합 센서 기술
• (2세부) 초연결 센서 융합 온디바이스 인공지능 반도체 첨단 패키지 기술
• (3세부) 초연결 네트워크 및 정보통신 융합 AI 컴퓨팅 및 센싱 플랫폼
• (4세부) 모빌리티 및 의료용 온디바이스 AI 반도체 적용 기술`,
  image: '/projects/project01.png'
  },
  {
    no: '02',
    title: '첨단 모빌리티용 AP 검증 및 상용화를 위한 통합 제어기 플랫폼 기술 개발',
    period: '2024.07 – 2028.12',
    agency: 'KETI',
    program: '소재부품기술개발사업',
    description : `■ 무선 업데이트 대응 첨단 모빌리티용A 플랫폼 기술개발
 • 첨단 모빌리티용 AP 통합 제어기 플랫폼 개발을 위한 요구사항 분석
 • 첨단 모빌리티용 AP 통합 제어기 플랫폼 개발을 위한 기능설계 및 구현
 • 첨단 모빌리티용 AP 통합 제어기 플랫폼 개발을 위한 기능개선 개발
 • 첨단 모빌리티용 AP 통합 제어기 플랫폼 검증을 위한 시제품 개발 및 통합 시스템 개발, 검증
 • 첨단 모빌리티용 AP 통합 제어기 플랫폼 검증을 위한 시제품 최적화 및 신뢰성 확보`,
  },
   {
    no: '03',
    title: '제동 시스템과 신재생 전력 시스템용 센서를 위한 전용 SoC 개발 및 성능평가를 위한 통합기술 개발',
    period: '2023.07 – 2027.12',
    agency: 'KEIT',
    program: '소재부품기술개발사업',
    description : `■ 힘, 압력 센서용 SoC 개발과 수소 감지용 알고리즘 및 SoC 개발 
 • 오동작 방지를 위한 알고리즘 및 캘리브레이션 알고리즘 개발
 • 자가 보정 및 자가 진단 기능 지원 신호처리 회로 기술 개발
 • 온도/힘(압력)/수소 센서 감지 구현 및 진단 모드 출력 SoC 개발
 • 개발 SoC 적용을 통한 센서 모듈 개발
 • 모듈 단계에서 디지털 SENT 출력 규격에 대한 적합성 여부를 수요기업 평가
 • 센서 출력이 센서 단품 신뢰성 시험 이후에도 정상 작동 여부 수요기업 평가`,
  },
  {
    no: '04',
    title: '상용 엣지 AI SoC 반도체 SW 개발 플랫폼 기술개발',
    period: '2023.04 – 2027.12',
    agency: 'IITP',
    program: '인공지능반도체SW통합플랫폼기술개발사업',
    description : `■ 국산 상용 엣지 AI SoC반도체에 특화된 AI 모델 및 서비스를 손쉽게 개발 및 검증하고 반도체별 객관적 성능 비교가 가능한 환경을 포함하는 상용 엣지 AI SoC 반도체 SW 개발 플랫폼 개발 및 실증
 - 상용 엣지 AI SoC 반도체용 SW 개발에 최적화된 플랫폼 
    • 사용자 모델을 추가, 분류, 관리할 수 있는 운용 시스템
    • 엣지 AI SoC 서비스 통합 개발 환경 (IDE) 지원 
    • 3종 이상 다양한 포맷의 AI 알고리즘 구동 (공통모델 활용) 
    • 동작 중 수집한 데이터를 토대로 재학습이 가능한 환경 구축 
    • 엣지 디바이스간 AI 연산 분할 연동과 응용 SW 갱신·배포
    • 엣지 AI 반도체 특화 가상화 (다중 OS) 지원 
    • 2개사 4개 이상 상용 엣지 AI SoC 반도체를 통한 실증 
 - 엣지용 NPU에 맞춤형 SW 통합 개발 환경
    • 각사 NPU용 SDK의 상위 수준 통합 및 공통 인터페이스 제공
    • 각사는 자사 NPU용 컴파일러 및 런타임 지원 
    • NPU 구동 검증을 위한 디버깅 기능 지원 
    • 동작 결과 및 성능 분석을 위한 프로파일러 지원
    • CPU와 NPU 연동을 효율적으로 통합 관리하는 런타임을 포함하는 System SW `,
  },
  {
    no: '05',
    title: '다중 코어 기능 안전과 AI 가속기가 적용된 자율주행차용 Tiny MCU 개발',
    period: '2023.04 – 2027.12',
    agency: 'COSAR, KETI',
    program: '민관공동투자반도체고급인력양성사업',
    description : `■ Lock-Step, Triple Modular Redundancy 등의 다중 코어 기능 안전을 지원하며 경량 AI 가속기를 내장한 자율주행차용 Tiny MCU의 설계, 구현 및 검증
 • 차량 인터페이스를 갖춘 Tiny MCU의 아키텍쳐 개발
 • 자가 진단 기능 안전을 갖춘 Tiny MCU의 개발
 • 듀얼 코어 기능 안전을 갖춘 Tiny MCU의 개발
 • AI 가속기를 갖춘 Tiny MCU의 개발
 • 트리플 코어 기능 안전을 갖춘 Tiny MCU의 개발`,
  },
  {
    no: '06',
    title: '인공지능반도체 융합인력양성(세종대)',
    period: '2024.05 – 2025.02',
    agency: 'IITP',
    program: '대학혁신지원사업',
    description : `■ 다양한 산업에 필요한 인공지능 융합 반도체 기술(온디바이스AI)과 창의성과 실무능력을 갖춘 First형 인재 양성
• First(Frontier-Spiritual Improved Responsible Smart Technical) 인재상을 통한 글로벌 경쟁력 갖는 인재 양성
• 창의적인 사고를 통해 인공지능반도체 분야 난제에 맞설 수 있는 인재 양성
• 급변하는 산업현장의 요구에 부응할 수 있도록 항상 학습하고 발전하는 인재 양성
• 융합적 협업 능력과 의사소통 능력을 겸비한 글로벌 인재 양성
• AI반도체 미래기술에 대응하고 선도할 수 있는 안목을 가진 미래형 인재 양성`
,
  },
];

const CHIPS: Chip[] = [
  {
    no: '01',
    ordinal: '1st chip',
    code: 'SF028-2301',
    process: 'Samsung 28nm FD-SOI',
    title: 'Fully Integrated Edge Sensor SoC with Moving Object Detection for a Vehicle Mounted Camera',
    photo: '/chips/sf028-2301-vehicle-camera.jpg',
  },
  {
    no: '02',
    ordinal: '2nd chip',
    code: 'SF028-2401',
    process: 'Samsung 28nm FD-SOI',
    title: 'Fully Digital Neuromorphic Processor for Intelligent Sensor',
    photo: '/chips/sf028-2401-neuromorphic.jpg',
  },
  {
    no: '03',
    ordinal: '3rd chip',
    code: 'SF028-2402',
    process: 'Samsung 28nm FD-SOI',
    title: 'Smart Meter SoC with Adaptive Calibration for Smart Cities',
    photo: '/chips/sf028-2402-smart-meter.jpg',
  },
  {
    no: '04',
    ordinal: '4th chip',
    code: 'SF028-2502',
    process: 'Samsung 28nm FD-SOI',
    title: 'A Trainable NPU Architecture for Deep Spiking Neural Networks Using Backpropagation Through Time',
    status: 'In Fabrication',
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

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
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
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl border border-white/10 p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(25,15,15,0.96) 0%, rgba(10,10,15,0.96) 50%, rgba(20,20,30,0.96) 100%)',
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${RND_ACCENT}20`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
        <div className="text-sm space-y-4">
          <span style={{ color: RND_ACCENT }} className="font-bold font-mono">Project {project.no}</span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">{project.title}</h2>
          
          <div className="border-t border-white/5 pt-4 space-y-3">
            <div>
              <p className="text-xs text-gray-400">Funding Agency</p>
              <p className="text-white font-medium">{project.agency}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Program Name</p>
              <p className="text-gray-200">{project.program}</p>
            </div>
            {project.image && (
  <div>
    <p className="text-xs text-gray-400 mb-1.5">Project Image</p>
    <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-[#0a0a12]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(project.image)}
        alt={`${project.title} image`}
        className="w-full h-auto object-contain max-h-[600px] mx-auto"
      />
    </div>
  </div>
)}
            {project.description && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Research Overview</p>
                <p className="text-gray-300 bg-white/5 p-3 rounded-lg leading-relaxed whitespace-pre-wrap">
                     {project.description}
               </p>              
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  return (
    <SectionShell id="projects" eyebrow="Projects">
      <div className="space-y-20">
        {/* ============ R&D ============ */}
        <div>
          <ChapterHeader title="R&D" accent={RND_ACCENT} />
          <div className="space-y-3">
            {PROJECTS.map((p) => (
              <div
                key={p.no}
                className="cursor-pointer transition transform hover:-translate-y-0.5"
                onClick={() => setSelectedProject(p)}
              >
                <Card
                  accent={`${RND_ACCENT}30`}
                  className="hover:border-white/25"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
                    <span
                      className="text-2xl font-bold font-mono shrink-0"
                      style={{
                        color: RND_ACCENT,
                        textShadow: `0 0 14px ${RND_ACCENT}55`,
                      }}
                    >
                      {p.no}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base md:text-lg font-bold text-white leading-snug mb-1.5">
                        {p.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-gray-400">
                        <span>{p.period}</span>
                        <span className="text-gray-600">·</span>
                        <span style={{ color: RND_ACCENT }}>{p.agency}</span>
                        <span className="text-gray-600">·</span>
                        <span>{p.program}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* ============ CHIPS ============ */}
        <div> {/* 💡 누락되었던 오픈 태그 교정 완료 */}
          <ChapterHeader title="Chips" accent={CHIP_ACCENT} />
          <div className="grid md:grid-cols-2 gap-5">
            {CHIPS.map((c) => (
              <Card
                key={c.no}
                accent={`${CHIP_ACCENT}30`}
                className="hover:border-white/25 flex flex-col"
              >
                {/* Die photo */}
                <div
                  className="w-full aspect-square rounded-md mb-4 overflow-hidden border border-white/5 flex items-center justify-center"
                  style={{
                    background: '#0a0a12',
                    boxShadow: `0 4px 18px ${CHIP_ACCENT}20`,
                  }}
                >
                  {c.photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={asset(c.photo)}
                      alt={`${c.ordinal} ${c.code} die photo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center px-4">
                      <p
                        className="text-[11px] font-mono uppercase tracking-[0.3em] mb-2"
                        style={{ color: CHIP_ACCENT }}
                      >
                        {c.status ?? 'Coming Soon'}
                      </p>
                      <p className="text-xs text-gray-500 font-mono">
                        Die photo will be available after tape-out.
                      </p>
                    </div>
                  )}
                </div>

                {/* Type & Code */}
                <div className="flex items-baseline gap-2.5 mb-2">
                  <span
                    className="text-[11px] font-mono uppercase tracking-[0.25em] shrink-0"
                    style={{ color: CHIP_ACCENT }}
                  >
                    {c.ordinal}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400 break-all">
                    {c.code}
                  </span>
                  <span className="text-[10px] font-mono text-gray-600 ml-auto">
                    {c.process}
                  </span>
                </div>
                <h4 className="text-sm md:text-base font-bold text-white leading-snug">
                  {c.title}
                </h4>
                {c.status && (
                  <p
                    className="text-[11px] font-mono mt-2 inline-block self-start px-2 py-0.5 rounded border"
                    style={{
                      color: CHIP_ACCENT,
                      borderColor: `${CHIP_ACCENT}55`,
                      background: `${CHIP_ACCENT}10`,
                    }}
                  >
                    {c.status}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </SectionShell>
  );
}
