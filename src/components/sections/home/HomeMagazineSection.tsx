'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { VIEWPORT_CONFIG } from '@/lib/animationTiming';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

// ----------------------------------------------------------------------
// 유틸리티 함수: Throttle
// ----------------------------------------------------------------------
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}

// ----------------------------------------------------------------------
// 타입 정의
// ----------------------------------------------------------------------
interface MagazineItem {
  id: number;
  treatmentType: string;
  treatmentPeriod: string;
  quote: string;
  patientName: string;
  image: string;
  reviewTitle: string;
  reviewContent: string;
  alt: string;
}

interface MagazineCardProps {
  item: MagazineItem;
  labelDate: string;
  labelReadMore: string;
  link?: string;
}

// ----------------------------------------------------------------------
// 카드 컴포넌트
// ----------------------------------------------------------------------
import { Link } from '@/i18n/routing';

function MagazinePostCard({ item, labelDate, labelReadMore, link }: MagazineCardProps) {
  return (
    <div
      // [기존 유지] 크기 고정
      className="relative flex flex-col flex-shrink-0 w-full h-[484px] md:w-[340px] md:h-[530px] xl-custom:w-[300px] xl-custom:h-[484px]"
      style={{
        borderRadius: '0px',
      }}
    >
      <div
        // [수정] 테두리 투명도 50% 적용 (border-black/50)
        className="relative flex-shrink-0 w-full aspect-[300/220] md:h-[250px] xl-custom:h-[220px] bg-gray-100 overflow-hidden"
        style={{
          borderRadius: '0px',
        }}
      >
        <Image
          src={item.image}
          alt={item.alt || item.treatmentType}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 340px"
        />
        {/* 오버레이가 필요하다면 여기에 추가 (이전 카드와 통일성 고려) */}
      </div>

      <div
        // [수정] 테두리 투명도 50% 적용
        className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] w-full h-full md:h-[280px] xl-custom:h-[264px]"
        style={{ backgroundColor: '#F3F3F6' }}
       
      >
        <h3
          style={{
            color: '#262626',
            fontSize: '20px', // [유지] 제목 20px
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.2px'
          }}
          className="mb-[12px] text-left whitespace-pre-line"
        >
          {item.treatmentType}
        </h3>

        {/* [수정] flex-grow 적용, 폰트 16px로 변경 */}
        <p
          className="flex-grow overflow-y-auto mb-4 text-left"
          style={{
            color: '#262626',
            fontSize: '16px', // 18px -> 16px 변경
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.16px'
          }}
        >
          {item.quote}
        </p>

        {/* [수정] absolute 제거, self-end 적용, Link 컴포넌트 사용 */}
        {link ? (
          <Link
            href={(link || '#') as any}
            className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity self-end"
            style={{
              color: '#262626',
              fontSize: '16px', // 18px -> 16px 변경
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.16px'
            }}
          >
            <span>&gt;</span>
            <span>{labelReadMore}</span>
          </Link>
        ) : (
          <p
            className="self-end"
            style={{
              color: '#262626',
              fontSize: '16px', // 18px -> 16px 변경
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.16px'
            }}
          >
            {labelReadMore}
          </p>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 메인 섹션 컴포넌트
// ----------------------------------------------------------------------
export function HomeMagazineSection() {
  const translations = useTranslations('magazine');
  const { fadeUp } = useResponsiveAnimation();

  // 데이터 로딩
  let magazineCases;
  try {
    magazineCases = translations.raw('cases');
  } catch (error) {
    magazineCases = [];
  }
  const items = Array.isArray(magazineCases) ? (magazineCases as MagazineItem[]) : [];

  // 텍스트 리소스
  const sectionTitle = translations('header.title.default');
  const sectionSubtitleLines = translations.raw('header.subtitle.desktop') as string[] || [];
  const dateLabel = translations('labels.date');
  const readMoreLabel = translations('labels.readMore');

  // 각 매거진 카드의 더보기 링크 (내부 블로그 라우트)
  const magazineLinks = [
    '/blog/doctor-column/라미네이트-장점-부작용-후기',
    '/blog/doctor-column/라미네이트-가격-39만원',
    '/blog/implant/전체-임플란트',
    '/blog/orthodontic/인비절라인-후기',
  ];

  const cardMotion = (index: number) => fadeUp({ delay: 0.3 + index * 0.1 });

  // ----------------------------------------------------------------------
  // 스크롤 및 로직 구현
  // ----------------------------------------------------------------------
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      const throttledCheckScrollPosition = throttle(checkScrollPosition, 150);
      container.addEventListener('scroll', throttledCheckScrollPosition, { passive: true });
      const observer = new ResizeObserver(() => checkScrollPosition());
      observer.observe(container);

      return () => {
        container.removeEventListener('scroll', throttledCheckScrollPosition);
        observer.disconnect();
      };
    }
  }, []);


  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 334;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(() => checkScrollPosition(), 350);
    }
  };

  const getButtonColor = (isActive: boolean) => ({
    fill: isActive ? '#C3C3CB' : 'rgba(215, 209, 204, 0.30)',
    stroke: isActive ? '#5A5A5A' : '#B3B3B3',
  });

  return (
    <section className="w-full bg-white">
      {/* 1. 상단 텍스트 영역 (가운데 정렬) */}
      <div
        className="mx-auto w-full px-[30px] md:px-[80px] pt-[60px] md:pt-[80px] max-w-content"
      >
        <div className="flex flex-col items-center text-center w-full pb-[35px]">
          <motion.h2
            {...fadeUp({ y: 20, delay: 0, viewport: VIEWPORT_CONFIG })}
            className="text-[18px] md:text-[18px] font-normal tracking-[-0.18px] md:tracking-[-0.2px] mb-2 text-black"
            style={{
              lineHeight: '30px'
            }}
          >
            {sectionTitle}
          </motion.h2>
          <motion.div
            {...fadeUp({ y: 20, delay: 0.1, viewport: VIEWPORT_CONFIG })}
            className={cn(
              "text-[28px] md:text-[32px] font-medium tracking-[-0.28px] md:tracking-[-0.32px] whitespace-pre-line text-black",
              "text-[28px] tracking-[-0.28px]"
            )}
            style={{
              fontStyle: 'normal',
              lineHeight: 'normal'
            }}
          >
            {Array.isArray(sectionSubtitleLines) ? (
              sectionSubtitleLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < sectionSubtitleLines.length - 1 && <br />}
                </React.Fragment>
              ))
            ) : (
              sectionSubtitleLines
            )}
          </motion.div>
        </div>
      </div>

      {/* 2. 가로 스크롤 영역 */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto hide-scrollbar"
      >
        <div
          className="flex gap-[34px] py-[40px] pl-[30px] pr-[30px] md:pl-[80px] lg:[padding-left:calc((100vw-1472px)/2+80px)]"
          style={{ width: 'fit-content' }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              // [수정 포인트 2] flex-none 사용으로 너비 축소 강제 방지
              className="flex-none w-[300px] md:w-[340px] xl-custom:w-[300px]"
            >
              <MagazinePostCard
                item={item}
                labelDate={dateLabel}
                labelReadMore={readMoreLabel}
                link={magazineLinks[index]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. 네비게이션 버튼 - 모바일 (완전 중앙 정렬) */}
      <div
        // [수정 포인트 3] paddingLeft 제거 및 justify-center 적용
        className="md:hidden w-full flex justify-center gap-4 pb-[60px]"
      >
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
          style={{ width: '36px', height: '36px' }}
          aria-label="이전 포스트"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollLeft).fill} />
            <g transform="translate(6, 6)">
              <path d="M15 6L9 12L15 18" stroke={getButtonColor(canScrollLeft).stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
          style={{ width: '36px', height: '36px' }}
          aria-label="다음 포스트"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollRight).fill} />
            <g transform="translate(6, 6)">
              <path d="M9 18L15 12L9 6" stroke={getButtonColor(canScrollRight).stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </button>
      </div>

      {/* 4. 네비게이션 버튼 - 태블릿/PC */}
      <div className="hidden md:flex w-full pb-[80px]">
        <div className="w-full mx-auto flex justify-center gap-4 max-w-content">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
            style={{ width: '36px', height: '36px' }}
            aria-label="이전 포스트"
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollLeft).fill} />
              <g transform="translate(6, 6)">
                <path d="M15 6L9 12L15 18" stroke={getButtonColor(canScrollLeft).stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
            style={{ width: '36px', height: '36px' }}
            aria-label="다음 포스트"
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollRight).fill} />
              <g transform="translate(6, 6)">
                <path d="M9 18L15 12L9 6" stroke={getButtonColor(canScrollRight).stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}