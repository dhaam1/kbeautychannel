'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Settings2 } from 'lucide-react';

const REVIEWS = [
  { id: 1, title: '써마지 FLX 리프팅', image: '/images/reviews/review_card_skin_1_1776875174630.png', desc: '처진 피부 탄력을 되찾아주는 프리미엄 리프팅 솔루션', letter: 'U' },
  { id: 2, title: '울쎄라 타이트닝', image: '/images/reviews/review_card_skin_2_1776875188901.png', desc: '속부터 차오르는 탄력, 정교한 초음파 리프팅', letter: 'H' },
  { id: 3, title: '쥬베룩 볼륨', image: '/images/reviews/review_card_skin_3_1776875206372.png', desc: '자연스러운 볼륨감과 피부 결 개선을 동시에', letter: 'C' },
  { id: 4, title: '리쥬란 힐러', image: '/images/reviews/review_card_skin_4_1776875226599.png', desc: '손상된 피부 내부의 생리적 조건을 개선하는 스킨 부스터', letter: 'E' },
  { id: 5, title: '티타늄 리프팅', image: '/images/reviews/review_card_skin_5_1776875242705.png', desc: '세 가지 파장으로 리프팅, 타이트닝, 화이트닝까지', letter: 'L' },
  { id: 6, title: '인모드 리프팅', image: '/images/reviews/review_card_skin_6_1776875257420.png', desc: '불필요한 지방은 줄이고 탄력은 높이는 이중 효과', letter: 'L' },
  { id: 7, title: '튠페이스 리프팅', image: '/images/reviews/review_card_skin_1_1776875174630.png', desc: '입체적인 페이스 라인을 완성하는 멀티 리프팅', letter: 'C' },
  { id: 8, title: '올리지오 리프팅', image: '/images/reviews/review_card_skin_2_1776875188901.png', desc: '한국인 피부 타입에 최적화된 고주파 탄력 리프팅', letter: 'L' },
  { id: 9, title: '슈링크 유니버스', image: '/images/reviews/review_card_skin_3_1776875206372.png', desc: '빠르고 섬세한 초음파 리프팅 기술', letter: 'I' },
  { id: 10, title: '피코슈어 토닝', image: '/images/reviews/review_card_skin_4_1776875226599.png', desc: '색소 병변만을 정교하게 제거하는 프리미엄 토닝', letter: 'N' },
  { id: 11, title: '프리미엄 보톡스', image: '/images/reviews/review_card_skin_5_1776875242705.png', desc: '자연스러운 근육 축소와 주름 개선 효과', letter: 'I' },
  { id: 12, title: '내추럴 필러', image: '/images/reviews/review_card_skin_6_1776875257420.png', desc: '부족한 볼륨을 채워 입체감을 살리는 정교한 디자인', letter: 'C' },
];

// Duplicate for infinite loop
const DUPLICATED_REVIEWS = [...REVIEWS, ...REVIEWS];

