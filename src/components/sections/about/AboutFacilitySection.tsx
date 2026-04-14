'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { VIEWPORT_CONFIG } from '@/lib/animationTiming';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useTranslations } from 'next-intl';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

// 데스크톱 시설 이미지 배열
const facilityImagesDesktop = [
  { src: '/assets/about/about-13.webp', alt: "블랑쉬치과 내부 시설에 설치된 브랜드 로고 월 사인" },
  { src: '/assets/about/about-14.webp', alt: "블랑쉬치과 호텔 라운지형 대기 공간 전경" },
  { src: '/assets/about/about-15.webp', alt: "블랑쉬치과 프라이빗 진료 대기 공간 내부 모습" },
  { src: '/assets/about/about-16.webp', alt: "블랑쉬치과 VIP 진료실로 연결되는 내부 복도" },
  { src: '/assets/about/about-17.webp', alt: "블랑쉬치과 VIP 진료실 내부와 치과 진료 장비" },
  { src: '/assets/about/about-18.webp', alt: "블랑쉬치과 수술실 내부와 의료 장비 전경" },
  { src: '/assets/about/about-19.webp', alt: "블랑쉬치과 일반 진료실 내부 공간 전경" },
  { src: '/assets/about/about-20.webp', alt: "블랑쉬치과 브랜드 아이덴티티를 담은 패키지 이미지" },
];

// 모바일 시설 이미지 배열
const facilityImagesMobile = [
  { src: '/assets/about/about-21.webp', alt: '블랑쉬치과 시설 1' },
  { src: '/assets/about/about-22.webp', alt: '블랑쉬치과 시설 2' },
  { src: '/assets/about/about-23.webp', alt: '블랑쉬치과 시설 3' },
  { src: '/assets/about/about-24.webp', alt: '블랑쉬치과 시설 4' },
  { src: '/assets/about/about-25.webp', alt: '블랑쉬치과 시설 5' },
  { src: '/assets/about/about-26.webp', alt: '블랑쉬치과 시설 6' },
  { src: '/assets/about/about-27.webp', alt: '블랑쉬치과 시설 7' },
  { src: '/assets/about/about-28.webp', alt: '블랑쉬치과 시설 8' },
  { src: '/assets/about/about-29.webp', alt: '블랑쉬치과 시설 9' },
  { src: '/assets/about/about-30.webp', alt: '블랑쉬치과 시설 10' },
  { src: '/assets/about/about-31.webp', alt: '블랑쉬치과 시설 11' },
  { src: '/assets/about/about-32.webp', alt: '블랑쉬치과 시설 12' },
];

/**
 * 블랑쉬치과 시설 섹션 컴포넌트
 * 
 * @returns {JSX.Element} 시설 섹션 컴포넌트
 */
