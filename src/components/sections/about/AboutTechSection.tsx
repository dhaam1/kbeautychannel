'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { VIEWPORT_CONFIG } from '@/lib/animationTiming';
import type { Swiper as SwiperType } from 'swiper';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useTranslations, useLocale } from 'next-intl';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

// 테크 이미지 배열
const getTechImages = (isJp: boolean) => [
  {
    src: '/assets/about/about-40.webp',
    alt: isJp
      ? "ブランシュ歯科の院内技工所で医療陣と技工士が補綴設計を共に検討する作業シーン"
      : "블랑쉬치과 자체 기공소에서 의료진과 기공사가 보철 설계를 함께 검토하는 작업 장면"
  },
  {
    src: '/assets/about/about-41.webp',
    alt: isJp
      ? "ブランシュ歯科の院내기공소で歯の補綴を手作業で彫刻する過程"
      : "블랑쉬치과 자체 기공소에서 치아 보철을 수작업으로 조각하는 과정"
  },
  {
    src: '/assets/about/about-42.webp',
    alt: isJp
      ? "ブランシュ歯科の院内技工所で歯の色彩を合わせるためにセラミック材料を調색하는 작업"
      : "블랑쉬치과 자체 기공소에서 치아 색감을 맞추기 위해 세라믹 재료를 조색하는 작업"
  },
  {
    src: '/assets/about/about-43.webp',
    alt: isJp
      ? "ブランシュ歯科の院内技工所で補綴精密加工設備を使用する作業の様子"
      : "블랑쉬치과 자체 기공소에서 보철 정밀 가공 장비를 사용하는 작업 모습"
  },
  {
    src: '/assets/about/about-44.webp',
    alt: isJp
      ? "ブランシュ歯科の院内技工所で完成前の歯の補綴モデルを検品する過程"
      : "블랑쉬치과 자체 기공소에서 완성 전 치아 보철 모델을 검수하는 과정"
  },
];

/**
 * 블랑쉬치과 테크 섹션 컴포넌트
 * 
 * @returns {JSX.Element} 테크 섹션 컴포넌트
 */
