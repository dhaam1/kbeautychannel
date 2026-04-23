'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

// --- Types & Data ---
interface InsightItem {
  id: number;
  tag: string;
  category: string;
  title: string;
  videoId: string;
  start?: number;
  overview: string;
}

const INSIGHTS_DATA: InsightItem[] = [
  {
    id: 1,
    tag: "Lifting",
    category: "Signature",
    title: "리프팅의 정석: SMAS층 깊이의 미학",
    videoId: "rtC9pV0td_Y",
    overview: "단순한 당김이 아닌, 근본적인 처짐의 원인을 해결하는 리프팅 기법에 대한 전문 인사이트를 확인해 보세요."
  },
  {
    id: 2,
    tag: "Skin Booster",
    category: "Cellular",
    title: "스킨부스터 시너지: 수분 그 이상의 광채",
    videoId: "qw0Xxj8bwFc",
    overview: "피부 속부터 차오르는 본연의 빛과 수분감을 위한 멀티 하이드레이션 솔루션의 핵심 원리를 설명합니다."
  },
  {
    id: 3,
    tag: "Contouring",
    category: "Design",
    title: "윤곽 디자인: 뼈와 연조직의 조화로운 조각",
    videoId: "cFHvV0rc8M4",
    overview: "개개인의 얼굴형을 분석하여 가장 자연스럽고 우아한 라인을 찾아내는 섬세한 컨투어링 철학을 소개합니다."
  },
  {
    id: 4,
    tag: "Anti-Aging",
    category: "Regen",
    title: "안티에이징 연대기: 콜라겐 재생의 과학",
    videoId: "5BmtHePyIuQ",
    overview: "시간의 흔적을 지우고 피부 자생력을 높이는 콜라겐 재생 기술과 정밀한 시술법에 대한 심층 분석입니다."
  },
  {
    id: 5,
    tag: "Philosophy",
    category: "Dr.KIM",
    title: "미니멀 뷰티: '덜어냄'으로 완성하는 아름다움",
    videoId: "mUs_CLbjDxg",
    start: 63,
    overview: "과한 시술보다는 본질적인 아름다움을 강조하는 케이뷰티채널 김 원장의 철학적 시선을 공유합니다."
  },
  {
    id: 6,
    tag: "Thread Lift",
    category: "Precision",
    title: "실리프팅의 기술: 실의 배치가 만드는 입체감",
    videoId: "wmBmCFCcXRI",
    overview: "실의 종류와 삽입 벡터 하나하나가 결과물을 결정하는 실리프팅의 정밀한 설계 원리를 깊이 있게 풀어드립니다."
  },
  {
    id: 7,
    tag: "Filler",
    category: "Volume",
    title: "필러 해부학: 볼륨과 경계의 황금 비율",
    videoId: "gezRWcZby8c",
    overview: "과하지 않으면서도 또렷한 입체감을 위해, 얼굴 해부학에 기반한 필러 배치 전략과 자연스러운 경계 설정법을 소개합니다."
  }
];

export default function YoutubeEmbed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-cycle
  useEffect(() => {
    if (hoveredIndex !== null) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % INSIGHTS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [hoveredIndex]);

  const activeItem = INSIGHTS_DATA[activeIndex];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0A0A0A] overflow-hidden" style={{ minHeight: '100vh' }}>
      <SectionLabel number="05" title="INSIGHTS" dark />

      {/* Background video (active item) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.videoId}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${activeItem.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${activeItem.videoId}&start=${activeItem.start || 0}&playsinline=1`}
            title="YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none', transform: 'scale(1.3)', transformOrigin: 'center' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/50 z-[1]" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-[2]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full" style={{ minHeight: '100vh' }}>
        
        {/* Top header */}
        <div className="px-[5%] pt-32 md:pt-40 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5 items-center text-center"
          >
            <span className="text-[16px] font-black tracking-[0.5em] text-white/30 uppercase">Archive Education</span>
            <h2 className="font-pretendard text-[22px] md:text-[48px] font-bold tracking-tighter leading-[1.1] text-white break-keep">
              인터넷에서 얻을 수 없는 정보,<br className="hidden md:block" />{' '}
              <span className="text-white/40">
                KBEAUTYCHANNEL에선 모두 말해드리겠습니다.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Active item large content */}
        <div className="px-[5%] flex-grow flex items-center py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full border border-white/20 text-[16px] font-bold tracking-[0.3em] text-white/60 uppercase backdrop-blur-sm">
                  {activeItem.tag}
                </span>
                <span className="text-[16px] font-bold tracking-[0.3em] text-white/30 uppercase">
                  {activeItem.category}
                </span>
              </div>
              <h3 className="font-pretendard text-[22px] md:text-[36px] font-bold text-white tracking-tight leading-[1.15] mb-6">
                {activeItem.title}
              </h3>
              <p className="text-[16px] text-white/40 leading-relaxed font-light max-w-md">
                {activeItem.overview}
              </p>

              <motion.a
                href={`https://www.youtube.com/watch?v=${activeItem.videoId}${activeItem.start ? `&t=${activeItem.start}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-10 group"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Play circle */}
                <span className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:border-white">
                  {/* YouTube triangle */}
                  <svg
                    className="w-4 h-4 translate-x-0.5 text-white transition-colors duration-500 group-hover:text-black"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
                  </svg>
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full border border-white/20 scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" />
                </span>

                {/* Label */}
                <span className="flex flex-col">
                  <span className="text-[16px] font-bold tracking-[0.3em] text-white/30 uppercase mb-0.5">YouTube</span>
                  <span className="text-[16px] font-semibold text-white/70 group-hover:text-white transition-colors duration-300 tracking-wide">
                    영상 전체 보기
                  </span>
                </span>

                {/* Arrow */}
                <svg
                  className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 ml-1"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom strip — thumbnails */}
        <div className="px-[5%] pb-14 md:pb-20">
          <div className="flex items-end gap-3 md:gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {INSIGHTS_DATA.map((item, i) => (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(i)}
                animate={{
                  width: activeIndex === i ? '220px' : '110px',
                  height: activeIndex === i ? '140px' : '86px',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                className="relative rounded-lg overflow-hidden cursor-pointer flex-shrink-0 group"
              >
                <img
                  src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-all duration-500 ${activeIndex === i ? 'bg-black/10' : 'bg-black/55'}`} />

                {/* Active indicator line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-white"
                  initial={{ width: '0%' }}
                  animate={{ width: activeIndex === i ? '100%' : '0%' }}
                  transition={{ duration: activeIndex === i ? 6 : 0.3, ease: 'linear' }}
                />

                {/* Label */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className={`text-[16px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${activeIndex === i ? 'text-white' : 'text-white/40'}`}>
                    {item.tag}
                  </span>
                </div>

                {/* Number */}
                <div className="absolute top-2.5 right-2.5">
                  <span className={`font-mono text-[16px] font-bold transition-all duration-500 ${activeIndex === i ? 'text-white/80' : 'text-white/20'}`}>
                    {String(item.id).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