export function AboutFacilitySection() {
  const t = useTranslations('aboutFacility');
  const motionEnabled = useMotionEnabled();
  const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
  const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
  const { fadeUp } = useResponsiveAnimation();

  const swiperRefDesktop = useRef<SwiperType | null>(null);
  const swiperRefMobile = useRef<SwiperType | null>(null);

  const [swiperReady, setSwiperReady] = useState(false);
  const [SwiperComponent, setSwiperComponent] = useState<any>(null);
  const [SwiperSlideComponent, setSwiperSlideComponent] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    // Load Swiper only after hydration. Keep layout identical by rendering
    // a fixed-size first-slide fallback until ready.
    (async () => {
      const [{ Swiper: SwiperImpl, SwiperSlide: SwiperSlideImpl }, mods] = await Promise.all([
        import('swiper/react'),
        import('swiper/modules'),
      ]);

      if (cancelled) return;
      setSwiperComponent(() => SwiperImpl);
      setSwiperSlideComponent(() => SwiperSlideImpl);
      setModules([mods.Autoplay, mods.Pagination, mods.Navigation]);
      setSwiperReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full h-[702px]" style={{ backgroundColor: '#EAEEF1' }}>
      <div className="relative w-full h-full">
        {/* 데스크톱 Swiper 캐러셀 */}
        <div className="absolute inset-0 w-full h-full hidden md:block">
          {!swiperReady ? (
            <Image
              src={facilityImagesDesktop[0].src}
              alt={facilityImagesDesktop[0].alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <SwiperComponent
              modules={modules}
              onSwiper={(swiper: SwiperType) => {
                swiperRefDesktop.current = swiper;
              }}
              speed={900}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              className="w-full h-full facility-swiper"
            >
              {facilityImagesDesktop.map((image, index) => (
                <SwiperSlideComponent key={index} className="relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </SwiperSlideComponent>
              ))}
            </SwiperComponent>
          )}
        </div>

        {/* 모바일 Swiper 캐러셀 */}
        <div className="absolute inset-0 w-full h-full block md:hidden">
          {!swiperReady ? (
            <Image
              src={facilityImagesMobile[0].src}
              alt={facilityImagesMobile[0].alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <SwiperComponent
              modules={modules}
              onSwiper={(swiper: SwiperType) => {
                swiperRefMobile.current = swiper;
              }}
              speed={900}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              className="w-full h-full facility-swiper"
            >
              {facilityImagesMobile.map((image, index) => (
                <SwiperSlideComponent key={index} className="relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </SwiperSlideComponent>
              ))}
            </SwiperComponent>
          )}
        </div>

        {/* 컨텐츠 래퍼: max-w-[1472px] 중앙 정렬 */}
        <div className="absolute inset-0 z-[20] w-full h-full pointer-events-none">
          <div className="relative w-full max-w-[1472px] h-full mx-auto">
            {/* 네비게이션 버튼 - 데스크톱 */}
            <button
              onClick={() => swiperRefDesktop.current?.slidePrev()}
              className="hidden md:flex absolute left-[20px] top-1/2 -translate-y-1/2 z-[30] w-[48px] h-[117px] items-center justify-center transition-opacity hover:opacity-80 pointer-events-auto"
              aria-label="이전 슬라이드"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="117"
                viewBox="0 0 48 117"
                fill="none"
              >
                <path
                  d="M30 29.25L18 58.5L30 87.75"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => swiperRefDesktop.current?.slideNext()}
              className="hidden md:flex absolute right-[20px] top-1/2 -translate-y-1/2 z-[30] w-[48px] h-[117px] items-center justify-center transition-opacity hover:opacity-80 pointer-events-auto"
              aria-label="다음 슬라이드"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="117"
                viewBox="0 0 48 117"
                fill="none"
              >
                <path
                  d="M18 87.75L30 58.5L18 29.25"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 네비게이션 버튼 - 모바일 */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                swiperRefMobile.current?.slidePrev();
              }}
              className="block md:hidden absolute left-[10px] top-1/2 -translate-y-1/2 z-[40] w-[48px] h-[117px] flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ pointerEvents: 'auto' }}
              aria-label="이전 슬라이드"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="117"
                viewBox="0 0 48 117"
                fill="none"
              >
                <path
                  d="M30 29.25L18 58.5L30 87.75"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                swiperRefMobile.current?.slideNext();
              }}
              className="block md:hidden absolute right-[10px] top-1/2 -translate-y-1/2 z-[40] w-[48px] h-[117px] flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ pointerEvents: 'auto' }}
              aria-label="다음 슬라이드"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="117"
                viewBox="0 0 48 117"
                fill="none"
              >
                <path
                  d="M18 87.75L30 58.5L18 29.25"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 페이지네이션 - pointer-events-auto 추가 */}
            <div className="facility-swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal pointer-events-auto" />
            <div
              className="absolute left-[30px] top-[34px] md:left-[80px] md:top-[70px] z-[20] pointer-events-auto"
            >
              <H2
                className="whitespace-pre-line"
                style={{
                  color: '#FFF',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '30px',
                  letterSpacing: '-0.18px',
                  marginBottom: 0,
                }}
              >
                {t('category')}
              </H2>
              <P
                className="whitespace-pre-line"
                style={{
                  color: '#FFF',
                  fontSize: '28px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.28px',
                  marginTop: '17px',
                  marginBottom: 0,
                }}
              >
                {t('title')}
              </P>
            </div>
            <P
              className="absolute left-[30px] bottom-[36px] md:left-[80px] md:top-[233px] md:bottom-auto z-[20] whitespace-pre-line pointer-events-auto"
              style={{
                color: '#FFF',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '26px',
                letterSpacing: '-0.18px',
              }}
              {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
            >
              {t('description')}
            </P>
          </div>
        </div>
        {/* 모바일 블러 레이어 */}
        <div
          className="md:hidden absolute bottom-0 left-0 w-full z-[5]"
          style={{
            height: '158px',
            background: 'rgba(0, 124, 140, 0.05)',
            backdropFilter: 'blur(20px)',
          }}
        />
      </div>
    </div>
  );
}
