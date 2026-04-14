'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// throttle 함수
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

interface PartnerCardData {
  id: number;
  image: string;
  name: string;
}

/**
 * 제휴 업체 카드 컴포넌트
 * - 로고 이미지만 표시 (하단 텍스트 바 제거)
 */
function PartnerCard({ image, name }: PartnerCardData) {
  return (
    <div className="relative flex-shrink-0 w-[302px] h-[220px] bg-white overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        className="object-contain p-10"
        sizes="302px"
      />
    </div>
  );
}

export function AboutOtherCompanySection() {
  const t = useTranslations('aboutOtherCompany');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 제휴 업체 데이터 - 번역 파일에서 가져오기
  const partnerData: PartnerCardData[] = [
    { id: 1, image: '/assets/partner/google.webp', name: t('partners.0') },
    { id: 2, image: '/assets/partner/amore.webp', name: t('partners.1') },
    { id: 3, image: '/assets/partner/samsung.webp', name: t('partners.2') },
    { id: 4, image: '/assets/partner/bigboss.webp', name: t('partners.3') },
    { id: 5, image: '/assets/partner/barun.webp', name: t('partners.4') },
    { id: 6, image: '/assets/partner/just.webp', name: t('partners.5') },
    { id: 7, image: '/assets/partner/gold.webp', name: t('partners.6') },
  ];

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
      const scrollAmount = 374;
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
    <section className="relative w-full bg-[#F3F3F6]">
      {/* 1. 상단 텍스트 영역 */}
      <div
        className="relative w-full mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[80px]"
        style={{ maxWidth: '1472px' }}
      >
        <p
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
          }}
        >
          {t('category')}
        </p>
        <p
          className="mt-[10px] whitespace-pre-line"
          style={{
            color: '#000',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
          }}
        >
          {t('title')}
        </p>
        <p
          className="mt-[30px] whitespace-pre-line break-keep"
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
          }}
        >
          {t('description')}
        </p>
        <p
          className="mt-[4px] break-keep  "
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
          }}
        >
          {t.rich('inquiry', {
            kakaoLink: (chunks) => (
              <a
                href="https://pf.kakao.com/_ggchG/chat"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline underline-offset-2"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
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
          {partnerData.map((card) => (
            <PartnerCard key={card.id} {...card} />
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
          aria-label="이전 카드"
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
          aria-label="다음 카드"
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
        <div className="w-full mx-auto flex justify-center gap-4" style={{ maxWidth: '1472px' }}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
            style={{ width: '36px', height: '36px' }}
            aria-label="이전 카드"
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
            aria-label="다음 카드"
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
