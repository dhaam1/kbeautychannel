import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/layouts/Container';

/**
 * 라미네이트 Sideeffect 섹션 컴포넌트
 * 
 * @description
 * 부작용 및 주의사항 섹션입니다.
 * 서버 컴포넌트로 구현되었으며, CSS 기반 반응형을 사용합니다.
 * 
 * @returns {Promise<JSX.Element>} Sideeffect 섹션 컴포넌트
 */
export async function LaminateSideeffectSection() {
  const t = await getTranslations('solution.laminate.sideeffect');

  return (
    <Section bgClassName="bg-[#E9EDF0]">
      <div className="w-full flex flex-col gap-6 md:gap-8 text-center">
        <h2 className="text-[#000] font-['Pretendard'] text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-normal tracking-[-0.48px]">
          {t('title')}
        </h2>
        <p className="text-[#262626] font-['Pretendard'] text-[18px] md:text-[20px] lg:text-[24px] font-normal leading-[32px] tracking-[-0.24px] whitespace-pre-line max-w-4xl mx-auto">
          {t('description')}
        </p>
      </div>
    </Section>
  );
}
