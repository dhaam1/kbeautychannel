'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 라미네이트 Highlight2 섹션 컴포넌트
 * 
 * @returns {Promise<JSX.Element>} Highlight2 섹션 컴포넌트
 */
export function LaminateHighlight2Section() {
  const t = useTranslations('solution.laminate.highlight2');
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const bodyMotion = fadeUp({ delay: 0.2 });

  return (
    <div className="relative w-full" style={{ backgroundColor: '#EAEEF1' }}>
      <Image
        src="/assets/asset-94.webp"
        alt="Highlight"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="relative w-full h-[566px] mx-auto" style={{ maxWidth: '1472px' }}>
        <div
          className="absolute left-[30px] bottom-[40px] md:left-[81px] md:top-[67px] md:bottom-auto z-[20]"
        >
          <motion.h2
            className="whitespace-pre-line"
            style={{
              color: '#000',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '30px',
              letterSpacing: '-0.18px',
              marginBottom: 0,
            }}
            {...labelMotion}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            className="whitespace-pre-line"
            style={{
              color: '#000',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '26px',
              letterSpacing: '-0.18px',
              marginTop: '17px',
              marginBottom: 0,
            }}
            {...bodyMotion}
          >
            {t('description')}
          </motion.p>
        </div>
        {/* 모바일 블러 레이어 */}
        <div
          className="md:hidden absolute bottom-0 left-0 w-full z-[5]"
          style={{
            height: '215px',
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>
    </div>
  );
}
