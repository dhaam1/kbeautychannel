'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { throttle } from '@/lib/utils';

interface EquipmentCardData {
  id: number;
  image: string;
  nameKo: string;
  nameEn: string;
  tag: string;
  subText: string;
  headline: string;
  description: string;
  alt: string;
  objectFit?: 'cover' | 'contain';
}

/**
 * 장비 카드 컴포넌트
 */
function EquipmentCard({ image, nameKo, nameEn, tag, headline, description, objectFit = 'contain' }: EquipmentCardData) {
  return (
    <div
      className="relative flex flex-col flex-shrink-0 h-[560px] w-[340px] md:h-[600px] xl-custom:w-[300px] xl-custom:h-[560px]"
      style={{
        borderRadius: '0px',
      }}
    >
      {/* 이미지 영역 */}
      <div
        className="relative flex-shrink-0 w-full aspect-[300/220] md:h-[250px] xl-custom:h-[220px] border border-white border-b-0 overflow-hidden"
        style={{
          borderRadius: '0px',
          backgroundColor: '#F8F8F8'
        }}
      >
        <Image
          src={image}
          alt={nameKo}
          fill
          className={objectFit === 'cover' ? 'object-cover' : 'object-contain p-4'}
          sizes="(max-width: 768px) 100vw, 340px"
        />
      </div>

      {/* 텍스트 영역 */}
      <div
        className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] border border-white bg-white w-full h-full"
       
      >
        {/* 상단 타이틀 및 태그 그룹 */}
        <div className="mb-5">
          {/* 한글 제목 */}
          <h3
            className="mb-1"
            style={{
              color: '#262626',
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '-0.2px',
              lineHeight: '1.2'
            }}
          >
            {nameKo}
          </h3>

          {/* 영문 제목 */}
          <p
            className="mb-3"
            style={{
              color: '#7D7D7D',
              fontSize: '16px',
              fontWeight: 400,
              letterSpacing: '-0.16px',
            }}
          >
            {nameEn}
          </p>

          <span
            className="inline-flex px-2 py-1 rounded-full bg-gray-100 text-[#555] text-[12px] font-medium"
            style={{ width: 'fit-content' }}
          >
            {tag}
          </span>
        </div>

        {/* 설명 영역 */}
        <div className="flex-grow flex flex-col gap-2">
          <p
            style={{
              color: '#262626',
              fontSize: '16px',
              fontWeight: 500,
              letterSpacing: '-0.16px',
              lineHeight: '1.4',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: '#e5e7eb'
            }}
          >
            {headline}
          </p>
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

export function AboutEquipmentSection() {
  const t = useTranslations('aboutEquipment');
  const locale = useLocale();
  const isJp = locale === 'jp';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 장비 데이터 배열 - 번역 파일에서 가져오기
  const equipmentData: EquipmentCardData[] = [
    {
      id: 1,
      image: '/assets/about/about-7.webp',
      nameKo: t('list.0.nameKo'),
      nameEn: t('list.0.nameEn'),
      tag: t('list.0.tag'),
      subText: t('list.0.subText'),
      headline: t('list.0.subText'),
      description: t('list.0.description'),
      alt: t('list.0.nameKo')
    },
    {
      id: 2,
      image: '/assets/implant/implant-1.webp',
      nameKo: t('list.1.nameKo'),
      nameEn: t('list.1.nameEn'),
      tag: t('list.1.tag'),
      subText: t('list.1.subText'),
      headline: t('list.1.subText'),
      description: t('list.1.description'),
      objectFit: 'cover',
      alt: t('list.1.nameKo')
    },
    {
      id: 3,
      image: '/assets/about/about-8.webp',
      nameKo: t('list.2.nameKo'),
      nameEn: t('list.2.nameEn'),
      tag: t('list.2.tag'),
      subText: t('list.2.subText'),
      headline: t('list.2.subText'),
      description: t('list.2.description'),
      alt: t('list.2.nameKo')
    },
    {
      id: 4,
      image: '/assets/about/about-9.webp',
      nameKo: t('list.3.nameKo'),
      nameEn: t('list.3.nameEn'),
      tag: t('list.3.tag'),
      subText: t('list.3.subText'),
      headline: t('list.3.subText'),
      description: t('list.3.description'),
      alt: t('list.3.nameKo')
    },
    {
      id: 5,
      image: '/assets/about/about-10.webp',
      nameKo: t('list.4.nameKo'),
      nameEn: t('list.4.nameEn'),
      tag: t('list.4.tag'),
      subText: t('list.4.subText'),
      headline: t('list.4.subText'),
      description: t('list.4.description'),
      alt: t('list.4.nameKo')
    },
    {
      id: 6,
      image: '/assets/about/about-11.webp',
      nameKo: t('list.5.nameKo'),
      nameEn: t('list.5.nameEn'),
      tag: t('list.5.tag'),
      subText: t('list.5.subText'),
      headline: t('list.5.subText'),
      description: t('list.5.description'),
      alt: t('list.5.nameKo')
    },
    {
      id: 7,
      image: '/assets/about/about-12.webp',
      nameKo: t('list.6.nameKo'),
      nameEn: t('list.6.nameEn'),
      tag: t('list.6.tag'),
      subText: t('list.6.subText'),
      headline: t('list.6.subText'),
      description: t('list.6.description'),
      alt: t('list.6.nameKo')
    },
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

  // // 자동 넘김 로직
  // useEffect(() => {
  //   const container = scrollContainerRef.current;
  //   if (!container) return;

  //   // 스크롤 이동량: 데스크탑 기준 374, 모바일 기준 334 (카드너비 + 갭)
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
            letterSpacing: '-0.18px',
          }}
        >
          {t('category')}
        </h2>
        <p
          className="mt-[10px]"
          style={{
            color: '#000',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '1.4',
            letterSpacing: '-0.28px',
          }}
        >
          {t('title')}
        </p>
      </div>

      {/* 2. 가로 스크롤 영역 */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto hide-scrollbar"
      >
        <div
          // [통일] gap 34px
          className="flex gap-[34px] py-[40px] pl-[30px] pr-[30px] md:pl-[80px] lg:[padding-left:calc((100vw-1472px)/2+80px)]"
          style={{ width: 'fit-content' }}
        >
          {equipmentData.map((card) => (
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
          aria-label={isJp ? "前のカード" : "이전 카드"}
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
          aria-label={isJp ? "次のカード" : "다음 카드"}
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
            aria-label={isJp ? "前のカード" : "이전 카드"}
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
            aria-label={isJp ? "次のカード" : "다음 카드"}
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