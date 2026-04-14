'use client';

import { motion } from 'framer-motion';
import { VIEWPORT_CONFIG } from '@/lib/animationTiming';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { useTranslations } from 'next-intl';

/**
 * 치아미백 추천 대상 섹션 컴포넌트
 * 
 * @description
 * 치아미백 추천 대상을 보여주는 섹션입니다.
 * 이미지와 동일한 레이아웃으로 구성됩니다.
 * 
 * 레이아웃 구조:
 * - 배경: 흰색
 * - 상단: 제목 영역 ("추천 대상", "이런 분들이라면,\n치아미백을 권합니다")
 * - 하단: 4개 컬럼 (각 컬럼은 제목과 설명으로 구성)
 * 
 * @returns {JSX.Element} 추천 대상 섹션 컴포넌트
 */
export function WhiteningLabSection() {
  const motionEnabled = useMotionEnabled();
  const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
  const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
  const { fadeUp } = useResponsiveAnimation();
  const t = useTranslations('whitening.recommendation');

  return (
    <div className="relative w-full" style={{ backgroundColor: '#FEFEFE' }}>
      <div className="relative w-full mx-auto" style={{ maxWidth: '1472px' }}>
        {/* 상단 제목 영역 */}
        <div className="w-full px-[30px] md:px-[80px] pt-[60px] pb-[60px]" style={{ backgroundColor: '#FEFEFE' }}>
          <H2
            className="pb-[15px]"
            style={{
              color: '#000',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '30px',
              letterSpacing: '-0.18px',
            }}
            {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
          >
            {t('title')}
          </H2>
          <P
            className="whitespace-pre-line"
            style={{
              color: '#000',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              letterSpacing: '-0.28px',
            }}
            {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
          >
            {t('subtitle')}
          </P>
        </div>

        {/* 하단 4컬럼 영역 */}
        <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px]" style={{ backgroundColor: '#FEFEFE' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* 컬럼 1 */}
            <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
              <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                {/* <h3
                  className="mb-4"
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                  }}
                >
                  1:1 맞춤 설계
                </h3> */}
                <h3
                  className="whitespace-pre-line"
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  {t('items.0.title')}
                </h3>
              </div>
            </div>

            {/* 컬럼 2 */}
            <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
              <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                {/* <h3
                  className="mb-4"
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                  }}
                >
                  자연치아처럼 재현
                </h3> */}
                <h3
                  className="whitespace-pre-line"
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  {t('items.1.title')}
                </h3>
              </div>
            </div>

            {/* 컬럼 3 */}
            <div className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]">
              <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                {/* <h3
                  className="mb-4"
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                  }}
                >
                  실시간 소통
                </h3> */}
                <h3
                  className="whitespace-pre-line"
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  {t('items.2.title')}
                </h3>
              </div>
            </div>

            {/* 컬럼 4 */}
            <div className="flex flex-col pt-[40px] pb-[40px] pl-0 md:pl-[30px] lg:pl-[30px]">
              <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                {/* <h3
                  className="mb-4"
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                  }}
                >
                  프리미엄 재료와 장비
                </h3> */}
                <h3
                  className="whitespace-pre-line"
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  {t('items.3.title')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
