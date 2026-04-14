import Image from 'next/image';
import { Container } from '@/components/layouts/Container';

import { useLocale } from 'next-intl';

/**
 * 교정 과정 섹션 컴포넌트
 */
export function OrthodonticsProcessSection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  return (
    <section className="relative w-full" style={{ backgroundColor: '#EAEEF1' }}>
      {/* 이미지는 Container 밖에 */}
      <div className="hidden md:block">
        <Image
          src="/assets/asset-125.webp" // 데스크톱 경로
          alt="블랑쉬치과 교정 전문의가 X-ray를 보며 골격과 교합을 고려한 치아교정 상담을 진행하는 모습"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
      </div>

      {/* 2. 모바일용 이미지 (데스크톱에서 숨김) */}
      <div className="block md:hidden">
        <Image
          src="/assets/asset-125-mobile.webp" // 모바일용 이미지 경로
          alt="블랑쉬치과 교정 전문의가 X-ray를 보며 골격과 교합을 고려한 치아교정 상담을 진행하는 모습"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
      </div>

      {/* 나머지 요소들은 Container 안에 */}
      <Container className="px-0 md:px-0 lg:px-0">
        <div className="relative w-full h-[692px] mx-auto" style={{ maxWidth: '1472px' }}>
          <div
            className="absolute left-[30px] bottom-[40px] md:left-[81px] md:top-[67px] md:bottom-auto z-[20]"
          >
            <h2
              className={`
    whitespace-pre-line 
    /* 모바일 스타일 (기본) */
    text-[#000] text-[28px] tracking-[-0.28px] pb-[430px]
    /* PC 스타일 (md 이상) */
    md:text-[#FFF] md:text-[20px] md:tracking-[-0.2px] md:pb-[30px]
  `}
              style={{
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                margin: 0,
              }}
            >
              {isEn ? <>Orthodontics you must{'\n'}get right the first time</> : <>인생에서 단 한 번,{'\n'}제대로 끝내야하는 교정</>}
            </h2>
            <p
              className={`
    whitespace-pre-line
    /* 모바일 스타일 (기본) */
    text-[#000]
    /* PC 스타일 (md 이상) */
    md:text-[#FFF]
  `}
              style={{
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '26px',
                letterSpacing: '-0.18px',
                margin: 0,
              }}
            >
              {isEn ? <>Orthodontics isn't just about moving teeth.{'\n'}It requires comprehensive planning that considers{'\n'}your skeletal structure, TMJ, and facial balance.{'\n'}This is why you need a certified specialist.</> : <>교정은 단순히 치아를 움직이는 게 아닙니다.{'\n'}골격, 턱관절, 얼굴 균형까지 고려한{'\n'}정밀한 설계가 필요합니다.{'\n'}그래서 교정과 전문의여야 합니다.</>}
            </p>
          </div>
          {/* 모바일 블러 레이어 */}
          {/* 모바일 블러 레이어 (상단 & 하단) */}
          <div className="md:hidden">
            {/* 1. 상단 블러: 텍스트 가독성 확보용 */}
            <div
              className="absolute top-0 left-0 w-full z-[5]"
              style={{
                height: '158px', // 상단 블러 높이 조절
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.20), transparent)',
                backdropFilter: 'blur(15px)',
              }}
            />

            {/* 2. 하단 블러: 기존 레이아웃 유지 */}
            <div
              className="absolute bottom-0 left-0 w-full z-[5]"
              style={{
                height: '158px',
                background: 'rgba(255, 255, 255, 0.20)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
