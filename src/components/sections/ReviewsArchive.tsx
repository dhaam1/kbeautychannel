'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Settings2, Quote, User, ClipboardCheck, Sparkles } from 'lucide-react';

const REVIEWS = [
  { 
    id: 1, 
    userName: 'ゆうこ*え', 
    visitCount: '네번째 방문',
    meta: '20대 / 여',
    procedures: '울쎄라 / 리쥬란 시술',
    content: '네번째 방문입니다. 상담 선생님의 말씀도 정말 상냥하고 섬세했고 저에게 맞는, 필수적인 시술만 소개해주시고 제가 말한 예산을 고려하여 제안해주셨습니다. 상담 선생님이 일본분이셨기에 섬세한 뉘앙스도 전해져 이야기하기가 쉬웠습니다. 이번에 대표원장님께서 시술을 받아 대만족의 효과를 느끼고 있습니다♡',
    image: '/review_bg_minimal_1_1776942314152.png', 
    letter: 'U' 
  },
  { 
    id: 2, 
    userName: 'sena s*o', 
    visitCount: '첫번째 방문',
    meta: '30대 / 여',
    procedures: '사각턱 보톡스 / 인모드',
    content: '사각턱 보톡스랑 인모드 받았습니다! 벌써부터 효과가 보이는게 만족도 100%에요 !! 통증은 거의 없다고 생각하심 됩니다! 나이가 먹으니 주름이랑 볼패임은 진짜 어쩔수가 없더라구요. 성형 생각해 본 적 없는데 피부 쳐지고 늙어보이는건 너무 싫어서 정말 고민 많이하다가 찾게 되었어요. 후회 없습니다 ♬',
    image: '/review_bg_minimal_2_1776942327870.png', 
    letter: 'S' 
  },
  { 
    id: 3, 
    userName: 'osa os*', 
    visitCount: '첫번째 방문',
    meta: '20대 / 여',
    procedures: '스킨부스터 시술',
    content: '얼굴과 피부 관리를 위해 처음 방문했습니다. 아무것도 필요하지 않다고 해서 예상보다 적은 양의 스킨 부스터만 필요했습니다. 의사 선생님과 통역사 모두 친절하고 편안하게 상담해 주셨습니다. 관리 중에도 제 피부 고민을 잘 들어주시고 다양한 무료 서비스를 제공해 주셔서 정말 만족스러웠습니다. 가성비 좋은 3회권 패키지를 구매했는데, 다음 방문이 기대됩니다. 정말 감사합니다. ☺️🩷',
    image: '/review_bg_minimal_3_1776942342044.png', 
    letter: 'O' 
  },
  { 
    id: 4, 
    userName: '匿名さん', 
    visitCount: '첫번째 방문',
    meta: '30대 / 여',
    procedures: '올리지오X / 하이푸 / 스킨보톡스',
    content: '수많은 한국의 클리닉 안에서 이 병원을 찾게되어 다행이라고 생각합니다. 한국에 오기전 유튜브에서 원장 선생님의 동영상을 전부 보고 이곳으로 오기로 결정했습니다. 처짐이 가장 신경쓰였기 때문에 올리지오X와 하이푸를 받기로 했습니다. 스킨보톡스도 추가해 연어주사를 서비스로 받았습니다. 시술 후 곧바로 효과를 느꼈고, 내일 더 서서히 효과가 나오는것이 기대됩니다. 시술은 개인실에서 가능하고 일본어 통역도 친절해 또 방문할 예정입니다. 감사합니다!',
    image: '/review_bg_minimal_1_1776942314152.png', 
    letter: 'T' 
  },
  { 
    id: 5, 
    userName: '匿名さん', 
    visitCount: '첫번째 방문',
    meta: '30대 / 여',
    procedures: '온다 / 울쎄라 시술',
    content: '처음 생각하고 왔던 시술이 아닌, 상담 선생님과 상담한 결과 온다와 울쎄라 시술을 받았습니다!역시 이게 정답이었다고 생각합니다✨ 완전 대만족!스탭분들도 전부 친절해서 안심하고 시술을 받을 수 있었습니다.',
    image: '/review_bg_minimal_2_1776942327870.png', 
    letter: 'H' 
  },
  { 
    id: 6, 
    userName: 'A. Tanaka', 
    visitCount: '두번째 방문',
    meta: '40대 / 여',
    procedures: '써마지FLX / 쥬베룩',
    content: '지난번 방문 때 결과가 너무 좋아서 다시 찾았습니다. 나이가 들면서 피부 탄력이 떨어지는 게 늘 고민이었는데, 써마지와 쥬베룩 조합을 추천해주셔서 믿고 진행했습니다. 시술 시 통증도 잘 케어해주시고, 무엇보다 과잉 진료 없이 저에게 꼭 필요한 시술만 제안해주시는 점이 가장 마음에 듭니다. 이번에도 대만족입니다!',
    image: '/review_bg_minimal_3_1776942342044.png', 
    letter: 'A' 
  },
];

