import { SectionShell, Card, Tag } from './SectionShell';
import { asset } from '../../lib/asset';

type Photo = {
  label: string;
  date?: string;
  src?: string;
  caption?: string;
  tone?: string;
  /** 강조 카드 (그리드 2칸 차지) */
  feature?: boolean;
};

const GALLERY: Photo[] = [
  {
    label: "제26회 '대한민국 반도체 설계대전' 기업특별상 수상",
    date: '2025.10.23',
    src: '/award-2025-semiconductor-design.png',
    caption:
      "서울 코엑스에서 열린 제26회 '대한민국 반도체 설계대전' 시상식에서 IQLAB이 엣지 AI용 뉴로모픽 프로세서로 기업특별상을 수상했습니다.",
    feature: true,
  },
  { label: 'ISSCC 2024 발표', tone: 'from-cyan-900/40' },
  { label: 'MPW 칩 도착', tone: 'from-red-900/40' },
  { label: '여름 워크샵', tone: 'from-emerald-900/40' },
  { label: '졸업식', tone: 'from-purple-900/40' },
  { label: 'Lab 회식', tone: 'from-amber-900/40' },
  { label: '실험실 일상', tone: 'from-fuchsia-900/40' },
];

const HIRING_AREAS = [
  'Edge AI NPU Virtualization & AI Semiconductor',
  'SoC-based Sensor Signal Processing & Heterogeneous System',
  'Neuromorphic Computing & SNN-based Low-Power AI',
];

