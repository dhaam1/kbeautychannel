'use client';

import { AuroraBackground } from '@/components/ui/aurora-background';
import { useTranslations } from 'next-intl';

/**
 * 치아미백이란 섹션 컴포넌트
 * 
 * @description
 * 치아미백에 대한 설명을 제공하는 섹션입니다.
 */
export function WhiteningProcedureProcessTextSection() {
  const t = useTranslations('whitening.processIntro');

  return (
    <section 
      className="relative w-full overflow-hidden h-auto md:h-[524px]"
    >
      <AuroraBackground 
        className="h-auto md:h-[524px]" 
        flipHorizontal={true}
        style={{ backgroundColor: '#F7F8F8' }}
      >
        <div 
          className="relative flex flex-col mx-auto w-full max-w-[1472px] pt-[60px] pb-[60px] md:pt-[70px] md:pb-[100px] px-[30px] md:px-[80px]"
        >
        {/* 치아미백이란 */}
        <h2
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
            paddingBottom: '10px',
          }}
        >
          {t('title')}
        </h2>

        {/* 착색의 원인을 지우고, 투명함을 되찾는 시술입니다 */}
        <div
          className="whitespace-pre-line"
          style={{
            color: '#000',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.28px',
            paddingBottom: '40px',
          }}
        >
          {t('subtitle')}
        </div>

        {/* 설명 문단 */}
        <p
          className="whitespace-pre-line text-[16px] md:text-[18px]"
          style={{
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.18px',
          }}
        >
          {t('description')}
        </p>
      </div>
      </AuroraBackground>
    </section>
  );
}
