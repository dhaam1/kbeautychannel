'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

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

interface EquipmentCardData {
  id: number;
  image: string;
  nameKo: string;
  nameEn: string;
  headline: string;
  description: string;
  objectFit?: 'cover' | 'contain';
  bgColor?: string;
  alt: string;
}

// 장비 이미지 경로 배열
const equipmentImages = [
  '/assets/plus/tech01.webp',
  '/assets/plus/tech02.webp',
  '/assets/plus/tech03.webp',
  '/assets/plus/tech04.webp',
  '/assets/plus/tech05.webp',
  '/assets/plus/tech06.webp',
  '/assets/plus/tech07.webp',
];

/**
 * 장비 카드 컴포넌트 (수정됨)
 */
function EquipmentCard({ image, nameKo, nameEn, headline, description, objectFit = 'contain', alt }: EquipmentCardData) {
  return (
    <div
      // [수정 포인트] w-full -> w-[300px] 로 변경하여 모바일에서 고정 너비 사용
      className="relative flex flex-col flex-shrink-0 w-[300px] h-[484px] md:w-[340px] md:h-[530px] xl-custom:w-[300px] xl-custom:h-[484px]"
      style={{
        borderRadius: '0px',
      }}
    >
      {/* 이미지 영역 */}
      <div
        className="relative flex-shrink-0 w-full aspect-[300/220] md:h-[250px] xl-custom:h-[220px] border border-white border-b-0 bg-white overflow-hidden"
        style={{
          borderRadius: '0px',
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className={objectFit === 'cover' ? 'object-cover' : 'object-contain'}
          sizes="(max-width: 768px) 100vw, 340px"
        />
      </div>

      {/* 텍스트 영역 */}
      <div
        className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] border border-white bg-white w-full h-full md:h-[280px] xl-custom:h-[264px]"
       
      >
        {/* 상단 타이틀 그룹 */}
        <div className="mb-4">
          <p
            style={{
              color: '#262626',
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '-0.2px',
              lineHeight: '1.2',
              marginBottom: '4px'
            }}
          >
            {nameKo}
          </p>

          {/* 영문명 */}
          <h3
            style={{
              color: '#7D7D7D',
              fontSize: '16px',
              fontWeight: 400,
              letterSpacing: '-0.16px',
            }}
          >
            {nameEn}
          </h3>
        </div>

        {/* 설명 영역 */}
        <div className="flex-grow overflow-y-auto custom-scrollbar flex flex-col gap-2">
          {/* Description */}
          <p
            style={{
              color: '#262626',
              fontSize: '16px',
              fontWeight: 400,
              letterSpacing: '-0.16px',
              lineHeight: '1.5',
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * 임플란트 장비 섹션 컴포넌트
 */
export function ImplantEquipmentSection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const t = useTranslations('implant.equipment');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 번역 데이터와 이미지 매핑
  const equipmentData: EquipmentCardData[] = (t.raw('items') as any[]).map((item, index) => ({
    id: index + 1,
    image: equipmentImages[index],
    nameKo: isEn ? item.nameEn : item.nameKo,
    nameEn: item.nameEn,
    headline: item.headline,
    description: item.description,
    alt: item.alt,
    objectFit: 'contain'
  }));
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

  // // 자동 넘김 로직
  // useEffect(() => {
  //   const container = scrollContainerRef.current;
  //   if (!container) return;

  //   // [수정] 스크롤 이동량: 카드너비 + gap(34px)
  //   // 모바일: 300 + 34 = 334
  //   // 데스크탑: 340 + 34 = 374
  //   const getScrollAmount = () => window.innerWidth >= 768 ? 374 : 334;

  //   const mq = window.matchMedia('(max-width: 1023px)');
  //   let interval: number | null = null;

  //   const start = () => {
  //     if (interval !== null) return;
  //     interval = window.setInterval(() => {
  //       const { scrollLeft, scrollWidth, clientWidth } = container;
  //       const atEnd = Math.ceil(scrollLeft) >= scrollWidth - clientWidth - 1;

  //       if (atEnd) {
  //         container.scrollTo({ left: 0, behavior: 'smooth' });
  //       } else {
  //         container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  //       }
  //     }, 3000);
  //   };

  //   const stop = () => {
  //     if (interval === null) return;
  //     window.clearInterval(interval);
  //     interval = null;
  //   };

  //   const sync = () => {
  //     if (mq.matches) start();
  //     else stop();
  //   };

  //   sync();
  //   mq.addEventListener('change', sync);

  //   return () => {
  //     stop();
  //     mq.removeEventListener('change', sync);
  //   };
  // }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // [수정] 버튼 클릭 시 이동량도 반응형 처리
      const scrollAmount = window.innerWidth >= 768 ? 374 : 334;
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
        className="relative w-full mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[80px]"
        style={{ maxWidth: '1472px' }}
      >
        <h2
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.24px',
          }}
        >
          {t('title')}
        </h2>
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
          {t('subtitle')}
        </p>
        <p
          className="mt-[30px] whitespace-pre-line"
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.18x',
          }}
        >
          {t('description')}
        </p>
      </div>

      {/* 2. 가로 스크롤 영역 */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto hide-scrollbar"
      >
        <div
          // gap 34px 통일
          className="flex gap-[34px] py-[40px] px-[30px] md:px-[80px]"
          style={{ width: 'fit-content' }}
        >
          {equipmentData.map((card, index) => (
            <EquipmentCard key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* 3. 네비게이션 버튼 - 모바일 (중앙 정렬 통일) */}
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