export function AboutTechSection() {
  const t = useTranslations('aboutTech');
  const locale = useLocale();
  const isJp = locale === 'jp';
  const techImages = getTechImages(isJp);

  const motionEnabled = useMotionEnabled();
  const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
  const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
  const { fadeUp } = useResponsiveAnimation();

  const mobileSwiperRef = useRef<SwiperType | null>(null);
  const desktopSwiperRef = useRef<SwiperType | null>(null);

  const [swiperReady, setSwiperReady] = useState(false);
  const [SwiperComponent, setSwiperComponent] = useState<any>(null);
  const [SwiperSlideComponent, setSwiperSlideComponent] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

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
    <div className="relative w-full" style={{ backgroundColor: '#2D2F2C' }}>
      <div className="relative w-full h-auto lg:h-[750px] flex flex-col lg:block">
        {/* 모바일 레이아웃 */}
        <div className="lg:hidden w-full flex flex-col">
          {/* 1. Swiper (fullwidth) */}
          <div className="relative w-full h-[400px]">
            {!swiperReady ? (
              <Image
                src={techImages[0].src}
                alt={techImages[0].alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <SwiperComponent
                modules={modules}
                speed={900}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="w-full h-full tech-swiper"
                onSwiper={(swiper: SwiperType) => {
                  mobileSwiperRef.current = swiper;
                }}
              >
                {techImages.map((image, index) => (
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
            {/* 이전 버튼 */}
            <button
              onClick={() => mobileSwiperRef.current?.slidePrev()}
              className="absolute left-[10px] md:left-[20px] top-1/2 -translate-y-1/2 z-[30] w-[48px] h-[117px] flex items-center justify-center transition-opacity hover:opacity-80 pointer-events-auto"
              aria-label={isJp ? "前のスライド" : "이전 슬라이드"}
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
            {/* 다음 버튼 */}
            <button
              onClick={() => mobileSwiperRef.current?.slideNext()}
              className="absolute right-[10px] md:right-[20px] top-1/2 -translate-y-1/2 z-[30] w-[48px] h-[117px] flex items-center justify-center transition-opacity hover:opacity-80 pointer-events-auto"
              aria-label={isJp ? "次のスライド" : "다음 슬라이드"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="117" viewBox="0 0 48 117" fill="none">
                <path d="M18 87.75L30 58.5L18 29.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* 2. 텍스트 섹션 */}
          <div
            className="w-full px-[30px] md:px-[80px] py-[40px] overflow-visible"
            style={{ backgroundColor: '#2D2F2C' }}
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
              {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
            >
              {t('category')}
            </H2>
            <P
              className="whitespace-pre-line mt-[17px]"
              style={{
                color: '#FFF',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.28px',
                marginBottom: 0,
              }}
              {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
            >
              {t('title')}
            </P>
          </div>

          {/* 3. 4컬럼 → Column 변환 */}
          <div
            className="w-full px-[30px] md:px-[80px] py-[40px] overflow-visible"
            style={{ backgroundColor: '#2D2F2C' }}
          >
            {/* 항목 1: 1:1 맞춤 설계 */}
            <div className="pt-0 pb-[24px] border-t border-white/30">
              <h3
                style={{
                  color: '#FFF',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '12px',
                  marginTop: '24px',
                }}
              >
                {t('features.0.title')}
              </h3>
              <p
                style={{
                  color: '#FFF',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '26px',
                  letterSpacing: '-0.16px',
                }}
              >
                {t('features.0.description')}
              </p>
            </div>

            {/* 항목 2: 자연치아처럼 재현 */}
            <div className="pb-[24px] border-t border-white/30">
              <h3
                style={{
                  color: '#FFF',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '12px',
                  marginTop: '24px',
                }}
              >
                {t('features.1.title')}
              </h3>
              <p
                style={{
                  color: '#FFF',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '26px',
                  letterSpacing: '-0.16px',
                }}
              >
                {t('features.1.description')}
              </p>
            </div>

            {/* 항목 3: 실시간 소통 */}
            <div className="pb-[24px] border-t border-white/30">
              <h3
                style={{
                  color: '#FFF',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '12px',
                  marginTop: '24px',
                }}
              >
                {t('features.2.title')}
              </h3>
              <p
                style={{
                  color: '#FFF',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '26px',
                  letterSpacing: '-0.16px',
                }}
              >
                {t('features.2.description')}
              </p>
            </div>

            {/* 항목 4: 프리미엄 재료와 장비 */}
            <div className="pb-0 border-t border-white/30">
              <h3
                style={{
                  color: '#FFF',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '12px',
                  marginTop: '24px',
                }}
              >
                {t('features.3.title')}
              </h3>
              <p
                style={{
                  color: '#FFF',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '26px',
                  letterSpacing: '-0.16px',
                }}
              >
                {t('features.3.description')}
              </p>
            </div>
          </div>
        </div>

        {/* 태블릿/PC 레이아웃 */}
        <div className="hidden lg:block relative w-full h-full">
          {/* Swiper 배경 캐러셀 */}
          {!swiperReady ? (
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src={techImages[0].src}
                alt={techImages[0].alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ) : (
            <SwiperComponent
              modules={modules}
              speed={900}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              className="absolute inset-0 w-full h-full tech-swiper z-0"
              onSwiper={(swiper: SwiperType) => {
                desktopSwiperRef.current = swiper;
              }}
            >
              {techImages.map((image, index) => (
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
          {/* 블러 레이어 */}
          <div
            className="absolute bottom-0 left-0 w-full z-[10]"
            style={{
              height: '281px',
              background: 'rgba(0, 124, 140, 0.05)',
              backdropFilter: 'blur(20px)',
            }}
          />

          {/* 컨텐츠 래퍼: max-w-[1472px] 중앙 정렬 */}
          <div className="absolute inset-0 z-[20] w-full h-full pointer-events-none">
            <div className="relative w-full max-w-[1472px] h-full mx-auto">
              {/* 이전 버튼 */}
              <button
                onClick={() => desktopSwiperRef.current?.slidePrev()}
                className="absolute left-[10px] md:left-[20px] top-1/2 -translate-y-1/2 z-[30] w-[48px] h-[117px] flex items-center justify-center transition-opacity hover:opacity-80 pointer-events-auto"
                aria-label={isJp ? "前のスライド" : "이전 슬라이드"}
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
              {/* 다음 버튼 */}
              <button
                onClick={() => desktopSwiperRef.current?.slideNext()}
                className="absolute right-[10px] md:right-[20px] top-1/2 -translate-y-1/2 z-[30] w-[48px] h-[117px] flex items-center justify-center transition-opacity hover:opacity-80 pointer-events-auto"
                aria-label={isJp ? "次のスライド" : "다음 슬라이드"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="117" viewBox="0 0 48 117" fill="none">
                  <path d="M18 87.75L30 58.5L18 29.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* 절대 위치 텍스트 - 좌상단 */}
              <div className="absolute left-[80px] top-[70px] z-[20] pointer-events-auto">
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
                  {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
                >
                  {t('category')}
                </H2>
              </div>

              {/* 절대 위치 텍스트 - 메인 타이틀 */}
              <div className="absolute left-[80px] top-[310px] z-[20] pointer-events-auto">
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
                  {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
                >
                  {t('title')}
                </P>
              </div>

              {/* 4컬럼 Row - 블러 레이어 위에 배치 */}
              <div className="absolute bottom-0 left-0 w-full z-[20] px-[80px] pb-[60px] pointer-events-auto">
                <div className="flex flex-row">
                  {/* 컬럼 1: 1:1 맞춤 설계 */}
                  <div className="flex-1 pr-[30px]">
                    <h3
                      style={{
                        color: '#FFF',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.2px',
                        marginBottom: '12px',
                      }}
                    >
                      {t('features.0.title')}
                    </h3>
                    <p
                      style={{
                        color: '#FFF',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '26px',
                        letterSpacing: '-0.16px',
                      }}
                    >
                      {t('features.0.description')}
                    </p>
                  </div>

                  {/* 1px 세로선 */}
                  <div className="w-[1px] bg-white/30" />

                  {/* 컬럼 2: 자연치아처럼 재현 */}
                  <div className="flex-1 px-[30px]">
                    <h3
                      style={{
                        color: '#FFF',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.2px',
                        marginBottom: '12px',
                      }}
                    >
                      {t('features.1.title')}
                    </h3>
                    <p
                      style={{
                        color: '#FFF',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '26px',
                        letterSpacing: '-0.16px',
                      }}
                    >
                      {t('features.1.description')}
                    </p>
                  </div>

                  {/* 1px 세로선 */}
                  <div className="w-[1px] bg-white/30" />

                  {/* 컬럼 3: 실시간 소통 */}
                  <div className="flex-1 px-[30px]">
                    <h3
                      style={{
                        color: '#FFF',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.2px',
                        marginBottom: '12px',
                      }}
                    >
                      {t('features.2.title')}
                    </h3>
                    <p
                      style={{
                        color: '#FFF',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '26px',
                        letterSpacing: '-0.16px',
                      }}
                    >
                      {t('features.2.description')}
                    </p>
                  </div>

                  {/* 1px 세로선 */}
                  <div className="w-[1px] bg-white/30" />

                  {/* 컬럼 4: 프리미엄 재료와 장비 */}
                  <div className="flex-1 pl-[30px]">
                    <h3
                      style={{
                        color: '#FFF',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.2px',
                        marginBottom: '12px',
                      }}
                    >
                      {t('features.3.title')}
                    </h3>
                    <p
                      style={{
                        color: '#FFF',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '26px',
                        letterSpacing: '-0.16px',
                      }}
                    >
                      {t('features.3.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
