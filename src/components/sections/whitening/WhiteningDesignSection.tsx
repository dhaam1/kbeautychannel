'use client';

import { motion } from 'framer-motion';
import { VIEWPORT_CONFIG } from '@/lib/animationTiming';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { useTranslations } from 'next-intl';

/**
 * 치아미백 설계 섹션 컴포넌트
 */
export function WhiteningDesignSection() {
  const motionEnabled = useMotionEnabled();
  const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
  const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
  const { fadeUp } = useResponsiveAnimation();
  const t = useTranslations('whitening.design');

  return (
    <div className="relative w-full bg-white">
      <div className="relative w-full h-auto" style={{ backgroundColor: '#F7F8F8' }}>
        <div className="w-full max-w-[1472px] mx-auto px-[30px] md:px-[80px] pt-[60px] pb-[60px] md:pb-[100px]">
          {/* Header Text */}
          <div className="mb-[40px] md:mb-[60px]">
            <H2
              className="whitespace-pre-line"
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '30px',
                letterSpacing: '-0.18px',
                marginBottom: 0,
              }}
              {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
            >
              {t('title')}
            </H2>
            <P
              className="whitespace-pre-line mt-[17px]"
              style={{
                color: '#000',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.28px',
                marginBottom: 0,
              }}
              {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
            >
              {t('subtitle')}
            </P>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-black mb-[40px] md:mb-[60px]" />

          {/* Columns */}
          <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-0">
            {/* Item 1 */}
            <div className="flex-1 lg:pr-[30px]">
              <h3
                className="whitespace-nowrap"
                style={{
                  color: '#000',
                  fontSize: '22px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.22px',
                  marginBottom: '12px',
                }}
              >
                {t('items.0.title')}
              </h3>
              <p
                className="whitespace-pre-line"
                style={{
                  color: 'rgba(0, 0, 0, 0.70)',
                  fontSize: '17px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '28px',
                  letterSpacing: '-0.17px',
                }}
              >
                {t('items.0.description')}
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex-1 lg:px-[30px] lg:border-l lg:border-r border-transparent">
              {/* Note: Border logic was not in original code, I am omitting borders to match original look which seemed to rely on spacing? 
                   Original desktop code had dividers? No, just margins/padding. 
                   Wait, original Mobile had no dividers. Desktop had no vertical dividers either?
                   Let's check original.
                   Mobile: just div with pb.
                   Desktop: just flex-1 px-[30px].
                   Okay, no vertical lines.
               */}
              <h3
                style={{
                  color: '#000',
                  fontSize: '22px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.22px',
                  marginBottom: '12px',
                }}
              >
                {t('items.1.title')}
              </h3>
              <p
                className="whitespace-pre-line"
                style={{
                  color: 'rgba(0, 0, 0, 0.70)',
                  fontSize: '17px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '28px',
                  letterSpacing: '-0.17px',
                }}
              >
                {t('items.1.description')}
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex-1 lg:pl-[30px]">
              <h3
                style={{
                  color: '#000',
                  fontSize: '22px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.22px',
                  marginBottom: '12px',
                }}
              >
                {t('items.2.title')}
              </h3>
              <p
                className="whitespace-pre-line"
                style={{
                  color: 'rgba(0, 0, 0, 0.70)',
                  fontSize: '17px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '28px',
                  letterSpacing: '-0.17px',
                }}
              >
                {t('items.2.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
