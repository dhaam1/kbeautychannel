import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

// --- Global Styles to hide scrollbar ---
const noScrollbarStyle = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

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
  }
];

// --- Sub-component: Video Card ---
const VideoCard: React.FC<{ item: InsightItem; isActive: boolean }> = ({ item, isActive }) => {
  return (
    <motion.div
      layout
      animate={{
        width: isActive ? "640px" : "400px",
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
      className="flex-shrink-0 flex flex-col gap-8"
    >
      <div className={`relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl group transition-all duration-1000 ${!isActive && 'grayscale blur-[1px]'}`}>
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10"
            >
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${item.videoId}&start=${item.start || 0}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 z-20 pointer-events-none" />
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <img src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-4 overflow-hidden">
        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-gray-400">
          <span>{item.tag}</span>
          <span>{item.category}</span>
        </div>
        <h3 className={`font-sans font-bold leading-tight transition-all duration-700 whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? 'text-2xl text-gray-900 translate-x-0' : 'text-lg text-gray-300 -translate-x-2'}`}>
          {item.title}
        </h3>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-gray-400 leading-relaxed font-light mt-2 max-w-[400px]">
                {item.overview}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function YoutubeEmbed() {
  const [activeIndex, setActiveIndex] = useState(INSIGHTS_DATA.length); // Start from the middle section
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const infiniteData = useMemo(() => {
    return [...INSIGHTS_DATA, ...INSIGHTS_DATA, ...INSIGHTS_DATA];
  }, []);

  // --- Step Scroll Logic ---
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 5000); // 5 Seconds Interval

    return () => clearInterval(timer);
  }, [isPaused]);

  // --- Sync Scroll Position with activeIndex ---
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const children = Array.from(container.firstChild?.childNodes || []) as HTMLElement[];
    const targetChild = children[activeIndex];

    if (targetChild) {
      const targetLeft = targetChild.offsetLeft - (container.offsetWidth / 2) + (targetChild.offsetWidth / 2);
      container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }

    // --- Seamless Reset for Infinite loop ---
    if (activeIndex >= INSIGHTS_DATA.length * 2) {
      setTimeout(() => {
        const resetIndex = INSIGHTS_DATA.length;
        setActiveIndex(resetIndex);
        const resetChild = children[resetIndex];
        if (resetChild) {
          const resetLeft = resetChild.offsetLeft - (container.offsetWidth / 2) + (resetChild.offsetWidth / 2);
          container.scrollTo({ left: resetLeft, behavior: 'auto' });
        }
      }, 700); // Wait for smooth scroll to finish
    }
    
    if (activeIndex < INSIGHTS_DATA.length) {
        setTimeout(() => {
          const resetIndex = INSIGHTS_DATA.length * 2 - 1;
          setActiveIndex(resetIndex);
          const resetChild = children[resetIndex];
          if (resetChild) {
            const resetLeft = resetChild.offsetLeft - (container.offsetWidth / 2) + (resetChild.offsetWidth / 2);
            container.scrollTo({ left: resetLeft, behavior: 'auto' });
          }
        }, 700);
    }
  }, [activeIndex]);

  return (
    <section className="relative w-full bg-white py-24 md:py-48 overflow-hidden">
      <SectionLabel number="05" title="INSIGHTS" />
      <style>{noScrollbarStyle}</style>
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#F5F1EE] blur-[150px] rounded-full opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-[5%] mb-24 md:mb-40 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
        >
            <span className="text-[10px] font-black tracking-[1.2em] text-gray-400 uppercase">Archive Education</span>
            <h2 className="font-pretendard text-3xl md:text-[48px] font-bold tracking-tighter leading-[1.1] text-gray-900">
                인터넷에서 얻을 수 없는 정보, <br /> 
                <span className="text-gray-400">
                    KBEAUTYCHANNEL에선 <br className="md:hidden" /> 모두 말해드리겠습니다.
                </span>
            </h2>
        </motion.div>
      </div>

      {/* Infinite Horizontal Gallery */}
      <div 
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative z-10 w-full overflow-x-auto hide-scrollbar"
      >
        <div className="flex items-center gap-12 w-max px-[20vw] pb-32 min-h-[700px]">
          {infiniteData.map((item, idx) => (
            <VideoCard key={`${item.id}-${idx}`} item={item} isActive={activeIndex === idx} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[10px] font-black tracking-[0.5em] text-gray-300 uppercase z-10">
         <span>Swipe or Flow</span>
         <div className="w-12 h-px bg-gray-100" />
         <span className="text-gray-900">Cinematic Experience</span>
      </div>
    </section>
  );
}
