'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import SectionLabel from '../common/SectionLabel';
import { Feature } from '../../constants/procedures';

interface ProcedureCollectionSectionProps {
  features: Feature[];
  sectionNumber?: string;
  sectionTitle?: string;
  targetBgImage?: string;
}

export default function ProcedureCollectionSection({
  features,
  sectionNumber = "02",
  sectionTitle = "COLLECTION",
  targetBgImage = "/images/uhcell-01.png"
}: ProcedureCollectionSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = features[selectedIdx];
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      {/* Sticky Navigator */}
      <div className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 py-6 px-[5%]">
        <div className="max-w-[1600px] mx-auto flex flex-col items-center gap-6">
          <div className="overflow-x-auto hide-scrollbar w-full flex justify-center">
            <div className="flex gap-6 md:gap-10">
              {features.map((f, idx) => (
                <button
                  key={f.title}
                  onClick={() => handleSelect(idx)}
                  className={`whitespace-nowrap text-[14px] font-bold tracking-tight transition-all duration-300 ${
                    selectedIdx === idx ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {f.title}
                  {selectedIdx === idx && (
                    <motion.div layoutId="nav-active" className="h-[2px] bg-black mt-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Content Stack */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          {/* Section 01. Editorial Overview (Reference 2 Style) */}
          <section className="relative z-10 w-full min-h-[90vh] bg-white flex flex-col md:flex-row border-b border-gray-100">
            {/* Left Content Column */}
            <div className="md:w-1/2 p-[5%] flex flex-col justify-center">
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-[32px] md:text-[48px] font-bold text-black mb-2">{current.title}</h3>
                  <p className="text-[14px] font-bold text-gray-300 uppercase tracking-widest mb-12">{current.enTitle || current.title}</p>
                  
                  <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed font-medium mb-12 break-keep">
                    {current.description}
                  </p>

                  <button className="px-8 py-3 border border-gray-200 rounded-lg text-[14px] font-bold text-gray-500 hover:bg-gray-50 transition-all mb-20">
                    유튜브로 자세히 보기
                  </button>
                </motion.div>

                {/* Minimalist Spec Bar (Reference 2 Content) */}
                <div className="flex flex-wrap gap-12 md:gap-20 border-l-2 border-gray-100 pl-10 mt-20">
                  {[
                    { label: 'AREA', value: current.recommendedArea },
                    { label: 'DURATION', value: current.duration },
                    { label: 'ANESTHESIA', value: current.anesthesia },
                    { label: 'DOWNTIME', value: current.downtime }
                  ].map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-2">
                      <span className="text-[11px] font-bold tracking-widest text-gray-300 uppercase">{spec.label}</span>
                      <span className="text-[16px] md:text-[20px] font-bold text-black whitespace-nowrap break-keep">{spec.value || '-'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Illustration Column */}
            <div className="md:w-1/2 bg-gray-50 flex items-center justify-center overflow-hidden">
              <motion.img 
                key={current.title}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src={current.image || '/images/lifting_texture.png'} 
                className="w-full h-full object-cover"
                alt={`${current.title} Treatment Effect`}
              />
            </div>
          </section>

          {/* Section 02. Cinematic Targets & Specs (Reference 2 Style) */}
          <section className="relative z-10 w-full min-h-screen flex flex-col justify-between py-32 px-[5%] overflow-hidden">
            {/* Background Image with Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={targetBgImage} 
                className="w-full h-full object-cover"
                alt="Luxury Medical Background"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto w-full flex-grow flex flex-col justify-center">
              {/* Header: Philosophy & Specs */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-20 mb-32">
                <div className="max-w-2xl">
                  <motion.h3 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[40px] md:text-[48px] font-bold text-white leading-[1.2] mb-8 break-keep"
                  >
                    이런 분들께서<br/>많이들 찾으십니다.
                  </motion.h3>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="text-[16px] md:text-[18px] text-white/50 font-medium leading-relaxed max-w-lg"
                  >
                    UHCELL은 피부 위에 쏟는 시간과 정성을 이해하며,<br/>
                    당신만을 위한 가장 섬세한 해답을 찾아갑니다.
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Bottom: Horizontal Targets List */}
            <div className="relative z-10 max-w-[1600px] mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {current.targets?.slice(0, 4).map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    {/* Horizontal Line above */}
                    <div className="w-full h-[1px] bg-white/20 mb-8 relative overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '0%' }}
                        transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                        className="absolute inset-0 bg-white"
                      />
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[14px] font-bold text-white/30">0{i+1}</span>
                      <div className="flex flex-col gap-2">
                        <p className="text-[18px] md:text-[20px] font-bold text-white leading-snug break-keep group-hover:text-white/80 transition-colors">
                          {t}
                        </p>
                        <p className="text-[13px] text-white/40 leading-relaxed max-w-[200px]">
                          전문 의료진의 정교한 진단을 통해 최적의 결과를 도출합니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 03. Effects (Fixed to Style A) */}
          <EffectsStyleA effects={current.effects} />

          {/* Section 04. QnA (Fixed to Style B) */}
          <QnaStyleB qna={current.qna} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Effects Style A: Sticky Scrollytelling (Cinematic Fade-up)                 */
/* -------------------------------------------------------------------------- */
function EffectsStyleA({ effects }: { effects?: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const total = effects?.length || 1;
  const containerHeight = `${total * 100}vh`;

  return (
    <section ref={containerRef} className="relative z-10 bg-black" style={{ height: containerHeight }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Animated Background */}
        <SineWaveBackground scrollYProgress={scrollYProgress} />

        <div className="absolute top-24 left-0 w-full z-20 px-[5%]">
          <h3 className="text-[12px] font-bold tracking-[0.8em] text-white/30 uppercase text-center">Treatment Excellence</h3>
        </div>

        <div className="relative z-10 flex items-center justify-center w-full h-full max-w-[1400px] mx-auto">
          {effects?.map((e, i) => (
            <EffectItem 
              key={i} 
              e={e} 
              i={i} 
              total={total} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EffectItem({ 
  e, i, total, scrollYProgress 
}: { 
  e: string, i: number, total: number, scrollYProgress: any
}) {
  const start = (i - 0.5) / total;
  const peakStart = i / total;
  const peakEnd = (i + 0.5) / total;
  const end = i === total - 1 ? 2 : (i + 1) / total;

  // 배열 방식이 아닌 함수 방식으로 매핑하여 브라우저 WAAPI의 Offset 범위(0~1) 에러를 원천 차단합니다.
  const y1 = useTransform(scrollYProgress, (v: number) => {
    if (v <= start) return 200;
    if (v >= end) return -200;
    if (v >= peakStart && v <= peakEnd) return 0;
    if (v < peakStart) {
      return 200 * (1 - (v - start) / (peakStart - start));
    }
    return -200 * ((v - peakEnd) / (end - peakEnd));
  });

  const opacity = useTransform(scrollYProgress, (v: number) => {
    if (v <= start || v >= end) return 0;
    if (v >= peakStart && v <= peakEnd) return 1;
    if (v < peakStart) return (v - start) / (peakStart - start);
    return 1 - ((v - peakEnd) / (end - peakEnd));
  });

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-[5%]"
      style={{ opacity, zIndex: total - i }}
    >
      <motion.div style={{ y: y1 }} className="flex flex-col items-center text-center w-full">
         <span className="text-[120px] md:text-[180px] font-sans font-extrabold leading-none text-white/5 mb-[-60px] md:mb-[-100px]">{i + 1}</span>
         <p className="text-[32px] md:text-[48px] font-sans font-bold text-white uppercase tracking-tighter relative z-10 break-keep">{e}</p>
      </motion.div>
    </motion.div>
  );
}

function SineWaveBackground({ scrollYProgress }: { scrollYProgress: any }) {
  // 스크롤이 진행됨에 따라 배경 색상(Hue)과 크기가 유동적으로 변환됨
  const filter = useTransform(scrollYProgress, (v: number) => `hue-rotate(${v * 240}deg)`);
  const scale = useTransform(scrollYProgress, (v: number) => {
    if (v < 0.5) return 1 + (v / 0.5) * 0.3;
    return 1.3 - ((v - 0.5) / 0.5) * 0.3;
  });

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none flex items-center justify-center z-0"
      style={{ filter, scale }}
    >
      <svg className="w-full h-full min-w-[800px]" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M 0,50 Q 25,${30 + i * 8} 50,50 T 100,50`}
            stroke={`rgba(${120 + i*15}, ${160 + i*10}, 255, 0.4)`}
            strokeWidth="0.1"
            fill="transparent"
            animate={{
              d: [
                `M 0,50 Q 25,${30 + i * 8} 50,50 T 100,50`,
                `M 0,50 Q 25,${70 - i * 8} 50,50 T 100,50`,
                `M 0,50 Q 25,${30 + i * 8} 50,50 T 100,50`
              ]
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5 
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* QnA Style B: Floating Bubbles (Modern)                                     */
/* -------------------------------------------------------------------------- */
function QnaStyleB({ qna }: { qna?: { q: string; a: string }[] }) {
  return (
    <section className="relative z-10 bg-[#f4f4f7] py-40 px-[5%]">
      <div className="max-w-4xl mx-auto flex flex-col gap-20">
        <h3 className="text-[12px] font-bold tracking-[0.6em] text-gray-400 text-center uppercase">Communication</h3>
        {qna?.map((item, i) => (
          <div key={i} className="flex flex-col gap-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
              className="self-start bg-white p-8 px-10 rounded-[30px] rounded-bl-none shadow-sm border border-gray-100 max-w-[80%]"
            >
              <p className="text-[18px] font-bold">Q. {item.q}</p>
            </motion.div>
            <motion.div 
              initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="self-end bg-black text-white p-8 px-10 rounded-[30px] rounded-br-none shadow-xl max-w-[80%]"
            >
              <p className="text-[18px] leading-relaxed text-white/80">{item.a}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