const REQUIREMENTS = [
  '디지털/아날로그 회로 설계 기초 지식',
  'Verilog / SystemVerilog 경험 우대',
  'C/C++/Python 프로그래밍 가능자',
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

function ContactRow({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[160px_1fr] gap-2 md:gap-6 py-4 border-b border-white/5 last:border-b-0">
      <p
        className="text-[11px] font-mono uppercase tracking-[0.3em]"
        style={{ color: accent }}
      >
        {label}
      </p>
      <div className="text-sm text-gray-300 leading-relaxed space-y-1">
        {children}
      </div>
    </div>
  );
}

export default function CommunitySection() {
  const contactAccent = '#00D4FF';

  return (
    <SectionShell id="community" eyebrow="Community">
      <div className="space-y-20">
        {/* ============ PHOTOS ============ */}
        <div>
          <ChapterHeader title="Photos" accent="#FBBF24" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((g) => (
              <figure
                key={g.label}
                className={`relative rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition group ${
                  g.feature
                    ? 'col-span-2 md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto'
                    : 'aspect-[4/3]'
                }`}
              >
                {g.src ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(g.src)}
                      alt={g.label}
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
                        {g.feature && (
                          <span
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                            style={{
                              color: '#FBBF24',
                              borderColor: '#FBBF2455',
                              background: '#FBBF2410',
                            }}
                          >
                            ★ Award
                          </span>
                        )}
                        {g.date && (
                          <span className="text-[10px] font-mono text-gray-300">
                            {g.date}
                          </span>
                        )}
                      </div>
                      <p className="text-sm md:text-base font-bold text-white leading-snug">
                        {g.label}
                      </p>
                      {g.caption && (
                        <p className="text-[12px] text-gray-300 leading-snug mt-1 hidden md:block">
                          {g.caption}
                        </p>
                      )}
                    </figcaption>
                  </>
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${g.tone ?? 'from-gray-900/40'} to-black flex items-end p-4`}
                  >
                    <span className="text-xs font-mono text-white/70">{g.label}</span>
                  </div>
                )}
              </figure>
            ))}
          </div>
        </div>

        {/* ============ CONTACT ============ */}
        <div>
          <ChapterHeader title="Contact" accent={contactAccent} />

          {/* Campus photo + Google Map */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div
              className="relative rounded-lg overflow-hidden border border-white/10 aspect-[4/3]"
              style={{ boxShadow: `0 4px 24px ${contactAccent}15` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset('/sejong-clocktower.png')}
                alt="세종대학교 시계탑 (Sejong University)"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-4 z-10"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.0) 100%)',
                }}
              >
                <p className="text-sm md:text-base font-bold text-white leading-snug">
                  Sejong University
                </p>
                <p className="text-[11px] font-mono text-gray-300 mt-0.5">
                  세종대학교 · 충무관 501A호
                </p>
              </div>
            </div>

            <div
              className="relative rounded-lg overflow-hidden border border-white/10 aspect-[4/3]"
              style={{ boxShadow: `0 4px 24px ${contactAccent}15` }}
            >
              <iframe
                title="세종대학교 위치 지도"
                src="https://www.google.com/maps?cid=1908076492013036779&hl=ko&gl=KR&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, filter: 'grayscale(0.15) contrast(1.05)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <Card accent={`${contactAccent}30`}>
            <ContactRow label="Address" accent={contactAccent}>
              <p className="text-white">
                서울특별시 광진구 능동로 209 세종대학교 (충무관 501A호)
              </p>
              <p className="text-gray-500 text-[12px]">
                209 Neungdong-ro, Gwangjin-gu, Seoul 05006, Republic of Korea
                (Chungmu Hall, Room 501A)
              </p>
            </ContactRow>

            <ContactRow label="Contact" accent={contactAccent}>
              <a
                href="tel:+82234083699"
                className="font-mono text-white hover:text-cyan-300 transition"
              >
                +82-2-3408-3699
              </a>
            </ContactRow>

            <ContactRow label="Email" accent={contactAccent}>
              <a
                href="mailto:dongsun.kim07@sejong.ac.kr"
                className="font-mono text-white hover:text-cyan-300 transition break-all"
              >
                dongsun.kim07@sejong.ac.kr
              </a>
            </ContactRow>

            <ContactRow label="Subway" accent={contactAccent}>
              <p className="text-white">서울 7호선 어린이대공원역 6번출구</p>
              <p className="text-gray-500 text-[12px]">
                Seoul Metro Line #7 Children&apos;s Grand Park Station, Exit 6
              </p>
            </ContactRow>

            <ContactRow label="Car" accent={contactAccent}>
              <p className="text-white">세종대학교 충무관 인근 주차장 이용</p>
              <p className="text-gray-500 text-[12px]">
                Parking available near Chungmu Hall, Sejong University
              </p>
            </ContactRow>
          </Card>
        </div>
      </div>

      {/* Hiring */}
      <Card accent="rgba(220,38,38,0.35)" className="mb-5 mt-20">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-red-500">
            We&apos;re Hiring
          </span>
          <h3 className="text-2xl font-bold text-white">석·박사 과정 모집</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6 mt-2">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2">
              모집 분야
            </p>
            <ul className="space-y-1.5">
              {HIRING_AREAS.map((a) => (
                <li key={a} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-red-500 mt-1">▸</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2">
              지원 자격
            </p>
            <ul className="space-y-1.5">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-red-500 mt-1">▸</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2">
            지원 방법
          </p>
          <a
            href="mailto:dongsun.kim07@sejong.ac.kr"
            className="text-base text-red-400 hover:text-red-300 transition font-mono"
          >
            dongsun.kim07@sejong.ac.kr
          </a>
          <p className="text-xs text-gray-500 mt-3 italic">
            언제든 환영합니다. 커피 한 잔 하면서 이야기 나눠요.
          </p>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-5">
        <Card>
          <div className="flex items-baseline gap-2 mb-2">
            <Tag color="#00D4FF">학부 연구생</Tag>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            반도체가 궁금한 학부생이라면 누구나. 한 학기 동안 실제 연구실 프로젝트에 참여하며 칩 설계를 경험할 수 있습니다.
          </p>
        </Card>
        <Card>
          <div className="flex items-baseline gap-2 mb-2">
            <Tag color="#FF6B35">Industry Collaboration</Tag>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            산업계와의 공동 연구 / 기술 자문 / MPW 협력에 열려 있습니다. 협력 문의는 PI 이메일로 직접 연락 부탁드립니다.
          </p>
        </Card>
      </div>

      <p className="text-center text-[11px] font-mono text-gray-600 mt-16 pt-8 border-t border-white/5">
        © IQLAB · Prof. Dong Sun Kim · Sejong University · Department of Semiconductor Systems Engineering
      </p>
    </SectionShell>
  );
}
