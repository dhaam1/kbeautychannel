import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, type MotionValue } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

interface ProfileData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  items: string[];
}

const PROFILE_DATA: ProfileData[] = [
  {
    id: '01',
    title: '한국을 대표하는 미인대회,\n미스코리아 심사위원',
    subtitle: 'Judge Credentials',
    image: '/assets/images/profile_judge.png',
    items: [
      '미스코리아 경기, 인천 심사위원',
      '아나테이너 월드 코리아 심사위원',
      '한류 모델 어워즈 심사위원',
      '미스 인터콘티넨탈 심사위원',
    ],
  },
  {
    id: '02',
    title: '미용을 선도하는\n학회의 Key Doctor',
    subtitle: 'Academic & Key Doctor',
    image: '/assets/images/profile_academic.png',
    items: [
      '대한미용의사회 학술 의사 강사',
      '대한임상미용의학회 (KACAM) 정회원',
      '대한미용성형 레이저 의학회 (KASLS) 정회원',
      'Allergan (Juvederm, Botox) Korea Faculty Member',
      '포텐자(Potenza), 울트라셀Z Key Doctor',
    ],
  },
  {
    id: '03',
    title: '한국 최고의 대학,\n서울대학의 전공의',
    subtitle: 'Academic Foundation',
    image: '/assets/images/profile_university.png',
    items: [
      '서울대학교 대학원 의학석사 졸업',
      '서울대학교병원 인턴 수료',
      '서울대학교 의과대학 피부과 전문 과정 이수',
      '서울대학교 의과대학 피부학회 정회원',
      '서울백병원 피부과 전공의 수료',
    ],
  },
];

export default function ProfessionalProfile() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 최적화된 부드러운 물리 모델: 반응성을 위해 stiffness를 높이고 안정성을 위해 damping 조정
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.0001
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#0a0a0a]"
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row">
        <SectionLabel number="03" title="PROFESSIONAL PROFILE" dark />

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row border-t lg:border-t-0 lg:border-l border-white/10">
          {PROFILE_DATA.map((data, idx) => (
            <ExpandingColumn 
              key={data.id} 
              data={data} 
              index={idx} 
              progress={smoothProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExpandingColumnProps {
  data: ProfileData;
  index: number;
  progress: MotionValue<number>;
}

const ExpandingColumn: React.FC<ExpandingColumnProps> = ({ data, index, progress }) => {
  const ranges = useMemo(() => [
    [0.0, 0.2, 0.35, 0.45],
    [0.3, 0.5, 0.65, 0.75],
    [0.6, 0.8, 1.0, 1.0],
  ], []);

  const currentRange = ranges[index] as [number, number, number, number];
  const outputRange = (index === 2 ? [1, 12, 12, 12] : [1, 12, 12, 1]) as [number, number, number, number];
  
  // 1. flexGrow 계산
  const flexGrow = useTransform(progress, currentRange, outputRange, { clamp: true });

  // 2. 가시성 및 시각 효과
  const contentOpacity = useTransform(flexGrow, [2, 6], [0, 1]);
  const labelOpacity = useTransform(flexGrow, [1, 3], [1, 0]);
  const imgOpacity = useTransform(flexGrow, [1, 12], [0.05, 0.4]);
  const imgScale = useTransform(flexGrow, [1, 12], [1.1, 1]);

  // 3. Cinematic 필터 효과 (V3 로직 고정)
  const blurValue = useTransform(flexGrow, [1, 12], [15, 0]);
  const grayscaleValue = useTransform(flexGrow, [1, 6], [100, 0]);
  const filter = useMotionTemplate`grayscale(${grayscaleValue}%) blur(${blurValue}px)`;

  return (
    <motion.div 
      style={{ flex: `${flexGrow} ${flexGrow} 0%` }}
      className="relative h-full border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col overflow-hidden min-w-[50px] lg:min-w-[80px]"
    >
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          opacity: imgOpacity,
          backgroundImage: `url(${data.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: imgScale,
          filter: filter,
          willChange: 'transform, opacity, filter',
          transform: 'translateZ(0)'
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />

      {/* 액티브 콘텐츠 영역 */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="relative z-10 w-full h-full flex flex-col justify-center px-8 lg:px-20 overflow-hidden"
      >
        <div className="max-w-4xl min-w-[400px]">
          <span className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase mb-8 block">
            {data.id} — {data.subtitle}
          </span>
          
          <h2 className="font-sans text-[24px] lg:text-[52px] font-black text-white leading-none mb-10 tracking-tighter whitespace-pre-line">
            {data.title}
          </h2>

          <ul className="space-y-5">
            {data.items.map((item, i) => (
              <li 
                key={i}
                className="text-[14px] lg:text-[15.5px] font-pretendard text-gray-400 leading-relaxed flex items-start"
              >
                <span className="inline-block w-4 h-[1px] bg-white/20 mr-4 mt-3 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 대기 상태 라벨 영역 */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        style={{ opacity: labelOpacity }}
      >
        <div className="rotate-90 origin-center whitespace-nowrap">
           <span className="text-[11px] font-black tracking-[0.6em] text-white/20 uppercase">
             {data.id} — {data.subtitle}
           </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
