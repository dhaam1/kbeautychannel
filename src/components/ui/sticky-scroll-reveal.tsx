"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

const HEADER_TOTAL = '126px';
const SECTION_HEADING_TOP = '70px';

export const StickyScroll = ({
  content,
  contentClassName,
  heading,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  heading?: React.ReactNode;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 스크롤 진행률 측정
  // offset을 조정하여 애니메이션 시작/끝 시점 조정
  // 첫 번째 요소가 중앙에 올 때 시작, 다섯 번째 요소가 중앙에 올 때 끝
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.5', 'end 0.5'],
  });

  // 텍스트 리스트 Y축 이동 값 매핑
  // 스크롤 진행률에 따라 텍스트 리스트를 위로 이동
  // 진행률 0 -> 0% (제자리)
  // 진행률 1 -> -60% (위로 올라감, 콘텐츠 길이에 맞춰 조절)
  const yRange = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  // 활성 카드 인덱스 계산
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = 1 / content.length;
    const currentIndex = Math.min(
      Math.floor(latest / step),
      content.length - 1
    );
    setActiveCard(currentIndex);
  });

  const backgroundColors = [
    "rgba(0, 0, 0, 1)", // 검정색
    "rgba(0, 0, 0, 1)", // 검정색
    "rgba(0, 0, 0, 1)", // 검정색
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
  ];

  const backgroundGradient = linearGradients[activeCard % linearGradients.length];


  // 섹션 높이: 스크롤 트랙 역할 (콘텐츠 길이에 맞춰 조절 가능)
  // 5개 카드 기준으로 350svh 설정 (카드 간격 15svh로 줄어든 것을 반영)
  return (
    <div ref={sectionRef} className="h-[350svh]">
      <div 
        className="sticky top-0 h-screen-safe flex justify-center items-center overflow-hidden"
        style={{
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          contain: 'layout style paint',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {heading && (
          <div
            className="absolute left-[80px] z-10"
            style={{
              top: `calc(${HEADER_TOTAL} + ${SECTION_HEADING_TOP})`
            }}
          >
            {heading}
          </div>
        )}
        <motion.div
          animate={{
            backgroundColor: backgroundColors[activeCard % backgroundColors.length],
          }}
          className="relative flex h-full justify-center w-full max-w-[1472px]"
        >
          <div className="relative flex items-start flex-1 min-w-0">
            <motion.div
              style={{ y: yRange }}
              className="w-full max-w-none overflow-hidden flex flex-col items-end"
            >
              <div className="pt-[30svh]">
                {content.map((item, index) => {
                  const isFirst = index === 0;
                  const isLast = index === content.length - 1;
                  
                  return (
                  <motion.div
                    key={item.title + index}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className={`flex flex-col relative ${
                      isFirst ? 'mt-[50svh] mb-[15svh]' : 
                      isLast ? 'mb-[50svh]' : 
                      'mb-[15svh]'
                    }`}
                  >
                    {/* 첫 번째 요소: 상단 하얀색 선 */}
                    <div className="w-[262px] h-[0.5px] bg-white" />
                    
                    {/* 두 번째 요소: description 텍스트 */}
                    <p
                      className="text-white pt-[30px] pl-[18px] pr-[81px] whitespace-pre-line"
                      style={{
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.18px',
                      }}
                    >
                      {item.description}
                    </p>
                    
                    {/* 세 번째 요소: row (title + SVG) */}
                    <div className="flex flex-row items-center gap-[6px] pl-[18px] pb-[30px]">
                      <h3
                        className="text-white"
                        style={{
                          fontSize: '23px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '30px',
                          letterSpacing: '-0.23px',
                        }}
                      >
                        {item.title}
                      </h3>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                      >
                        <g clipPath={`url(#clip0_2054_16767_${index})`}>
                          <path
                            d="M5.88163 10.3411C3.57388 10.482 1.70163 12.682 1.70163 15.0184V17.9002C1.70163 18.5047 1.21673 18.9957 0.619592 18.9957H0V19.832H10.6139V14.8457C10.6139 12.2638 8.46776 10.1866 5.88163 10.3411Z"
                            fill="white"
                          />
                          <path
                            d="M15.8894 10.332C13.429 10.332 11.4355 12.3502 11.4355 14.8411V19.8275H15.8894C18.3498 19.8275 20.3433 17.8093 20.3433 15.3184V14.8411C20.3433 12.3502 18.3498 10.332 15.8894 10.332Z"
                            fill="white"
                          />
                          <path
                            d="M1.69714 1.93182V4.81364C1.69714 7.15454 3.56939 9.35454 5.87714 9.49091C8.46327 9.65 10.6094 7.57273 10.6094 4.98636V0H0V0.836364H0.615102C1.21224 0.836364 1.69714 1.32727 1.69714 1.93182Z"
                            fill="white"
                          />
                          <path
                            d="M15.8894 0H11.4355V4.98636C11.4355 7.47727 13.429 9.49545 15.8894 9.49545C18.3498 9.49545 20.3433 7.47727 20.3433 4.98636V4.50909C20.3433 2.01818 18.3498 0 15.8894 0Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id={`clip0_2054_16767_${index}`}>
                            <rect width="22" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    
                    {/* 네 번째 요소: 하단 하얀색 선 */}
                    <div className="w-[262px] h-[0.5px] bg-white" />
                    
                    {/* 마지막 카드에만 하단 패딩 추가 */}
                    {isLast && <div className="h-screen-safe" />}
                  </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
          <div
            style={{ background: backgroundGradient }}
            className={cn(
              "hidden h-full w-1/2 overflow-hidden bg-white lg:block flex-shrink-0",
              contentClassName,
            )}
          >
            {content[activeCard].content ?? null}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
