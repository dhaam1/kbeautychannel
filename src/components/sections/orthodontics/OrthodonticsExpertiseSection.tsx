'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

// throttle 함수 복제 (의존성 제거)
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
  tag: string;
  headline: string;
  description: string;
  objectFit?: 'cover' | 'contain';
  bgColor?: string;
  alt: string;
}

// 장비 데이터 배열 - 어린이 치아교정 장치
// 주의: 이미지(파일명)는 유지하고, 텍스트만 이미지 내용에 맞게 매칭합니다.
// 또한 "왼쪽(첫 카드) → 오른쪽" 순서대로 배열을 정렬합니다.
const getEquipmentData = (isEn: boolean): EquipmentCardData[] => [
  {
    id: 1,
    image: '/assets/asset-117.webp',
    nameKo: isEn ? 'Invisalign First' : '인비절라인 퍼스트',
    nameEn: '',
    tag: isEn ? 'For uneven teeth alignment' : '치아배열이 고르지 않은 경우',
    headline: isEn ? 'Clear aligners designed specifically for growing children.' : '성장하는 어린이 구강에 맞춰 설계된 투명 교정 장치입니다.',
    description: isEn ? 'Clear aligners designed specifically for growing children. Fully removable for absolute freedom during meals and brushing.' : '성장하는 어린이 구강에 맞춰 설계된 투명 교정 장치입니다. 탈부착이 가능해 양치와 식사가 자유롭습니다.',
    alt: "인비절라인 퍼스트 어린이 투명교정 장치, 성장기 치아 배열과 교합을 함께 고려한 교정"
  },
  {
    id: 2,
    image: '/assets/asset-118.webp',
    nameKo: isEn ? 'PreOrtho' : '프리올소',
    nameEn: '',
    tag: isEn ? 'For mouth breathing or tongue habits' : '입으로 숨쉬기, 혀 습관이 있는 경우',
    headline: isEn ? 'Guides jawbone growth using facial muscles.' : '입 주변 근육을 이용해 턱뼈 성장 방향을 유도합니다.',
    description: isEn ? 'Guides jawbone growth using facial muscles. Made of soft material, making it comfortable to wear during sleep.' : '입 주변 근육을 이용해 턱뼈 성장 방향을 유도합니다. 말랑한 소재로 수면 중 착용이 가능합니다.',
    alt: "프리올소 어린이 기능성 교정 장치, 입 주변 근육을 이용해 턱 성장 방향을 유도"
  },
  {
    id: 3,
    image: '/assets/asset-119.webp',
    nameKo: isEn ? 'Frankel' : '프랑켈',
    nameEn: '',
    tag: isEn ? 'For underbite or crossbite' : '주걱턱, 반대교합이 있는 경우',
    headline: isEn ? 'Worn internally and completely invisible from the outside.' : '입 안에만 착용해 겉에서 보이지 않습니다.',
    description: isEn ? 'Worn internally and completely invisible from the outside. Promotes upper jaw growth while regulating the lower jaw.' : '입 안에만 착용해 겉에서 보이지 않습니다. 위턱 성장을 촉진하고 아래턱 성장을 조절합니다.',
    alt: "프랑켈 어린이 교정 장치, 구강 내 장착으로 턱 성장과 골격 발달을 조절"
  },
  {
    id: 4,
    image: '/assets/asset-120.webp',
    nameKo: isEn ? 'Expander + Facemask' : '악궁확장장치+페이스마스크',
    nameEn: '',
    tag: isEn ? 'For narrow upper jaw and underbite' : '위턱이 좁고 앞니가 거꾸로 물리는 경우',
    headline: isEn ? 'Guides growth after expanding the upper jaw.' : '악궁확장장치로 위턱 폭을 넓힌 뒤, 성장을 유도합니다.',
    description: isEn ? 'Uses an expander to widen the upper jaw, followed by a facemask to pull the upper jaw forward to guide proper growth.' : '악궁확장장치로 위턱 폭을 넓힌 뒤, 페이스 마스크로 위턱을 앞으로 당겨 성장을 유도합니다.',
    alt: "악궁확장장치와 페이스마스크, 좁은 위턱을 확장하고 전방 성장을 유도하는 교정"
  },
];

/**
 * 장비 카드 컴포넌트
 */
