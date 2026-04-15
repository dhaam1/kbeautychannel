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
// 선정된 4번 시안 레이아웃 + 실제 데이터 + 영상 통합
export default function SocialProofBridge() {
  return (
    <section className="relative w-full overflow-hidden bg-white min-h-[85vh] flex flex-col lg:flex-row">
      <SectionLabel number="04" title="SOCIAL PROOF" />
      
      {/* Left Content Column */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-[8%] py-32 lg:py-48">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Logo Icon & Text */}
          <div className="flex items-center gap-2 mb-10">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2.5 h-2.5 bg-gray-900 flex-shrink-0" />
              <div className="w-2.5 h-2.5 bg-gray-300 flex-shrink-0" />
              <div className="w-2.5 h-2.5 bg-gray-300 flex-shrink-0" />
              <div className="w-2.5 h-2.5 bg-gray-900 flex-shrink-0" />
            </div>
            <span className="text-[14px] font-pretendard text-gray-900 tracking-tight font-medium">KBEAUTYCHANNEL 아카이브</span>
          </div>

          {/* Large Counter */}
          <div className="flex flex-col mb-12 relative">
            <h2 className="text-[90px] md:text-[140px] font-serif text-gray-900 leading-none tracking-tighter">
              <Counter value={TOTAL_VALUE} duration={2.5} />
            </h2>
            <span className="absolute -bottom-6 left-1 text-[11px] text-gray-400 font-pretendard uppercase tracking-widest opacity-70">
              Total cumulative treatments as of now
            </span>
          </div>

          {/* Main Copy */}
          <div className="mt-20 mb-16">
            <p className="text-[20px] md:text-[26px] font-pretendard font-medium text-gray-900 leading-[1.4] tracking-tight">
              진정한 프리미엄은 숨기지 않습니다.<br />
              수만 건의 임상이 증명하는 결과의 차이.
            </p>
          </div>

          {/* List items with line */}
          <div className="border-l border-gray-900/10 pl-10 space-y-8">
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
                  <span className="text-[14px] font-black text-gray-300 uppercase tracking-widest">{item.label}</span>
                  <span className="text-[22px] md:text-[26px] font-sans font-light text-gray-900">
                    <Counter value={item.value} duration={2} />
                    <span className="text-[14px] ml-1 opacity-50">{item.unit}</span>
                  </span>
                </div>
                <p className="text-[13px] text-gray-400 font-pretendard font-light tracking-tight italic">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Video Column */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-auto overflow-hidden relative bg-gray-50">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 2 }}
           viewport={{ once: true }}
           className="w-full h-full"
        >
          {/* Overlay for premium tint */}
          <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
          
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover grayscale-[0.2] brightness-[1.05]"
          >
            <source 
              src="https://player.vimeo.com/external/494252666.hd.mp4?s=314a872658865c345b5969562916fdca328b9d47&profile_id=175" 
              type="video/mp4" 
            />
            {/* Fallback image */}
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Clinic Video Fallback" 
              className="w-full h-full object-cover"
            />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
