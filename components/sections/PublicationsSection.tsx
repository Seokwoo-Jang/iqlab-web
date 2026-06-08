import { SectionShell } from './SectionShell';

type PubLink = { label: string; url: string };
type PubType = 'journal' | 'conference';

type Pub = {
  /** Sort key — YYYY-MM (best estimate). Used only for ordering. */
  date: string;
  /** Display year */
  year: string;
  type: PubType;
  authors: string;
  title: string;
  venue: string;
  metrics?: string;
  abstract?: string;
  keywords?: string[];
  links?: PubLink[];
  /** R&D Circle "주요 논문" 5건 표시 */
  featured?: boolean;
};

// 모든 논문 — date 기준 ascending(2024 → 2026)으로 시간순 정렬됨
const PUBLICATIONS: Pub[] = [
  // ===== 2024 =====
  {
    date: '2024-10',
    year: '2024',
    type: 'journal',
    authors: 'Jae-Lim Lee, Dong-Sun Kim',
    title:
      'Segmented Two-Dimensional Progressive Polynomial Calibration Method for Nonlinear Sensors',
    venue: 'Sensors, 2024',
    metrics: 'IF 3.5 · Citations 2',
    abstract:
      '입력 범위를 여러 구간으로 분할해 각 구간에 최적화된 단계적 다항 보정 함수를 산출하는 분할 보정 기법. 동일한 6개 보정 지점·5차 다항 사용 시 오차율을 0.0823% → 0.000006%. 2D 확장으로 8-bit 부호 있는 고정소수점 시스템에서 오차율 15.84% → 2.07%.',
    keywords: ['Calibration', 'Polynomial', 'Nonlinear Sensor', '2D Compensation'],
    links: [{ label: 'DOI', url: 'https://doi.org/10.3390/s24217058' }],
    featured: true,
  },
  {
    date: '2024-11',
    year: '2024',
    type: 'journal',
    authors: 'Seok-Woo Chang, Dong-Sun Kim',
    title:
      'Scalable Transformer Accelerator with Variable Systolic Array for Multiple Models in Voice Assistant Applications',
    venue: 'Electronics, 2024',
    metrics: 'IF 2.6 · Citations 2',
    abstract:
      '음성 비서용 다양한 Transformer 모델을 효율적으로 처리하는 확장형 가속기 유닛(STAU). 가변 systolic array(VSA)와 임베디드 프로세서의 데이터 전처리, 행 단위 입력 구성으로 가변 크기 행렬 연산 지원. 텍스트 요약·오디오 처리·이미지 검색·생성형 AI 가속.',
    keywords: ['Transformer', 'Systolic Array', 'Voice Assistant', 'NLP', 'STAU'],
    links: [{ label: 'DOI', url: 'https://doi.org/10.3390/electronics13234683' }],
    featured: true,
  },
  {
    date: '2024-12',
    year: '2024',
    type: 'journal',
    authors: 'Jong-Hwan Jean, Dong-Sun Kim',
    title:
      'Hardware-Assisted Low-Latency NPU Virtualization Method for Multi-Sensor AI Systems',
    venue: 'Sensors, 2024',
    metrics: 'IF 3.5 · Citations 2',
    abstract:
      '하드웨어 스케줄러와 데이터 프리패칭을 활용해 다수의 딥러닝 모델을 동시에 처리할 수 있도록 NPU를 가상화. 30,000 SA 리소스 실험에서 모든 모델의 메모리 사이클을 10% 이상 감소(NCF 30%, DLRM 70%). 자율주행 / 스마트홈의 잦은 컨텍스트 스위칭에 효과적.',
    keywords: ['NPU Virtualization', 'HW Scheduler', 'Prefetching', 'Multi-Sensor', 'Context Switch'],
    links: [{ label: 'DOI', url: 'https://doi.org/10.3390/s24248012' }],
    featured: true,
  },

  // ===== 2025 =====
  {
    date: '2025-01',
    year: '2025',
    type: 'journal',
    authors: 'Myeong-Geon Yu, Dong-Sun Kim',
    title:
      'Low-Complexity Ultrasonic Flowmeter Signal Processor Using Peak Detector-Based Envelope Detection',
    venue: 'Journal of Sensor and Actuator Networks (JSAN), 2025',
    metrics: 'IF 4.2 · Citations 2',
    abstract:
      '힐버트 엔벨로프 검출과 미분기 기반 병렬 피크 검출기를 활용해 허용 오차 내 정확한 ToF 추정을 보장하면서 연산 복잡도를 낮춘 저복잡도 초음파 유량계 신호처리기. LPG 가스 유속 0.1–1.7 m/s 범위에서 평균 상대 편차 5.07%, FFT 기반 교차상관 대비 하드웨어 복잡도 78.9% 감소.',
    keywords: ['Envelope Detector', 'Ultrasonic Flowmeter', 'ToF', 'WSN', 'Smart Grid'],
    links: [{ label: 'DOI', url: 'https://doi.org/10.3390/jsan14010012' }],
    featured: true,
  },
  {
    date: '2025-01',
    year: '2025',
    type: 'conference',
    authors: 'Jong-Hwan Jean, Dong-Sun Kim',
    title:
      'Hardware Assisted Low Latency NPU Virtualization Using Data Prefetching Techniques',
    venue: 'IEEE ICEIC, 2025',
    abstract:
      'NPU 칩에 하드웨어 스케줄러를 내장해 입력·가중치 데이터를 선제적으로 프리패칭함으로써 컨텍스트 스위칭 시 DRAM 접근 지연을 최소화. SW 기반 NPU 가상화 대비 메모리 사이클 유의 감소.',
    keywords: ['NPU Virtualization', 'Prefetching', 'HW Scheduler'],
    links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/10879644' }],
  },
  {
    date: '2025-01',
    year: '2025',
    type: 'conference',
    authors: 'Jae-Lim Lee, Dong-Sun Kim',
    title:
      'Two-Dimensional Calibration Method for Enhancing Sensor Accuracy Using Multiple Progressive Polynomial',
    venue: 'IEEE ICEIC, 2025',
    abstract:
      '다수의 단계적(progressive) 다항 함수를 활용한 2차원 센서 보정 기법으로 비선형 센서의 정확도를 향상. 분할 보정과 progressive polynomial을 조합해 교차 민감도(cross-sensitivity)까지 효과적으로 처리.',
    keywords: ['2D Calibration', 'Progressive Polynomial', 'Nonlinear Sensor'],
    links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/10879717' }],
  },
  {
    date: '2025-01',
    year: '2025',
    type: 'conference',
    authors: 'Seung-Chan Kim, Dong-Sun Kim',
    title:
      'Homomorphic Encryption and Decryption Hardware Design using Shared Arithmetic and Configurable Butterfly Unit',
    venue: 'IEEE ICEIC, 2025',
    abstract:
      'LWE 기반 동형암호 시스템을 위한 면적 효율적 저복잡도 하드웨어. NTT/INTT/ModMult 연산을 단일 구성 가능 butterfly 유닛에 통합해 기존 NTT 대비 약 23% 적은 클록 사이클, 선행 연구 대비 3.7× / 2.8× 효율.',
    keywords: ['Homomorphic Encryption', 'LWE', 'NTT', 'Butterfly Unit'],
    links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/10879764' }],
  },
  {
    date: '2025-01',
    year: '2025',
    type: 'conference',
    authors: 'Seok-Woo Chang, Dong-Sun Kim',
    title:
      'An In-Memory Computing-based Efficient Transformer Accelerator Using Stateful Matrix Multiplier for Voice Assistant Consumer Applications',
    venue: 'IEEE ICCE, 2025 (Las Vegas)',
    abstract:
      '입력 메모리 워드 수 기반 상태형 행렬 곱셈을 위한 새로운 가변 systolic array. NLP의 기반인 Transformer에서 높은 성능을 입증. 모바일 AP의 통화 녹음·음성 메모 문장 분류 가속에 적용 가능.',
    keywords: ['PIM', 'Transformer', 'Stateful MAC', 'Mobile AP'],
    links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/10930161' }],
  },
  {
    date: '2025-01',
    year: '2025',
    type: 'conference',
    authors: 'Sung-Hyun Cha, Su-Hwan Na, Dong-Sun Kim',
    title:
      'A Fully Digital Neuromorphic AI Processor for Industrial and Consumer Applications',
    venue: 'IEEE ICCE, 2025 (Las Vegas)',
    abstract:
      '확장 가능 병렬 뉴런 어레이, 조정 가능한 뉴런 모델, 시간 정보 기반 가중치 계산을 갖춘 fully digital neuromorphic AI 프로세서. Winner-Takes-All(WTA) 메커니즘으로 생물학적 타당성 강화. 산업 / 소비자 응용을 위한 SNN 기반 SoC.',
    keywords: ['Neuromorphic', 'Digital SNN', 'WTA', 'SoC', 'Bio-Plausible'],
    links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/10929779' }],
  },
  {
    date: '2025-04',
    year: '2025',
    type: 'journal',
    authors: 'Sung-Hyun Cha, Dong-Sun Kim',
    title:
      'Efficient Training of Deep Spiking Neural Networks Using a Modified Learning Rate Scheduler',
    venue: 'Mathematics, 2025',
    metrics: 'IF 2.2 · Citations 1',
    abstract:
      'arctangent 기반 surrogate gradient + 시간/공간 그래디언트 전파 + mini-batch / Adam / layer normalization + 수정 학습률 스케줄러. 적은 에폭으로 학습 초기 단계에서 더 빠른 수렴.',
    keywords: ['SNN Training', 'Surrogate Gradient', 'LR Scheduler', 'Deep SNN'],
    links: [{ label: 'DOI', url: 'https://doi.org/10.3390/math13081361' }],
  },
  {
    date: '2025-09',
    year: '2025',
    type: 'journal',
    authors: 'Jae-Lim Lee, Min-Jae Kwak, Dong-Sun Kim',
    title:
      'On the Design of a Two-Dimensional Sensor Calibration Processor Using a Variable Polynomial Computation for Enhancing Sensor Non-Linearity',
    venue: 'IEEE Access, 2025',
    abstract:
      '가변 다항(variable polynomial) 연산을 활용한 2차원 센서 보정 프로세서 설계. 비선형성 감소를 위한 하드웨어 친화적 구조로, 분할 보정·progressive polynomial 알고리즘을 실시간 처리 가능한 형태로 IC 수준에서 구현.',
    keywords: ['2D Calibration', 'Variable Polynomial', 'Sensor Processor', 'Non-Linearity'],
    links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/11192284' }],
  },
  {
    date: '2025-12',
    year: '2025',
    type: 'journal',
    authors: 'Su-Hwan Na, Dong-Sun Kim',
    title:
      'An Energy-Efficient Neuromorphic Processor Using Unified Refractory Control-Based NoC for Edge AI',
    venue: 'Electronics, 2025',
    metrics: 'IF 2.6',
    abstract:
      '다수 뉴런 코어에 걸쳐 스파이크 기반 연산을 전역적으로 조정하는 통합 불응기(Unified Refractory) 라우터(UREN)를 갖춘 NoC 아키텍처. star 토폴로지 multicasting + nearest-neighbor STDP. FPGA 기반 검증에서 baseline 대비 연산량 30% 감소, 86.1% 온라인 분류 정확도(MNIST).',
    keywords: ['Neuromorphic', 'SNN', 'NoC Router', 'STDP', 'Edge AI'],
    links: [{ label: 'DOI', url: 'https://doi.org/10.3390/electronics14244959' }],
    featured: true,
  },

  // ===== 2026 =====
  {
    date: '2026-01',
    year: '2026',
    type: 'journal',
    authors: 'Ah-Hyun Lee, Eun-Hyeok Hwang, Dong-Sun Kim',
    title:
      'A Practical CNN–Transformer Hybrid Network for Real-World Image Denoising',
    venue: 'Mathematics, 2026',
    metrics: 'IF 2.2 · Citations 1',
    abstract:
      'NAFNet과 Restormer의 핵심 구성요소를 통합한 실용적 CNN–Transformer 하이브리드. SIDD 39.98–40.05 dB / DND 39.73–39.91 dB PSNR을 7.18–16.02M 파라미터·20.44–44.49G MACs로 달성.',
    keywords: ['Denoising', 'CNN-Transformer', 'NAFNet', 'Restormer'],
    links: [{ label: 'DOI', url: 'https://doi.org/10.3390/math14010203' }],
  },
  {
    date: '2026-01',
    year: '2026',
    type: 'conference',
    authors: 'Ui-Seok Jeong, Jun-Min Lee, Dong-Sun Kim',
    title:
      'Dual-Bridge SENT Processor with AI-based Genetic Algorithm Calibration for Automotive Applications',
    venue: 'IEEE ICCE, 2026',
    abstract:
      '자동차용 듀얼 브리지 SENT(Single Edge Nibble Transmission) 프로세서. AI 기반 유전 알고리즘(Genetic Algorithm) 보정으로 차량용 센서의 정확도와 신뢰성을 동시에 확보. 첨단 모빌리티 통합 제어기 플랫폼 과제와 직결되는 차세대 차량용 신호처리 IC.',
    keywords: ['SENT', 'Automotive', 'Genetic Algorithm', 'AI Calibration', 'Dual-Bridge'],
    links: [{ label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/11449602' }],
  },
];

// 정렬: 최신순 descending (2026 → 2024)
const SORTED = [...PUBLICATIONS].sort((a, b) => b.date.localeCompare(a.date));
const JOURNALS = SORTED.filter((p) => p.type === 'journal');
const CONFERENCES = SORTED.filter((p) => p.type === 'conference');

function PubItem({ p }: { p: Pub }) {
  const primaryLink = p.links && p.links.length > 0 ? p.links[0].url : null;

  return (
    <li className="py-3 group">
      <p className="text-[12px] font-mono text-gray-500 mb-0.5">{p.authors}</p>
      {primaryLink ? (
        <a
          href={primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm md:text-base text-white leading-snug mb-0.5 group-hover:text-red-300 transition cursor-pointer hover:underline"
        >
          &ldquo;{p.title}&rdquo;
        </a>
      ) : (
        <p className="text-sm md:text-base text-white leading-snug mb-0.5">
          &ldquo;{p.title}&rdquo;
        </p>
      )}
      <p className="text-xs text-gray-400 italic">{p.venue}</p>
    </li>
  );
}

function Chapter({
  title,
  items,
}: {
  title: string;
  items: Pub[];
}) {
  // 연도별 그룹화 (이미 최신순 정렬된 SORTED에서 필터링됐으므로 그룹 순서도 최신순)
  const grouped = items.reduce<Record<string, Pub[]>>((acc, p) => {
    (acc[p.year] ||= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      <div
        className="mb-6 pb-3"
        style={{ borderBottom: '1px solid rgba(220,38,38,0.35)' }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-10">
        {years.map((y) => (
          <div key={y}>
            <div className="flex items-baseline gap-3 mb-2">
              <h4 className="text-xl font-bold text-white font-mono">{y}</h4>
            </div>
            <ul className="divide-y divide-white/5">
              {grouped[y].map((p) => (
                <PubItem key={`${p.date}-${p.title}`} p={p} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PublicationsSection() {
  return (
    <SectionShell id="publications" eyebrow="Publications">
      <div className="space-y-20">
        <Chapter title="International Journals" items={JOURNALS} />
        <Chapter title="International Conferences" items={CONFERENCES} />
      </div>
    </SectionShell>
  );
}