export default function ReviewsArchive() {
  const FOLDED_WIDTH = 220;
  const EXPANDED_WIDTH = 520;
  const GAP = 16;

  return (
    <section className="bg-[#f8f7f4] pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      <div className="px-[5%] max-w-[1400px] mx-auto mb-20">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="text-[16px] font-black tracking-[0.2em] text-black uppercase">
            KBEAUTY
          </span>
          <span className="text-[16px] font-black tracking-[0.2em] text-black uppercase opacity-60">
            OUR PROCEDURES
          </span>
        </motion.div>

        {/* Title Row */}
        <div className="flex justify-between items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-[48px] md:text-[68px] font-bold text-gray-900 leading-[1] tracking-tighter"
          >
            시술 아카이브
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="px-6 py-2.5 rounded-lg border border-gray-200 bg-gray-100/50 text-[16px] font-bold text-gray-600 hover:bg-white hover:border-gray-900 transition-all shadow-sm"
          >
            시술 둘러보기
          </motion.button>
        </div>

        {/* Sub-copy & Info Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-12 border-t border-gray-200/50">
          <div className="max-w-2xl">
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-[18px] md:text-[22px] font-bold text-gray-900 mb-4 tracking-tight"
            >
              경험의 가치가 투명한 KBEAUTY
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-[16px] md:text-[16px] text-gray-500 leading-relaxed break-keep font-medium opacity-80"
            >
              K뷰티채널은 높은 수준의 의료 서비스를 투명한 가격으로 제공하는 것을 <br className="hidden md:block" />
              원칙으로 하여 고객님께 신뢰할 수 있는 의료 서비스를 약속드립니다.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-lg border border-gray-100 text-[16px] font-bold text-gray-400 tracking-wider shadow-sm"
          >
            <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
            </svg>
            마우스를 올려 자세히 알아보세요
          </motion.div>
        </div>
      </div>

      {/* Infinite Loop Marquee with Center Expansion */}
      <div className="relative w-full h-[650px] flex items-center mt-10">
        <motion.div
          animate={{
            x: [0, -((FOLDED_WIDTH + GAP) * REVIEWS.length)],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 px-[5vw] hover:[animation-play-state:paused]"
        >
          {DUPLICATED_REVIEWS.map((review, idx) => (
            <ReviewCard 
              key={`${review.id}-${idx}`} 
              review={review} 
              foldedWidth={FOLDED_WIDTH}
              expandedWidth={EXPANDED_WIDTH}
            />
          ))}
        </motion.div>
      </div>


      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ review, foldedWidth, expandedWidth }: { review: any, foldedWidth: number, expandedWidth: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAtCenter, setIsAtCenter] = useState(false);

  useEffect(() => {
    const checkCenter = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const viewportCenter = window.innerWidth / 2;
      
      const threshold = 150; 
      setIsAtCenter(Math.abs(cardCenter - viewportCenter) < threshold);
    };

    const interval = setInterval(checkCenter, 50);
    return () => clearInterval(interval);
  }, []);

  const isActive = isAtCenter || isHovered;

  return (
    <motion.div
      ref={cardRef}
      animate={{
        width: isActive ? expandedWidth : foldedWidth,
      }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 h-[560px] relative rounded-[3.5rem] overflow-hidden cursor-pointer group shadow-[0_40px_80px_rgba(0,0,0,0.08)]"
    >
      {/* Background Image - Only visible when active */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 1.1,
        }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={review.image}
          alt={review.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </motion.div>
      
      {/* Solid Cover Layer - Midnight Noir (#0D0E0E) */}
      <motion.div 
        animate={{
          backgroundColor: isActive ? 'rgba(0, 0, 0, 0.6)' : '#0D0E0E',
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-10 pointer-events-none" 
      />

      {/* Cover Letter (Folded State) - Center Spellings */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
          >
            <span className="text-[140px] md:text-[160px] font-sans font-black text-white/90 select-none tracking-tighter leading-none">
              {review.letter}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col justify-between z-10 overflow-hidden">
        <div className="flex justify-between items-start w-full">
          <motion.h4 
            animate={{ 
              opacity: isActive ? 1 : 0, 
              y: isActive ? 0 : 20,
              x: isActive ? 0 : -20
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-bold text-2xl md:text-3xl tracking-tight whitespace-nowrap"
          >
            {review.title}
          </motion.h4>
          <motion.div 
            animate={{ 
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.5
            }}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white text-3xl font-light group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0"
          >
            +
          </motion.div>
        </div>
        
        {/* Floating Letter (Folded Cover Style) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.span 
            animate={{ 
              scale: isActive ? 1.6 : 1,
              opacity: isActive ? 0.1 : 0.04,
              rotate: isActive ? 0 : -90
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[320px] font-black text-white tracking-tighter select-none leading-none"
          >
            {review.letter}
          </motion.span>
        </div>


        <div className="relative h-28">
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[85%]"
              >
                <p className="text-white/80 text-[16px] leading-relaxed break-keep mb-6 line-clamp-2">
                  {review.desc}
                </p>
                <button className="text-white text-[16px] font-bold tracking-[0.3em] uppercase border-b border-white/40 pb-2 hover:border-white transition-colors">
                  View Detail
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
