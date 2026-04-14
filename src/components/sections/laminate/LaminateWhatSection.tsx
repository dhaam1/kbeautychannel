'use client';

import { useTranslations } from 'next-intl';
import { Section } from '@/components/layouts/Container';
import { LampContainer } from '@/components/ui/lamp';
import { motion } from 'framer-motion';
import { VIEWPORT_CONFIG, EASING } from '@/lib/animationTiming';

/**
 * 라미네이트 What 섹션 컴포넌트
 * 
 * @description
 * 무삭제 라미네이트란 무엇인지 설명하는 섹션입니다.
 * CSS 기반 반응형을 사용하며, framer-motion의 transform과 CSS transform을 분리하여 충돌을 방지합니다.
 * 
 * @returns {JSX.Element} What 섹션 컴포넌트
 */
export function LaminateWhatSection() {
  const t = useTranslations('solution.laminate.what');

  const textGroup = {
    firstText: t('textGroup.firstText'),
    secondText: t('textGroup.secondText'),
    thirdText: t('textGroup.thirdText'),
  };
  const items = t.raw('items') as Array<{
    title: string;
    firstText: string;
    secondText: string;
  }>;

  return (
    <Section bgClassName="bg-[#080B16]" paddingClassName="py-0">
      <div className="relative w-full mx-auto lg:h-[493px] h-[1350px]" style={{ maxWidth: '1472px' }}>

        {/* Lamp Container - 모바일: 텍스트 아래, 데스크톱: 기존 위치 */}
        <motion.div
          className="absolute lg:left-0 lg:right-[-175px] lg:top-[-80px] lg:h-[calc(100%+80px)] left-0 right-0 top-[400px] h-[300px] w-full lg:w-auto"
          style={{ zIndex: 0 }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, ease: EASING.APPLE_SMOOTH }}
        >
          <LampContainer className="min-h-0 bg-[#080B16] w-full h-full">
            <div></div>
          </LampContainer>
        </motion.div>

        {/* 텍스트 그룹 - 모바일: 상단, 데스크톱: 기존 위치 */}
        <div
          className="absolute lg:left-[80px] lg:top-[70px] left-[30px] md:left-[80px] top-[70px] right-[30px] lg:right-auto lg:z-auto z-10"
        >
          <div>
            <motion.p
              style={{ color: '#FFF', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', paddingBottom: '10px' }}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, ease: EASING.APPLE_SMOOTH, delay: 0.1 }}
            >
              {textGroup.firstText}
            </motion.p>
            <motion.h2
              className="whitespace-pre-line"
              style={{ color: '#FFF', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', paddingBottom: '50px' }}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, ease: EASING.APPLE_SMOOTH, delay: 0.2 }}
            >
              {textGroup.secondText}
            </motion.h2>
            {textGroup.thirdText && (
              <motion.p
                className="whitespace-pre-line"
                style={{ color: '#FFF', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '26px', letterSpacing: '-0.18px' }}
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.6, ease: EASING.APPLE_SMOOTH, delay: 0.3 }}
              >
                {textGroup.thirdText}
              </motion.p>
            )}
          </div>
        </div>

        {/* Info Card 1 - 모바일: 램프 아래 세로 배치, 데스크톱: 기존 위치 */}
        <motion.div
          className="absolute lg:right-[450px] lg:top-[100px] lg:left-auto top-[480px] left-1/2 lg:left-auto"
          style={{
            width: '298px',
            height: '298px',
            borderRadius: '200px',
            border: '4px solid rgba(0, 236, 214, 0.80)',
            background: 'rgba(244, 247, 254, 0.90)',
            zIndex: 3,
          }}
          initial={{ x: '-50%', y: 50, opacity: 0 }}
          whileInView={{ x: '-50%', y: 0, opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, ease: EASING.APPLE_SMOOTH, delay: 0 }}
        >
          <h3
            className="absolute text-[#000] font-['Pretendard'] text-[20px] font-semibold leading-normal tracking-[-0.2px] whitespace-pre-line"
            style={{ left: '72px', top: '67px' }}
          >
            {items[0].firstText}
          </h3>
          <div
            className="absolute text-[#262626] font-['Pretendard'] text-[20px] font-normal leading-[30px] tracking-[-0.2px] whitespace-pre-line"
            style={{ left: '72px', top: '136px' }}
          >
            {items[0].secondText}
          </div>
        </motion.div>

        {/* Info Card 2 - 모바일: Card 1 아래 겹쳐서 배치, 데스크톱: 기존 위치 */}
        <motion.div
          className="absolute lg:right-[172px] lg:top-[100px] lg:left-auto top-[758px] left-1/2 lg:left-auto"
          style={{
            width: '298px',
            height: '298px',
            borderRadius: '200px',
            border: '4px solid rgba(0, 236, 214, 0.80)',
            background: 'rgba(244, 247, 254, 0.90)',
            zIndex: 2,
          }}
          initial={{ x: '-50%', y: 50, opacity: 0 }}
          whileInView={{ x: '-50%', y: 0, opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, ease: EASING.APPLE_SMOOTH, delay: 0.3 }}
        >
          <h3
            className="absolute text-[#000] font-['Pretendard'] text-[20px] font-semibold leading-normal tracking-[-0.2px] whitespace-pre-line"
            style={{ left: '72px', top: '67px' }}
          >
            {items[1].firstText}
          </h3>
          <div
            className="absolute text-[#262626] font-['Pretendard'] text-[20px] font-normal leading-[30px] tracking-[-0.2px] whitespace-pre-line"
            style={{ left: '72px', top: '136px' }}
          >
            {items[1].secondText}
          </div>
        </motion.div>

        {/* Info Card 3 - 모바일: Card 2 아래 겹쳐서 배치, 데스크톱: 기존 위치 */}
        <motion.div
          className="absolute lg:right-[-106px] lg:top-[100px] lg:left-auto top-[1036px] left-1/2 lg:left-auto"
          style={{
            width: '298px',
            height: '298px',
            borderRadius: '200px',
            border: '1px solid rgba(2, 36, 45, 0.88)',
            background: 'rgba(255, 255, 255, 0.60)',
            zIndex: 1,
          }}
          initial={{ x: '-50%', y: 50, opacity: 0 }}
          whileInView={{ x: '-50%', y: 0, opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.6, ease: EASING.APPLE_SMOOTH, delay: 0.6 }}
        >
          <h3
            className="absolute text-[#000] font-['Pretendard'] text-[20px] font-semibold leading-normal tracking-[-0.2px] whitespace-pre-line"
            style={{ left: '72px', top: '67px' }}
          >
            {items[2].firstText}
          </h3>
          <div
            className="absolute text-[#262626] font-['Pretendard'] text-[20px] font-normal leading-[30px] tracking-[-0.2px] whitespace-pre-line"
            style={{ left: '72px', top: '136px' }}
          >
            {items[2].secondText}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
