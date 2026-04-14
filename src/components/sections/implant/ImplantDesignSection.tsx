'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { VIEWPORT_CONFIG } from '@/lib/animationTiming';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 임플란트 설계 섹션 컴포넌트
 */
/**
 * 임플란트 설계 섹션 컴포넌트
 */
export function ImplantDesignSection() {
  const t = useTranslations('implant.design');
  const motionEnabled = useMotionEnabled();
  const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
  const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
  const { fadeUp } = useResponsiveAnimation();

  const columns = t.raw('columns') as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div className="relative w-full bg-white">
      <div className="relative w-full h-auto flex flex-col lg:block">
        {/* 모바일 레이아웃 */}
        <div className="lg:hidden w-full flex flex-col">
          {/* 2. 텍스트 섹션 */}
          <div
            className="w-full px-[30px] md:px-[80px] py-[60px] overflow-visible"
            style={{ backgroundColor: '#FFF' }}
          >
            <H2
              className="whitespace-pre-line"
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '30px',
                letterSpacing: '-0.24px',
                marginBottom: 0,
              }}
              {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
            >
              {t('label')}
            </H2>
            <P
              className="whitespace-pre-line mt-[17px] pb-0 lg:pb-[50px] text-[24px] md:text-[28px]"
              style={{
                color: '#000',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.38px',
                marginBottom: 0,
              }}
              {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
            >
              {t('title.mobile')}
            </P>
            <div className="hidden lg:block w-full h-[1px]" style={{ backgroundColor: '#000' }} />
          </div>

          {/* 3. 3컬럼 → Column 변환 */}
          <div
            className="w-full px-[30px] md:px-[80px] pb-[100px] overflow-visible"
            style={{ backgroundColor: '#FFF' }}
          >
            {columns.map((column, index) => (
              <div key={index} className={`pb-[24px] ${index > 0 ? 'border-t border-black/30' : 'pt-0 border-t border-black/30'}`}>
                <h3
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                    marginBottom: '12px',
                    marginTop: '24px',
                  }}
                >
                  {column.title}
                </h3>
                <p
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {column.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 태블릿/PC 레이아웃 */}
        <div className="hidden lg:block relative w-full h-full bg-white">
          {/* 컨텐츠 래퍼: max-w-[1472px] 중앙 정렬 */}
          <div className="relative w-full max-w-[1472px] h-full mx-auto px-[80px] pt-[70px] pb-[100px]">
            <div className="relative w-full h-full flex flex-col">

              {/* 절대 위치 텍스트 - 좌상단 */}
              <div>
                <P
                  className="whitespace-pre-line"
                  style={{
                    color: '#000',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '30px',
                    letterSpacing: '-0.24px',
                    marginBottom: 0,
                  }}
                  {...motionProps(motionEnabled, {
                    initial: { y: 10, opacity: 0 },
                    whileInView: { y: 0, opacity: 1 },
                    viewport: VIEWPORT_CONFIG,
                    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 },
                  })}
                >
                  {t('label')}
                </P>
                <P
                  className="whitespace-pre-line mt-[17px]"
                  style={{
                    color: '#000',
                    fontSize: '28px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.28px',
                    marginTop: '17px',
                    marginBottom: 0,
                    paddingBottom: '50px',
                  }}
                  {...motionProps(motionEnabled, {
                    initial: { y: 10, opacity: 0 },
                    whileInView: { y: 0, opacity: 1 },
                    viewport: VIEWPORT_CONFIG,
                    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
                  })}
                >
                  {t('title.desktop')}
                </P>
                <div className="hidden lg:block w-full h-[1px]" style={{ backgroundColor: '#000' }} />
              </div>

              {/* 3컬럼 Row */}
              <div className="mt-[50px]">
                <div className="flex flex-row">
                  {columns.map((column, index) => (
                    <div key={index} className={`flex-1 ${index === 0 ? 'pr-[30px]' : index === 1 ? 'px-[30px]' : 'pl-[30px]'}`}>
                      <p
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
                        {column.title}
                      </p>
                      <p
                        style={{
                          color: '#000',
                          fontSize: '17px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '26px',
                          letterSpacing: '-0.2px',
                        }}
                      >
                        {column.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
