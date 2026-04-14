'use client';

import { Compare } from '@/components/ui/compare';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import { useTranslations } from 'next-intl';

/**
 * 치아미백 추천대상/브랜드 섹션 컴포넌트
 */
export function WhiteningRecommendationSection() {
  const { fadeUp } = useResponsiveAnimation();
  const labelMotion = fadeUp({ delay: 0.1 });
  const titleMotion = fadeUp({ delay: 0.15 });
  const bodyMotion = fadeUp({ delay: 0.2 });
  const cardMotion = (index: number) => fadeUp({ delay: 0.3 + index * 0.1 });
  const t = useTranslations('whitening.cases');

  return (
    <div className="relative w-full bg-white">
      <div className="relative w-full overflow-hidden flex-shrink-0 bg-white">
        <div className="flex flex-col items-center w-full pt-[60px] lg:pt-[70px] pb-[77px] px-[30px] md:px-[80px] bg-white" style={{ maxWidth: '1472px', margin: '0 auto' }}>
          <motion.h2 className="pb-[15px] relative z-10" style={{ color: '#000', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px' }} {...labelMotion}>
            {t('label')}
          </motion.h2>
          <motion.p className="relative z-10 whitespace-pre-line mb-[20px]" style={{ color: '#000', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px' }} {...titleMotion}>
            {t('title')}
          </motion.p>
          <motion.p className="relative z-10" style={{ color: '#000', textAlign: 'center', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.16px' }} {...bodyMotion}>
            {t('guide')}
          </motion.p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-white"></div>
      <div className="h-auto w-full mx-auto flex flex-col md:flex-row border-white bg-white" style={{ maxWidth: '1472px' }}>
        {/* 사례 1: 김혜빈님 */}
        <motion.div
          className={`relative z-25 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col ${0 < 2
            ? 'border-b-[1px] md:border-b-0 md:border-r-[1px] border-white'
            : 'border-r border-white'
            } overflow-hidden`}
          {...cardMotion(0)}
        >
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <div className="overflow-hidden w-full h-full" style={{ position: 'relative', cursor: 'grab' }}>
              <Compare
                firstImage="/assets/whitening/whitening-4.webp"
                secondImage="/assets/whitening/whitening-5.webp"
                firstAlt="30대 여성 치아미백 시술 전, 전체적으로 어두운 치아 톤으로 웃을 때 인상이 흐려 보이는 상태"
                secondAlt="30대 여성 치아미백 시술 후, 치아 톤이 밝아지며 웃을 때 인상이 또렷하게 개선된 모습"
                className="w-full h-full"
                firstImageClassName="object-cover md:object-cover"
                secondImageClassname="object-cover md:object-cover"
                slideMode="drag"
                showHandlebar={true}
                autoplay={false}
              />
            </div>
          </div>
          <div className="relative w-full md:h-[50%] pl-[30px] pr-6 pt-[291px] pb-6 md:pl-[80px] md:pr-8 md:pt-8 md:pb-8 flex flex-col bg-white border-l-[1px] border-white">
            <h3 className="text-left font-['Pretendard'] mb-2" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
              {t('items.0.title')}
            </h3>
            <p className="text-left font-['Pretendard']" style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
              {t('items.0.description')}
            </p>
          </div>
        </motion.div>

        {/* 사례 2: 이현정님 */}
        <motion.div
          className={`relative z-15 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col ${1 < 2
            ? 'border-b-[1px] md:border-b-0 md:border-r-[1px] border-white'
            : 'border-r border-white'
            } overflow-hidden`}
          {...cardMotion(1)}
        >
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <div className="overflow-hidden w-full h-full" style={{ position: 'relative', cursor: 'grab' }}>
              <Compare
                firstImage="/assets/whitening/whitening-6.webp"
                secondImage="/assets/whitening/whitening-7.webp"
                firstAlt="20대 여성 치아미백 시술 전, 누런 치아 색으로 인해 치아가 칙칙해 보이는 상태"
                secondAlt="20대 여성 치아미백 시술 후, 자연스러운 밝기의 치아 톤으로 깨끗하게 개선된 모습"
                className="w-full h-full"
                firstImageClassName="object-cover md:object-cover"
                secondImageClassname="object-cover md:object-cover"
                slideMode="drag"
                showHandlebar={true}
                autoplay={false}
              />
            </div>
          </div>
          <div className="relative w-full md:h-[50%] pl-[30px] pr-6 pt-[291px] pb-6 md:pl-[80px] md:pr-8 md:pt-8 md:pb-8 flex flex-col bg-white">
            <h3 className="text-left font-['Pretendard'] mb-2" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
              {t('items.1.title')}
            </h3>
            <p className="text-left font-['Pretendard']" style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
              {t('items.1.description')}
            </p>
          </div>
        </motion.div>

        {/* 사례 3: 소지원님 */}
        <motion.div
          className={`relative h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col ${2 < 2
            ? 'border-b-[1px] md:border-b-0 md:border-r-[1px] border-white'
            : 'border-r border-white'
            } overflow-hidden`}
          {...cardMotion(2)}
        >
          <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
            <div className="overflow-hidden w-full h-full" style={{ position: 'relative', cursor: 'grab' }}>
              <Compare
                firstImage="/assets/whitening/whitening-8.webp"
                secondImage="/assets/whitening/whitening-9.webp"
                firstAlt="30대 여성 치아미백 시술 전, 커피 착색으로 치아 표면에 누런 색소가 남아 있는 상태"
                secondAlt="30대 여성 치아미백 시술 후, 착색이 제거되어 깔끔하고 균일한 치아 인상이 완성된 모습"
                className="w-full h-full"
                firstImageClassName="object-cover md:object-cover"
                secondImageClassname="object-cover md:object-cover"
                slideMode="drag"
                showHandlebar={true}
                autoplay={false}
              />
            </div>
          </div>
          <div className="relative w-full md:h-[50%] pl-[30px] pr-6 pt-[291px] pb-6 md:pl-[80px] md:pr-8 md:pt-8 md:pb-8 flex flex-col bg-white">
            <h3 className="text-left font-['Pretendard'] mb-2" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
              {t('items.2.title')}
            </h3>
            <p className="text-left font-['Pretendard']" style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
              {t('items.2.description')}
            </p>
          </div>
        </motion.div>
      </div>
      <div className="w-full h-[1px] bg-white"></div>
    </div>
  );
}
