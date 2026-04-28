'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, type MotionValue } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

interface ProfileData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  video?: string;
  items: string[];
}

const PROFILE_DATA: ProfileData[] = [
  {
    id: '01',
    title: '한국을 대표하는 미인대회,\n미스코리아 심사위원',
    subtitle: 'Judge Credentials',
    image: '/assets/images/profile_judge.png',
    video: '/videos/miss-korea.webm',
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
    video: '/videos/CTA-video.webm',
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
    video: '/videos/seoul-university.webm',
    items: [
      '서울대학교 대학원 의학석사 졸업',
      '서울대학교병원 인턴 수료',
      '서울대학교 의과대학 피부과 전문 과정 이수',
      '서울대학교 의과대학 피부학회 정회원',
      '서울백병원 피부과 전공의 수료',
    ],
  },
];

const KEY_COLOR = '#FFFFFF';

export default function ProfessionalProfile() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 스크롤 반응성 극대화 (stiffness를 높이고 damping을 조절하여 윈도우 스크롤에 즉각 반응)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#0a0a0a]"
      style={{ height: '550vh' }} // 500vh -> 550vh로 확장하여 마지막 카드 여유 공간 확보
    >
      {/* Scroll Snap points for each card expansion */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="snap-point absolute top-0" />
        <div className="snap-point absolute top-[16%]" /> {/* Card 1: 미스코리아 */}
        <div className="snap-point absolute top-[47%]" /> {/* Card 2: KEY 닥터 */}
        <div className="snap-point absolute top-[78%]" /> {/* Card 3: 서울대 전공의 (조금 더 위로 조정하여 안정감 확보) */}
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row bg-[#050505]">
        <SectionLabel number="03" title="PROFESSIONAL PROFILE" dark />

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row border-t lg:border-t-0 lg:border-l border-white/10">
          {PROFILE_DATA.map((data, idx) => (
            <ExpandingCard 
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

interface ExpandingCardProps {
  data: ProfileData;
  index: number;
  progress: MotionValue<number>;
}

const ExpandingCard: React.FC<ExpandingCardProps> = ({ data, index, progress }) => {
  // 스크롤 리듬 최적화 (550vh 기준, 마지막 카드가 끝까지 유지되도록 범위 조정)
  const width = useTransform(
    progress,
    [0, 0.05, 0.1, 0.3, 0.35, 0.6, 0.65, 0.9, 1.0],
    index === 0
      ? ['33.333%', '33.333%', '100%', '100%', '0%', '0%', '0%', '0%', '0%']
      : index === 1
      ? ['33.333%', '33.333%', '0%', '0%', '100%', '100%', '0%', '0%', '0%']
      : ['33.333%', '33.333%', '0%', '0%', '0%', '0%', '100%', '100%', '100%']
  );

  const currentWidthValue = useTransform(width, (v) => parseFloat(v));
  
  // 가시성 로직 최적화
  const isCover = useTransform(currentWidthValue, [32, 45], [1, 0]);
  const isExpanded = useTransform(currentWidthValue, [85, 98], [0, 1]);

  const imgOpacity = useTransform(currentWidthValue, [0, 33, 100], [0, 0.18, 0.45]);
  const imgScale = useTransform(currentWidthValue, [33, 100], [1.15, 1]);
  
  const grayscaleValue = useTransform(currentWidthValue, [33, 100], [100, 0]);
  const filter = useMotionTemplate`grayscale(${grayscaleValue}%)`;

  return (
    <motion.div 
      style={{ width, flexShrink: 0 }}
      className="relative h-full border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col overflow-hidden"
    >
      {/* Background Image/Video Layer */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          opacity: imgOpacity,
          scale: imgScale,
          filter: filter,
          willChange: 'transform, opacity, filter',
        }}
      >
        {data.video ? (
          <video 
            src={data.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full"
            style={{ 
              backgroundImage: `url(${data.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/30 to-transparent z-[1] pointer-events-none" />

      {/* 1. Cover View */}
      <motion.div 
        style={{ opacity: isCover }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-10 pointer-events-none"
      >
        <div className="min-w-[300px]">
          <span className="text-[11px] font-bold tracking-[0.6em] text-white/30 uppercase mb-5 block">
             {data.subtitle.split(' ')[0]}
          </span>
          <h2 className="font-sans text-[24px] lg:text-[32px] font-bold text-white leading-tight tracking-tighter whitespace-pre-line">
             {data.title.split('\n')[1] || data.title}
          </h2>
        </div>
      </motion.div>

      {/* 2. Expanded View (Editorial Distributed Layout) */}
      <motion.div 
        style={{ opacity: isExpanded }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        <div className="relative w-full h-full p-[5%] lg:p-[8%] flex flex-col justify-between">
          
          {/* Top-Right Area: Main Catchy Title */}
          <div className="flex justify-end items-start pt-12 lg:pt-0">
             <div className="max-w-4xl text-right">
                <h2 className="font-sans text-[36px] lg:text-[54px] font-bold text-white leading-[1.02] tracking-tighter whitespace-pre-line">
                  {data.title}
                </h2>
                <div className="mt-8 flex justify-end">
                   <div className="h-[2px] w-24" style={{ backgroundColor: KEY_COLOR }} />
                </div>
             </div>
          </div>

          {/* Bottom Area: Info & Category (Distributed) */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
             
             {/* Bottom-Left: Subtitle & ID (Category style) */}
             <div className="flex flex-col items-start">
                <span 
                  className="text-[16px] lg:text-[20px] font-bold tracking-[0.6em] uppercase mb-4"
                  style={{ color: KEY_COLOR }}
                >
                  {data.id} — {data.subtitle}
                </span>
                <div className="h-[1px] w-full bg-white/20" />
             </div>

             {/* Bottom-Right: Detailed Items List */}
             <div className="max-w-2xl text-right">
                <ul className="space-y-4 lg:space-y-6">
                  {data.items.map((item, i) => (
                    <li 
                      key={i}
                      className="text-[15px] lg:text-[20px] font-pretendard text-gray-300 leading-relaxed font-light"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <motion.div className="mt-12 flex justify-end">
                  <button 
                    className="px-12 py-4 bg-white/5 text-white border border-white/10 rounded-full text-[12px] font-bold tracking-[0.4em] uppercase transition-all duration-700 hover:text-black pointer-events-auto"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = KEY_COLOR)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                  >
                    EXPLORE CREDENTIALS
                  </button>
                </motion.div>
             </div>

          </div>

        </div>
      </motion.div>

      {/* 3. Transition Sidebar Label */}
      <motion.div 
        className="absolute inset-y-0 right-0 w-20 flex items-center justify-center pointer-events-none z-10"
        style={{ opacity: useTransform(currentWidthValue, [0, 8, 18], [1, 0.5, 0]) }}
      >
        <div className="rotate-90 origin-center whitespace-nowrap">
           <span className="text-[12px] font-bold tracking-[1em] text-white/10 uppercase">
             {data.id} — {data.subtitle}
           </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
