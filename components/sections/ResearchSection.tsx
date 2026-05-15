import { SectionShell, Card } from './SectionShell';
// FIGURE_BY_NO (캡션·출처 메타) 는 ResearchArt.tsx 에 보존되어 있습니다.
// 화면 표시가 다시 필요해지면 여기서 함께 import 하세요.
import { ART_BY_NO } from './ResearchArt';
import ResearchFigureStrip, { type ResearchPhoto } from './ResearchFigureStrip';

type Sub = { title: string; body: string };
type Area = {
  no: string;
  title: string;
  titleEn: string;
  accent: string;
  summary: string;
  subs: Sub[];
  flow: string;
};

const SECTIONS: Area[] = [
  {
    no: '01',
    title: 'Edge AI NPU Virtualization & AI Semiconductor Design',
    titleEn: 'On-Device AI Acceleration with Hardware-Assisted NPU Virtualization',
    accent: '#00D4FF',
    summary:
      '클라우드 의존 없이 단말 기기에서 실시간 AI 추론을 수행하는 온디바이스 AI 수요가 급증하면서, 기존 단일 모델 처리 구조의 NPU로는 다중 센서·다중 모델을 동시에 처리하는 데 한계가 있습니다. 하드웨어 지원 NPU 가상화 스케줄링과 가변 시스톨릭 어레이 기반 Transformer 가속기, In-Memory Computing 행렬 연산 최적화로 메모리 대역폭 병목을 완화합니다.',
    flow:
      '먼저 음성 비서 응용에 맞춘 가변 크기 Transformer 가속기 구조를 제안했고, 이후 다중 센서 AI의 빈번한 컨텍스트 전환을 흡수하기 위한 하드웨어 지원 NPU 가상화 스케줄링으로 확장했습니다. 최근에는 In-Memory Computing 기반 상태형 행렬 곱과 동형암호 하드웨어까지 포함해, 추론과 보안 연산을 엣지 플랫폼에서 통합 처리하는 방향으로 발전하고 있습니다.',
    subs: [
      {
        title: 'Hardware-Assisted NPU Virtualization',
        body:
          '하나의 NPU 위에서 여러 모델·테넌트를 격리·스케줄링하는 하드웨어 지원 가상화. 컨텍스트 스위칭과 데이터 프리패칭으로 다중 딥러닝 애플리케이션의 동시 가속을 실현합니다.',
      },
      {
        title: 'Variable Systolic Array Transformer Accelerator',
        body:
          '음성 인식 어시스턴트 등 다양한 모델 크기에 대응하는 확장 가능한 가속기. 가변 시스톨릭 어레이와 행 단위 입력 구성으로 가변 크기 행렬 연산을 효율적으로 수행합니다.',
      },
      {
        title: 'In-Memory Computing for Matrix Operation',
        body:
          '메모리에서 데이터를 꺼내오는 비용을 줄이기 위해 연산을 메모리 안으로 가져옵니다. 상태형 행렬 곱 구조로 메모리 대역폭 병목을 완화합니다.',
      },
      {
        title: 'Hardware-Software Co-Optimization',
        body:
          'NPU SDK·컴파일러·런타임·프로파일러까지의 SW 통합 개발 환경과 가상화 하드웨어를 함께 설계하여, 엣지 SoC의 실사용 제약을 완화합니다.',
      },
    ],
  },
  {
    no: '02',
    title: 'SoC-based Sensor Signal Processing & Heterogeneous System',
    titleEn: 'Application-Specific SoC Design for Heterogeneous Sensor Signal Processing',
    accent: '#FF6B35',
    summary:
      '자율주행·의료기기·산업용 IoT 등에서 복수의 이종 센서 데이터를 실시간 처리하는 전용 SoC 수요가 증가하고 있으나, 기존 범용 프로세서는 전력·면적·지연 측면에서 한계를 가집니다. 피크 검출 기반 엔벨로프 검출 알고리즘을 활용한 초음파 유량계 전용 SoC, 비선형 센서 보정을 위한 세그먼트 2D 점진적 다항식 캘리브레이션, AFE/Decimation Filter 설계를 포함한 이종 SoC 아키텍처를 연구합니다.',
    flow:
      '먼저 비선형 센서의 측정 오차를 줄이기 위해 입력 범위를 분할하고 구간별 보정 함수를 적용하는 segmented 2D progressive polynomial calibration을 정립했습니다. 이후 초음파 유량계의 ToF 추정을 저복잡도로 수행하는 envelope 기반 신호처리 구조를 설계하고 무선 센서 네트워크 노드로의 통합 가능성을 검증했으며, 2D 센서 보정 프로세서를 IC 수준 구현으로 확장했습니다.',
    subs: [
      {
        title: 'Ultrasonic Flowmeter Signal Processor',
        body:
          'Hilbert envelope detection과 미분기 기반 병렬 피크 검출기로 저복잡도 ToF 추정을 수행합니다. FFT 기반 교차상관 대비 하드웨어 복잡도를 78.9% 줄이면서 평균 상대 편차 5.07%를 달성했습니다.',
      },
      {
        title: 'Segmented 2D Polynomial Calibration',
        body:
          '입력 범위를 여러 구간으로 분할해 각 구간에 최적화된 점진적 다항 보정 함수를 산출합니다. 동일한 6개 보정 지점·5차 다항으로 오차율을 0.0823%에서 0.000006%까지 낮췄습니다.',
      },
      {
        title: 'AFE & Decimation Filter Integration',
        body:
          '아날로그 프론트엔드와 Decimation Filter 설계를 포함한 이종 SoC 아키텍처. 다양한 센서 신호를 단일 칩에서 변환·전처리·후처리까지 통합 처리합니다.',
      },
      {
        title: '2D Sensor Calibration Processor',
        body:
          '가변 다항 연산을 활용한 2D 센서 보정 프로세서. 분할 보정과 progressive polynomial 알고리즘을 실시간 처리 가능한 IC 수준 구조로 구현합니다.',
      },
    ],
  },
  {
    no: '03',
    title: 'Neuromorphic Computing & SNN-based Low-Power AI Processor',
    titleEn: 'Bio-Inspired Spiking Neural Network Processor with Energy-Efficient NoC',
    accent: '#00FF88',
    summary:
      '기존 딥러닝 기반 AI는 높은 연산량과 전력 소모로 인해 배터리 구동 엣지 디바이스 적용에 근본적인 한계가 있습니다. 생물학적 뇌 신경 구조를 모방한 뉴로모픽 컴퓨팅은 이벤트 기반 SNN 연산으로 극저전력 AI 추론을 가능하게 하는 차세대 패러다임입니다. 통합 불응기 제어 NoC 아키텍처와 SNN 학습률 스케줄러 최적화로 에너지 효율과 학습 효율을 동시에 끌어올립니다.',
    flow:
      '먼저 딥 SNN의 학습 안정성을 확보하기 위해 arctangent 기반 surrogate gradient와 수정 학습률 스케줄러를 도입했습니다. 이후 알고리즘 수준의 학습 가능성을 하드웨어 아키텍처로 연결하기 위해 통합 불응기 제어 NoC 라우터(UREN)를 설계해 winner spike 이후 전역 refractory와 clock gating을 수행하고, STDP 기반 로컬 online 학습까지 통합했습니다. 2025년에는 삼성전자 파운드리 28nm 공정으로 풀커스텀 칩을 제작·검증하여 시제품 실증을 달성했습니다.',
    subs: [
      {
        title: 'Unified Refractory NoC (UREN)',
        body:
          '승자 스파이크 이후 모든 뉴런 코어에 통합 불응기 시간을 적용해 클록 게이팅을 가능하게 하는 NoC 라우터. star 토폴로지 multicasting과 nearest-neighbor STDP로 중복 활동을 억제합니다.',
      },
      {
        title: 'Deep SNN Training',
        body:
          'arctangent 기반 surrogate gradient와 mini-batch / Adam / layer normalization, 수정 학습률 스케줄러로 딥 SNN의 학습 안정성과 수렴 속도를 동시에 개선합니다.',
      },
      {
        title: 'Samsung 28nm Full-Custom Chip',
        body:
          '삼성전자 파운드리 28nm 공정으로 뉴로모픽 프로세서 풀커스텀 칩 설계·검증을 완료하여 시제품 실증을 달성했습니다.',
      },
      {
        title: 'Energy-Efficient Edge AI',
        body:
          '이벤트 구동, 클록 게이팅, 로컬 학습으로 마이크로와트 영역의 always-on 지능형 디바이스를 구현. 웨어러블·의료·자율주행 등 전력 제약이 엄격한 응용에 적용합니다.',
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// 각 챕터별 원본 figure 사진 묶음.
//
// 사진 추가/교체:
//   1) 이미지 파일을 `iqlab/public/research/` 아래에 배치.
//   2) 아래 배열에 `{ src: '/research/<file>' }` 형태로 항목 추가.
//   3) 한 줄에 최대 6장까지 자동 배치되며, 더 많거나 적어도 자동으로 컬럼 수 조정.
//   4) 카드 클릭 시 라이트박스(확대 모달) 가 자동으로 동작합니다.
//
// 자세한 가이드는 MAINTENANCE.md 의 "Research figure 사진 추가" 절 참고.
// ----------------------------------------------------------------------------
const PHOTOS_BY_NO: Partial<Record<string, ResearchPhoto[]>> = {
  '01': [
    { src: '/research/transformer_1.png', label: 'Variable Systolic Array' },
    { src: '/research/transformer_2.png', label: 'NPU Virtualization' },
    { src: '/research/transformer_3.png', label: 'Scheduler Architecture' },
    { src: '/research/transformer_4.png', label: 'Dataflow' },
    { src: '/research/transformer_5.png', label: 'In-Memory MatMul' },
    { src: '/research/transformer_6.png', label: 'Measured Results' },
  ],
  '02': [
    { src: '/research/cal_1.gif', label: 'Sensor SoC Block' },
    { src: '/research/cal_2.gif', label: 'Envelope / ToF Detector' },
    { src: '/research/cal_3.gif', label: '2D Polynomial Calibration' },
  ],
  '03': [
    { src: '/research/neuromorphic_1.png', label: 'UREN Router' },
    { src: '/research/neuromorphic_2.png', label: 'Star-topology NoC' },
    { src: '/research/neuromorphic_3.png', label: 'STDP On-chip Learning' },
    { src: '/research/neuromorphic_4.png', label: 'Refractory Control' },
    { src: '/research/neuromorphic_5.png', label: 'Samsung 28 nm Chip' },
    { src: '/research/neuromorphic_6.png', label: 'Measured Results' },
  ],
};

export default function ResearchSection() {
  return (
    <SectionShell id="research" eyebrow="Research">
      <div className="space-y-20">
        {SECTIONS.map((s) => {
          const Art = ART_BY_NO[s.no];
          const photos = PHOTOS_BY_NO[s.no];
          return (
            <div key={s.no} id={`research-${s.no}`} className="scroll-mt-24">
              {/* Main header */}
              <div
                className="flex flex-col gap-1 mb-6 pb-3"
                style={{ borderBottom: `1px solid ${s.accent}40` }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="text-4xl font-bold font-mono shrink-0"
                    style={{ color: s.accent, textShadow: `0 0 18px ${s.accent}50` }}
                  >
                    {s.no}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{s.title}</h3>
                </div>
                <p className="text-[11px] font-mono text-gray-500 ml-12 tracking-wide">
                  {s.titleEn}
                </p>
              </div>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                {s.summary}
              </p>

              {/* SVG 일러스트 + 그 아래 원본 figure 사진 strip */}
              {(Art || (photos && photos.length > 0)) && (
                <div className="mb-6">
                  {Art && (
                    <figure
                      className="rounded-lg overflow-hidden"
                      style={{
                        border: `1px solid ${s.accent}30`,
                        background: 'rgba(2, 8, 18, 0.6)',
                        boxShadow: `0 0 32px ${s.accent}10 inset`,
                      }}
                    >
                      <Art />
                    </figure>
                  )}
                  {photos && photos.length > 0 && (
                    <ResearchFigureStrip photos={photos} accent={s.accent} />
                  )}
                </div>
              )}

              {/* Subsections grid (키워드 태그 제거) */}
              <div className="grid md:grid-cols-2 gap-4">
                {s.subs.map((sub, i) => (
                  <Card
                    key={sub.title}
                    accent={`${s.accent}30`}
                    className="hover:border-white/25 hover:scale-[1.01]"
                  >
                    <div className="flex items-baseline gap-2.5 mb-2">
                      <span
                        className="text-[13px] font-mono font-bold tracking-wider shrink-0"
                        style={{ color: s.accent }}
                      >
                        {i + 1}
                      </span>
                      <h4 className="text-base font-bold text-white leading-snug">{sub.title}</h4>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{sub.body}</p>
                  </Card>
                ))}
              </div>

            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
