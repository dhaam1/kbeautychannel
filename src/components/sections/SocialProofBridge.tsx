'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

// --- Real Data ---
const PROOF_DATA = [
  { label: '리프팅', value: 14425, unit: '건', desc: '풍부한 임상 경험과 결과의 차이' },
  { label: '필러', value: 13144, unit: '건', desc: '개개인의 윤곽을 고려한 섬세한 디자인' },
  { label: '스킨부스터', value: 10479, unit: '건', desc: '피부 본연의 광채를 되찾는 솔루션' },
];

const TOTAL_VALUE = PROOF_DATA.reduce((acc, curr) => acc + curr.value, 0);

const VIDEO_SRC = "/assets/videos/kbeautychannel-proof.webm";

// --- Helper Components ---
const Counter = ({ value, duration = 3, className = "" }: { value: number; duration?: number; className?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { 
        duration, 
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => {
          // 실시간으로 숫자가 늘어나는 프리미엄 효과 유지
          animate(count, value + 1000, {
            duration: 1000 * 10,
            ease: "linear",
            repeat: Infinity
          });
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, count, duration]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
};

// --- Main Component: SocialProofBridge ---
export default function SocialProofBridge() {
  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[90vh] flex items-center">
      <SectionLabel number="04" title="SOCIAL PROOF" />
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover grayscale-[0.4] brightness-[0.7]"
          >
            <source src={VIDEO_SRC} type="video/webm" />
          </video>
          {/* Immersive Side Gradient for Readability */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        </div>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-[8%] py-32 lg:py-48">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           viewport={{ once: true }}
           className="max-w-2xl"
        >
          {/* Logo Icon & Text */}
          <div className="flex items-center gap-2 mb-10">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2.5 h-2.5 bg-white flex-shrink-0" />
              <div className="w-2.5 h-2.5 bg-gray-400/30 flex-shrink-0" />
              <div className="w-2.5 h-2.5 bg-gray-400/30 flex-shrink-0" />
              <div className="w-2.5 h-2.5 bg-white flex-shrink-0" />
            </div>
            <span className="text-[16px] font-pretendard text-white tracking-tight font-medium uppercase">KBEAUTYCHANNEL Archive</span>
          </div>

          {/* Cumulative Counter */}
          <div className="flex flex-col mb-12 relative">
            <h2 className="text-[64px] md:text-[100px] font-serif text-white leading-none tracking-tighter">
              <Counter value={TOTAL_VALUE} duration={2.5} />
            </h2>
            <span className="absolute -bottom-6 left-1 text-[16px] text-white/60 font-pretendard uppercase tracking-[0.2em] opacity-70">
              Verified Treatment Archives
            </span>
          </div>

          {/* Main Copy */}
          <div className="mt-20 mb-16">
            <p className="text-[18px] md:text-[24px] font-pretendard font-medium text-white leading-[1.5] tracking-tight">
              수만 건의 임상을 바탕으로 말씀드립니다.<br />
              미용 피부는 제가 제일 잘 압니다.
            </p>
          </div>

          {/* Data List Items */}
          <div className="border-l-2 border-white/20 pl-10 space-y-8">
            {PROOF_DATA.map((item, idx) => (
              <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -10 }} 
                 whileInView={{ opacity: 1, x: 0 }} 
                 transition={{ delay: 0.5 + idx * 0.2, duration: 0.8 }}
                 viewport={{ once: true }}
                 className="flex flex-col gap-1"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[16px] font-bold text-white/50 uppercase tracking-[0.35em]">{item.label}</span>
                  <span className="text-[24px] md:text-[32px] font-sans font-light text-white">
                    <Counter value={item.value} duration={2} />
                    <span className="text-[16px] ml-1 opacity-40 font-medium">{item.unit}</span>
                  </span>
                </div>
                <p className="text-[16px] text-white/60 font-pretendard font-normal tracking-tight opacity-80">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
