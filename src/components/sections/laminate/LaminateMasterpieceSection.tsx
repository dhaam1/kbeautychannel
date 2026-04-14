import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Section } from '@/components/layouts/Container';

/**
 * Masterpiece Card 컴포넌트
 */
function MasterpieceCard({
  imageSrc,
  imageAlt,
  firstText,
  secondText,
  backgroundColor,
}: {
  imageSrc: string;
  imageAlt: string;
  firstText: string;
  secondText: string;
  backgroundColor: string;
}) {
  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-lg border border-black"
      style={{ backgroundColor }}
    >
      <div className="relative w-16 h-16">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="64px"
        />
      </div>
      <h3 className="text-[#000] font-['Pretendard'] text-[20px] md:text-[24px] font-semibold leading-normal tracking-[-0.24px]">
        {firstText}
      </h3>
      <p className="text-[#262626] font-['Pretendard'] text-[16px] md:text-[18px] font-normal leading-[28px] tracking-[-0.18px] whitespace-pre-line">
        {secondText}
      </p>
    </div>
  );
}

/**
 * 라미네이트 Masterpiece 섹션 컴포넌트
 * 
 * @description
 * 치료 사례 섹션입니다.
 * 서버 컴포넌트로 구현되었으며, CSS 기반 반응형을 사용합니다.
 * 
 * @returns {Promise<JSX.Element>} Masterpiece 섹션 컴포넌트
 */
export async function LaminateMasterpieceSection() {
  const t = await getTranslations('solution.laminate.masterpiece');
  const items = t.raw('items') as Array<{
    image: {
      src: string;
      alt: string;
    };
    firstText: string;
    secondText: string;
    backgroundColor: string;
  }>;
  const textGroup = {
    firstText: t('textGroup.firstText'),
    secondText: t('textGroup.secondText'),
    thirdText: t('textGroup.thirdText'),
  };

  return (
    <Section bgClassName="bg-[#ECE9E8]">
      <div className="w-full flex flex-col gap-8 md:gap-12">
        <div className="text-center">
          <h2 className="text-[#000] font-['Pretendard'] text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-normal tracking-[-0.48px] mb-4">
            {t('title')}
          </h2>
        </div>

        {/* Text Group */}
        <div className="flex flex-col gap-4 text-center">
          <p className="text-[#262626] font-['Pretendard'] text-[18px] md:text-[20px] font-medium leading-[30px] tracking-[-0.2px]">
            {textGroup.firstText}
          </p>
          <p className="text-[#262626] font-['Pretendard'] text-[28px] md:text-[32px] lg:text-[38px] font-bold leading-normal tracking-[-0.38px] whitespace-pre-line">
            {textGroup.secondText}
          </p>
          <p className="text-[#262626] font-['Pretendard'] text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[28px] tracking-[-0.2px] whitespace-pre-line">
            {textGroup.thirdText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {items.map((item, index) => (
            <MasterpieceCard
              key={index}
              imageSrc={item.image.src}
              imageAlt={item.image.alt}
              firstText={item.firstText}
              secondText={item.secondText}
              backgroundColor={item.backgroundColor}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