// Multiply for perfectly seamless infinite loop on any screen size
const MULTIPLIED_REVIEWS = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

export default function ReviewsArchive() {
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const FOLDED_WIDTH = 220;
  const EXPANDED_WIDTH = 580; 
  const GAP = 16;
  const SINGLE_SET_WIDTH = (FOLDED_WIDTH + GAP) * REVIEWS.length;

  return (
    <section className="bg-white pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden relative">
      <div className="px-[5%] max-w-[1400px] mx-auto mb-20">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="text-[16px] font-bold tracking-[0.2em] text-black uppercase">
            KBEAUTY
          </span>
          <span className="text-[16px] font-bold tracking-[0.2em] text-black uppercase opacity-60">
            CLIENT STORIES
          </span>
        </motion.div>

        {/* Title Row */}
        <div className="flex justify-between items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-[48px] md:text-[48px] font-bold text-gray-900 leading-[1.1] tracking-tighter"
          >
            결과로 증명하는,<br />
            진심이 담긴 후기들.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex flex-col items-end gap-2"
          >
            <span className="text-[16px] font-bold text-gray-400 tracking-widest uppercase">Experience Growth</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 tracking-tighter">38,000+</span>
              <span className="text-gray-400 font-medium">Verified Cases</span>
            </div>
          </motion.div>
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
              기대 그 이상의 가치를 경험한 고객님들의 이야기
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-[16px] md:text-[16px] text-gray-500 leading-relaxed break-keep font-medium opacity-80"
            >
              단순한 변화를 넘어 자존감까지 회복해드리는 것을 목표로 합니다.<br className="hidden md:block" />
              정직한 상담과 정교한 시술이 만든 결과, 직접 확인해 보세요.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-lg border border-gray-100 text-[16px] font-bold text-gray-400 tracking-wider shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-orange-300" />
            Hover to read full stories
          </motion.div>
        </div>
      </div>

      {/* Infinite Loop Marquee with Center Expansion */}
      <div className="relative w-full h-[650px] flex items-center mt-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, -SINGLE_SET_WIDTH],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {MULTIPLIED_REVIEWS.map((review, idx) => (
            <ReviewCard 
              key={`${review.id}-${idx}`} 
              review={review} 
              foldedWidth={FOLDED_WIDTH}
              expandedWidth={EXPANDED_WIDTH}
              isAnyHovered={isAnyHovered}
              setIsAnyHovered={setIsAnyHovered}
              option={2}
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

function ReviewCard({ 
  review, 
  foldedWidth, 
  expandedWidth,
  isAnyHovered,
  setIsAnyHovered,
  option
}: { 
  review: any, 
  foldedWidth: number, 
  expandedWidth: number,
  isAnyHovered: boolean,
  setIsAnyHovered: (val: boolean) => void,
  option: number
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAtCenter, setIsAtCenter] = useState(false);

  useEffect(() => {
    const checkCenter = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      
      // Use the LEFT edge as the reference point to avoid jitter when the card itself expands
      // We calculate the center based on the FOLDED width as a constant reference
      const cardCenter = rect.left + foldedWidth / 2;
      const viewportCenter = window.innerWidth / 2;
      
      const threshold = 180; // Opening threshold
      const hysteresis = 80; // Stay open threshold (prevents jitter)
      
      setIsAtCenter(prev => {
        const dist = Math.abs(cardCenter - viewportCenter);
        if (prev) {
          // If already open, keep it open as long as it's within the larger boundary
          return dist < threshold + hysteresis;
        } else {
          // Only open if it enters the smaller boundary
          return dist < threshold;
        }
      });
    };

    const interval = setInterval(checkCenter, 50);
    return () => clearInterval(interval);
  }, [foldedWidth]);

  const isActive = isHovered || (isAtCenter && !isAnyHovered);

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
      onMouseEnter={() => {
        setIsHovered(true);
        setIsAnyHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsAnyHovered(false);
      }}
      className="flex-shrink-0 h-[560px] relative rounded-[3.5rem] overflow-hidden cursor-pointer group shadow-[0_40px_80px_rgba(0,0,0,0.08)] bg-[#0D0E0E]"
    >
      {/* Background Image */}
      <motion.div
        animate={{
          opacity: isActive ? 0.4 : 0.2,
          scale: isActive ? 1 : 1.1,
          filter: isActive ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={review.image}
          alt={review.userName}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Content Rendering based on Option */}
      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between overflow-hidden">
        
        {/* FOLDED STATE (Always similar) */}
        <AnimatePresence>
          {!isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            >
              <span className="text-[120px] font-sans font-bold text-white/10 select-none tracking-tighter leading-none mb-4">
                {review.letter}
              </span>
              <div className="mt-auto">
                <p className="text-white/60 text-[16px] font-bold tracking-widest uppercase mb-1">{review.visitCount}</p>
                <p className="text-white font-bold text-[18px] tracking-tight">{review.userName}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXPANDED STATE */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col"
            >
              {option === 1 && <LayoutOption1 review={review} />}
              {option === 2 && <LayoutOption2 review={review} />}
              {option === 3 && <LayoutOption3 review={review} />}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

// Option 1: Editorial Minimal
function LayoutOption1({ review }: { review: any }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2"
        >
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[16px] font-bold text-white tracking-widest uppercase border border-white/20">
            {review.visitCount}
          </span>
          <h4 className="text-white text-3xl font-bold tracking-tight">{review.userName}</h4>
        </motion.div>
        <Quote className="text-white/20 w-12 h-12" />
      </div>

      <div className="flex-grow flex flex-col justify-center mt-8">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/90 text-[18px] md:text-[20px] font-pretendard leading-[1.6] break-keep font-medium"
        >
          &quot;{review.content}&quot;
        </motion.p>
      </div>

      <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <p className="text-white/40 text-[16px] font-bold tracking-widest uppercase">Target Treatment</p>
          <p className="text-white text-[16px] font-bold">{review.procedures}</p>
        </div>
        <span className="text-white/40 text-[16px] font-medium">{review.meta}</span>
      </div>
    </div>
  );
}

// Option 2: Professional Grid
function LayoutOption2({ review }: { review: any }) {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <User className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-white font-bold text-xl">{review.userName}</p>
            <p className="text-white/40 text-[16px] font-bold tracking-widest uppercase">{review.meta}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-orange-300 font-bold text-[16px]">{review.visitCount}</p>
          <p className="text-white/60 text-[16px]">{review.procedures}</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center bg-white/5 rounded-3xl p-8 backdrop-blur-md">
        <ClipboardCheck className="text-white/20 mb-4" />
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white/80 text-[17px] leading-relaxed break-keep line-clamp-6"
        >
          {review.content}
        </motion.p>
      </div>

      <div className="flex justify-end items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-300"></span>
        <span className="text-white/40 text-[16px] font-bold tracking-tighter uppercase">Verified Case Archive No.{review.id}</span>
      </div>
    </div>
  );
}

// Option 3: Modern Letter
function LayoutOption3({ review }: { review: any }) {
  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute -left-4 top-0 h-full w-[2px] bg-white/10" />
      
      <div className="pl-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {[review.visitCount, review.meta, review.procedures.split(' / ')[0]].map((tag, i) => (
            <span key={i} className="text-[16px] font-bold text-white/50 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>

        <motion.h4 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-5xl font-sans font-bold tracking-tighter mb-8 opacity-20"
        >
          Dear. UHCELL
        </motion.h4>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md"
        >
          <p className="text-white text-[19px] font-pretendard font-light leading-loose tracking-tight opacity-90">
            &quot;{review.content}&quot;
          </p>
        </motion.div>

        <div className="mt-12 flex items-center gap-4">
          <div className="w-10 h-[1px] bg-white/30" />
          <p className="text-white font-bold tracking-widest text-[16px]">{review.userName}</p>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0">
         <span className="text-[120px] font-sans font-bold text-white/[0.03] select-none tracking-tighter leading-none">
            {review.letter}
          </span>
      </div>
    </div>
  );
}
