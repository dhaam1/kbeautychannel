'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 블랑쉬치과 원장의사 섹션 컴포넌트
 * 
 * @description
 * 대표원장 소개 섹션입니다.
 * 
 * 레이아웃:
 * - 데스크톱: 절대 위치로 오른쪽에 정보 박스 배치
 * - 태블릿/모바일: 세로로 쌓기
 * 
 * @returns {JSX.Element} 원장의사 섹션 컴포넌트
 */
export function AboutDirectorSection() {
  const t = useTranslations('aboutDirector');
  const motionEnabled = useMotionEnabled();
  const Div = (motionEnabled ? motion.div : 'div') as typeof motion.div;
  const { fadeUp } = useResponsiveAnimation();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [layerHeight, setLayerHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (infoBoxRef.current) {
        const height = infoBoxRef.current.offsetHeight;
        setLayerHeight(height + 92);
      }
    };

    // 초기 높이 측정
    updateHeight();

    // ResizeObserver로 요소 크기 변경만 감지
    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    if (infoBoxRef.current) {
      observer.observe(infoBoxRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const VIEWPORT_CONFIG = {
    once: true,
    amount: 0.3,
  };

  return (
    <div className="w-full bg-white">
      <section
        className={cn(
          "relative w-full overflow-hidden",
          "bg-[#FEFEFE]",
          "pt-[60px] pb-[60px] px-[30px] md:pt-[70px] md:pb-[60px] md:px-20 lg:py-0",
          "h-auto lg:h-[907px]",
          "lg:flex lg:items-center",
          "max-w-[1472px] mx-auto"
        )}
      >
        {/* 컨테이너 - 태블릿/모바일에서만 flex-col */}
        <div className="flex flex-col md:flex-col lg:block">
          {/* 위쪽 왼쪽 텍스트 블록 컨테이너 */}
          <div
            className={cn(
              "flex flex-col",
              "order-1 lg:order-none",
              "static md:absolute lg:absolute md:left-[80px] lg:left-[80px] lg:top-[70px]",
              "mb-8 md:mb-8 lg:mb-0"
            )}
          >
            {/* 첫 번째 텍스트 */}
            <Div
              className={cn(
                "text-left",
                "text-[#000] font-['Pretendard']",
                "text-[18px]",
                "font-normal",
                "leading-[30px]",
                "tracking-[-0.18px]",
                "mb-2"
              )}
              {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
            >
              <h2>{t('category')}</h2>
            </Div>

            {/* 두 번째 텍스트 */}
            <Div
              className={cn(
                "text-left",
                "text-[#000] font-['Pretendard']",
                "text-[28px]",
                "font-medium",
                "leading-[40px]",
                "tracking-[-0.28px]",
                "whitespace-pre-line"
              )}
              {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
            >
              {t('title')}
            </Div>

            {/* 마지막 설명 텍스트 */}
            <Div
              className={cn(
                "text-left",
                "text-[#000] font-['Pretendard']",
                "text-[18px]",
                "font-normal",
                "leading-[26px]",
                "tracking-[-0.18px]",
                "mt-[50px]",
                "whitespace-pre-line"
              )}
              {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
            >
              {t('description')}
            </Div>
          </div>

          {/* 이미지 영역 - 모바일/태블릿에서는 중간에, PC에서는 절대 위치로 바닥에 붙음 */}
          <div className="mx-auto order-2 lg:order-none static lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2">
            <Image
              src="/assets/laminate/laminate-1.webp"
              alt={t('name')}
              width={411}
              height={658}
              className="object-cover w-[326px] h-[558px] aspect-[163/279] lg:w-[411px] lg:h-[658px] lg:aspect-[411/658]"
            />
          </div>

          {/* 오른쪽 정보 박스 컨테이너 - PC에서 절대 위치 */}
          <div
            ref={infoBoxRef}
            className={cn(
              "flex flex-col",
              "items-center lg:items-end",
              "w-full lg:w-auto",
              "relative md:relative lg:absolute",
              "lg:bottom-[50px] lg:right-[50px]",
              "order-3 lg:order-none",
              "mb-0 md:mb-0 lg:mb-0",
              "z-10"
            )}
          >
            {/* 오른쪽 중간 정보 박스 - 아이콘과 설명 텍스트 */}
            <div className="flex flex-col items-start lg:items-start w-full lg:w-auto mb-[57px] md:mb-[57px] lg:mb-0">
              {/* 아이콘 - SVG */}
              <div className="mb-4 lg:mb-0 lg:pb-5" style={{ width: '32px', height: '30.81px', paddingBottom: '6.19px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
                  <path d="M9.24952 16.0662C5.62118 16.2845 2.6743 19.7009 2.6743 23.3356V27.8093C2.6743 28.7499 1.91162 29.5126 0.970288 29.5126H0V30.8091H16.6912V23.0616C16.6912 19.0477 13.3164 15.8219 9.24952 16.0662Z" fill="#61D5CA" />
                  <path d="M24.9943 16.0532C21.1251 16.0532 17.9883 19.1901 17.9883 23.0592V30.8095H24.9943C28.8634 30.8095 32.0003 27.6727 32.0003 23.8035V23.0592C32.0003 19.1901 28.8634 16.0532 24.9943 16.0532Z" fill="#61D5CA" />
                  <path d="M16.6912 0.000488281H0V1.29703H0.970289C1.91092 1.29703 2.67359 2.0597 2.67359 3.00033V7.47468C2.67359 11.1094 5.62118 14.5259 9.24881 14.7434C13.3164 14.9884 16.6912 11.7626 16.6912 7.74797V0.000488281Z" fill="#61D5CA" />
                  <path d="M24.9943 0.000488281H17.9883V7.75079C17.9883 11.6199 21.1251 14.7568 24.9943 14.7568C28.8634 14.7568 32.0003 11.6199 32.0003 7.75079V7.00648C32.0003 3.13733 28.8634 0.000488281 24.9943 0.000488281Z" fill="#61D5CA" />
                </svg>
              </div>

              {/* 설명 텍스트 */}
              <Div
                className={cn(
                  "text-left",
                  "whitespace-pre-line",
                  "font-['Pretendard']"
                )}
                style={{
                  color: '#000',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '38px',
                  letterSpacing: '-0.18px',
                }}
                {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
              >
                <span className="text-[16px] md:text-[18px] font-medium"><h3>{t('name')}</h3></span>{'\n'}
                <span className="text-[14px] md:text-[16px]">{t('credentials')}</span>
              </Div>
            </div>

            {/* 오른쪽 하단 정보 박스 - 서명 */}
            <div className="flex flex-row items-end justify-end w-full lg:w-auto">
              {/* 서명 이미지 */}
              <Image
                src="/assets/asset-61.webp"
                alt={t('name')}
                width={147}
                height={53}
                className="object-contain"
                style={{ width: '147px', height: '53px', aspectRatio: '147/53' }}
              />
            </div>
          </div>
        </div>

        {/* 하단 레이어 - 모바일/태블릿에서만 표시 */}
        {
          layerHeight > 0 && (
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 w-full",
                "z-0",
                "lg:hidden"
              )}
              style={{
                backgroundColor: '#F9F9FA',
                height: `${layerHeight}px`,
              }}
            />
          )
        }
      </section >
    </div >
  );
}
