import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { MotionFadeUp } from '@/components/ui/MotionFadeUp';

/**
 * 블랑쉬치과 강점 카드 데이터 인터페이스
 */
interface AboutStrengthCase {
  id: number;
  treatmentType: string;
  treatmentPeriod: string;
  quote: string;
  patientName: string;
  image: string;
  reviewTitle: string;
  reviewContent: string;
  alt: string;
}

/**
 * AboutStrengthCard 컴포넌트 Props
 */
interface AboutStrengthCardProps {
  /** 개별 사례 데이터 */
  caseItem: AboutStrengthCase;
  /** '치료 기간' 레이블 텍스트 */
  labelTreatmentPeriod: string;
}

/**
 * 블랑쉬치과 Strength 카드 컴포넌트
 */
function AboutStrengthCard({ caseItem, labelTreatmentPeriod }: AboutStrengthCardProps) {
  return (
    <div
      // [수정] 다른 카드 컴포넌트와 크기/비율 통일
      className="relative flex flex-col flex-shrink-0 w-full h-auto md:w-[340px] md:h-[530px] xl-custom:w-[300px] xl-custom:h-[484px]"
      style={{
        borderRadius: '0px',
      }}
    >
      <div
        // [수정] 테두리 투명도 50% (border-black/50) 적용 및 하단 테두리 제거
        className="relative flex-shrink-0 w-full aspect-[300/220] md:h-[250px] xl-custom:h-[220px] border border-white border-b-0 bg-gray-100 overflow-hidden"
        style={{
          borderRadius: '0px',
        }}
      >
        <Image
          src={caseItem.image}
          alt={caseItem.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 340px"
        />
      </div>

      <div
        // [수정] 테두리 투명도 50% 적용, 패딩 및 높이 통일
        className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] border border-white bg-white w-full h-auto md:h-[280px] xl-custom:h-[264px]"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <h3
          style={{
            color: '#262626',
            fontSize: '20px', // [유지] 제목 20px
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-0.2px'
          }}
          className="mb-4 whitespace-pre-line" // mb-[32px] -> mb-4 로 간격 조정 (다른 카드와 균형)
        >
          {caseItem.treatmentType}
        </h3>

        <p
          style={{
            color: '#262626',
            fontSize: '16px', // [수정] 18px -> 16px 변경
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.16px'
          }}
          className="flex-grow overflow-y-auto whitespace-pre-line mb-4"
        >
          {caseItem.quote}
        </p>

        {caseItem.patientName && (
          <p
            style={{
              color: '#262626',
              fontSize: '16px', // [수정] 18px -> 16px 변경
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.16px'
            }}
          >
            {caseItem.patientName}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * 블랑쉬치과 Strength 섹션 컴포넌트
 */
export async function AboutStrengthSection() {
  const t = await getTranslations('aboutStrength');

  // 예시 데이터 - 번역 파일에서 가져오기
  const cases: AboutStrengthCase[] = [
    {
      id: 1,
      treatmentType: t('cases.0.title'),
      treatmentPeriod: '',
      quote: t('cases.0.quote'),
      patientName: '',
      image: '/assets/about/about-36.webp',
      reviewTitle: '',
      reviewContent: '',
      alt: "자연치를 보존하는 블랑쉬치과의 라미네이트 치료 설계 콘셉트 이미지"
    },
    {
      id: 2,
      treatmentType: t('cases.1.title'),
      treatmentPeriod: '',
      quote: t('cases.1.quote'),
      patientName: '',
      image: '/assets/about/about-37-1.webp',
      reviewTitle: '',
      reviewContent: '',
      alt: "블랑쉬 브랜드 카드와 치아 보철 샘플이 함께 놓인 이미지"
    },
    {
      id: 3,
      treatmentType: t('cases.2.title'),
      treatmentPeriod: '',
      quote: t('cases.2.quote'),
      patientName: '',
      image: '/assets/about/about-38-1.webp',
      reviewTitle: '',
      reviewContent: '',
      alt: "블랑쉬 치과의 라미네이트 표면 마감을 보여주는 치아 보철 샘플 클로즈업"
    },
    {
      id: 4,
      treatmentType: t('cases.3.title'),
      treatmentPeriod: '',
      quote: t('cases.3.quote'),
      patientName: '',
      image: '/assets/about/about-39.webp',
      reviewTitle: '',
      reviewContent: '',
      alt: "블랑쉬 치과의 라미네이트 구성품이 담긴 치료 패키지 박스"
    },
  ];

  const periodLabel = '';

  return (
    <section className="w-full bg-[#F3F3F6]">
      <div
        className="mx-auto w-full px-[30px] md:px-[80px]"
        style={{ maxWidth: '1472px' }}
      >
        <div>
          <div className="flex flex-col items-start text-left pt-[60px] md:pt-[67px] pb-[40px]">
            {/* 작은 레이블 영역 */}
            <h2
              className="pb-2"
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '30px',
                letterSpacing: '-0.18px',
              }}
            >
              {t('category')}
            </h2>

            {/* 큰 타이틀 영역 */}
            <div
              className="whitespace-pre-line"
              style={{
                color: '#000',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '40px',
                letterSpacing: '-0.28px',
              }}
            >
              {t('title')}
            </div>

            {/* 추가 설명 텍스트 */}
            <div
              className="whitespace-pre-line mt-[50px]"
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '26px',
                letterSpacing: '-0.18px',
              }}
            >
              {t('description')}
            </div>

          </div>
        </div>

        <div className="relative pb-[60px] xl-custom:pb-[100px]">
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl-custom:grid-cols-4 gap-[30px] md:gap-[34px] xl-custom:gap-[34px] justify-items-stretch md:justify-items-stretch xl-custom:justify-items-center"
            style={{ position: 'relative', zIndex: 50 }}
          >
            {cases.map((caseItem, index) => (
              <MotionFadeUp
                key={caseItem.id}
                className="w-full"
                delay={0.3 + index * 0.1}
              >
                <AboutStrengthCard
                  caseItem={caseItem}
                  labelTreatmentPeriod={periodLabel}
                />
              </MotionFadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
