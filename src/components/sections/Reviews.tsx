import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

// --- Types & Data ---
interface Review {
  id: number;
  quote: string;
  author: string;
  treatment: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 1,
    quote: "단순히 예뻐지는 것을 넘어, 분위기 전체가 고급스러워졌다는 말을 듣습니다.",
    author: "Private Client A",
    treatment: "SIGNATURE LIFTING"
  },
  {
    id: 2,
    quote: "공장형 클리닉과는 완전히 다른 차원. 고유한 선을 살리는 아름다운 과정.",
    author: "Private Client B",
    treatment: "CONTOURING"
  },
  {
    id: 3,
    quote: "이런 세심함은 처음입니다. 하나의 하이엔드 서비스를 받는 느낌이었어요.",
    author: "Private Client C",
    treatment: "SKIN BOOSTER"
  }
];

// --- Final Design: Kinetic Typography ---
const KineticTypography = ({ reviews }: { reviews: Review[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xLeftFast = useTransform(scrollYProgress, [0, 1], [1000, -1000]);
  const xRightFast = useTransform(scrollYProgress, [0, 1], [-1000, 1000]);
  const xLeftSlow = useTransform(scrollYProgress, [0, 1], [400, -400]);
  const xRightSlow = useTransform(scrollYProgress, [0, 1], [-400, 400]);

  const rows = [
    { x: xLeftFast },
    { x: xRightSlow },
    { x: xLeftSlow },
    { x: xRightFast },
  ];

  return (
    <div ref={containerRef} className="py-24 md:py-48 bg-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="flex flex-col gap-6 md:gap-12 relative z-10">
        {rows.map((row, i) => (
          <motion.div key={i} style={{ x: row.x }} className="whitespace-nowrap flex gap-16 group">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="flex items-center gap-16">
                <span className={`
                  font-serif text-5xl md:text-8xl lg:text-[10rem] tracking-tighter select-none transition-all duration-700
                  ${i % 2 === 0 ? 'text-gray-100 italic' : 'font-bold text-gray-200'}
                  group-hover:text-gray-900 group-hover:italic
                `}>
                  {reviews[i % reviews.length].quote}
                </span>
                <div className="w-4 h-4 rounded-full bg-gray-100 group-hover:bg-gray-900 transition-colors duration-700" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-[5%] mt-32 flex justify-between items-end relative z-10">
         <div className="flex flex-col gap-2">
            <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-black">Scroll Experience</p>
            <h4 className="font-serif italic text-2xl text-gray-400">Voices of Elegance</h4>
         </div>
         <p className="max-w-xs text-right text-xs leading-relaxed text-gray-300 font-medium">
            KBEAUTYCHANNEL을 경험한 분들의 <br /> 진실된 고백을 타이포그래피로 재해석했습니다.
         </p>
      </div>
    </div>
  );
};

export default function Reviews() {
  const reviews = REVIEWS_DATA;

  return (
    <section className="relative w-full overflow-hidden">
      <SectionLabel number="06" title="REVIEWS" />
      <KineticTypography reviews={reviews} />
    </section>
  );
}
