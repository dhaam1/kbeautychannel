'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { useTranslations } from 'next-intl';

/**
 * 치아미백 진료 장비 섹션 컴포넌트
 */
export function WhiteningLocationSection() {
  const motionEnabled = useMotionEnabled();
  const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
  const Div = (motionEnabled ? motion.div : 'div') as typeof motion.div;
  const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
  const { fadeUp } = useResponsiveAnimation();
  const t = useTranslations('whitening.location');

  const VIEWPORT_CONFIG = {
    once: true,
    amount: 0.3,
  };

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-visible"
      style={{ backgroundColor: '#F7F8F8' }}
    >
      {/* 상단 영역 (제목 및 설명) */}
      <div
        className="flex flex-col items-start w-full mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[70px] pb-[70px] overflow-visible"
        style={{ maxWidth: '1472px' }}
      >
        <H2
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
            marginBottom: '12px',
          }}
          {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
        >
          {t('label')}
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
            marginBottom: '24px',
          }}
          {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
        >
          <span className="hidden md:inline whitespace-pre-line">{t('titleDesktop')}</span>
          <span className="md:hidden whitespace-pre-line">{t('titleMobile')}</span>
        </P>
        <P
          className="whitespace-pre-line"
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '28px',
            letterSpacing: '-0.18px',
          }}
          {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
        >
          {t('description')}
        </P>
      </div>

      {/* 그리드 컨테이너 */}
      <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px] mx-auto overflow-visible" style={{ maxWidth: '1472px' }}>
        {/* 메인 그리드 - 이미지+텍스트 쌍 구조 */}
        <div
          className="relative grid grid-cols-1 md:grid-cols-2 w-full mx-auto overflow-visible gap-[30px]"
          style={{ maxWidth: '1472px', background: '#F7F8F8' }}
        >
          {/* 카드 1: 전문가용 정품 치아미백제 */}
          <div className="relative flex flex-col w-full bg-white" style={{ height: '600px' }}>
            {/* 이미지 */}
            <div className="relative w-full h-[50%] bg-white">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/whitening/whitening-2.webp"
                  alt="식약처 승인 전문가용 정품 치아미백제, 고농도 미백으로 치아 깊은 착색까지 개선"
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                  quality={85}
                />
              </div>
            </div>
            {/* 텍스트 */}
            <div
              className="flex flex-col items-start justify-start w-full bg-white pt-[40px] pb-[40px] px-[40px] h-[50%]"
            >
              <h3
                style={{
                  color: '#262626',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '16px',
                }}
              >
                {t('items.0.title')}
              </h3>
              <p
                className="whitespace-pre-line"
                style={{
                  color: 'rgba(0, 0, 0, 0.7)',
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
          </div>

          {/* 카드 2: 특수 광선 조사기 */}
          <div className="relative flex flex-col w-full bg-white" style={{ height: '600px' }}>
            {/* 이미지 */}
            <div className="relative w-full h-[50%] bg-white">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/whitening/whitening-3.webp"
                  alt="치과 미백 전용 특수 광선 조사기, 미백제 활성도를 높여 시술 시간을 단축하는 장비"
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                  quality={85}
                />
              </div>
            </div>
            {/* 텍스트 */}
            <div
              className="flex flex-col items-start justify-start w-full bg-white pt-[40px] pb-[40px] px-[40px] h-[50%]"
            >
              <h3
                style={{
                  color: '#262626',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '16px',
                }}
              >
                {t('items.1.title')}
              </h3>
              <p
                className="whitespace-pre-line"
                style={{
                  color: 'rgba(0, 0, 0, 0.7)',
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
          </div>
        </div>
      </div>
    </section>
  );
}