function EquipmentCard({ image, nameKo, nameEn, tag, headline, description, objectFit = 'contain', bgColor = '#F7F7F7', alt }: EquipmentCardData) {
  return (
    <div className="flex-shrink-0 w-[302px] flex flex-col">
      {/* 이미지 영역 - 꽉 차게 */}
      <div className="relative w-[302px] h-[200px] overflow-hidden" style={{ background: bgColor }}>
        <Image
          src={image}
          alt={alt}
          fill
          className={objectFit === 'cover' ? 'object-cover' : 'object-contain'}
          sizes="302px"
          style={{ transform: 'scale(1.2)' }}
        />
      </div>
      {/* 텍스트 영역 */}
      <div
        className="p-5 flex flex-col"
        style={{
          width: '302px',
          height: '319px',
          background: '#F3F3F6',
        }}
      >
        {/* 제목 */}
        <h3
          style={{
            color: '#262626',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.2px',
            marginBottom: '4px',
          }}
        >
          {nameKo}
        </h3>
        {/* 부제목 */}
        {nameEn?.trim() ? (
          <p
            style={{
              color: '#262626',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 300,
              lineHeight: 'normal',
              letterSpacing: '-0.2px',
              marginBottom: '20px',
            }}
          >
            {nameEn}
          </p>
        ) : null}
        {/* 태그 버튼 */}
        <span
          className="inline-flex mb-[20px]"
          style={{
            display: 'inline-flex',
            padding: '6px 10px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '50px',
            background: '#FFF',
            color: '#000',
            textAlign: 'right',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.12px',
            width: 'fit-content',
          }}
        >
          {tag}
        </span>
        {/* 설명 */}
        <p
          className="whitespace-pre-line"
          style={{
            color: '#262626',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '-0.16px',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/**
 * 교정 장비 섹션 컴포넌트
 * ImplantEquipmentSection을 기반으로 복제 (의존성 제거)
 * 
 * @description
 * 교정 진료에 사용되는 장비를 소개하는 섹션입니다.
 * 
 * @returns {JSX.Element} 장비 섹션 컴포넌트
 */
export function OrthodonticsExpertiseSection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const equipmentData = getEquipmentData(isEn);
  
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
      // 초기 체크
      checkScrollPosition();

      // 스크롤 이벤트에 throttle 및 passive 옵션 적용
      const throttledCheckScrollPosition = throttle(checkScrollPosition, 150);
      container.addEventListener('scroll', throttledCheckScrollPosition, { passive: true });

      // ResizeObserver로 컨테이너 크기 변경만 감지
      const observer = new ResizeObserver(() => {
        checkScrollPosition();
      });

      observer.observe(container);

      return () => {
        container.removeEventListener('scroll', throttledCheckScrollPosition);
        observer.disconnect();
      };
    }
  }, []);


  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 322; // 카드 너비(302px) + gap(20px)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      // smooth 스크롤 완료 후 버튼 상태 업데이트
      setTimeout(() => {
        checkScrollPosition();
      }, 350);
    }
  };

  const getButtonColor = (isActive: boolean) => ({
    fill: isActive ? '#C3C3CB' : 'rgba(215, 209, 204, 0.30)',
    stroke: isActive ? '#5A5A5A' : '#B3B3B3',
  });

  return (
    <section className="relative w-full bg-[#FEFEFE]">
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
          {isEn ? 'Pediatric Orthodontic Appliances' : '어린이 치아교정 장치'}
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
          {isEn ? <>Delicate pediatric orthodontics{'\n'}at Blanche Dental Clinic</> : <>섬세한 어린이교정도{'\n'}블랑쉬치과에서</>}
        </p>
        <p
          className="mt-[30px] whitespace-pre-line"
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
          }}
        >
          {isEn ? <>With countless pediatric clinical cases,{'\n'}we carefully manage your child's{'\n'}growing and developing mouth.</> : <>매일 성장하는 어린이의 구강,{'\n'}수많은 소아교정 임상경험으로{'\n'}섬세한 교정치료를 진행합니다.</>}
        </p>
      </div>

      {/* 2. 가로 스크롤 영역 */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto hide-scrollbar"
      >
        <div
          className="flex gap-5 py-[40px] pl-[30px] pr-[30px] md:pl-[80px] lg:[padding-left:calc((100vw-1472px)/2+80px)]"
        >
          {equipmentData.map((card) => (
            <EquipmentCard key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* 3. 네비게이션 버튼 - 모바일 (첫 번째 카드 오른쪽 끝에 맞춤) */}
      <div
        className="md:hidden flex justify-center gap-4 pb-[60px]"

      >
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
          style={{ width: '36px', height: '36px' }}
          aria-label="이전 카드"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollLeft).fill} />
            <g transform="translate(6, 6)">
              <path
                d="M15 6L9 12L15 18"
                stroke={getButtonColor(canScrollLeft).stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollRight).fill} />
            <g transform="translate(6, 6)">
              <path
                d="M9 18L15 12L9 6"
                stroke={getButtonColor(canScrollRight).stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      </div>

      {/* 3. 네비게이션 버튼 - 태블릿/PC (4번째 카드에 맞춤) */}
      <div className="hidden md:flex w-full pb-[80px]">
        <div className="w-full mx-auto flex justify-center gap-4" style={{ maxWidth: '1472px' }}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
            style={{ width: '36px', height: '36px' }}
            aria-label="이전 카드"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollLeft).fill} />
              <g transform="translate(6, 6)">
                <path
                  d="M15 6L9 12L15 18"
                  stroke={getButtonColor(canScrollLeft).stroke}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollRight).fill} />
              <g transform="translate(6, 6)">
                <path
                  d="M9 18L15 12L9 6"
                  stroke={getButtonColor(canScrollRight).stroke}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
