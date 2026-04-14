'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

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
interface BeforeAfterCase {
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

interface BeforeAfterCardProps {
  caseItem: BeforeAfterCase;
  labelTreatmentPeriod: string;
  href: string; // [추가] 링크 URL을 prop으로 받음
}



// ----------------------------------------------------------------------
// 카드 컴포넌트
// ----------------------------------------------------------------------
function BeforeAfterCaseCard({ caseItem, labelTreatmentPeriod, href }: BeforeAfterCardProps) {
  const t = useTranslations('beforeafter');
  return (
    <div
      className="relative flex flex-col flex-shrink-0 w-full h-[484px] md:w-[340px] md:h-[530px] xl-custom:w-[300px] xl-custom:h-[484px]"
      style={{
        borderRadius: '0px',
      }}
    >
      <div
        className="relative flex-shrink-0 w-full aspect-[300/220] md:h-[250px] xl-custom:h-[220px] overflow-hidden"
        style={{
          borderRadius: '0px',
          backgroundColor: '#F9F9F9',
        }}
      >
        <Image
          src={caseItem.image}
          alt={caseItem.alt || caseItem.treatmentType}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 340px"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, #005F7A 0%, #005F7A 100%), radial-gradient(105.45% 105.45% at 50% 105.45%, #D1E9FF 22.12%, #6A97C2 49.52%, #074787 65.38%, #000 100%)',
            mixBlendMode: 'overlay',
            opacity: 0.1,
          }}
        />
      </div>

      <div
        className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] w-full h-full md:h-[280px] xl-custom:h-[264px]"
        style={{ backgroundColor: '#F3F3F6' }}

      >
        <h3
          style={{
            color: '#262626',
            fontSize: '20px', // 제목 20px
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.2px'
          }}
          className="mb-1"
        >
          {caseItem.treatmentType}
        </h3>

        <div
          style={{
            color: '#7D7D7D',
            fontSize: '16px', // 나머지 16px
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.16px'
          }}
          className="flex items-center gap-2 mb-4"
        >
          <span>{labelTreatmentPeriod}</span>
          <span className="text-[#999999]">|</span>
          <span>{caseItem.treatmentPeriod}</span>
        </div>

        <p
          style={{
            color: '#262626',
            fontSize: '16px', // 본문 16px
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.16px'
          }}
          className="flex-grow overflow-y-auto mb-4"
        >
          {caseItem.quote}
        </p>

        {/* [수정] Link 컴포넌트 적용 및 우측 정렬 */}
        <Link
          href={href as any}
          className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity self-end"
          style={{
            color: '#262626',
            fontSize: '16px', // 링크 16px
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.16px'
          }}
        >
          <span>&gt;</span>
          <span>{t('labels.viewDetails')}</span>
        </Link>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 메인 섹션 컴포넌트
// ----------------------------------------------------------------------
export function HomeBeforeAfterSection() {
  const locale = useLocale();
  const translations = useTranslations('beforeafter');
  const { fadeUp } = useResponsiveAnimation();

  let rawCases;
  try {
    rawCases = translations.raw('cases');
  } catch (error) {
    rawCases = [];
  }
  const cases = Array.isArray(rawCases) ? (rawCases as BeforeAfterCase[]) : [];
  const sectionTitle = translations('header.title.default');
  const sectionSubtitleLines = translations.raw('header.subtitle.desktop') as string[] || [];
  const periodLabel = translations('labels.treatmentPeriod');

  const isJp = locale === 'jp';

  // 각 비포&애프터 카드의 링크 (언어별 분기)
  const beforeAfterLinks = isJp
    ? [
      '/jp/service/laminate',
      '/jp/service/laminate',
      '/jp/service/laminate',
      '/jp/service/laminate',
    ]
    : [
      '/special/laminate',
      '/special/laminate',
      '/special/laminate',
      '/special/laminate',
    ];


  // 스크롤 로직
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
    <section className="relative w-full bg-white">
      {/* 1. 상단 텍스트 영역 */}
      <div
        className="relative w-full mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[80px] max-w-content"
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
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className="flex-none w-[300px] md:w-[340px] xl-custom:w-[300px]"
            >
              <BeforeAfterCaseCard
                caseItem={caseItem}
                labelTreatmentPeriod={periodLabel}
                href={beforeAfterLinks[index] || '#'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. 네비게이션 버튼 - 모바일 */}
      <div
        className="md:hidden w-full flex justify-center gap-4 pb-[60px]"
      >
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
          style={{ width: '36px', height: '36px' }}
          aria-label="이전 케이스"
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
          aria-label="다음 케이스"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollRight).fill} />
            <g transform="translate(6, 6)">
              <path d="M9 18L15 12L9 6" stroke={getButtonColor(canScrollRight).stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </button>
      </div>

      {/* 3. 네비게이션 버튼 - 태블릿/PC */}
      <div className="hidden md:flex w-full pb-[80px]">
        <div className="w-full mx-auto flex justify-center gap-4 max-w-content">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
            style={{ width: '36px', height: '36px' }}
            aria-label="이전 케이스"
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
            aria-label="다음 케이스"
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