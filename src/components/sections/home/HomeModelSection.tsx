'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ASSETS } from '@/constants/assets';
import { ANIMATION_DURATION, EASING, ANIMATION_DIRECTION, VIEWPORT_CONFIG } from '@/lib/animationTiming';
import { useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 홈 모델 섹션 컴포넌트
 * 
 * @description
 * 블랑쉬 치과의 치료 철학을 표현하는 섹션입니다.
 * 
 * 레이아웃 구조:
 * - 배경: 다크 배경 (#00151D) + 배경 이미지
 * - 섹션 높이: 705px
 * 
 * 주요 요소:
 * 1. Sparkles 파티클 효과
 *    - 상단 중앙에 위치
 *    - 반투명 그라디언트 마스크 적용
 * 
 * 2. 좌측 텍스트 영역
 *    - 상단 텍스트: 슬라이드 애니메이션 (왼쪽에서 오른쪽)
 *    - 하단 텍스트: 슬라이드 애니메이션 (왼쪽에서 오른쪽)
 * 
 * 3. 디자인 요소
 *    - 좌측 상단 세로 구분선
 * 
 * @returns {JSX.Element} 모델 섹션 컴포넌트
 */
export function HomeModelSection() {
  const motionEnabled = useMotionEnabled();
  const MotionDiv = (motionEnabled ? motion.div : 'div') as typeof motion.div;
  const { fadeUp } = useResponsiveAnimation();

  const translations = useTranslations('model');
  const commonTranslations = useTranslations('common');

  // 다국어 데이터 로드 (모바일/데스크톱 기준 줄바꿈 포함)
  const topTextLines = translations.raw('topText.desktop') as string[] || [];
  const bottomTextLinesMobile = translations.raw('bottomText.mobile') as string[] || [];
  const bottomTextLinesDesktop = translations.raw('bottomText.desktop') as string[] || [];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#00151D' }}
    >
      {/* 배경 이미지 영역 */}
      <Image
        src={ASSETS.MODEL.BG_MAIN}
        alt="Section Background"
        fill
        className="hidden md:block object-cover"
        sizes="100vw"
      />
      <Image
        src={ASSETS.MODEL.BG_MAIN_MOBILE}
        alt="Section Background"
        fill
        className="block md:hidden object-cover"
        sizes="100vw"
      />

      <div className="relative w-full mx-auto h-[705px] max-w-content">

        {/* 상단 중앙 그라데이션 오버레이 */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[800px] h-[181px]"
          style={{
            background: 'linear-gradient(0deg, rgba(157, 155, 145, 0.00) 0%, #B8AB98 82.69%)',
          }}
        />

        {/* 상단 텍스트 — 모바일: 중앙 top-63px / PC: 좌측 top-94px */}
        <MotionDiv
          className="absolute z-20 left-1/2 -translate-x-1/2 top-[63px] text-center md:left-[80px] md:translate-x-0 md:top-[94px] md:text-left"
          {...(motionEnabled ? {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: VIEWPORT_CONFIG,
            transition: { duration: ANIMATION_DURATION.SLOW, ease: EASING.EASE_OUT },
          } : {})}
          style={{
            color: 'rgba(255, 255, 255, 0.80)',
            fontSize: '20px',
            fontWeight: 200,
            lineHeight: 'normal',
            letterSpacing: '-0.2px',
            margin: 0,
          }}
        >
          {topTextLines.map((line, index) => (
            <p key={index} style={{ margin: 0 }}>{line}</p>
          ))}
        </MotionDiv>

        {/* 하단 텍스트 — 모바일: 중앙 하단 / PC: 우측 top-500px */}
        <div
          className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[40px] text-center md:left-auto md:translate-x-0 md:right-[61px] md:bottom-auto md:top-[500px] md:text-left"
        >
          {/* 모바일 */}
          <div
            className="block md:hidden"
            style={{
              color: 'rgba(255, 255, 255, 0.80)',
              fontSize: '28px',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.28px',
            }}
          >
            {bottomTextLinesMobile.map((line, index) => (
              <p key={index} style={{ margin: 0 }}>{line}</p>
            ))}
          </div>
          {/* 데스크톱 */}
          <div
            className="hidden md:block"
            style={{
              color: '#FFF',
              fontSize: '38px',
              fontWeight: 400,
              lineHeight: '46px',
              letterSpacing: '-0.38px',
            }}
          >
            {bottomTextLinesDesktop.map((line, index) => (
              <p key={index} style={{ margin: 0 }}>{line}</p>
            ))}
          </div>
        </div>

      </div>

      {/* 모바일 전용 하단 그라디언트 레이어 */}
      <div
        className="block md:hidden absolute bottom-0 left-0 w-full h-[220px] z-15"
        style={{
          background: 'linear-gradient(180deg, rgba(3, 29, 29, 0.00) 3.6%, rgba(3, 29, 29, 0.60) 66.86%)',
        }}
      />
    </section>
  );
}
